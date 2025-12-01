import sql from "../db.js";
async function up() {
  await sql`CREATE TYPE entity_type AS ENUM (
    'item', 
    'container',
    'person',
    'location',
    'pack'
)`

  await sql`CREATE TABLE IF NOT EXISTS Entities (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    parent_id INT REFERENCES Entities(id),
    name TEXT NOT NULL,
    entity_type entity_type NOT NULL,
    description TEXT,
    CHECK (
        entity_type != 'person' OR parent_id IS NULL
    ),

    CHECK (
        parent_id is null OR parent_id != id
    )
)`
  await sql.end()
}
up();
export default up;
