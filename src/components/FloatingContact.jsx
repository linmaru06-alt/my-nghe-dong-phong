import React from "react";
import { siteConfig } from "../config/site-config";
import { createTelUrl } from "../utils/formatters";

export function FloatingContact({ currentProduct }) {
  const zaloUrl = currentProduct
    ? `https://zalo.me/${siteConfig.zaloPhone}?text=${encodeURIComponent(
        `Chào Mỹ Nghệ Đông Phong, tôi cần tư vấn tác phẩm ${currentProduct.name} (Mã: ${currentProduct.sku})`
      )}`
    : siteConfig.zaloUrl;

  return (
    <aside className="floating-contact-widget" aria-label="Kênh liên hệ nhanh">
      {/* Nút Zalo */}
      <a
        href={zaloUrl}
        target="_blank"
        rel="noreferrer"
        className="floating-btn btn-zalo"
        title="Nhắn tin Zalo nhận tư vấn ngay"
      >
        <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>Z</span>
      </a>

      {/* Nút Hotline */}
      <a
        href={createTelUrl(siteConfig.hotline)}
        className="floating-btn btn-hotline"
        title={`Gọi Hotline ${siteConfig.hotlineFormatted}`}
      >
        <span style={{ fontSize: "1.3rem" }}>📞</span>
      </a>
    </aside>
  );
}
