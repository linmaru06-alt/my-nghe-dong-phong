import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/site-config";
import { formatPrice, createZaloConsultUrl, createTelUrl } from "../utils/formatters";
import { ProductCard } from "../components/ProductCard";

export function ProductDetail({ product, allProducts, onSelectProduct, onBackToCatalog }) {
  // Trạng thái kích thước được chọn
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset về size đầu tiên khi đổi sản phẩm
  useEffect(() => {
    setSelectedSizeIndex(0);
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product.id]);

  if (!product) return null;

  // Tính toán giá hiển thị dựa trên kích thước đang chọn
  const hasSizes = product.sizes && product.sizes.length > 0;
  const currentSize = hasSizes ? product.sizes[selectedSizeIndex] : null;

  const currentPrice = currentSize && currentSize.price !== undefined
    ? currentSize.price
    : product.price;

  const isContactOnly = product.priceContactOnly || currentPrice === null;
  const formattedPrice = formatPrice(currentPrice, isContactOnly);

  // Sản phẩm liên quan trong cùng danh mục
  const relatedProducts = allProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id && p.status === "published")
    .slice(0, 4);

  const images = product.images && product.images.length > 0
    ? product.images
    : ["/assets/images/placeholder-wood.webp"];

  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div className="page-product-detail" style={{ padding: "30px 0 80px 0" }}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav style={{ marginBottom: "24px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          <a href="#products" onClick={(e) => { e.preventDefault(); onBackToCatalog(); }} style={{ color: "var(--wood-warm)" }}>
            ← Quay lại Danh mục
          </a>
          <span style={{ margin: "0 8px" }}>/</span>
          <span>{product.name}</span>
        </nav>

        {/* Product Detail Layout: 2 Columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "48px",
          alignItems: "start",
          marginBottom: "60px"
        }}>
          {/* Left Column: Image Gallery */}
          <div>
            <div style={{
              width: "100%",
              aspectRatio: "1 / 1",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "1px solid var(--border-subtle)",
              marginBottom: "16px",
              boxShadow: "var(--shadow-sm)"
            }}>
              <img
                src={currentImage}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%233D2314'/%3E%3Ccircle cx='300' cy='300' r='200' stroke='%23C5A059' stroke-width='3' fill='none' opacity='0.4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='26' fill='%23E7CF9B'%3EM%E1%BB%B9 Ngh%E1%BB%87 %C4%90%C3%B4ng Phong%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: "10px" }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "var(--radius-sm)",
                      overflow: "hidden",
                      border: activeImageIndex === idx ? "2px solid var(--gold-primary)" : "1px solid var(--border-subtle)",
                      opacity: activeImageIndex === idx ? 1 : 0.6,
                      cursor: "pointer",
                      padding: 0
                    }}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`Góc xem ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div>
            <div style={{
              display: "inline-block",
              backgroundColor: "var(--bg-secondary)",
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--wood-warm)",
              marginBottom: "12px",
              border: "1px solid var(--border-subtle)"
            }}>
              ✦ {product.woodType}
            </div>

            <h1 style={{ fontSize: "clamp(1.7rem, 2.5vw, 2.2rem)", marginBottom: "12px", lineHeight: 1.3 }}>
              {product.name}
            </h1>

            {/* Price Box */}
            <div style={{
              background: "var(--bg-secondary)",
              padding: "16px 20px",
              borderRadius: "var(--radius-sm)",
              margin: "20px 0",
              borderLeft: "4px solid var(--gold-primary)"
            }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block" }}>
                Giá giao lưu mộc:
              </span>
              <div style={{
                fontSize: "1.85rem",
                fontWeight: 800,
                color: "var(--wood-deep)",
                fontFamily: "var(--font-sans)"
              }}>
                {formattedPrice}
              </div>
            </div>

            {/* Sizing / Variant Selector */}
            {hasSizes && (
              <div style={{ marginBottom: "24px" }}>
                <span style={{ fontWeight: 600, fontSize: "0.95rem", display: "block", marginBottom: "8px" }}>
                  Lựa chọn kích thước / quy cách:
                </span>
                <div className="size-selector">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`size-btn ${selectedSizeIndex === index ? "active" : ""}`}
                      onClick={() => setSelectedSizeIndex(index)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Short description */}
            <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "24px" }}>
              {product.shortDesc}
            </p>

            {/* Consultation Action Box */}
            <div className="consult-action-box">
              <div className="consult-sku-highlight">
                <span>🏷️ MÃ SẢN PHẨM:</span>
                <span style={{ color: "var(--gold-dark)" }}>{product.sku}</span>
              </div>

              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                Quý khách vui lòng cung cấp mã <strong>{product.sku}</strong> khi liên hệ để nhân viên hỗ trợ nhanh nhất:
              </p>

              <div className="consult-buttons-grid">
                <a
                  href={createZaloConsultUrl(
                    siteConfig.zaloPhone,
                    product.name,
                    `${product.sku}${currentSize ? ` - ${currentSize.label}` : ""}`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-consult-zalo"
                >
                  <span>💬 Nhắn Zalo Tư Vấn</span>
                </a>

                <a
                  href={createTelUrl(siteConfig.hotline)}
                  className="btn-consult-hotline"
                >
                  <span>📞 Gọi {siteConfig.hotlineFormatted}</span>
                </a>
              </div>
            </div>

            {/* Trust Points */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border-subtle)",
              fontSize: "0.85rem",
              color: "var(--text-muted)"
            }}>
              <div>✓ Kiểm tra phôi gỗ trước khi nhận</div>
              <div>✓ Bảo hành chất gỗ vĩnh viễn</div>
              <div>✓ Chụp ảnh vân thật gửi khách qua Zalo</div>
              <div>✓ Đánh mộc sáp ong tự nhiên</div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Care Instructions */}
        <div style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-md)",
          padding: "36px",
          marginBottom: "60px"
        }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "16px" }}>Mô Tả Chi Tiết & Ý Nghĩa Phong Thủy</h2>
          <p style={{ lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "28px" }}>
            {product.description}
          </p>

          <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "var(--wood-warm)" }}>
            Hướng Dẫn Bảo Quản Đúng Cách
          </h3>
          <p style={{ lineHeight: "1.8", color: "var(--text-secondary)", margin: 0 }}>
            {product.careInstructions}
          </p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="section-header" style={{ textAlign: "left", margin: "0 0 24px 0" }}>
              <span className="section-subtitle">Gợi Ý Thêm</span>
              <h2 className="section-title" style={{ paddingBottom: 0 }}>Tác Phẩm Cùng Danh Mục</h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px"
            }}>
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} onSelect={onSelectProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
