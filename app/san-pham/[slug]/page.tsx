import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getAllProducts, getProductBySlug } from "@/lib/server/products";

export const dynamicParams = true;
export const revalidate = 0;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Không tìm thấy tác phẩm | Mỹ Nghệ Đông Phong",
    };
  }

  const firstImage = product.images?.[0] || "/images/placeholder.svg";

  return {
    title: `${product.name} (${product.code}) | Mỹ Nghệ Đông Phong`,
    description: product.description?.slice(0, 160) || "",
    openGraph: {
      title: `${product.name} — Mỹ Nghệ Đông Phong`,
      description: product.description?.slice(0, 160) || "",
      images: [{ url: firstImage }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-1 w-full">
      <ProductDetailClient product={product} />
    </main>
  );
}
