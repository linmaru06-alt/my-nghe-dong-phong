import { Router } from "express";
import { WoodTypeController } from "./woodType.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", WoodTypeController.getAll);
router.get("/:slug", WoodTypeController.getBySlug);
router.post("/", requireAuth, WoodTypeController.create);
router.put("/:id", requireAuth, WoodTypeController.update);
router.delete("/:id", requireAuth, WoodTypeController.delete);

export default router;
