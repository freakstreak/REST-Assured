import express from "express";
import authenticate from "../middleware/authenticate";
import ApplicationController from "../controllers/applicationController";
const router = express.Router();

router.post(
  "/application",
  authenticate,
  ApplicationController.createApplication
);

export default router;
