import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(5, "Tiêu đề bài viết phải có ít nhất 5 ký tự"),
  excerpt: z.string().optional(),
  content: z.string().min(20, "Nội dung bài viết phải có ít nhất 20 ký tự"),
  thumbnail: z.string().url("URL hình thu nhỏ không hợp lệ").optional(),
  category: z.string().default("kien-thuc"),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  authorName: z.string().default("Nghệ nhân Đông Phong"),
  readTime: z.number().default(5),
  relatedProductIds: z.array(z.string()).optional(),
});

export const updatePostSchema = createPostSchema.partial();

export const postFilterSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type PostFilterQuery = z.infer<typeof postFilterSchema>;
