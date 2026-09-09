import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustStrip from "@/components/home/TrustStrip";
import BlogPreview from "@/components/home/BlogPreview";
import ContactBanner from "@/components/home/ContactBanner";
import { getPublishedProducts } from "@/lib/server/products";
import { getLatestPosts } from "@/lib/server/posts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mỹ Nghệ Đông Phong — Tuyệt Tác Đồ Gỗ Quý Mỹ Nghệ & Phong Thủy",
  description:
    "Xưởng chế tác thủ công mộc cao cấp: Vòng tay Tử Đàn, Sưa Đỏ, Nu Bách Xanh, Bút ký phong thủy & gối đệm gỗ quý. Tư vấn Zalo và hotline trực tiếp.",
};

export default async function HomePage() {
  const [products, latestPosts] = await Promise.all([
    getPublishedProducts(),
    getLatestPosts(2),
  ]);

  return (
    <main className="flex-1 flex flex-col w-full">
      <HeroSection />
      <CategoryGrid products={products} />
      <FeaturedProducts products={products} totalCount={products.length} />

      <TrustStrip />
      <BlogPreview posts={latestPosts} />
      <ContactBanner />
    </main>
  );
}

