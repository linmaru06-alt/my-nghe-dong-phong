import rateLimit from "express-rate-limit";
import { sendError } from "../shared/utils/response.util";
import { ERROR_CODES } from "../shared/constants/error.codes";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 300, // Limit each IP to 300 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    return sendError(
      res,
      ERROR_CODES.RATE_LIMIT_EXCEEDED,
      "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.",
      429
    );
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 15, // Limit each IP to 15 login attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    return sendError(
      res,
      ERROR_CODES.RATE_LIMIT_EXCEEDED,
      "Đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút.",
      429
    );
  },
});
