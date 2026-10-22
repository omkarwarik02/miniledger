import express from "express";
import cors from "cors";
import { pool } from "./db"
import { authRouter } from "./routes/auth";
import { requireAuth } from "./middlewares/authMiddleware";
import { loanRouter } from "./routes/loanRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/loans", requireAuth,loanRouter);
app.get("/health", async (_req, res) =>{
    const { rows} = await pool.query("SELECT now()");
    res.json({ ok: true, dbTime: rows[0].now});
});
app.get("/me", requireAuth, (req, res) => {
  res.json({ userId: req.userId });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server on :${PORT}`))