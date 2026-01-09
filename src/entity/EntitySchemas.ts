import * as z from "zod";

export const EntityTypeSchema = z.union([
  z.literal("item"),
  z.literal("container"),
  z.literal("location"),
  z.literal("person"),
]);

export const IDSchema = z.preprocess((input) => {
  return typeof input === "string" ? parseInt(input) : input;
}, z.number());

export const ParentIDSchema = z.preprocess((input) => {
  return typeof input === "string" ? parseInt(input) : input;
}, z.number().nullish());

export type EntityType = z.infer<typeof EntityTypeSchema>;

export const CreateEntitySchema = z.object({
  name: z.string(),
  parent_id: ParentIDSchema,
  entity_type: EntityTypeSchema,
  description: z.string().nullish(),
});

export const EntitySearchSchema = CreateEntitySchema.partial();

export type CreateEntityDTO = z.infer<typeof CreateEntitySchema>;
export type EntitySearchDTO = z.infer<typeof EntitySearchSchema>;
export type EntityPatchDTO = EntitySearchDTO;
