import { check } from "express-validator";

const UserValidator = {
  register: [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  login: [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password is required"),
  ],
  me: [],
};

export default UserValidator;
