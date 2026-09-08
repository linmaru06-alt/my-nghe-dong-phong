import { prisma } from "../../config/database";

export class SearchService {
  static async search(query: string) {
    if (!query || query.trim().length === 0) {
      return {
        products: [],
        posts: [],
      };
    }

    const trimmed = query.trim();

    const [products, posts] = await Promise.all([
      prisma.product.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { name: { contains: trimmed, mode: "insensitive" } },
            { code: { contains: trimmed, mode: "insensitive" } },
            { description: { contains: trimmed, mode: "insensitive" } },
            { category: { name: { contains: trimmed, mode: "insensitive" } } },
            { woodType: { name: { contains: trimmed, mode: "insensitive" } } },
          ],
        },
        take: 8,
        include: {
          category: true,
          woodType: true,
          images: { take: 1 },
          sizes: { take: 1 },
        },
      }),
      prisma.post.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: trimmed, mode: "insensitive" } },
            { excerpt: { contains: trimmed, mode: "insensitive" } },
          ],
        },
        take: 5,
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
      }),
    ]);

    return {
      products: products.map((p) => ({
        id: p.id,
        code: p.code,
        name: p.name,
        slug: p.slug,
        category: p.category.slug,
        categoryName: p.category.name,
        woodType: p.woodType.name,
        image: p.images[0]?.url || "",
        price: p.sizes[0]?.price ? Number(p.sizes[0].price) : null,
      })),
      posts,
    };
  }
}
