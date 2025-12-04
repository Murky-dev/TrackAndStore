import postgres from "postgres";
import dotenv from "dotenv/config"; // eslint-disable-line
const sql = postgres(process.env.DATABASE);
export default sql;
