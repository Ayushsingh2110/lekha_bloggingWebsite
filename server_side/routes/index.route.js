import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
const router = Router();

/* User Authentication routes */
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

export default router;