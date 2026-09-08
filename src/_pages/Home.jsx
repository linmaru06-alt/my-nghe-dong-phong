import React from "react";
import { siteConfig } from "../config/site-config";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";

export function Home({ products, articles, onNavigateCategory, onSelectProduct, onNavigateArticle, onNavigate }) {
  const featuredProducts = products.filter(p => p.isFeatured && p.status === "published").slice(0, 8);
  const recentArticles = articles.filter(a => a.status === "published").slice(0, 3);

  return (
    <div className="page-home">
      {/* Hero Section */}
      <section className="hero-section" style={{
        background: "linear-gradient(180deg, #2B180F 0%, #1D100A 100%)",
        color: "#FAF4EB",
        padding: "80px 0 90px 0",
        position: "relative",
        borderBottom: "3px solid var(--gold-primary)"
      }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "860px" }}>
          <span style={{
            color: "var(--gold-light)",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontSize: "0.85rem",
            fontWeight: 700,
            display: "inline-block",
            marginBottom: "16px"
          }}>
            Thủ Công Mỹ Nghệ Truyền Thống
          </span>
          <h1 style={{
            color: "#FFF",
            fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
            marginBottom: "20px",
            lineHeight: 1.2
          }}>
            Tinh Hoa Gỗ Quý Tự Nhiên
          </h1>
          <p style={{
            color: "#E2D3C7",
            fontSize: "1.15rem",
            lineHeight: 1.7,
            marginBottom: "36px"
          }}>
            Tác phẩm chế tác từ các dòng gỗ quý hiếm bậc nhất: Tử Đàn Tiểu Diệp, Sưa Bắc Bộ, Nu Bách Xanh, Hoàng Đàn, Huyết Long, Mun Sừng... Đậm chất mộc truyền thống, thơm an thần và vượng phong thủy.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                backgroundColor: "var(--gold-primary)",
                color: "var(--wood-deep)",
                padding: "14px 32px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "var(--shadow-gold)",
                transition: "all var(--transition-fast)"
              }}
              onClick={() => onNavigate("products")}
            >
              Khám Phá Tác Phẩm
            </button>

            <a
              href={siteConfig.zaloUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                color: "#FFF",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "14px 28px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              💬 Tư Vấn Trực Tiếp Qua Zalo
            </a>
          </div>
        </div>
      </section>

      {/* Trust Highlights */}
      <section style={{ backgroundColor: "var(--bg-secondary)", padding: "28px 0", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          textAlign: "center"
        }}>
          <div>
            <span style={{ fontSize: "1.5rem" }}>🪵</span>
            <h4 style={{ margin: "6px 0 4px 0", fontSize: "1rem" }}>100% Gỗ Thật Tuyển Chọn</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>Đúng chủng loại gỗ, chuẩn phôi già tinh dầu</p>
          </div>
          <div>
            <span style={{ fontSize: "1.5rem" }}>🖐️</span>
            <h4 style={{ margin: "6px 0 4px 0", fontSize: "1rem" }}>Chế Tác Thủ Công</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>Đánh mộc sáp ong tự nhiên, không sơn phủ hóa chất</p>
          </div>
          <div>
            <span style={{ fontSize: "1.5rem" }}>📦</span>
            <h4 style={{ margin: "6px 0 4px 0", fontSize: "1rem" }}>Kiểm Tra Trước Thanh Toán</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>Mở hộp kiểm tra đúng mã và vân gỗ đã chọn</p>
          </div>
          <div>
            <span style={{ fontSize: "1.5rem" }}>♾️</span>
            <h4 style={{ margin: "6px 0 4px 0", fontSize: "1rem" }}>Bảo Hành Chất Gỗ Trọn Đời</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>Hỗ trợ làm mới và xâu lại dây miễn phí</p>
          </div>
        </div>
      </section>

      {/* 7 Categories Section */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Dòng Sản Phẩm</span>
            <h2 className="section-title">7 Danh Mục Tác Phẩm Cốt Lõi</h2>
            <p>Mỗi nhóm vật phẩm mang một giá trị thẩm mỹ, phong thủy và công năng phục vụ đời sống tinh thần.</p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px"
          }}>
            {categories.map(cat => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => onNavigateCategory(cat.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="category-icon-wrapper">
                  {cat.id === "vong-tay" && "📿"}
                  {cat.id === "but-ky" && "✒️"}
                  {cat.id === "bi-lan-tay" && "⚪"}
                  {cat.id === "goi-go" && "🛏️"}
                  {cat.id === "tau" && "💨"}
                  {cat.id === "dua-go" && "🥢"}
                  {cat.id === "dem-khoac-oto" && "🚗"}
                </div>
                <h3 className="category-card-name" style={{ fontSize: "1rem" }}>{cat.name}</h3>
                <span className="category-card-count">{cat.itemCount} tác phẩm</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "60px 0 80px 0", backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Tuyển Chọn Độc Bản</span>
            <h2 className="section-title">Tác Phẩm Gỗ Nổi Bật</h2>
            <p>Những tác phẩm vân hoa đặc sắc, chất gỗ đanh già được các nghệ nhân trau chuốt tỉ mỉ.</p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px"
          }}>
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              style={{
                border: "2px solid var(--wood-primary)",
                color: "var(--wood-primary)",
                padding: "12px 32px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 700,
                fontSize: "0.95rem",
                transition: "all var(--transition-fast)"
              }}
              onClick={() => onNavigate("products")}
            >
              Xem Toàn Bộ 20 Tác Phẩm Khởi Tạo →
            </button>
          </div>
        </div>
      </section>

      {/* Knowledge Highlight */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Góc Chuyên Gia</span>
            <h2 className="section-title">Kiến Thức & Cẩm Nang Đồ Gỗ</h2>
            <p>Chia sẻ kinh nghiệm nhận biết vân gỗ thật, cách chọn size hạt phong thủy và bảo quản sản phẩm luôn bóng đẹp.</p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px"
          }}>
            {recentArticles.map(a => (
              <article
                key={a.id}
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "all var(--transition-normal)"
                }}
                onClick={() => onNavigateArticle(a)}
              >
                <span style={{
                  fontSize: "0.78rem",
                  color: "var(--gold-dark)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "8px"
                }}>
                  {a.groupName}
                </span>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "10px", lineHeight: 1.4 }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", flexGrow: 1, marginBottom: "16px" }}>
                  {a.excerpt}
                </p>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--wood-warm)" }}>
                  Đọc bài viết →
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
