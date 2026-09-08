import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ERROR_CODES } from "../shared/constants/error.codes";
import { sendError } from "../shared/utils/response.util";
import { logger } from "../shared/utils/logger.util";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response {
  logger.error("API Error occurred", {
    path: req.path,
    method: req.method,
    error: err.message || err,
    stack: err.stack,
  });

  // Handle Zod Validation Error
  if (err instanceof ZodError) {
    const formattedIssues = err.issues.map((i) => ({
      field: i.path.join("."),
      message: i.message,
    }));
    return sendError(
      res,
      ERROR_CODES.VALIDATION_ERROR,
      "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại các trường thông tin.",
      422,
      formattedIssues
    );
  }

  // Handle Custom App Error
  if (err.statusCode && err.code) {
    return sendError(res, err.code, err.message, err.statusCode, err.details);
  }

  // Handle Prisma Known Errors
  if (err.code === "P2002") {
    return sendError(
      res,
      ERROR_CODES.CONFLICT,
      "Dữ liệu đã tồn tại trên hệ thống (trùng trường duy nhất).",
      409
    );
  }

  if (err.code === "P2025") {
    return sendError(
      res,
      ERROR_CODES.NOT_FOUND,
      "Bản ghi yêu cầu không tồn tại hoặc đã bị xóa.",
      404
    );
  }

  // Default Internal Error
  return sendError(
    res,
    ERROR_CODES.INTERNAL_ERROR,
    process.env.NODE_ENV === "production"
      ? "Đã có lỗi xảy ra trên máy chủ. Vui lòng thử lại sau."
      : err.message || "Internal Server Error",
    500
  );
}
