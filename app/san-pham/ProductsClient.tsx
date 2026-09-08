"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductFilter from "@/components/product/ProductFilter";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/ui/Breadcrumb";
import productsData from "@/data/products.json";
import woodTypesData from "@/data/woodTypes.json";

const ITEMS_PER_PAGE = 12;

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "";
  const initialWoodType = searchParams.get("woodType") || "";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedWoodType, setSelectedWoodType] = useState(initialWoodType);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync URL when category changes
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set("category", cat);
    else params.delete("category");
    router.push(`/san-pham?${params.toString()}`, { scroll: false });
  };

  const handleSelectWoodType = (wood: string) => {
    setSelectedWoodType(wood);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (wood) params.set("woodType", wood);
    else params.delete("woodType");
    router.push(`/san-pham?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Sync from URL if params change externally
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
    setSelectedWoodType(searchParams.get("woodType") || "");
    if (searchParams.get("q")) setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Unique wood types list
  const woodTypes = useMemo(() => {
    return woodTypesData.map((w) => w.name);
  }, []);

  // Filtered products logic
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      if (product.status !== "published") return false;

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Wood type filter
      if (
        selectedWoodType &&
        !product.woodType.toLowerCase().includes(selectedWoodType.toLowerCase())
      ) {
        return false;
      }

      // Search query
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

  // Pagination calculation
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
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
