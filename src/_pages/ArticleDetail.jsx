import React, { useEffect } from "react";
import { formatDateVi } from "../utils/formatters";
import { ProductCard } from "../components/ProductCard";

export function ArticleDetail({ article, allProducts, onBack, onSelectProduct }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [article.id]);

  if (!article) return null;

  // Lấy các sản phẩm liên quan được nhắc tới trong bài viết
  const relatedProducts = allProducts.filter(p =>
    article.relatedProductSkus && article.relatedProductSkus.includes(p.sku)
  );

  return (
    <div className="page-article-detail" style={{ padding: "40px 0 80px 0" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        {/* Navigation Breadcrumb */}
        <nav style={{ marginBottom: "24px", fontSize: "0.9rem" }}>
          <button
            onClick={onBack}
            style={{ color: "var(--wood-warm)", fontWeight: 500, cursor: "pointer" }}
          >
            ← Quay lại Danh sách bài viết
          </button>
        </nav>

        {/* Article Header */}
        <header style={{ marginBottom: "32px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "24px" }}>
          <span style={{
            fontSize: "0.82rem",
            fontWeight: 700,
            color: "var(--gold-dark)",
            textTransform: "uppercase",
            display: "inline-block",
            marginBottom: "10px"
          }}>
            {article.groupName}
          </span>

          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: 1.3, marginBottom: "16px" }}>
            {article.title}
          </h1>

          <div style={{ display: "flex", gap: "20px", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            <span>Tác giả: <strong>{article.author}</strong></span>
            <span>•</span>
            <span>Ngày đăng: {formatDateVi(article.publishedAt)}</span>
          </div>
        </header>

        {/* Article Content */}
        <div
          style={{
            lineHeight: "1.85",
            fontSize: "1.05rem",
            color: "var(--text-main)",
            marginBottom: "50px"
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div style={{
            background: "var(--bg-secondary)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-gold)",
            padding: "32px",
            marginTop: "40px"
          }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px", color: "var(--wood-deep)" }}>
              Tác Phẩm Gợi Ý Trong Bài Viết
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "20px" }}>
              Những sản phẩm tiêu biểu được nghệ nhân Đông Phong đề cập:
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px"
            }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
