import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustStrip from "@/components/home/TrustStrip";
import BlogPreview from "@/components/home/BlogPreview";
import ContactBanner from "@/components/home/ContactBanner";

export const metadata = {
  title: "Mỹ Nghệ Đông Phong — Tuyệt Tác Đồ Gỗ Quý Mỹ Nghệ & Phong Thủy",
  description:
    "Xưởng chế tác thủ công mộc cao cấp: Vòng tay Tử Đàn, Sưa Đỏ, Nu Bách Xanh, Bút ký phong thủy & gối đệm gỗ quý. Tư vấn Zalo và hotline trực tiếp.",
};

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col w-full">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <TrustStrip />
      <BlogPreview />
      <ContactBanner />
    </main>
  );
}
