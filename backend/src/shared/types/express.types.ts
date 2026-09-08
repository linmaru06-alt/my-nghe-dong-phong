import { Request } from "express";

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "CONTENT_ADMIN";
}

export interface AuthenticatedRequest extends Request {
  admin?: AuthenticatedAdmin;
}
