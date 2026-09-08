import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./shared/utils/logger.util";
import { prisma } from "./config/database";

const server = app.listen(env.PORT, () => {
  logger.info(`🚀 Máy chủ Mỹ Nghệ Đông Phong đang chạy tại http://localhost:${env.PORT}`);
  logger.info(`📚 Tài liệu Swagger API tại http://localhost:${env.PORT}/api/docs`);
  logger.info(`❤️ Health check tại http://localhost:${env.PORT}/api/health`);
});

// Graceful shutdown
async function gracefulShutdown(signal: string) {
  logger.info(`Nhận tín hiệu ${signal}. Đang đóng kết nối an toàn...`);
  server.close(async () => {
    await prisma.$disconnect();
    logger.info("Đã đóng kết nối cơ sở dữ liệu. Máy chủ dừng an toàn.");
    process.exit(0);
  });
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
