import React, { useState } from "react";
import { categories } from "../data/categories";
import { woodTypes } from "../data/wood-types";
import { ProductCard } from "../components/ProductCard";

export function Catalog({ products, selectedCategory, onSelectCategory, onSelectProduct, searchQuery, onSearchChange }) {
  const [selectedWoodType, setSelectedWoodType] = useState("all");

  // Bộ lọc sản phẩm
  const filteredProducts = products.filter(p => {
    if (p.status !== "published") return false;

    // Lọc theo Danh mục
    if (selectedCategory && selectedCategory !== "all" && p.categoryId !== selectedCategory) {
      return false;
    }

    // Lọc theo Loại gỗ
    if (selectedWoodType && selectedWoodType !== "all" && p.woodTypeId !== selectedWoodType) {
      return false;
    }

    // Lọc theo Từ khóa tìm kiếm
    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.woodType.toLowerCase().includes(q) ||
        (p.shortDesc && p.shortDesc.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const handleResetFilters = () => {
    onSelectCategory("all");
    setSelectedWoodType("all");
    onSearchChange("");
  };

  return (
    <div className="page-catalog" style={{ padding: "40px 0 80px 0" }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <span className="section-subtitle">Bộ Sưu Tập Gỗ Quý</span>
          <h1 className="section-title">Danh Mục Tác Phẩm Nghệ Thuật</h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Khám phá 20 tác phẩm thủ công tuyển chọn từ 7 dòng vật phẩm gỗ quý thiên nhiên.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="catalog-filter-bar">
          {/* Category Filter Pills */}
          <div className="filter-pills">
            <button
              className={`filter-pill ${(!selectedCategory || selectedCategory === "all") ? "active" : ""}`}
              onClick={() => onSelectCategory("all")}
            >
              Tất cả ({products.filter(p => p.status === "published").length})
            </button>

            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-pill ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                {cat.name} ({cat.itemCount})
              </button>
            ))}
          </div>

          {/* Secondary Filter: Wood Type */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <label htmlFor="woodSelect" style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--wood-deep)" }}>
              Loại gỗ:
            </label>
            <select
              id="woodSelect"
              className="filter-select"
              value={selectedWoodType}
              onChange={(e) => setSelectedWoodType(e.target.value)}
            >
              <option value="all">Tất cả các loại gỗ</option>
              {woodTypes.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter / Active search notification */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          fontSize: "0.9rem",
          color: "var(--text-muted)"
        }}>
          <span>
            Tìm thấy <strong>{filteredProducts.length}</strong> tác phẩm
            {searchQuery && ` theo từ khóa "${searchQuery}"`}
          </span>

          {(selectedCategory !== "all" || selectedWoodType !== "all" || searchQuery) && (
            <button
              onClick={handleResetFilters}
              style={{
                fontSize: "0.85rem",
                color: "var(--gold-dark)",
                fontWeight: 600,
                textDecoration: "underline"
              }}
            >
              ✕ Đặt lại tất cả bộ lọc
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px"
          }}>
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "var(--bg-surface)",
            borderRadius: "var(--radius-md)",
            border: "1px dashed var(--border-subtle)"
          }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "16px" }}>🪵</span>
            <h3 style={{ marginBottom: "8px" }}>Không tìm thấy tác phẩm phù hợp</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
              Hãy thử chọn danh mục khác, thay đổi loại gỗ hoặc từ khóa tìm kiếm.
            </p>
            <button
              style={{
                backgroundColor: "var(--wood-primary)",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600
              }}
              onClick={handleResetFilters}
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
