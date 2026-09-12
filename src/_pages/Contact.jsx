import React, { useState } from "react";
import { siteConfig } from "../config/site-config";
import { createTelUrl } from "../utils/formatters";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    productSku: "",
    note: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tạo link Zalo với thông tin khách điền
    const message = `Chào Đông Phong, tôi là ${formData.name} (SĐT: ${formData.phone}). Tôi muốn được tư vấn: ${formData.productSku ? `Sản phẩm mã ${formData.productSku}` : ""}. Lời nhắn: ${formData.note}`;
    const zaloUrl = `https://zalo.me/${siteConfig.zaloPhone}?text=${encodeURIComponent(message)}`;
    window.open(zaloUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="page-contact" style={{ padding: "50px 0 90px 0" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-subtitle">Kết Nối Với Chúng Tôi</span>
          <h1 className="section-title">Liên Hệ & Tư Vấn Đồ Gỗ</h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Chúng tôi luôn sẵn sàng giải đáp thắc mắc về chủng loại gỗ, chọn kích thước phong thủy và gửi video cận cảnh phôi gỗ qua Zalo.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px"
        }}>
          {/* Info Card */}
          <div style={{
            background: "var(--bg-surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            padding: "36px",
            boxShadow: "var(--shadow-sm)"
          }}>
            <h2 style={{ fontSize: "1.3rem", color: "var(--wood-deep)", marginBottom: "20px" }}>
              Thông Tin Cơ Sở
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "0.95rem" }}>
              <div>
                <strong style={{ color: "var(--wood-warm)", display: "block" }}>📞 Hotline tư vấn:</strong>
                <a href={createTelUrl(siteConfig.hotline)} style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--hotline-green)" }}>
                  {siteConfig.hotlineFormatted}
                </a>
              </div>

              <div>
                <strong style={{ color: "var(--wood-warm)", display: "block" }}>💬 Zalo chính thức:</strong>
                <a href={siteConfig.zaloUrl} target="_blank" rel="noreferrer" style={{ color: "var(--zalo-blue)", fontWeight: 600 }}>
                  {siteConfig.zaloPhone} (Nhấn để mở Zalo chat)
                </a>
              </div>

              <div>
                <strong style={{ color: "var(--wood-warm)", display: "block" }}>📍 Xưởng chế tác & Trưng bày:</strong>
                <span>{siteConfig.address}</span>
              </div>

              <div>
                <strong style={{ color: "var(--wood-warm)", display: "block" }}>⏰ Giờ mở cửa:</strong>
                <span>{siteConfig.workingHours}</span>
              </div>
            </div>

            <div style={{
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm)",
              padding: "16px",
              marginTop: "28px",
              border: "1px dashed var(--border-gold)"
            }}>
              <span style={{ fontWeight: 600, color: "var(--wood-deep)" }}>💡 Lưu ý quý khách:</span>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "6px 0 0 0" }}>
                Để được xem video quay cận thớ vân gỗ và chọn kích thước chuẩn nhất, quý khách có thể gửi tin nhắn trực tiếp qua Zalo.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: "var(--bg-surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            padding: "36px",
            boxShadow: "var(--shadow-sm)"
          }}>
            <h2 style={{ fontSize: "1.3rem", color: "var(--wood-deep)", marginBottom: "20px" }}>
              Gửi Yêu Cầu Tư Vấn Nhanh
            </h2>

            {submitted ? (
              <div style={{
                background: "#E6F4EA",
                color: "#137333",
                padding: "20px",
                borderRadius: "var(--radius-sm)",
                textAlign: "center"
              }}>
                <span style={{ fontSize: "2rem", display: "block" }}>✓</span>
                <strong>Yêu cầu của bạn đã được chuyển tới Zalo!</strong>
                <p style={{ fontSize: "0.88rem", marginTop: "8px" }}>
                  Chuyên viên mộc sẽ phản hồi bạn trong thời gian sớm nhất.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "6px" }}>
                    Họ và tên của bạn: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn Nam"
                    className="admin-form-input"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "6px" }}>
                    Số điện thoại / Zalo: *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="VD: 096 8888 972"
                    className="admin-form-input"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "6px" }}>
                    Mã sản phẩm quan tâm (nếu có):
                  </label>
                  <input
                    type="text"
                    placeholder="VD: VT-TD-01, BK-HL-01..."
                    className="admin-form-input"
                    value={formData.productSku}
                    onChange={e => setFormData({ ...formData, productSku: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "6px" }}>
                    Nội dung cần tư vấn:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="VD: Tư vấn kích thước vòng tay hợp mệnh Hỏa..."
                    className="admin-form-textarea"
                    value={formData.note}
                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--wood-primary)",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginTop: "8px"
                  }}
                >
                  Gửi Yêu Cầu Tư Vấn Qua Zalo →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
