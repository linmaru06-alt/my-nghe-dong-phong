import Redis from "ioredis";
import { env } from "./env";

let redisClient: Redis | null = null;
let isRedisAvailable = false;

try {
  redisClient = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 1,
    retryStrategy(times) {
      if (times > 3) {
        return null; // Stop retrying
      }
      return Math.min(times * 200, 1000);
    },
    lazyConnect: true,
  });

  redisClient.connect().then(() => {
    isRedisAvailable = true;
    console.log("✅ Redis connected successfully");
  }).catch((err) => {
    isRedisAvailable = false;
    console.warn("⚠️ Redis unavailable, running in memory-only fallback mode:", err.message);
  });

  redisClient.on("error", (err) => {
    isRedisAvailable = false;
  });
} catch (err) {
  console.warn("⚠️ Redis initialization skipped:", (err as Error).message);
}

export { redisClient, isRedisAvailable };
