import * as z from "zod";

export const EntityTypeSchema = z.union([
  z.literal("item"),
  z.literal("container"),
  z.literal("location"),
  z.literal("person"),
]);

export type EntityType = z.infer<typeof EntityTypeSchema>;

export const CreateEntitySchema = z.object({
  name: z.string(),
  parent_id: z.number().nullable(),
  entity_type: EntityTypeSchema,
  description: z.string().nullable(),
});

export const EntitySearchSchema = CreateEntitySchema.partial();

export type CreateEntityDTO = z.infer<typeof CreateEntitySchema>;
export type EntitySearchDTO = z.infer<typeof EntitySearchSchema>;
export type EntityPatchDTO = EntitySearchDTO;
