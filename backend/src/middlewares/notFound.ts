import { Request, Response } from "express";
import { ERROR_CODES } from "../shared/constants/error.codes";
import { sendError } from "../shared/utils/response.util";

export function notFoundHandler(req: Request, res: Response): Response {
  return sendError(
    res,
    ERROR_CODES.NOT_FOUND,
    `Đường dẫn ${req.method} ${req.originalUrl} không tồn tại trên hệ thống.`,
    404
  );
}
