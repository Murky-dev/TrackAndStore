import { sql } from "../utils/db";
import { up } from "./migrations";

await up();
await sql.end();
process.exit(0);
