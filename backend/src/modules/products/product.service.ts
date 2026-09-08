import { prisma } from "../../config/database";
import { CreateProductInput, UpdateProductInput, ProductFilterQuery } from "./product.schema";
import { slugify } from "../../shared/utils/slug.util";
import { getCache, setCache, deleteCache } from "../../shared/utils/cache.util";
import { CACHE_KEYS } from "../../shared/constants/cache.keys";

export class ProductService {
  static async getProducts(query: ProductFilterQuery, isAdmin = false) {
    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (!isAdmin) {
      where.status = "PUBLISHED";
    } else if (query.status) {
      where.status = query.status;
    }

    if (query.featured !== undefined) {
      where.isFeatured = query.featured;
    }

    if (query.category) {
      where.OR = [
        { categoryId: query.category },
        { category: { slug: query.category } },
      ];
    }

    if (query.woodType) {
      where.woodType = { slug: query.woodType };
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { code: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
      ];
    }

    let orderBy: any = { createdAt: "desc" };
    if (query.sort === "oldest") {
      orderBy = { createdAt: "asc" };
    } else if (query.sort === "views") {
      orderBy = { views: "desc" };
    }

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          category: { select: { id: true, slug: true, name: true } },
          woodType: { select: { id: true, slug: true, name: true, rarity: true } },
          sizes: { orderBy: { displayOrder: "asc" } },
          images: { orderBy: { displayOrder: "asc" } },
        },
      }),
    ]);

    // Format for client
    let items = products.map((p) => ({
      id: p.id,
      code: p.code,
      slug: p.slug,
      name: p.name,
      category: p.category.slug,
      categoryName: p.category.name,
      woodType: p.woodType.name,
      woodTypeSlug: p.woodType.slug,
      description: p.description,
      status: p.status,
      featured: p.isFeatured,
      views: p.views,
      createdAt: p.createdAt,
      images: p.images.map((img) => img.url),
      sizes: p.sizes.map((s) => ({
        id: s.id,
        label: s.size,
        price: s.price ? Number(s.price) : null,
        isAvailable: s.isAvailable,
      })),
    }));

    // Filter by price range in-memory if requested
    if (query.priceRange) {
      items = items.filter((item) => {
        const lowestPrice = item.sizes.reduce((min, s) => {
          if (s.price === null) return min;
          return min === null ? s.price : Math.min(min, s.price);
        }, null as number | null);

        if (lowestPrice === null) return query.priceRange === "custom";

        if (query.priceRange === "under-1m") return lowestPrice < 1000000;
        if (query.priceRange === "1m-3m") return lowestPrice >= 1000000 && lowestPrice <= 3000000;
        if (query.priceRange === "3m-5m") return lowestPrice >= 3000000 && lowestPrice <= 5000000;
        if (query.priceRange === "over-5m") return lowestPrice > 5000000;
        return true;
      });
    }

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

  static async getFeatured() {
    const cached = await getCache(CACHE_KEYS.FEATURED_PRODUCTS);
    if (cached) return cached;

    const products = await prisma.product.findMany({
      where: { status: "PUBLISHED", isFeatured: true },
      take: 8,
      orderBy: { displayOrder: "asc" },
      include: {
        category: { select: { id: true, slug: true, name: true } },
        woodType: { select: { id: true, slug: true, name: true } },
        sizes: { orderBy: { displayOrder: "asc" } },
        images: { orderBy: { displayOrder: "asc" } },
      },
    });

    const items = products.map((p) => ({
      id: p.id,
      code: p.code,
      slug: p.slug,
      name: p.name,
      category: p.category.slug,
      categoryName: p.category.name,
      woodType: p.woodType.name,
      description: p.description,
      featured: p.isFeatured,
      images: p.images.map((img) => img.url),
      sizes: p.sizes.map((s) => ({
        id: s.id,
        label: s.size,
        price: s.price ? Number(s.price) : null,
      })),
    }));

    await setCache(CACHE_KEYS.FEATURED_PRODUCTS, items, 1800);
    return items;
  }

  static async getBySlug(slug: string, incrementViews = false) {
    if (incrementViews) {
      await prisma.product.updateMany({
        where: { slug },
        data: { views: { increment: 1 } },
      });
    }

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        woodType: true,
        sizes: { orderBy: { displayOrder: "asc" } },
        images: { orderBy: { displayOrder: "asc" } },
      },
    });

    if (!product) {
      throw {
        statusCode: 404,
        code: "PRODUCT_NOT_FOUND",
        message: `Không tìm thấy sản phẩm: ${slug}`,
      };
    }

    // Related products
    const related = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        status: "PUBLISHED",
      },
      take: 4,
      include: {
        category: true,
        woodType: true,
        sizes: { orderBy: { displayOrder: "asc" } },
        images: { orderBy: { displayOrder: "asc" } },
      },
    });

    return {
      id: product.id,
      code: product.code,
      slug: product.slug,
      name: product.name,
      categoryId: product.categoryId,
      categorySlug: product.category.slug,
      categoryName: product.category.name,
      woodTypeId: product.woodTypeId,
      woodType: product.woodType.name,
      scientificName: product.woodType.scientificName,
      description: product.description,
      status: product.status,
      featured: product.isFeatured,
      views: product.views,
      createdAt: product.createdAt,
      images: product.images.map((img) => img.url),
      sizes: product.sizes.map((s) => ({
        id: s.id,
        label: s.size,
        price: s.price ? Number(s.price) : null,
        isAvailable: s.isAvailable,
      })),
      related: related.map((r) => ({
        id: r.id,
        code: r.code,
        slug: r.slug,
        name: r.name,
        category: r.category.slug,
        woodType: r.woodType.name,
        images: r.images.map((img) => img.url),
        sizes: r.sizes.map((s) => ({
          label: s.size,
          price: s.price ? Number(s.price) : null,
        })),
      })),
    };
  }

  static async getById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        woodType: true,
        sizes: { orderBy: { displayOrder: "asc" } },
        images: { orderBy: { displayOrder: "asc" } },
      },
    });

    if (!product) {
      throw {
        statusCode: 404,
        code: "PRODUCT_NOT_FOUND",
        message: "Sản phẩm không tồn tại.",
      };
    }

    return product;
  }

  static async create(input: CreateProductInput) {
    const slug = slugify(input.name);

    // Resolve category and woodType
    let category = await prisma.category.findFirst({
      where: { OR: [{ id: input.categoryId }, { slug: input.categoryId }] },
    });
    if (!category) {
      throw { statusCode: 400, code: "CATEGORY_NOT_FOUND", message: "Danh mục không tồn tại." };
    }

    let woodType = await prisma.woodType.findFirst({
      where: { OR: [{ id: input.woodTypeId }, { slug: input.woodTypeId }] },
    });
    if (!woodType) {
      throw { statusCode: 400, code: "WOOD_TYPE_NOT_FOUND", message: "Loại gỗ không tồn tại." };
    }

    const created = await prisma.product.create({
      data: {
        code: input.code,
        name: input.name,
        slug,
        categoryId: category.id,
        woodTypeId: woodType.id,
        description: input.description,
        status: input.status,
        isFeatured: input.isFeatured,
        displayOrder: input.displayOrder,
        sizes: {
          create: input.sizes.map((s, idx) => ({
            size: s.size,
            price: s.price,
            isAvailable: s.isAvailable,
            displayOrder: s.displayOrder ?? idx,
          })),
        },
        images: {
          create: input.images.map((img, idx) => ({
            url: img.url,
            publicId: img.publicId,
            altText: img.altText,
            isPrimary: img.isPrimary ?? idx === 0,
            displayOrder: img.displayOrder ?? idx,
          })),
        },
      },
      include: {
        sizes: true,
        images: true,
      },
    });

    await deleteCache(CACHE_KEYS.FEATURED_PRODUCTS);
    await deleteCache(CACHE_KEYS.CATEGORIES_ALL);
    await deleteCache(CACHE_KEYS.WOOD_TYPES_ALL);
    return created;
  }

  static async update(id: string, input: UpdateProductInput) {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw { statusCode: 404, code: "PRODUCT_NOT_FOUND", message: "Sản phẩm không tồn tại." };
    }

    const updateData: any = {};
    if (input.code) updateData.code = input.code;
    if (input.name) {
      updateData.name = input.name;
      updateData.slug = slugify(input.name);
    }
    if (input.description !== undefined) updateData.description = input.description;
    if (input.status) updateData.status = input.status;
    if (input.isFeatured !== undefined) updateData.isFeatured = input.isFeatured;
    if (input.displayOrder !== undefined) updateData.displayOrder = input.displayOrder;

    if (input.categoryId) {
      const cat = await prisma.category.findFirst({
        where: { OR: [{ id: input.categoryId }, { slug: input.categoryId }] },
      });
      if (cat) updateData.categoryId = cat.id;
    }

    if (input.woodTypeId) {
      const wt = await prisma.woodType.findFirst({
        where: { OR: [{ id: input.woodTypeId }, { slug: input.woodTypeId }] },
      });
      if (wt) updateData.woodTypeId = wt.id;
    }

    if (input.sizes) {
      // Re-create sizes
      await prisma.productSize.deleteMany({ where: { productId: id } });
      updateData.sizes = {
        create: input.sizes.map((s, idx) => ({
          size: s.size,
          price: s.price,
          isAvailable: s.isAvailable,
          displayOrder: s.displayOrder ?? idx,
        })),
      };
    }

    if (input.images) {
      // Re-create images
      await prisma.productImage.deleteMany({ where: { productId: id } });
      updateData.images = {
        create: input.images.map((img, idx) => ({
          url: img.url,
          publicId: img.publicId,
          altText: img.altText,
          isPrimary: img.isPrimary ?? idx === 0,
          displayOrder: img.displayOrder ?? idx,
        })),
      };
    }

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        sizes: true,
        images: true,
      },
    });

    await deleteCache(CACHE_KEYS.FEATURED_PRODUCTS);
    await deleteCache(`${CACHE_KEYS.PRODUCT_PREFIX}${existing.slug}`);
    return updated;
  }

  static async toggleFeatured(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw { statusCode: 404, code: "PRODUCT_NOT_FOUND", message: "Sản phẩm không tồn tại." };
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { isFeatured: !product.isFeatured },
    });

    await deleteCache(CACHE_KEYS.FEATURED_PRODUCTS);
    return updated;
  }

  static async delete(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw { statusCode: 404, code: "PRODUCT_NOT_FOUND", message: "Sản phẩm không tồn tại." };
    }

    await prisma.product.delete({ where: { id } });
    await deleteCache(CACHE_KEYS.FEATURED_PRODUCTS);
    await deleteCache(`${CACHE_KEYS.PRODUCT_PREFIX}${product.slug}`);
    return { message: "Đã xóa sản phẩm thành công." };
  }
}
