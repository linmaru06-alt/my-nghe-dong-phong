import { Router } from "express";
import { MediaController } from "./media.controller";
import { requireAuth } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

router.post("/upload", requireAuth, upload.single("image"), MediaController.upload);
router.get("/", requireAuth, MediaController.getAll);
router.delete("/:id", requireAuth, MediaController.delete);

export default router;
