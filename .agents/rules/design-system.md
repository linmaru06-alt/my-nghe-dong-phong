# Design System Quy chuẩn: Mỹ Nghệ Đông Phong

Quy chuẩn thiết kế này áp dụng cho toàn bộ các thành phần giao diện của thương hiệu đồ gỗ cao cấp **Mỹ Nghệ Đông Phong**.

---

## 1. Hệ thống Bảng màu (Color Palette Tokens)

```css
:root {
  /* Màu nền tự nhiên */
  --bg-primary: #FDFBF7;      /* Kem sáng ngọc trai (Warm Ivory) */
  --bg-secondary: #F6F1E9;    /* Kem đậm nhẹ / nền thẻ card */
  --bg-surface: #FFFFFF;      /* Trắng ngà bề mặt */
  --bg-dark-wood: #23160F;    /* Nâu sẫm mun / tử đàn cho footer hoặc header sang trọng */

  /* Màu nâu gỗ quý (Wood Accent Colors) */
  --wood-deep: #3A2012;       /* Nâu trầm gỗ trắc */
  --wood-primary: #5C3A21;    /* Nâu ấm gỗ tử đàn */
  --wood-warm: #8B4D27;       /* Nâu hổ phách hương/sưa */
  --wood-light: #C49767;      /* Vàng nâu bách xanh */

  /* Màu kim loại quý & Điểm nhấn (Luxury Accents) */
  --accent-gold: #C5A059;     /* Vàng đồng cổ điển */
  --accent-gold-light: #E7CF9B;
  --accent-amber: #D97706;    /* Hổ phách */

  /* Trạng thái & Chuyển đổi */
  --zalo-blue: #0068FF;       /* Màu Zalo chính thức */
  --hotline-green: #0E8A42;   /* Màu nút gọi hotline */

  /* Chữ & Tương phản (Typography Colors) */
  --text-primary: #22160E;    /* Nâu đen đậm, đọc rõ không gắt như đen tuyền */
  --text-secondary: #63534B;  /* Nâu xám trầm */
  --text-muted: #8F7D74;      /* Màu ghi chú, mã SKU */
  --border-subtle: #E8DFD5;   /* Đường viền mỏng tinh tế */
  --border-gold: #D6C29E;     /* Viền ánh kim nhẹ */
  
  /* Đổ bóng tự nhiên (Soft Luxury Shadows) */
  --shadow-sm: 0 2px 6px rgba(45, 26, 15, 0.05);
  --shadow-md: 0 8px 24px rgba(45, 26, 15, 0.08);
  --shadow-lg: 0 16px 40px rgba(45, 26, 15, 0.12);
  --shadow-gold: 0 4px 20px rgba(197, 160, 89, 0.25);
  
  /* Bo góc nhẹ (Subtle Rounded Corners) */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

---

## 2. Quy chuẩn Typography (Kiểu chữ)

- **Tiêu đề & Thương hiệu (Headings):**
  - Font: `'Cinzel', 'Playfair Display', serif`
  - Mang lại cảm giác hoàng gia, thủ công truyền thống, sang trọng và quý phái.
- **Thân bài & Thông tin sản phẩm (Body & UI):**
  - Font: `'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif`
  - Đảm bảo hiển thị dấu tiếng Việt hoàn hảo, nét chữ cân đối trên mọi độ phân giải màn hình.

---

## 3. Quy chuẩn Nút Kêu gọi Hành động (CTA)

Vì đây là website **bán hàng thông qua tư vấn ngoài web**, hai nút tương tác quan trọng nhất là:

1. **Nút Zalo Tư Vấn:**
   - Màu sắc: Xanh Zalo chuẩn `#0068FF` kết hợp biểu tượng Zalo.
   - Hành động: Mở đường dẫn `https://zalo.me/{so_dien_thoai}` kèm lời chào tự động chứa mã sản phẩm (SKU).
2. **Nút Gọi Điện / Hotline:**
   - Màu sắc: Xanh lá cây quý phái `#0E8A42` hoặc Vàng đồng `#C5A059`.
   - Hành động: Quay số điện thoại trực tiếp `tel:{so_dien_thoai}`.
3. **Nút ghim cố định (Floating CTA) trên điện thoại:**
   - Luôn nằm ở góc phải hoặc thanh bar đáy màn hình để khách hàng có thể liên hệ ngay chỉ với 1 chạm.

---

## 4. Tương tác & Trải nghiệm (Micro-Interactions)

- **Card Sản phẩm:**
  - Hiệu ứng hover: Phóng to nhẹ ảnh vân gỗ (`transform: scale(1.04)` trong `0.4s ease`), nâng nhẹ bóng viền.
  - Hiển thị nhãn gỗ quý: Tag nhỏ gọn góc trên ảnh (VD: "Gỗ Sưa đỏ", "Tử đàn Ấn Độ").
- **Thư viện ảnh chi tiết (Gallery):**
  - Xem ảnh lớn sắc nét, hỗ trợ nhấp để phóng to chi tiết vân gỗ (Light-box / Zoom).
