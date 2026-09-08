import { redisClient, isRedisAvailable } from "../../config/redis";
import { logger } from "./logger.util";

// In-memory fallback cache
const memoryCache = new Map<string, { value: string; expiresAt: number }>();

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    if (isRedisAvailable && redisClient) {
      const data = await redisClient.get(key);
      if (data) {
        return JSON.parse(data) as T;
      }
      return null;
    }

    // Memory fallback
    const item = memoryCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      memoryCache.delete(key);
      return null;
    }
    return JSON.parse(item.value) as T;
  } catch (error) {
    logger.warn(`Failed to read cache for key: ${key}`, { error });
    return null;
  }
}

export async function setCache(
  key: string,
  value: unknown,
  ttlSeconds = 300
): Promise<void> {
  try {
    const serialized = JSON.stringify(value);
    if (isRedisAvailable && redisClient) {
      await redisClient.set(key, serialized, "EX", ttlSeconds);
      return;
    }

    // Memory fallback
    memoryCache.set(key, {
      value: serialized,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  } catch (error) {
    logger.warn(`Failed to set cache for key: ${key}`, { error });
  }
}

export async function deleteCache(keyOrPattern: string): Promise<void> {
  try {
    if (isRedisAvailable && redisClient) {
      if (keyOrPattern.includes("*")) {
        const keys = await redisClient.keys(keyOrPattern);
        if (keys.length > 0) {
          await redisClient.del(...keys);
        }
      } else {
        await redisClient.del(keyOrPattern);
      }
      return;
    }

    // Memory fallback
    if (keyOrPattern.includes("*")) {
      const prefix = keyOrPattern.replace("*", "");
      for (const k of Array.from(memoryCache.keys())) {
        if (k.startsWith(prefix)) {
          memoryCache.delete(k);
        }
      }
    } else {
      memoryCache.delete(keyOrPattern);
    }
  } catch (error) {
    logger.warn(`Failed to delete cache for key: ${keyOrPattern}`, { error });
  }
}
