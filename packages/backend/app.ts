require("dotenv").config();
require("express-async-errors");
import express, { Application, NextFunction } from "express";
import { Request, Response } from "express";
import authRoutes from "./app/routes/api-auth";
import cors from "cors";
import Config from "./app/config";
import applicationRouter from "./app/routes/api-application";
import featureRouter from "./app/routes/api-feature";
import operationRouter from "./app/routes/api-operation";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use((err: any, req: Request, res: any, next: any) => {
  console.log("--kyu hawa nikal gayi---", err.message);
  return res.json({ success: false, error: err?.message });
});

app.use(authRoutes);
app.use(applicationRouter);
app.use(featureRouter);
app.use(operationRouter)

app.get("/", (req: Request, res: any) => {
  res.json({ message: "Hello World" });
});

const PORT = Config.APP_PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
