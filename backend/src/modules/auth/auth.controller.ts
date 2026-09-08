import { Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { sendSuccess } from "../../shared/utils/response.util";
import { AuthenticatedRequest } from "../../shared/types/express.types";

export class AuthController {
  static async login(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userAgent = req.headers["user-agent"];
      const ipAddress = req.ip;
      const result = await AuthService.login(req.body, userAgent, ipAddress);

      // Set cookie for browser session if desired
      res.cookie("admin_token", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return sendSuccess(res, result, undefined, 200);
    } catch (error) {
      next(error);
    }
  }

  static async me(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const admin = await AuthService.getProfile(req.admin!.id);
      return sendSuccess(res, admin, undefined, 200);
    } catch (error) {
      next(error);
    }
  }

  static async logout(_req: AuthenticatedRequest, res: Response) {
    res.clearCookie("admin_token");
    return sendSuccess(res, { message: "Đăng xuất thành công." }, undefined, 200);
  }

  static async changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.changePassword(req.admin!.id, req.body);
      return sendSuccess(res, result, undefined, 200);
    } catch (error) {
      next(error);
    }
  }
}
