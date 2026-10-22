import { z } from "zod";

export const createLoanSchema = z.object({
  friendName: z.string().trim().min(1, "Friend name is required").max(100),
  amount: z.number().positive("Amount must be greater than 0"),
dueDate: z.iso.date("Date must be a valid YYYY-MM-DD date"),
});

export const loanIdParamSchema = z.object({
    id:z.coerce.number().int().positive(),
})