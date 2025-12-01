import sql from "../db.js";

async function down() {
  await sql`DROP TABLE IF EXISTS Entities CASCADE`;
  await sql`DROP TYPE IF EXISTS entity_type CASCADE`;
  await sql.end();
}

down()
export default down;

