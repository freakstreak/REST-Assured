import express from "express";
import AuthController from "../controllers/authController";
const router = express.Router();

router.get("/signup", AuthController.signup);
router.get("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.get("/me", AuthController.user);

export default router;
