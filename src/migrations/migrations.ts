import { sql } from "../utils/db";

export async function down() {
  try {
    process.stdout.write("Dropping tables and types...\n");
    await sql`DROP TABLE IF EXISTS Entities CASCADE`;
    await sql`DROP TYPE IF EXISTS entity_type CASCADE`;
    process.stdout.write("Done...\n");
  } catch (e) {
    console.error(e);
  }
}

export async function up() {
  try {
    process.stdout.write("Creating tables and types...\n");
    await sql`CREATE TYPE entity_type AS ENUM (
    'item', 
    'container',
    'person',
    'location',
    'pack'
    )`;

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
)`;
    process.stdout.write("Done ...\n");
  } catch (e) {
    console.error(e);
  }
}

export async function reset() {
  await down();
  await up();
}
