import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().default("postgresql://dongphong:dongphong2025@localhost:5432/dongphong_db?schema=public"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  JWT_SECRET: z.string().default("dongphong_jwt_secret_key_2025_extremely_secure_key"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  JWT_REFRESH_SECRET: z.string().default("dongphong_refresh_secret_key_2025_extremely_secure_key"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),
  CLOUDINARY_CLOUD_NAME: z.string().default("dongphong"),
  CLOUDINARY_API_KEY: z.string().default("mock_api_key"),
  CLOUDINARY_API_SECRET: z.string().default("mock_api_secret"),
  FRONTEND_URL: z.string().default("http://localhost:3000"),
  ADMIN_EMAIL: z.string().default("admin@dongphong.vn"),
  ADMIN_INITIAL_PASSWORD: z.string().default("DongPhong@2025"),
});

export const env = envSchema.parse(process.env);
