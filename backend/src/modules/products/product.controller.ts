import { Request, Response, NextFunction } from "express";
import { ProductService } from "./product.service";
import { sendSuccess } from "../../shared/utils/response.util";

export class ProductController {
  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.getProducts(req.query as any, false);
      return sendSuccess(res, data.items, data.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getAdminProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.getProducts(req.query as any, true);
      return sendSuccess(res, data.items, data.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getFeatured(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.getFeatured();
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.getBySlug(req.params.slug, true);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.getById(req.params.id);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.create(req.body);
      return sendSuccess(res, data, undefined, 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.update(req.params.id, req.body);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async toggleFeatured(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.toggleFeatured(req.params.id);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.delete(req.params.id);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }
}
