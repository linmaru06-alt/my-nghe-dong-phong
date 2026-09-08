import React from "react";

export function About({ onNavigate }) {
  return (
    <div className="page-about" style={{ padding: "50px 0 90px 0" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-subtitle">Câu Chuyện Thương Hiệu</span>
          <h1 className="section-title">Mỹ Nghệ Đông Phong</h1>
          <p style={{ fontSize: "1.1rem", color: "var(--wood-warm)", fontWeight: 500 }}>
            Gìn giữ nét tinh hoa mộc thủ công truyền thống qua từng thớ gỗ quý tự nhiên.
          </p>
        </div>

        {/* Content Section */}
        <div style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-md)",
          padding: "40px",
          boxShadow: "var(--shadow-sm)",
          lineHeight: "1.8",
          color: "var(--text-secondary)"
        }}>
          <h2 style={{ fontSize: "1.4rem", color: "var(--wood-deep)", marginBottom: "16px" }}>
            1. Khởi nguồn từ tình yêu gỗ Việt
          </h2>
          <p>
            Mỹ Nghệ Đông Phong được gây dựng từ niềm đam mê sâu sắc với các dòng danh mộc quý hiếm của Việt Nam và các vùng đất danh tiếng trên thế giới. Chúng tôi tin rằng, mỗi khối gỗ tự nhiên là một tuyệt tác của tạo hóa tích tụ linh khí đất trời qua hàng trăm năm phong sương bão táp.
          </p>

          <h2 style={{ fontSize: "1.4rem", color: "var(--wood-deep)", margin: "32px 0 16px 0" }}>
            2. Tôn trọng vẻ đẹp nguyên bản (Thuần mộc)
          </h2>
          <p>
            Khác biệt lớn nhất tại Đông Phong là sự tôn trọng chất gỗ mộc. Chúng tôi không sử dụng các lớp keo hóa chất độc hại hay vec-ni công nghiệp để che đậy khuyết tật. Tất cả sản phẩm từ chiếc vòng tay, cây bút ký, cặp bi dưỡng sinh cho đến tẩu thuốc và đệm ô tô... đều được gia công tỉ mỉ bằng máy tiện chính xác kết hợp bàn tay vuốt mộc, đánh sáp ong truyền thống của những người thợ lành nghề.
          </p>

          <div style={{
            background: "var(--bg-secondary)",
            borderLeft: "4px solid var(--gold-primary)",
            padding: "20px",
            margin: "28px 0",
            borderRadius: "var(--radius-sm)"
          }}>
            <p style={{ margin: 0, fontStyle: "italic", color: "var(--wood-deep)", fontWeight: 500 }}>
              "Một vật phẩm gỗ quý đúng nghĩa phải sở hữu chất gỗ đanh già chìm nước, tôm gỗ mịn tít, vân hoa tự nhiên sắc nét và đặc biệt là hương thơm thảo mộc trường tồn theo năm tháng."
            </p>
          </div>

          <h2 style={{ fontSize: "1.4rem", color: "var(--wood-deep)", margin: "32px 0 16px 0" }}>
            3. Ba giá trị cốt lõi
          </h2>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <li>
              <strong>Chuẩn chất gỗ:</strong> Đúng chủng loại như cam kết. Phát hiện sai lệch đền gấp 10 lần giá trị.
            </li>
            <li>
              <strong>Minh bạch thông tin:</strong> Khách hàng được xem ảnh thật, video cận cảnh từng phôi vân và chốt mã sản phẩm trước khi giao.
            </li>
            <li>
              <strong>Đồng hành trọn đời:</strong> Hỗ trợ làm mới, đánh bóng và xâu lại dây vĩnh viễn cho quý khách.
            </li>
          </ul>

          <div style={{ textAlign: "center", marginTop: "40px", paddingTop: "28px", borderTop: "1px solid var(--border-subtle)" }}>
            <button
              style={{
                backgroundColor: "var(--wood-primary)",
                color: "#fff",
                padding: "12px 30px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "1rem"
              }}
              onClick={() => onNavigate("products")}
            >
              Khám Phá Các Tác Phẩm Của Chúng Tôi →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
