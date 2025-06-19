import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
const router = Router();

/* User Authentication routes */
router.post("auth/login", AuthController.login);
router.post("auth/register", AuthController.register);
router.post("auth/googleAuth", AuthController.googleAuth)
export default router;