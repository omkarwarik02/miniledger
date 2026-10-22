import { Router } from "express";
import { createLoan } from "../controller/loanController";

export const loanRouter = Router();

loanRouter.post("/", createLoan);

