import { Request, Response, NextFunction } from "express";
import { WoodTypeService } from "./woodType.service";
import { sendSuccess } from "../../shared/utils/response.util";

export class WoodTypeController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await WoodTypeService.getAll();
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await WoodTypeService.getBySlug(req.params.slug);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await WoodTypeService.create(req.body);
      return sendSuccess(res, data, undefined, 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await WoodTypeService.update(req.params.id, req.body);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await WoodTypeService.delete(req.params.id);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }
}
