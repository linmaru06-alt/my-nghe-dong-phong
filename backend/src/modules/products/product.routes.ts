import { Router } from "express";
import { ProductController } from "./product.controller";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema, productFilterSchema } from "./product.schema";

const router = Router();

// Public routes
router.get("/", validateQuery(productFilterSchema), ProductController.getProducts);
router.get("/featured", ProductController.getFeatured);
router.get("/:slug", ProductController.getBySlug);

// Admin routes
router.get("/admin/list", requireAuth, validateQuery(productFilterSchema), ProductController.getAdminProducts);
router.get("/admin/:id", requireAuth, ProductController.getById);
router.post("/", requireAuth, validateBody(createProductSchema), ProductController.create);
router.put("/:id", requireAuth, validateBody(updateProductSchema), ProductController.update);
router.patch("/:id/featured", requireAuth, ProductController.toggleFeatured);
router.delete("/:id", requireAuth, ProductController.delete);

export default router;
