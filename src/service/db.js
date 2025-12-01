import postgres from "postgres";
import dotenv from "dotenv/config";
const sql = postgres(process.env.DATABASE);

export default sql;
