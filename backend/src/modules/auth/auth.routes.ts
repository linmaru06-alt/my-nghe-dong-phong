import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { requireAuth } from "../../middlewares/auth.middleware";
import { authLimiter } from "../../middlewares/rateLimit.middleware";
import { loginSchema, changePasswordSchema } from "./auth.schema";

const router = Router();

router.post("/login", authLimiter, validateBody(loginSchema), AuthController.login);
router.post("/logout", requireAuth, AuthController.logout);
router.get("/me", requireAuth, AuthController.me);
router.put("/change-password", requireAuth, validateBody(changePasswordSchema), AuthController.changePassword);

export default router;
