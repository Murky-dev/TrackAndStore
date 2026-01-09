import express from "express";
import cors from "cors";
import { entityRouter } from "./entity/EntityRouter";
import { migrationRouter } from "./migrations/MigrationRouter";
export const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204.
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1/entities", entityRouter);
app.use("/dev/v1/migrations", migrationRouter);
