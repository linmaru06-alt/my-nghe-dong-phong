import React from "react";
import { siteConfig } from "../config/site-config";
import { categories } from "../data/categories";

export function Footer({ onNavigateCategory, onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Col 1: Brand Info */}
        <div className="footer-col">
          <div className="footer-col-title">{siteConfig.name}</div>
          <p style={{ color: "#D3C5BC", fontSize: "0.92rem", lineHeight: "1.7" }}>
            {siteConfig.description}
          </p>
          <div style={{ marginTop: "16px", fontSize: "0.9rem", color: "#E7CF9B" }}>
            <p><strong>Hotline:</strong> {siteConfig.hotlineFormatted}</p>
            <p><strong>Zalo:</strong> {siteConfig.zaloPhone}</p>
            <p><strong>Địa chỉ:</strong> {siteConfig.address}</p>
            <p><strong>Giờ phục vụ:</strong> {siteConfig.workingHours}</p>
          </div>
        </div>

        {/* Col 2: 7 Product Categories */}
        <div className="footer-col">
          <div className="footer-col-title">Danh Mục Tác Phẩm</div>
          <ul className="footer-links">
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#category-${cat.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateCategory) onNavigateCategory(cat.id);
                  }}
                >
                  {cat.name} ({cat.itemCount})
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Knowledge & Guides */}
        <div className="footer-col">
          <div className="footer-col-title">Kiến Thức & Hướng Dẫn</div>
          <ul className="footer-links">
            <li>
              <a href="#articles" onClick={(e) => { e.preventDefault(); onNavigate("articles"); }}>
                Kiến thức các loại gỗ quý
              </a>
            </li>
            <li>
              <a href="#articles" onClick={(e) => { e.preventDefault(); onNavigate("articles"); }}>
                Hướng dẫn chọn kích thước
              </a>
            </li>
            <li>
              <a href="#articles" onClick={(e) => { e.preventDefault(); onNavigate("articles"); }}>
                Bảo quản vật phẩm mộc
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate("about"); }}>
                Câu chuyện nghệ nhân Đông Phong
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}>
                Liên hệ & Bản đồ xưởng
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Trust Policies */}
        <div className="footer-col">
          <div className="footer-col-title">Cam Kết Chất Lượng</div>
          <ul className="footer-links" style={{ gap: "14px" }}>
            {siteConfig.policies.map((p, idx) => (
              <li key={idx} style={{ lineHeight: "1.5" }}>
                <strong style={{ color: "#E7CF9B", display: "block" }}>✓ {p.title}</strong>
                <span style={{ fontSize: "0.85rem", color: "#B8A79E" }}>{p.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 {siteConfig.name}. Toàn bộ sản phẩm được chế tác thủ công từ gỗ quý tự nhiên.</p>
      </div>
    </footer>
  );
}
