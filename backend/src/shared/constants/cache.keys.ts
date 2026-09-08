export const CACHE_KEYS = {
  CATEGORIES_ALL: "dongphong:categories:all",
  WOOD_TYPES_ALL: "dongphong:wood_types:all",
  FEATURED_PRODUCTS: "dongphong:products:featured",
  SETTINGS: "dongphong:settings",
  PRODUCT_PREFIX: "dongphong:product:",
  POST_PREFIX: "dongphong:post:",
} as const;

export const CACHE_TTL = {
  SHORT: 300, // 5 mins
  MEDIUM: 1800, // 30 mins
  LONG: 86400, // 24 hours
} as const;
