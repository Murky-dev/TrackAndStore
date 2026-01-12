import express, { json } from "express";
import {
  createEntity,
  deleteEntity,
  getEntities,
  getEntityById,
  patchEntity,
} from "./EntityService";
import { EntitySearchSchema, IDSchema } from "./EntitySchemas";
export const entityRouter = express.Router();
const ERRORMESSAGE = {
  Status: "Error",
  Message: "Error occured check request",
};
const ENTITYNOTFOUND = {
  Status: "Error",
  Message: "Error not found for provided id",
};

//#region GET
entityRouter.get("/", async (req, res) => {
  try {
    let entities = await getEntities(req.query);
    res.status(200).json(entities);
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORMESSAGE);
  }
});

entityRouter.get("/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const result = await getEntityById(id);
    if (result?.length === 1) {
      res.status(200).json(result);
    } else {
      res.status(404).json(ENTITYNOTFOUND);
    }
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORMESSAGE);
  }
});
//#endregion

//#region POST/PATCH
entityRouter.post("/", async (req, res) => {
  try {
    const result = await createEntity(req.body);
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    res.status(400).json;
  }
});

entityRouter.patch("/:id", async (req, res) => {
  try {
    const id = IDSchema.parse(req.params.id);
    const entityPatchDTO = EntitySearchSchema.parse(req.query.body);
    const result = await patchEntity(id, entityPatchDTO);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORMESSAGE);
  }
});

//#endregion

entityRouter.delete("/:id", async (req, res) => {
  try {
    const id = IDSchema.parse(req.params.id);
    await deleteEntity(id);
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORMESSAGE);
  }
});
