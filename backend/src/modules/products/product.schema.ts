import { z } from "zod";

export const productSizeSchema = z.object({
  id: z.string().optional(),
  size: z.string().min(1, "Kích thước không được để trống"),
  price: z.number().nullable().optional(),
  isAvailable: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export const productImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("URL hình ảnh không hợp lệ"),
  publicId: z.string().optional(),
  altText: z.string().optional(),
  isPrimary: z.boolean().default(false),
  displayOrder: z.number().default(0),
});

export const createProductSchema = z.object({
  code: z.string().min(2, "Mã sản phẩm không được để trống"),
  name: z.string().min(3, "Tên sản phẩm phải có ít nhất 3 ký tự"),
  categoryId: z.string().min(1, "Danh mục không được để trống"),
  woodTypeId: z.string().min(1, "Loại gỗ không được để trống"),
  description: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  isFeatured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  sizes: z.array(productSizeSchema).min(1, "Cần có ít nhất 1 kích thước/phiên bản"),
  images: z.array(productImageSchema).min(1, "Cần có ít nhất 1 hình ảnh sản phẩm"),
});

export const updateProductSchema = createProductSchema.partial();

export const productFilterSchema = z.object({
  category: z.string().optional(),
  woodType: z.string().optional(),
  priceRange: z.string().optional(),
  search: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  featured: z.coerce.boolean().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
  sort: z.string().default("newest"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductFilterQuery = z.infer<typeof productFilterSchema>;
