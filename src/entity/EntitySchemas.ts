import * as z from "zod";

export const EntityTypeSchema = z.union([
  z.literal("item"),
  z.literal("container"),
  z.literal("location"),
  z.literal("person"),
]);

export const IDSchema = z.preprocess((input) => {
  // Transform the input to a number if it's a string
  return typeof input === "string" ? parseFloat(input) : input;
}, z.number());

export type EntityType = z.infer<typeof EntityTypeSchema>;

export const CreateEntitySchema = z.object({
  name: z.string(),
  parent_id: IDSchema,
  entity_type: EntityTypeSchema,
  description: z.string().nullable(),
});

export const EntitySearchSchema = CreateEntitySchema.partial();

export type CreateEntityDTO = z.infer<typeof CreateEntitySchema>;
export type EntitySearchDTO = z.infer<typeof EntitySearchSchema>;
export type EntityPatchDTO = EntitySearchDTO;
