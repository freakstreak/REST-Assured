import { check } from "express-validator";

const DraftSchemaValidator = {
  create: [
    check("applicationId")
      .notEmpty()
      .isInt()
      .withMessage("Application Id is required"),
  ],
  update: [
    check("draftSchemaId")
      .notEmpty()
      .isInt()
      .withMessage("draftSchemaId is required"),
    check("feedback").notEmpty().isString().withMessage("feedback is required"),
  ],
};

export default DraftSchemaValidator;
