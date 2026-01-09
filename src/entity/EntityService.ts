import { sql } from "../utils/db";
import {
  CreateEntitySchema,
  type CreateEntityDTO,
  type EntitySearchDTO,
  type EntityPatchDTO,
  EntitySearchSchema,
} from "./EntitySchemas";
import * as z from "zod";

//#region Create

export async function createEntity(input: CreateEntityDTO) {
  input = CreateEntitySchema.parse(input);
  try {
    const result = await sql`INSERT INTO entities ${sql(input)} RETURNING *`;
    if (result.length == 1) {
      return result[0];
    }
  } catch (e) {
    console.error(e);
  }
}

//#endregion

//#region Read
export async function getEntityById(id: number) {
  const validatedInput = z.number().safeParse(id);
  if (!validatedInput.success) {
    throw new Error("Invalid input");
  }

  try {
    const result =
      await sql`SELECT * FROM entities WHERE id = ${validatedInput.data}`;
    if (result.length === 1) {
      return result[0];
    }
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function getEntities(entitySearchDTO: EntitySearchDTO) {
  let conditions: any[] = [];
  const validatedInput = EntitySearchSchema.safeParse(entitySearchDTO);
  if (!validatedInput.success) {
    throw new Error("Invalid input");
  }
  try {
    for (const [key, value] of Object.entries(validatedInput.data)) {
      if (key === "name" || key === "description") {
        conditions.push(sql`${sql(key as string)} = ${value as string | null}`);
      } else {
        conditions.push(sql`${sql(key as string)} = ${value as any}`);
      }
    }
    if (conditions.length === 0) {
      return await sql`SELECT * FROM entities`;
    }
    const whereClause = conditions.reduce((acc, condition, index) => {
      return index === 0 ? condition : sql`${acc} AND ${condition} `;
    });
    return await sql`SELECT * FROM entities WHERE ${whereClause}`;
  } catch (e) {
    console.error(e);
  }
}

//#endregion

//#region UPDATE
export async function patchEntity(id: number, entityPatchDTO: EntityPatchDTO) {
  let validatedID = z.number().safeParse(id);
  let validatedInput = EntitySearchSchema.safeParse(entityPatchDTO);
  if (!validatedID.success || !validatedInput.success) {
    throw new Error("Invalid input");
  }
  const result =
    await sql`UPDATE entities SET ${sql(validatedInput.data)} WHERE id = ${validatedID.data} RETURNING *`;
  return result[0];
}
////#endregion

export async function deleteEntity(id: number) {
  try {
    const result = await sql`DELETE FROM entities WHERE id = ${id} RETURNING *`;
    return result;
  } catch (e) {
    console.error(e);
  }
}
