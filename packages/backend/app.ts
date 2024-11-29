require("dotenv").config();
require("express-async-errors");
import express from "express";
import { Request, Response } from "express";
import authRoutes from "./app/routes/api-auth";
import cors from "cors";

const session = require("express-session");

const app: express.Application = express();
app.use(cors());

app.use(
  session({
    secret: "something crazy",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ success: false, error: err?.message });
});

app.use(authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
