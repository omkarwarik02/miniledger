import { Router } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { pool } from "../db";


export const authRouter = Router();

const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number");


authRouter.post("/request-otp", async(req,res) =>{

    const parsed = z.object({ phone: phoneSchema}).safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({ error: parsed.error.issues[0].message})
    }

    const { phone } = parsed.data;

    const code = crypto.randomInt(100000, 1000000).toString();


    await pool.query(
        `INSERT INTO otps (phone,code,expires_at)
        VALUES ($1,$2, now() + interval '5 minutes')
        ON CONFLICT (phone) DO UPDATE
            SET code = EXCLUDED.code, expires_at = EXCLUDED.expires_at`,[phone,code]
    )
    console.log(`[OTP] ${phone} -> ${code}`);
    res.json({ message: "OTP sent"});

})