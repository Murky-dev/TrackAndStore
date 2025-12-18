import express from "express";
import { entityRouter } from "./entity/index.js";
import cors from "cors";
export const app = express();

//Middleware

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204.
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(express.json());
app.use(cors(corsOptions));

//Routes
app.use("/api/v1/entities", entityRouter);
