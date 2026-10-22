import express from "express";
import cors from "cors";
import { pool } from "./db"

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", async (_req, res) =>{
    const { rows} = await pool.query("SELECT now()");
    res.json({ ok: true, dbTime: rows[0].now});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server on :${PORT}`))