import express from "express";
import {
  createEntity,
  deleteEntity,
  getEntities,
  getEntityById,
  patchEntity,
} from "./EntityService.js";
export const entityRouter = express.Router();
const ERRORMESSAGE = {
  Status: "Error",
  Message: "Error occured check request",
};

//#region GET

entityRouter.get("/", async (req, res) => {
  try {
    let entities = await getEntities(req.query);
    res.json(entities);
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORMESSAGE);
  }
});

entityRouter.get("/:id", async (req, res) => {
  try {
    let entity = await getEntityById(req.params.id);
    res.json(entity);
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORMESSAGE);
  }
});

//#endregion

//#region POST/PATCH

entityRouter.post("/", async (req, res) => {
  try {
    let result = await createEntity(req.body);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORMESSAGE);
  }
});

entityRouter.patch("/:id", async (req, res) => {
  try {
    await patchEntity(req.params.id, req.body);
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORMESSAGE);
  }
});

//#endregion

//#region DELETE
entityRouter.delete("/:id", async (req, res) => {
  try {
    await deleteEntity(req.params.id);
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORMESSAGE);
  }
});
//#endregion
