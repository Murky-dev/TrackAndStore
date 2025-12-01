import sql from "./db.js";
import { Entity, EntityType } from "./models.js";

export async function createEntity(entity) {
  let columns = [];
  if (entity.parent_id != undefined && entity.parent_id != null) {
    columns = ["parent_id", "name", "entity_type", "description"];
  } else {
    columns = ["name", "entity_type", "description"];
  }
  if (entity instanceof Entity)
    try {
      return await sql`INSERT INTO entities ${sql(entity, columns)} RETURNING id`;
    } catch (e) {
      console.error(e);
    }
}

export async function deleteEntity(id) {
  try {
    return await sql`DELETE * FROM entities WHERE id = ${id} RETURNING id`;
  } catch (e) {
    console.error(e);
  }
}

export async function getEntities() {
  try {
    return await sql`SELECT * FROM entities`;
  } catch (e) {
    console.error(e);
  }
}

export async function getEntityById(id) {
  try {
    return await sql`SELECT * FROM entities WHERE ID = ${id}`;
  } catch (e) {
    console.error(e);
  }
}

export async function getEntityByParentID(parent_id) {
  try {
    return await sql`SELECT * FROM entities where parent_id = ${id}`;
  } catch (e) {
    console.error(e);
  }
}

export async function getEntityByName(name) {
  try {
    return await sql`SELECT * FROM entities where name LIKE ${name}`;
  } catch (e) {
    console.error(e);
  }
}
