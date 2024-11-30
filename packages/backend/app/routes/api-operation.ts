import express from "express";
import OperationController from "../controllers/operationController";
import authenticate from "../middleware/authenticate";
const router = express.Router();

router.post("/operation", authenticate, OperationController.createOperation);
router.post("/operation-update", authenticate, OperationController.updateOperation);

export default router;
