import { Request, Response } from "express";
import { pool } from "../db";

import { createLoanSchema } from "../validators/loan.schemas";

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