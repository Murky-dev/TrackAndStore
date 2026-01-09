import { sql } from "../utils/db";
import { up, down } from "./migrations";

async function reset() {
  await down();
  await up();
  await sql.end();
  process.exit();
}

reset();
