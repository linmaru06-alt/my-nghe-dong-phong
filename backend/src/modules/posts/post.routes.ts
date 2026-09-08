import { Router } from "express";
import { PostController } from "./post.controller";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { createPostSchema, updatePostSchema, postFilterSchema } from "./post.schema";

const router = Router();

// Public routes
router.get("/", validateQuery(postFilterSchema), PostController.getPosts);
router.get("/:slug", PostController.getBySlug);

// Admin routes
router.get("/admin/list", requireAuth, validateQuery(postFilterSchema), PostController.getAdminPosts);
router.get("/admin/:id", requireAuth, PostController.getById);
router.post("/", requireAuth, validateBody(createPostSchema), PostController.create);
router.put("/:id", requireAuth, validateBody(updatePostSchema), PostController.update);
router.delete("/:id", requireAuth, PostController.delete);

export default router;
