import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { corsMiddleware } from "./middlewares/cors.middleware";
import { apiLimiter } from "./middlewares/rateLimit.middleware";
import { notFoundHandler } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import { swaggerSpec } from "./config/swagger";
import { prisma } from "./config/database";
import { isRedisAvailable } from "./config/redis";
import { sendSuccess } from "./shared/utils/response.util";

// Module routes
import authRoutes from "./modules/auth/auth.routes";
import categoryRoutes from "./modules/categories/category.routes";
import woodTypeRoutes from "./modules/wood-types/woodType.routes";
import productRoutes from "./modules/products/product.routes";
import postRoutes from "./modules/posts/post.routes";
import searchRoutes from "./modules/search/search.routes";
import settingsRoutes from "./modules/settings/settings.routes";
import mediaRoutes from "./modules/media/media.routes";

export const app = express();

// Security and utility middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(corsMiddleware);
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Rate Limiting
app.use("/api", apiLimiter);

// Health check endpoint
app.get("/api/health", async (_req, res) => {
  let dbStatus = "UP";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    dbStatus = "DOWN";
  }

  return sendSuccess(res, {
    status: "HEALTHY",
    uptime: process.uptime(),
    database: dbStatus,
    redis: isRedisAvailable ? "CONNECTED" : "FALLBACK_MEMORY",
    version: "1.0.0",
    service: "My Nghe Dong Phong API",
  });
});

// Swagger API Documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount API v1 Routes
const apiV1Router = express.Router();
apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/categories", categoryRoutes);
apiV1Router.use("/wood-types", woodTypeRoutes);
apiV1Router.use("/products", productRoutes);
apiV1Router.use("/posts", postRoutes);
apiV1Router.use("/search", searchRoutes);
apiV1Router.use("/settings", settingsRoutes);
apiV1Router.use("/media", mediaRoutes);

app.use("/api/v1", apiV1Router);

// 404 & Global Error Handler
app.use(notFoundHandler);
app.use(errorHandler);
