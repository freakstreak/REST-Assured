import express from "express";
import DraftSchemaController from "../controllers/DraftSchemaController";
import DraftSchemaValidator from "../validators/draftSchema";

const router = express.Router();

router.post(
  "/draft-schema",
  DraftSchemaValidator.create,
  DraftSchemaController.create
);
router.put(
  "/draft-schema",
  DraftSchemaValidator.update,
  DraftSchemaController.update
);

export default router;
