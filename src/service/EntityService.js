import sql from "../utils/db.js";
import { filterObject } from "../utils/utils.js";

// used creating and patching an entity.
const allowedFields = ["name", "parent_id", "entity_type", "description"];

//#region Create

/**
 * Creates a entity record in entities table for a given CreateEntityDTO .
 * CreateEntityDTO {
 * name: required String
 * parent_id: optional int
 * enitty_type: required "item,container,person,location" see EntityTypeEnum in models.js
 * description: Optional String
 * }
 */
export async function createEntity(createDTO) {
  try {
    createDTO = filterObject(createDTO, allowedFields);
    return await sql`INSERT INTO entities ${sql(createDTO)}`;
  } catch (e) {
    console.error(e);
  }
}
//#endregion

//#region Read
export async function getEntities() {
  try {
    return await sql`SELECT * FROM entities`;
  } catch (e) {
    console.error(e);
  }
}

export async function getEntityById(id) {
  try {
    return await sql`SELECT * FROM entities WHERE id = ${id}`;
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

export async function getEntityByName(name) {
  try {
    return await sql`SELECT * from entities WHERE name LIKE ${name} `;
  } catch (e) {
    console.error(e);
  }
}
//#endregion

//#region Update
/**
 *updateDTO {
    name: string
    parent_id: number
    entity_type: EntityType {"item","location","person","container"}
    description: string
  }
 */
export async function patchEntity(id, updateDTO) {
  updateDTO = filterObject(updateDTO, allowedFields);
  return await sql`UPDATE entities set ${sql(updateDTO)} where id = ${id}`;
}

//#endregion

//#region Delete
export async function deleteEntity(id) {
  try {
    return await sql`DELETE FROM entities WHERE id = ${id}`;
  } catch (e) {
    console.error(e);
  }
}

//#endregion
