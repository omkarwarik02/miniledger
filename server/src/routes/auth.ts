import { Router } from "express";
import { requestOtp, verifyOtp } from "../controller/authController";

export const authRouter = Router();

authRouter.post("/request-otp", requestOtp);
authRouter.post("/verify-otp", verifyOtp);