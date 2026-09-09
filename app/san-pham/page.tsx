import ProductsClient from "./ProductsClient";
import { getPublishedProducts } from "@/lib/server/products";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Danh Mục Sản Phẩm Đồ Gỗ Quý | Mỹ Nghệ Đông Phong",
  description:
    "Khám phá các sản phẩm vòng tay Tử Đàn, Sưa đỏ, Nu bách xanh, bút ký phong thủy và đồ thủ công cao cấp Mỹ Nghệ Đông Phong.",
};

interface ProductsPageProps {
  searchParams?: {
    category?: string;
    woodType?: string;
    q?: string;
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getPublishedProducts();

  return (
    <main className="flex-1 w-full bg-bg">
      <ProductsClient
        initialCategory={searchParams?.category || ""}
        initialWoodType={searchParams?.woodType || ""}
        initialQuery={searchParams?.q || ""}
        initialPage={Number(searchParams?.page) || 1}
        initialProducts={products}
      />
    </main>
  );
}

