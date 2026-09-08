import cors from "cors";
import { env } from "../config/env";

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      env.FRONTEND_URL,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(new Error("CORS Policy: Nguồn gốc truy cập không được phép"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
});
