import { prisma } from "../../config/database";
import { getCache, setCache, deleteCache } from "../../shared/utils/cache.util";
import { CACHE_KEYS } from "../../shared/constants/cache.keys";
import { slugify } from "../../shared/utils/slug.util";

export class CategoryService {
  static async getAll() {
    const cached = await getCache(CACHE_KEYS.CATEGORIES_ALL);
    if (cached) return cached;

    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
      include: {
        _count: {
          select: { products: { where: { status: "PUBLISHED" } } },
        },
      },
    });

    const result = categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      description: c.description,
      image: c.image,
      displayOrder: c.displayOrder,
      productCount: c._count.products,
    }));

    await setCache(CACHE_KEYS.CATEGORIES_ALL, result, 1800);
    return result;
  }

  static async getBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { products: { where: { status: "PUBLISHED" } } },
        },
      },
    });

    if (!category) {
      throw {
        statusCode: 404,
        code: "CATEGORY_NOT_FOUND",
        message: `Không tìm thấy danh mục với đường dẫn: ${slug}`,
      };
    }

    return {
      ...category,
      productCount: category._count.products,
    };
  }

  static async create(data: { name: string; description?: string; image?: string; displayOrder?: number }) {
    const slug = slugify(data.name);
    const created = await prisma.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        image: data.image,
        displayOrder: data.displayOrder ?? 0,
      },
    });

    await deleteCache(CACHE_KEYS.CATEGORIES_ALL);
    return created;
  }

  static async update(id: string, data: { name?: string; description?: string; image?: string; displayOrder?: number; isActive?: boolean }) {
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw { statusCode: 404, code: "CATEGORY_NOT_FOUND", message: "Danh mục không tồn tại." };
    }

    const updateData: any = { ...data };
    if (data.name) {
      updateData.slug = slugify(data.name);
    }

    const updated = await prisma.category.update({
      where: { id },
      data: updateData,
    });

    await deleteCache(CACHE_KEYS.CATEGORIES_ALL);
    return updated;
  }

  static async delete(id: string) {
    const existing = await prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });

    if (!existing) {
      throw { statusCode: 404, code: "CATEGORY_NOT_FOUND", message: "Danh mục không tồn tại." };
    }

    if (existing._count.products > 0) {
      throw {
        statusCode: 400,
        code: "CATEGORY_IN_USE",
        message: `Không thể xóa danh mục này vì đang có ${existing._count.products} sản phẩm thuộc danh mục.`,
      };
    }

    await prisma.category.delete({ where: { id } });
    await deleteCache(CACHE_KEYS.CATEGORIES_ALL);
    return { message: "Đã xóa danh mục thành công." };
  }
}
