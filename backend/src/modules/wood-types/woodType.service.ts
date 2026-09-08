import { prisma } from "../../config/database";
import { getCache, setCache, deleteCache } from "../../shared/utils/cache.util";
import { CACHE_KEYS } from "../../shared/constants/cache.keys";
import { slugify } from "../../shared/utils/slug.util";

export class WoodTypeService {
  static async getAll() {
    const cached = await getCache(CACHE_KEYS.WOOD_TYPES_ALL);
    if (cached) return cached;

    const woodTypes = await prisma.woodType.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: { where: { status: "PUBLISHED" } } },
        },
      },
    });

    const result = woodTypes.map((w) => ({
      id: w.id,
      slug: w.slug,
      name: w.name,
      scientificName: w.scientificName,
      rarity: w.rarity,
      description: w.description,
      origin: w.origin,
      characteristics: w.characteristics,
      productCount: w._count.products,
    }));

    await setCache(CACHE_KEYS.WOOD_TYPES_ALL, result, 1800);
    return result;
  }

  static async getBySlug(slug: string) {
    const woodType = await prisma.woodType.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { products: { where: { status: "PUBLISHED" } } },
        },
      },
    });

    if (!woodType) {
      throw {
        statusCode: 404,
        code: "WOOD_TYPE_NOT_FOUND",
        message: `Không tìm thấy loại gỗ với đường dẫn: ${slug}`,
      };
    }

    return {
      ...woodType,
      productCount: woodType._count.products,
    };
  }

  static async create(data: {
    name: string;
    scientificName?: string;
    rarity?: string;
    description?: string;
    origin?: string;
    characteristics?: string;
  }) {
    const slug = slugify(data.name);
    const created = await prisma.woodType.create({
      data: {
        name: data.name,
        slug,
        scientificName: data.scientificName,
        rarity: data.rarity,
        description: data.description,
        origin: data.origin,
        characteristics: data.characteristics,
      },
    });

    await deleteCache(CACHE_KEYS.WOOD_TYPES_ALL);
    return created;
  }

  static async update(
    id: string,
    data: {
      name?: string;
      scientificName?: string;
      rarity?: string;
      description?: string;
      origin?: string;
      characteristics?: string;
    }
  ) {
    const existing = await prisma.woodType.findUnique({ where: { id } });
    if (!existing) {
      throw { statusCode: 404, code: "WOOD_TYPE_NOT_FOUND", message: "Loại gỗ không tồn tại." };
    }

    const updateData: any = { ...data };
    if (data.name) {
      updateData.slug = slugify(data.name);
    }

    const updated = await prisma.woodType.update({
      where: { id },
      data: updateData,
    });

    await deleteCache(CACHE_KEYS.WOOD_TYPES_ALL);
    return updated;
  }

  static async delete(id: string) {
    const existing = await prisma.woodType.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });

    if (!existing) {
      throw { statusCode: 404, code: "WOOD_TYPE_NOT_FOUND", message: "Loại gỗ không tồn tại." };
    }

    if (existing._count.products > 0) {
      throw {
        statusCode: 400,
        code: "WOOD_TYPE_IN_USE",
        message: `Không thể xóa loại gỗ này vì đang có ${existing._count.products} sản phẩm thuộc loại gỗ này.`,
      };
    }

    await prisma.woodType.delete({ where: { id } });
    await deleteCache(CACHE_KEYS.WOOD_TYPES_ALL);
    return { message: "Đã xóa loại gỗ thành công." };
  }
}
