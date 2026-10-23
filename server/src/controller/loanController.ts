import { Request, Response } from "express";
import { pool } from "../db";

import { createLoanSchema, loanIdParamSchema } from "../validators/loan.schemas";

export async function createLoan(req:Request, res:Response) {
    const parsed = createLoanSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({ error: parsed.error.issues[0].message })
    }

    const { friendName, amount ,dueDate} = parsed.data;

     const {rows} = await pool.query(
        `INSERT INTO loans(user_id, friend_name, amount, due_date)
        VALUES($1, $2, $3, $4)
        RETURNING *
        `,[req.userId,friendName,amount,dueDate]
    )
    
    return res.status(201).json(rows[0]);
}

export async function getLoans(req:Request, res:Response){
    const {rows} = await pool.query(
        `SELECT *,
        (repaid_at IS NULL AND due_date < CURRENT_DATE) AS is_overdue
        FROM loans
        WHERE user_id = $1
        ORDER BY due_date ASC`,[req.userId]
    )
    return res.json(rows);


}

export async function repayLoan(req:Request, res:Response){
    const parsed = loanIdParamSchema.safeParse(req.params);
    if(!parsed.success){
        return res.status(400).json({ error: "Invalid loan id"})
    }
    const {id} = parsed.data;
    const result = await pool.query(
        `UPDATE loans
        SET repaid_at = now()
        WHERE id = $1 AND user_id = $2 AND repaid_at IS NULL
        RETURNING *
      `,[id, req.userId]
    )
    if(result.rowCount === 0){
        return res.status(404).json({ error:"Loan not found or already repaid"});
    }
    res.json(result.rows[0])


}
export async function deleteLoan(req:Request, res:Response){
    const parsed = loanIdParamSchema.safeParse(req.params);
    if(!parsed.success){
        return res.status(400).json({ error: "Invalid loan id"})
    }
    const {id} = parsed.data;
    const result = await pool.query(
        `DELETE FROM loans
        WHERE id = $1 AND user_id = $2
        RETURNING *
      `,[id, req.userId]
    )
    if(result.rowCount === 0){
        return res.status(404).json({ error:"Loan not found"});
    }
    res.json(result.rows[0])
}
export async function getSummary(req:Request, res:Response){
    const {rows} = await pool.query(
        `SELECT 
        COALESCE(SUM(amount),0) AS "totalLent",
        COALESCE(SUM(amount) FILTER (WHERE repaid_at IS NOT NULL),0) AS "totalRepaid",
        COALESCE(SUM(amount) FILTER (WHERE repaid_at IS  NULL AND due_date < CURRENT_DATE),0) AS "overdueAmount"
        FROM loans
        WHERE user_id =$1
        `,[req.userId]
    )
    return res.json(rows[0])
}