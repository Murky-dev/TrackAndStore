import sql from "./db.js";
import { Entity } from "./models.js";
import { filterObject } from "./utils.js";

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
    return await sql`DELETE FROM entities WHERE id = ${id}`;
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
    return await sql`SELECT * FROM entities where parent_id = ${parent_id}`;
  } catch (e) {
    console.error(e);
  }
}

/**
 *entity {
    name: string
    parent_id: number
    entity_type: EntityType {"item","location","person","container"}
    description: string
  }
 */
export async function patchEntity(id, updateTDO) {
  let allowedFields = ["name", "parent_id", "entity_type", "description"];
  updateTDO = filterObject(updateTDO, allowedFields);
  return await sql`UPDATE entities set ${sql(updateTDO)} where id = ${id}`;
}

export async function getEntityByName(name) {
  try {
    return await sql`select * from entities where name like ${name} `;
  } catch (e) {
    console.error(e);
  }
}
