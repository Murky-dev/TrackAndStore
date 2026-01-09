import postgres from "postgres";
import dotenv from "dotenv/config";
const CONNECTION_STRING = process.env.DATABASE;
if (!CONNECTION_STRING) {
  throw new Error("DATABASE environment variable is not set");
}
export const sql = postgres(CONNECTION_STRING);
