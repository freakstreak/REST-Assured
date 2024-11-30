import express from "express";
import AuthController from "../controllers/authController";
import authenticate from "../middleware/authenticate";
const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/me", authenticate, AuthController.me);

export default router;
