import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service";
import { sendSuccess } from "../../shared/utils/response.util";

export class CategoryController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.getAll();
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.getBySlug(req.params.slug);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.create(req.body);
      return sendSuccess(res, data, undefined, 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.update(req.params.id, req.body);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.delete(req.params.id);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }
}
