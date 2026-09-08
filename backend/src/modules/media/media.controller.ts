import { Request, Response, NextFunction } from "express";
import { MediaService } from "./media.service";
import { sendSuccess, sendError } from "../../shared/utils/response.util";

export class MediaController {
  static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return sendError(res, "FILE_MISSING", "Vui lòng chọn file hình ảnh cần tải lên.", 400);
      }

      const result = await MediaService.uploadFile(req.file);
      return sendSuccess(res, result, undefined, 201);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const data = await MediaService.getAllMedia(page, limit);
      return sendSuccess(res, data.items, data.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MediaService.deleteMedia(req.params.id);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }
}
