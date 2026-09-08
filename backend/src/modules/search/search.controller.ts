import { Request, Response, NextFunction } from "express";
import { SearchService } from "./search.service";
import { sendSuccess } from "../../shared/utils/response.util";

export class SearchController {
  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const q = (req.query.q as string) || "";
      const result = await SearchService.search(q);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }
}
