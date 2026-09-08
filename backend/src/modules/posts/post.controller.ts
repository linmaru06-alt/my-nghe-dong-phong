import { Request, Response, NextFunction } from "express";
import { PostService } from "./post.service";
import { sendSuccess } from "../../shared/utils/response.util";

export class PostController {
  static async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostService.getPosts(req.query as any, false);
      return sendSuccess(res, data.items, data.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getAdminPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostService.getPosts(req.query as any, true);
      return sendSuccess(res, data.items, data.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostService.getBySlug(req.params.slug, true);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostService.getById(req.params.id);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostService.create(req.body);
      return sendSuccess(res, data, undefined, 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostService.update(req.params.id, req.body);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostService.delete(req.params.id);
      return sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  }
}
