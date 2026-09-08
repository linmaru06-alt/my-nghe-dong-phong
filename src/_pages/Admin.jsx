import React, { useState } from "react";
import { storage } from "../data/storage-adapter";
import { formatPrice } from "../utils/formatters";

export function Admin({ onDataChange }) {
  const [activeTab, setActiveTab] = useState("products"); // products | articles | settings
  const [products, setProducts] = useState(() => storage.getProducts({ includeDrafts: true }));
  const [articles, setArticles] = useState(() => storage.getArticles({ includeDrafts: true }));
  const [config, setConfig] = useState(() => storage.getConfig());
  const [message, setMessage] = useState("");

  // Trạng thái modal sửa/thêm sản phẩm
  const [editingProduct, setEditingProduct] = useState(null);

  const showNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // Toggle trạng thái Đã đăng / Nháp của sản phẩm
  const handleToggleProductStatus = (p) => {
    const newStatus = p.status === "published" ? "draft" : "published";
    const updated = storage.saveProduct({ ...p, status: newStatus });
    setProducts(storage.getProducts({ includeDrafts: true }));
    onDataChange && onDataChange();
    showNotification(`Đã chuyển sản phẩm "${updated.name}" sang trạng thái: ${newStatus === "published" ? "ĐÃ ĐĂNG" : "BẢN NHÁP"}`);
  };

  // Toggle cờ Nổi bật trang chủ
  const handleToggleProductFeatured = (p) => {
    const updated = storage.saveProduct({ ...p, isFeatured: !p.isFeatured });
    setProducts(storage.getProducts({ includeDrafts: true }));
    onDataChange && onDataChange();
    showNotification(`Đã ${updated.isFeatured ? "ghim" : "bỏ ghim"} sản phẩm "${updated.name}" trên Trang chủ`);
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa tác phẩm "${name}"?`)) {
      storage.deleteProduct(id);
      setProducts(storage.getProducts({ includeDrafts: true }));
      onDataChange && onDataChange();
      showNotification(`Đã xóa sản phẩm "${name}"`);
    }
  };

  // Lưu sản phẩm từ form
  const handleSaveProductForm = (e) => {
    e.preventDefault();
    storage.saveProduct(editingProduct);
    setProducts(storage.getProducts({ includeDrafts: true }));
    setEditingProduct(null);
    onDataChange && onDataChange();
    showNotification("Đã lưu thông tin sản phẩm thành công!");
  };

  // Reset về 20 sản phẩm & 6 bài viết gốc
  const handleResetToDefaults = () => {
    if (window.confirm("Khôi phục toàn bộ 20 sản phẩm và 6 bài viết về dữ liệu gốc ban đầu?")) {
      storage.resetToDefaults();
      setProducts(storage.getProducts({ includeDrafts: true }));
      setArticles(storage.getArticles({ includeDrafts: true }));
      setConfig(storage.getConfig());
      onDataChange && onDataChange();
      showNotification("Đã khôi phục dữ liệu gốc thành công!");
    }
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="admin-header">
        <div>
          <span className="section-subtitle">Hệ Thống Quản Trị Nội Dung</span>
          <h1 style={{ fontSize: "1.7rem", margin: "4px 0" }}>Quản Trị Mỹ Nghệ Đông Phong</h1>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleResetToDefaults}
            style={{
              padding: "8px 16px",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.85rem",
              color: "var(--text-secondary)"
            }}
          >
            🔄 Khôi phục 20 SP mẫu
          </button>

          <button
            onClick={() => setEditingProduct({
              name: "",
              sku: `SP-${Date.now().toString().slice(-4)}`,
              categoryId: "vong-tay",
              woodType: "Tử Đàn",
              woodTypeId: "tu-dan",
              price: 1500000,
              priceContactOnly: false,
              shortDesc: "",
              description: "",
              careInstructions: "",
              status: "published",
              isFeatured: false,
              sizes: [{ label: "Tiêu chuẩn", price: 1500000 }],
              images: []
            })}
            style={{
              padding: "8px 16px",
              backgroundColor: "var(--wood-primary)",
              color: "#fff",
              borderRadius: "var(--radius-sm)",
              fontWeight: 600,
              fontSize: "0.85rem"
            }}
          >
            + Thêm Sản Phẩm Mới
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div style={{
          backgroundColor: "var(--wood-deep)",
          color: "var(--gold-light)",
          padding: "12px 20px",
          borderRadius: "var(--radius-sm)",
          marginBottom: "20px",
          fontWeight: 500
        }}>
          ✓ {message}
        </div>
      )}

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Kho Sản Phẩm ({products.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === "articles" ? "active" : ""}`}
          onClick={() => setActiveTab("articles")}
        >
          Bài Viết Kiến Thức ({articles.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Cấu Hình Doanh Nghiệp
        </button>
      </div>

      {/* Tab 1: Products Management */}
      {activeTab === "products" && (
        <div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã SKU</th>
                  <th>Tên tác phẩm</th>
                  <th>Danh mục</th>
                  <th>Loại gỗ</th>
                  <th>Giá hiển thị</th>
                  <th>Nổi bật</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.sku}</strong></td>
                    <td style={{ fontWeight: 600, color: "var(--wood-deep)" }}>{p.name}</td>
                    <td>{p.categoryId}</td>
                    <td>{p.woodType}</td>
                    <td>{formatPrice(p.price, p.priceContactOnly)}</td>
                    <td>
                      <button
                        onClick={() => handleToggleProductFeatured(p)}
                        style={{
                          cursor: "pointer",
                          fontSize: "1.2rem",
                          opacity: p.isFeatured ? 1 : 0.3
                        }}
                        title={p.isFeatured ? "Đang nổi bật trên trang chủ (Bấm để gỡ)" : "Bấm để ghim lên trang chủ"}
                      >
                        ⭐
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleProductStatus(p)}
                        className={`badge-status ${p.status === "published" ? "badge-published" : "badge-draft"}`}
                        style={{ cursor: "pointer", border: "none" }}
                        title="Nhấn để đổi trạng thái"
                      >
                        {p.status === "published" ? "● Đã đăng" : "○ Bản nháp"}
                      </button>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => setEditingProduct(p)}
                        style={{ marginRight: "10px", color: "var(--wood-warm)", fontWeight: 600 }}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        style={{ color: "#D32F2F" }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Articles Management */}
      {activeTab === "articles" && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tiêu đề bài viết</th>
                <th>Nhóm nội dung</th>
                <th>Tác giả</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: "right" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.title}</td>
                  <td><span className="badge-status badge-featured">{a.groupName}</span></td>
                  <td>{a.author}</td>
                  <td>
                    <span className={`badge-status ${a.status === "published" ? "badge-published" : "badge-draft"}`}>
                      {a.status === "published" ? "● Đã đăng" : "○ Bản nháp"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button style={{ color: "var(--wood-warm)", fontWeight: 600 }}>Xem/Sửa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeTab === "settings" && (
        <div style={{
          background: "var(--bg-surface)",
          padding: "30px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-subtle)",
          maxWidth: "600px"
        }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "20px" }}>Thông Tin Liên Hệ & Chốt Đơn</h2>
          <div className="admin-form-group">
            <label>Số điện thoại Hotline:</label>
            <input
              type="text"
              className="admin-form-input"
              value={config.hotlineFormatted}
              onChange={e => setConfig({ ...config, hotlineFormatted: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Số điện thoại Zalo tư vấn:</label>
            <input
              type="text"
              className="admin-form-input"
              value={config.zaloPhone}
              onChange={e => setConfig({ ...config, zaloPhone: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Địa chỉ xưởng mộc / cơ sở:</label>
            <input
              type="text"
              className="admin-form-input"
              value={config.address}
              onChange={e => setConfig({ ...config, address: e.target.value })}
            />
          </div>

          <button
            onClick={() => {
              storage.updateConfig(config);
              onDataChange && onDataChange();
              showNotification("Đã cập nhật thông tin doanh nghiệp thành công!");
            }}
            style={{
              backgroundColor: "var(--wood-primary)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "var(--radius-sm)",
              fontWeight: 600
            }}
          >
            Lưu Cấu Hình
          </button>
        </div>
      )}

      {/* Modal chỉnh sửa sản phẩm */}
      {editingProduct && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px"
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "var(--radius-md)",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "28px"
          }}>
            <h2 style={{ marginBottom: "20px", fontSize: "1.3rem" }}>
              {editingProduct.id ? "Chỉnh Sửa Tác Phẩm" : "Thêm Tác Phẩm Mới"}
            </h2>

            <form onSubmit={handleSaveProductForm}>
              <div className="admin-form-group">
                <label>Tên sản phẩm: *</label>
                <input
                  type="text"
                  required
                  className="admin-form-input"
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="admin-form-group">
                  <label>Mã SKU: *</label>
                  <input
                    type="text"
                    required
                    className="admin-form-input"
                    value={editingProduct.sku}
                    onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value.toUpperCase() })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Loại gỗ quý: *</label>
                  <input
                    type="text"
                    required
                    className="admin-form-input"
                    value={editingProduct.woodType}
                    onChange={e => setEditingProduct({ ...editingProduct, woodType: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="admin-form-group">
                  <label>Giá bán (VNĐ):</label>
                  <input
                    type="number"
                    className="admin-form-input"
                    value={editingProduct.price || ""}
                    onChange={e => setEditingProduct({
                      ...editingProduct,
                      price: e.target.value ? parseInt(e.target.value, 10) : null
                    })}
                    disabled={editingProduct.priceContactOnly}
                  />
                </div>

                <div className="admin-form-group" style={{ display: "flex", alignItems: "center", paddingTop: "24px" }}>
                  <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                      type="checkbox"
                      checked={editingProduct.priceContactOnly}
                      onChange={e => setEditingProduct({ ...editingProduct, priceContactOnly: e.target.checked })}
                    />
                    Bắt buộc "Liên hệ báo giá"
                  </label>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Mô tả ngắn gọn:</label>
                <textarea
                  rows={2}
                  className="admin-form-textarea"
                  value={editingProduct.shortDesc}
                  onChange={e => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={{ padding: "10px 18px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--wood-primary)",
                    color: "#fff",
                    padding: "10px 24px",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: 600
                  }}
                >
                  Lưu Tác Phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
