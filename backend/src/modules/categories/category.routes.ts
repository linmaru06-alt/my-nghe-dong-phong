import { Router } from "express";
import { CategoryController } from "./category.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", CategoryController.getAll);
router.get("/:slug", CategoryController.getBySlug);
router.post("/", requireAuth, CategoryController.create);
router.put("/:id", requireAuth, CategoryController.update);
router.delete("/:id", requireAuth, CategoryController.delete);

export default router;
