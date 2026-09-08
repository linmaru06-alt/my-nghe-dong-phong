import { Request, Response, NextFunction } from "express";
import { SettingsService } from "./settings.service";
import { sendSuccess } from "../../shared/utils/response.util";

export class SettingsController {
  static async getSettings(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SettingsService.getSettings();
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SettingsService.updateSettings(req.body);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }
}
