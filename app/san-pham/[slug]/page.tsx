import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import productsData from "@/data/products.json";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = productsData.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Không tìm thấy tác phẩm | Mỹ Nghệ Đông Phong",
    };
  }

  return {
    title: `${product.name} (${product.code}) | Mỹ Nghệ Đông Phong`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} — Mỹ Nghệ Đông Phong`,
      description: product.description.slice(0, 160),
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <main className="flex-1 w-full">
      <ProductDetailClient slug={params.slug} />
    </main>
  );
}
