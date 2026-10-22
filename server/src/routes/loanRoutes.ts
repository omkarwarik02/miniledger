import { Router } from "express";
import { createLoan, getloans } from "../controller/loanController";

export const loanRouter = Router();

loanRouter.post("/", createLoan);
loanRouter.get("/", getloans);

