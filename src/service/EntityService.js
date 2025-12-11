import sql from "../utils/db.js";
import { filterObject } from "../utils/utils.js";

// used creating and patching an entity.
const allowedFields = ["name", "parent_id", "entity_type", "description"];

//#region Create

/**
 * Creates a database record for given CreateEntityDTO.
 * @param {Object} createEntityDTO
 * @param {string} createEntityDTO.name name of Entity to be created.
 * @param {number} [createEntityDTO.parent_id] id of parent entity if required.
 * @param {("item"|"container"|"location"|"person")} createEntityDTO.entity_type type of Entity to be created.
 * @param {string} [CreateEntityDTO.description] description of entity to be created.
 * @async
 * @throws {Error} throws error if CreateEntityDTO is missing required fields or a database error occurs.
 * @example let entityrecord = CreateEntity({name: "Kitkat", parent_id: 1, entity_type: "item", });
 */
export async function createEntity(createEntityDTO) {
  try {
    createEntityDTO = filterObject(createEntityDTO, allowedFields);
    return await sql`INSERT INTO entities ${sql(createEntityDTO)}`;
  } catch (e) {
    console.error(e);
  }
}
//#endregion

//#region Read

/**
 * Returns matching database record from entities table if a record with given id exists.
 * @param {number} id id of entity record to be fetched.
 * @async
 * @throws {Error} throws error if there is no database record for given id.
 * @deprecated
 */
export async function getEntityById(id) {
  try {
    return await sql`SELECT * FROM entities WHERE id = ${id}`;
  } catch (e) {
    console.error(e);
  }
}

/** Returns all entities with matching parent container, likely to be replaced with a view in future.
 * @param {number} parent_id id of parent entity.
 * @deprecated
 */
export async function GetEntitiesByParentID(parent_id) {
  try {
    return await sql`SELECT * FROM entities where parent_id = ${parent_id}`;
  } catch (e) {
    console.error(e);
  }
}

/** Returns records with given name from entities table of database.
 * @param {string} name name of entity to be fetched.
 * @deprecated
 */
export async function getEntitiesByName(name) {
  try {
    return await sql`SELECT * from entities WHERE name LIKE ${name} `;
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {Object} entitySearchDTO
 * @param {string} [entitySearchDTO.name]
 * @param {number} [entitySearchDTO.parent_id]
 * @example
 * GetEntities({}) returns all records from entities table.
 */
export async function getEntitiesv1(entitySearchDTO) {
  entitySearchDTO = filterObject(entitySearchDTO, allowedFields);
  const { name, parent_id } = entitySearchDTO;
  return await sql`SELECT * FROM entities 
${
  name && parent_id
    ? sql`WHERE name like ${name} AND parent_id = ${parent_id}`
    : name
      ? sql`WHERE name like ${name}`
      : parent_id
        ? sql`WHERE parent_id = ${parent_id}`
        : sql``
}`;
}

/**
 * returns matching records from entities table of database.
 * @param {Object} entitySearchDTO
 * @param {string} [entitySearchDTO.name]
 * @param {"item" | "container" | "location" | "person"} [entitySearchDTO.entity_type]
 * @param {number} [entitySearchDTO.parent_id]
 * @param {string} [entitySearchDTO.description]
 */
export async function getEntities(entitySearchDTO) {
  let conditions = [];
  entitySearchDTO = filterObject(entitySearchDTO, allowedFields);

  for (const [key, value] of Object.entries(entitySearchDTO)) {
    if (key === "name" || key === "description") {
      conditions.push(sql`${sql(key)} LIKE ${value}`);
    } else {
      conditions.push(sql`${sql(key)} = ${value} `);
    }
  }
  if (conditions.length === 0) {
    return await sql`SELECT * FROM entities`;
  }

  const whereClause = conditions.reduce((acc, condition, index) => {
    return index === 0 ? condition : sql`${acc} AND ${condition} `;
  });
  return await sql`SELECT * FROM entities WHERE ${whereClause}`;
}

console.log(await getEntities({}));

export async function getEntitiesv2(entitySearchDTO) {
  const { name, parent_id } = entitySearchDTO;
  if (parent_id && name) {
    return await sql`SELECT * FROM entities WHERE name LIKE ${name} AND parent_id = ${parent_id} `;
  } else if (name && !parent_id) {
    return await sql`SELECT * FROM entities WHERE name like ${name} `;
  } else if (parent_id && !name) {
    return await sql`SELECT * FROM entities WHERE parent_id = ${parent_id} `;
  } else {
    return await sql`SELECT * from entities`;
  }
}

//#endregion

//#region Update

/**
 * Updates fields of database record for the entity with given id.
 * @param {number} id  id for entity to be updated.
 * @param {Object} updateDTO
 * @param {string} [updateDTO.name] name of entity
 * @param {number} [updateDTO.parent_id] id of new parent entity.
 * @param {"item" | "container" | "location" | "person"} [updateDTO.entity_type] new entity_type for entity.
 * @param {string} [updateDTO.description] new description for entity
 * @async
 * @returns Record of updated entity.
 * @throws {Error} throws error if a database error occurs
 */
export async function patchEntity(id, updateDTO) {
  updateDTO = filterObject(updateDTO, allowedFields);
  return await sql`UPDATE entities set ${sql(updateDTO)} where id = ${id} `;
}

//#endregion

//#region Delete

/**
 * @param {number} id id of record to be deleted from entities table of database.
 * @async
 */
export async function deleteEntity(id) {
  try {
    return await sql`DELETE FROM entities WHERE id = ${id} `;
  } catch (e) {
    console.error(e);
  }
}

//#endregion
