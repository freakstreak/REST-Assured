import express from "express";
import OperationController from "../controllers/operationController";
import authenticate from "../middleware/authenticate";
const router = express.Router();

router.post("/operation", OperationController.create);
router.post("/operation-endpoint", OperationController.createOperationEndpoint);
// router.post("/operation", authenticate, OperationController.createOperation);
// router.post("/operation-update", authenticate, OperationController.updateOperation);
// router.post("/operation-delete", authenticate, OperationController.deleteOperation);

export default router;
