import React, { useState } from "react";
import { formatDateVi } from "../utils/formatters";

export function Articles({ articles, onSelectArticle }) {
  const [selectedGroup, setSelectedGroup] = useState("all");

  const groups = [
    { key: "all", label: "Tất cả bài viết" },
    { key: "kien-thuc", label: "Kiến thức về gỗ" },
    { key: "huong-dan", label: "Hướng dẫn lựa chọn" },
    { key: "bao-quan", label: "Bảo quản sản phẩm" }
  ];

  const filteredArticles = articles.filter(a => {
    if (a.status !== "published") return false;
    if (selectedGroup !== "all" && a.group !== selectedGroup) return false;
    return true;
  });

  return (
    <div className="page-articles" style={{ padding: "40px 0 80px 0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-subtitle">Góc Chia Sẻ</span>
          <h1 className="section-title">Kiến Thức & Cẩm Nang Đồ Gỗ</h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Cập nhật kiến thức chuyên sâu về đặc tính gỗ quý, cách chọn size hợp mệnh và kinh nghiệm chăm sóc vật phẩm mộc.
          </p>
        </div>

        {/* Group Filter Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "40px", flexWrap: "wrap" }}>
          {groups.map(g => (
            <button
              key={g.key}
              className={`filter-pill ${selectedGroup === g.key ? "active" : ""}`}
              onClick={() => setSelectedGroup(g.key)}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "30px"
        }}>
          {filteredArticles.map(article => (
            <article
              key={article.id}
              style={{
                background: "var(--bg-surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all var(--transition-normal)",
                boxShadow: "var(--shadow-sm)"
              }}
              onClick={() => onSelectArticle(article)}
            >
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--gold-dark)",
                    textTransform: "uppercase"
                  }}>
                    {article.groupName}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {formatDateVi(article.publishedAt)}
                  </span>
                </div>

                <h2 style={{ fontSize: "1.2rem", lineHeight: 1.4, marginBottom: "12px", color: "var(--wood-deep)" }}>
                  {article.title}
                </h2>

                <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6, flexGrow: 1, marginBottom: "20px" }}>
                  {article.excerpt}
                </p>

                <div style={{
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--wood-warm)"
                }}>
                  <span>Đọc chi tiết bài viết</span>
                  <span>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
