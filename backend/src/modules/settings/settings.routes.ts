import { Router } from "express";
import { SettingsController } from "./settings.controller";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", SettingsController.getSettings);
router.put("/", requireAuth, requireRole("SUPER_ADMIN"), SettingsController.updateSettings);

export default router;
