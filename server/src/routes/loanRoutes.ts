import { Router } from "express";
import { createLoan, deleteLoan, getLoans, getSummary, repayLoan } from "../controller/loanController";

export const loanRouter = Router();

loanRouter.post("/", createLoan);
loanRouter.get("/", getLoans);
loanRouter.patch("/:id/repay", repayLoan);
loanRouter.get("/summary", getSummary);
loanRouter.delete("/:id", deleteLoan);

