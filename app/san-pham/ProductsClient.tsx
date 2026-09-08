"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductFilter from "@/components/product/ProductFilter";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/ui/Breadcrumb";
import productsData from "@/data/products.json";
import woodTypesData from "@/data/woodTypes.json";

const ITEMS_PER_PAGE = 12;

export interface ProductsClientProps {
  initialCategory?: string;
  initialWoodType?: string;
  initialQuery?: string;
  initialPage?: number;
}

export default function ProductsClient({
  initialCategory = "",
  initialWoodType = "",
  initialQuery = "",
  initialPage = 1,
}: ProductsClientProps) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedWoodType, setSelectedWoodType] = useState(initialWoodType);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSelectedWoodType(initialWoodType);
    setSearchQuery(initialQuery);
    setCurrentPage(initialPage);
  }, [initialCategory, initialWoodType, initialQuery, initialPage]);

  // Cập nhật URL khi đổi danh mục
  const updateUrl = (cat: string, wood: string, q: string, page: number) => {
    const params = new URLSearchParams();
    if (cat) params.set("category", cat);
    if (wood) params.set("woodType", wood);
    if (q) params.set("q", q);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.push(`/san-pham${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    updateUrl(cat, selectedWoodType, searchQuery, 1);
  };

  const handleSelectWoodType = (wood: string) => {
    setSelectedWoodType(wood);
    setCurrentPage(1);
    updateUrl(selectedCategory, wood, searchQuery, 1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    updateUrl(selectedCategory, selectedWoodType, query, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl(selectedCategory, selectedWoodType, searchQuery, page);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // Danh sách loại gỗ duy nhất
  const woodTypes = useMemo(() => {
    return woodTypesData.map((w) => w.name);
  }, []);

  // Lọc sản phẩm
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      if (product.status !== "published") return false;

      // Lọc danh mục
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Lọc loại gỗ
      if (
        selectedWoodType &&
        !product.woodType.toLowerCase().includes(selectedWoodType.toLowerCase())
      ) {
        return false;
      }

      // Tìm kiếm từ khóa
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCode = product.code.toLowerCase().includes(q);
        const matchesWood = product.woodType.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesWood && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedWoodType, searchQuery]);

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Sản phẩm đồ gỗ quý" }]} />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
          Bộ Sưu Tập Gỗ Quý Mỹ Nghệ
        </h1>
        <p className="text-sm md:text-base text-text-muted max-w-2xl">
          Tuyển tập các tác phẩm mộc nghệ thuật thủ công tinh xảo: vòng tay phong thủy, bút ký cao cấp, gối đệm danh mộc.
        </p>
      </div>

      {/* Filter Bar */}
      <ProductFilter
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        selectedWoodType={selectedWoodType}
        onSelectWoodType={handleSelectWoodType}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        woodTypes={woodTypes}
        totalResults={filteredProducts.length}
      />

      {/* Product Grid */}
      <ProductGrid products={paginatedProducts} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
