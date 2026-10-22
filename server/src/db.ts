import "dotenv/config";
import { Pool, types } from "pg";
import { config } from "./config"



types.setTypeParser(1082, (value) => value);
types.setTypeParser(1700, (value) => parseFloat(value));
export const pool = new Pool({ connectionString:config.databaseUrl});

