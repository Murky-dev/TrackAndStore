export class EntityType {
  static ITEM = "item";
  static CONTAINER = "container";
  static PERSON = "person";
  static LOCATION = "location";
}

export class Entity {
  constructor(parent_id = undefined, name, entity_type, description) {
    this.parent_id = parent_id || null;
    this.name = name;
    this.entity_type = entity_type;
    this.description = description;
  }
}
