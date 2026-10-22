import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { pool } from "../db";
import {
  otpSchema,
  requestOtpSchema,
  verifyOtpSchema,
} from "../validators/auth.schema";
import { config } from "../config";

export async function requestOtp(req: Request, res: Response) {
  const parsed = requestOtpSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  const { phone } = parsed.data;

  const code = crypto.randomInt(100000, 1000000).toString();

  await pool.query(
    `INSERT INTO otps (phone,code,expires_at)
        VALUES ($1,$2, now() + interval '5 minutes')
        ON CONFLICT (phone) DO UPDATE
            SET code = EXCLUDED.code, expires_at = EXCLUDED.expires_at`,
    [phone, code],
  );
  console.log(`[OTP] ${phone} -> ${code}`);
  res.json({ message: "OTP sent" });
}

export async function verifyOtp(req: Request, res: Response) {
  const parsed = verifyOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  const { phone, code } = parsed.data;

  const otpResult = await pool.query(
    `DELETE FROM otps
        WHERE phone = $1 AND code = $2 AND expires_at > now()
        RETURNING phone`,
    [phone, code],
  );
  if (otpResult.rowCount === 0) {
    return res.status(401).json({ error: "Invalid or expired OTP" });
  }

  const userResult = await pool.query(
    `INSERT INTO users (phone) VALUES ($1)
        ON CONFLICT (phone) DO UPDATE SET phone = EXCLUDED.phone
        RETURNING id
        `,
    [phone],
  );
  const userId = userResult.rows[0].id;
  const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: "7d" });
  res.json({ token });
}
