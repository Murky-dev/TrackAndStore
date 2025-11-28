CREATE TYPE entity_type AS ENUM (
    'item', 
    'container',
    'person',
    'location',
    'pack'
);

CREATE TABLE IF NOT EXISTS Entities (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    parent_id INT REFERENCES Entities(id),
    entity_name TEXT NOT NULL,
    entity_type entity_type NOT NULL,
    description TEXT,
    CHECK (
        entity_type != 'person' OR parent_id IS NULL
    ),

    CHECK (
        parent_id is null OR parent_id != id
    )
);
