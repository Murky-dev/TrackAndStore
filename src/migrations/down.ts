import { sql } from "../utils/db.js";
import { down } from "./migrations.js";
await down();
await sql.end();
process.exit(0);
