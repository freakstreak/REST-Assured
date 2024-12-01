import express from "express";
import DraftSchemaController from "../controllers/DraftSchemaController";
import DraftSchemaValidator from "../validators/draftSchema";
import SchemaController from "../controllers/SchemaController";

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

router.post("/schema", SchemaController.create);
router.post("/schema/model", SchemaController.createModelAndMigration);

export default router;
