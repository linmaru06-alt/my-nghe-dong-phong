import multer from "multer";
import { LIMITS } from "../shared/constants/limits";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: LIMITS.MAX_IMAGE_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    if (LIMITS.ALLOWED_IMAGE_TYPES.includes(file.mimetype as any)) {
      cb(null, true);
    } else {
      cb(new Error("Định dạng file không được hỗ trợ. Vui lòng tải lên ảnh JPG, PNG hoặc WebP."));
    }
  },
});
