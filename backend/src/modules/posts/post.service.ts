import { prisma } from "../../config/database";
import { CreatePostInput, UpdatePostInput, PostFilterQuery } from "./post.schema";
import { slugify } from "../../shared/utils/slug.util";
import { deleteCache } from "../../shared/utils/cache.util";
import { CACHE_KEYS } from "../../shared/constants/cache.keys";

export class PostService {
  static async getPosts(query: PostFilterQuery, isAdmin = false) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (!isAdmin) {
      where.status = "PUBLISHED";
    } else if (query.status) {
      where.status = query.status;
    }

    if (query.category) {
      where.category = query.category;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { excerpt: { contains: query.search, mode: "insensitive" } },
        { content: { contains: query.search, mode: "insensitive" } },
      ];
    }

    const [total, posts] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          relatedProducts: {
            include: {
              product: {
                select: { id: true, code: true, name: true, slug: true },
              },
            },
          },
        },
      }),
    ]);

    const items = posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      thumbnail: p.thumbnail,
      category: p.category,
      status: p.status,
      publishedAt: p.publishedAt,
      views: p.views,
      author: p.authorName,
      readTime: p.readTime,
      createdAt: p.createdAt,
      relatedProductCount: p.relatedProducts.length,
    }));

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getBySlug(slug: string, incrementViews = false) {
    if (incrementViews) {
      await prisma.post.updateMany({
        where: { slug },
        data: { views: { increment: 1 } },
      });
    }

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        relatedProducts: {
          include: {
            product: {
              include: {
                category: true,
                woodType: true,
                images: true,
                sizes: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw {
        statusCode: 404,
        code: "POST_NOT_FOUND",
        message: `Không tìm thấy bài viết: ${slug}`,
      };
    }

    // Related posts in same category
    const relatedPosts = await prisma.post.findMany({
      where: {
        category: post.category,
        id: { not: post.id },
        status: "PUBLISHED",
      },
      take: 3,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        thumbnail: true,
        category: true,
        readTime: true,
        createdAt: true,
      },
    });

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      thumbnail: post.thumbnail,
      category: post.category,
      status: post.status,
      publishedAt: post.publishedAt,
      views: post.views,
      author: post.authorName,
      readTime: post.readTime,
      createdAt: post.createdAt,
      relatedProducts: post.relatedProducts.map((rp) => ({
        id: rp.product.id,
        code: rp.product.code,
        name: rp.product.name,
        slug: rp.product.slug,
        category: rp.product.category.slug,
        woodType: rp.product.woodType.name,
        images: rp.product.images.map((i) => i.url),
        sizes: rp.product.sizes.map((s) => ({
          label: s.size,
          price: s.price ? Number(s.price) : null,
        })),
      })),
      relatedPosts,
    };
  }

  static async getById(id: string) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        relatedProducts: {
          include: {
            product: { select: { id: true, name: true, code: true } },
          },
        },
      },
    });

    if (!post) {
      throw { statusCode: 404, code: "POST_NOT_FOUND", message: "Bài viết không tồn tại." };
    }

    return post;
  }

  static async create(input: CreatePostInput) {
    const slug = slugify(input.title);

    const created = await prisma.post.create({
      data: {
        title: input.title,
        slug,
        excerpt: input.excerpt,
        content: input.content,
        thumbnail: input.thumbnail,
        category: input.category,
        status: input.status,
        publishedAt: input.status === "PUBLISHED" ? new Date() : null,
        authorName: input.authorName,
        readTime: input.readTime,
        relatedProducts: input.relatedProductIds && input.relatedProductIds.length > 0
          ? {
              create: input.relatedProductIds.map((pid) => ({
                productId: pid,
              })),
            }
          : undefined,
      },
    });

    return created;
  }

  static async update(id: string, input: UpdatePostInput) {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      throw { statusCode: 404, code: "POST_NOT_FOUND", message: "Bài viết không tồn tại." };
    }

    const updateData: any = {};
    if (input.title) {
      updateData.title = input.title;
      updateData.slug = slugify(input.title);
    }
    if (input.excerpt !== undefined) updateData.excerpt = input.excerpt;
    if (input.content) updateData.content = input.content;
    if (input.thumbnail !== undefined) updateData.thumbnail = input.thumbnail;
    if (input.category) updateData.category = input.category;
    if (input.status) {
      updateData.status = input.status;
      if (input.status === "PUBLISHED" && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (input.authorName) updateData.authorName = input.authorName;
    if (input.readTime) updateData.readTime = input.readTime;

    if (input.relatedProductIds) {
      await prisma.postProduct.deleteMany({ where: { postId: id } });
      updateData.relatedProducts = {
        create: input.relatedProductIds.map((pid) => ({ productId: pid })),
      };
    }

    const updated = await prisma.post.update({
      where: { id },
      data: updateData,
    });

    await deleteCache(`${CACHE_KEYS.POST_PREFIX}${existing.slug}`);
    return updated;
  }

  static async delete(id: string) {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw { statusCode: 404, code: "POST_NOT_FOUND", message: "Bài viết không tồn tại." };
    }

    await prisma.post.delete({ where: { id } });
    await deleteCache(`${CACHE_KEYS.POST_PREFIX}${post.slug}`);
    return { message: "Đã xóa bài viết thành công." };
  }
}
