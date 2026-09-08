import React from "react";
import { formatPrice, createZaloConsultUrl } from "../utils/formatters";
import { siteConfig } from "../config/site-config";

export function ProductCard({ product, onSelect }) {
  const isContactOnly = product.priceContactOnly || product.price === null;
  const formattedPrice = formatPrice(product.price, isContactOnly);

  const handleZaloClick = (e) => {
    e.stopPropagation();
    const url = createZaloConsultUrl(siteConfig.zaloPhone, product.name, product.sku);
    window.open(url, "_blank");
  };

  return (
    <article
      className="product-card"
      onClick={() => onSelect && onSelect(product)}
      style={{ cursor: "pointer" }}
    >
      {/* Media / Image */}
      <div className="product-card-media">
        <img
          src={product.images && product.images[0] ? product.images[0] : "/assets/images/placeholder-wood.webp"}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
          onError={(e) => {
            // Fallback gracefully to high quality inline SVG representation of wood texture
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%233D2314'/%3E%3Ccircle cx='200' cy='200' r='140' stroke='%23C5A059' stroke-width='3' fill='none' opacity='0.4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='20' fill='%23E7CF9B'%3EM%E1%BB%B9 Ngh%E1%BB%87 %C4%90%C3%B4ng Phong%3C/text%3E%3C/svg%3E";
          }}
        />
        <span className="product-card-badge">
          {product.woodType || "Gỗ Quý"}
        </span>
      </div>

      {/* Body Info */}
      <div className="product-card-body">
        <span className="product-card-sku">{product.sku}</span>
        <h3 className="product-card-title" title={product.name}>
          {product.name}
        </h3>
        <p className="product-card-wood">
          ✦ {product.woodType}
        </p>

        {/* Footer with Price and Quick Consult */}
        <div className="product-card-footer">
          <div className={`product-card-price ${isContactOnly ? "price-contact" : ""}`}>
            {formattedPrice}
          </div>

          <button
            className="btn-pill"
            style={{
              fontSize: "0.82rem",
              padding: "6px 12px",
              backgroundColor: "var(--zalo-blue)",
              color: "#fff",
              borderRadius: "var(--radius-full)",
              fontWeight: 600
            }}
            onClick={handleZaloClick}
            title="Nhắn Zalo hỏi về sản phẩm này"
          >
            💬 Zalo
          </button>
        </div>
      </div>
    </article>
  );
}
