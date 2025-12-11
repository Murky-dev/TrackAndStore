import sql from "#utils/db.js";
import { up, down } from "./migrations.js";
await down();
await up();
await sql.end();
process.exit(0);
