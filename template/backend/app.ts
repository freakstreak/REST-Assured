require("dotenv").config();
require("express-async-errors");
import express, { Application, NextFunction } from "express";
import { Request, Response } from "express";
import cors from "cors";
import router from "./loader";
import "./controllers/auth/read";
import sequelize from "./config/database";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use((err: any, req: Request, res: any, next: any) => {
  return res.json({ success: false, error: err?.message });
});

(async () => {
  app.use(router);
})();

app.listen(3000, () => {
  console.log(`App listening on port ${3000}`);
});

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));
