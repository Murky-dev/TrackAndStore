import { up } from "./migrations.js";
import sql from "../db.js";
await up();
await sql.end();
process.exit(0);
