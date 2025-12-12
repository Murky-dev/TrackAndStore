import express from "express";
import { entityRouter } from "./entity/index.js";
export const app = express();

//Middleware

app.use(express.json());

//Routes
app.use("/api/v1/entities", entityRouter);
