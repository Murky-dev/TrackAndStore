import { createEntity } from "../entity/EntityService";

export async function createTestData() {
  await createEntity({
    name: "Living room",
    entity_type: "location",
    description: "Main living location",
  });
  await createEntity({
    name: "Ikea Alex Drawers 1",
    entity_type: "container",
    description: "Left White Ikea Alex drawers",
    parent_id: 1,
  });
  await createEntity({
    name: "Ikea Alex Drawers 2",
    entity_type: "container",
    description: "Right White Ikea Alex drawers",
    parent_id: 1,
  });
  await createEntity({
    name: "Glasses wipes",
    entity_type: "item",
    parent_id: 2,
    description: "Box of glasses wipes",
  });
  await createEntity({
    name: "Nemo Yubikey",
    entity_type: "item",
    parent_id: 2,
    description: "Yubikey with clownfish lanyard",
  });
  await createEntity({
    name: "Pocket Watch case",
    entity_type: "container",
    parent_id: 2,
    description:
      "Box/case for pocket watch I was given for my 18th/ 21st birthday?",
  });
  await createEntity({
    name: "Pocket Watch",
    entity_type: "item",
    parent_id: 6,
  });
}
