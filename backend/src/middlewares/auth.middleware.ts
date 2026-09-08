import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { prisma } from "../config/database";
import { ERROR_CODES } from "../shared/constants/error.codes";
import { sendError } from "../shared/utils/response.util";
import { AuthenticatedRequest, AuthenticatedAdmin } from "../shared/types/express.types";

interface TokenPayload {
  adminId: string;
  email: string;
  role: "SUPER_ADMIN" | "CONTENT_ADMIN";
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const authHeader = req.headers.authorization;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  if (!token) {
    return sendError(
      res,
      ERROR_CODES.UNAUTHORIZED,
      "Yêu cầu xác thực đăng nhập để thực hiện thao tác này.",
      401
    );
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!admin) {
      return sendError(
        res,
        ERROR_CODES.UNAUTHORIZED,
        "Tài khoản quản trị viên không tồn tại hoặc đã bị vô hiệu hóa.",
        401
      );
    }

    req.admin = admin as AuthenticatedAdmin;
    next();
  } catch (error) {
    return sendError(
      res,
      ERROR_CODES.INVALID_TOKEN,
      "Phiên làm việc đã hết hạn hoặc mã token không hợp lệ.",
      401
    );
  }
}

export function requireRole(role: "SUPER_ADMIN" | "CONTENT_ADMIN") {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
    if (!req.admin) {
      return sendError(
        res,
        ERROR_CODES.UNAUTHORIZED,
        "Yêu cầu đăng nhập quản trị viên.",
        401
      );
    }

    if (role === "SUPER_ADMIN" && req.admin.role !== "SUPER_ADMIN") {
      return sendError(
        res,
        ERROR_CODES.FORBIDDEN,
        "Bạn không có quyền truy cập chức năng này (yêu cầu quyền SUPER_ADMIN).",
        403
      );
    }

    next();
  };
}
