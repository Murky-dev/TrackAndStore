import express from "express";
import {
  createEntity,
  deleteEntity,
  getEntities,
  getEntityById,
  patchEntity,
} from "./EntityService.js";
export const entityRouter = express.Router();

//#region GET

entityRouter.get("/", async (req, res) => {
  try {
    let entities = await getEntities(req.query);
    res.json(entities);
  } catch (e) {
    console.error(e);
    res.status(400).send("Error occurred in request");
  }
});

entityRouter.get("/:id", async (req, res) => {
  try {
    let entity = await getEntityById(req.params.id);
    res.json(entity);
  } catch (e) {
    console.error(e);
    res.status(400).send("Error in request.");
  }
});

//#endregion

//#region POST/PATCH

entityRouter.post("/", async (req, res) => {
  try {
    await createEntity(req.body);
    res.status(201).send("Entity created.");
  } catch (e) {
    console.error(e);
    res.status(400).send("Error occurred.");
  }
});

entityRouter.patch("/:id", async (req, res) => {
  try {
    await patchEntity(req.params.id, req.body);
    res.status(200).send("Updated Entity.");
  } catch (e) {
    console.error(e);
    res.status(400).send("Error occurred check request body and ID.");
  }
});

//#endregion

//#region DELETE
entityRouter.delete("/:id", async (req, res) => {
  try {
    await deleteEntity(req.params.id);
    res.status(204).send("Deleted Entity");
  } catch (e) {
    console.error(e);
    res.status(400).send("Error occurred");
  }
});
//#endregion
