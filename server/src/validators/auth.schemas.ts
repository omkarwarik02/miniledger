import { z } from "zod";

export const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number");
export const otpSchema = z.string().regex(/^\d{6}$/, "OTP must be 6 digits");

export const requestOtpSchema = z.object({ phone: phoneSchema });

export const verifyOtpSchema = z.object({ phone:phoneSchema,code:otpSchema})