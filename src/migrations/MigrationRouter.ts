import express from "express";
import { down, reset, up } from "./migrations";
import { createTestData } from "./TestData";
export const migrationRouter = express.Router();

const ERRORMESSAGE = {
  Status: "Error",
  Message: "Error occured check request",
};

migrationRouter.get("/reset", async (req, res) => {
  try {
    await reset();
    res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(400).send(ERRORMESSAGE);
  }
});

migrationRouter.get("/down", async (req, res) => {
  try {
    await down();
    res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(400).send(ERRORMESSAGE);
  }
});

migrationRouter.get("/up", async (req, res) => {
  try {
    await up();
    res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(400).send(ERRORMESSAGE);
  }
});

migrationRouter.get("/testdata", async (req, res) => {
  try {
    await createTestData();
    res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(400).send(ERRORMESSAGE);
  }
});
