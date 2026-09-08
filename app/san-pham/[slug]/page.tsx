import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

function findProductBySlug(rawSlug: string) {
  if (!rawSlug) return undefined;
  const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
  return (
    productsData.find((p) => p.slug.toLowerCase() === decoded) ||
    productsData.find((p) => p.id.toLowerCase() === decoded)
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = findProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Không tìm thấy tác phẩm | Mỹ Nghệ Đông Phong",
    };
  }

  const firstImage = product.images?.[0] || "/images/placeholder.svg";

  return {
    title: `${product.name} (${product.code}) | Mỹ Nghệ Đông Phong`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} — Mỹ Nghệ Đông Phong`,
      description: product.description.slice(0, 160),
      images: [{ url: firstImage }],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = findProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-1 w-full">
      <ProductDetailClient product={product} />
    </main>
  );
}
