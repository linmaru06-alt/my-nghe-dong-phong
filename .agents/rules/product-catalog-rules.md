# Quy chuẩn Dữ liệu Sản phẩm & Danh mục: Mỹ Nghệ Đông Phong

Tài liệu này xác định mô hình dữ liệu (Data Schema), quy tắc mã hóa (SKU), định dạng giá bán và các logic hiển thị sản phẩm của **Mỹ Nghệ Đông Phong**.

---

## 1. Cấu trúc 7 Danh mục Sản phẩm Khởi tạo

| Mã ID | Tên danh mục | Số lượng ban đầu | Danh sách chủng loại gỗ đã có |
|---|---|:---:|---|
| `vong-tay` | Vòng tay | 6 | Tử đàn, Sưa, Nu bách xanh, Nu ngọc am chìm, Chớp bách xanh, Trầm hương |
| `but-ky` | Bút ký | 4 | Nu huyết long, Nu bách xanh, Hoàng đàn, Mun sừng |
| `bi-lan-tay` | Bi lăn tay | 2 | Cẩm, Sưa |
| `goi-go` | Gối gỗ | 2 | Sưa, Bách xanh |
| `tau` | Tẩu thuốc gỗ | 2 | Gỗ trắc cán sừng, Gỗ nu cẩm |
| `dua-go` | Đũa gỗ | 2 | Mun sừng, Gỗ trắc |
| `dem-khoac-oto`| Đệm khoác ô tô | 2 | Gỗ trắc, Bách xanh |

---

## 2. Mô hình Schema Dữ liệu Sản phẩm (Product Interface)

Mỗi sản phẩm trong hệ thống phải tuân theo cấu trúc JSON chuẩn sau:

```javascript
{
  id: "vt-tudan-01",                     // Slug hoặc ID duy nhất
  sku: "VT-TD-01",                       // Mã sản phẩm in hoa (dùng khi khách hỏi mua)
  name: "Vòng Tay Gỗ Tử Đàn Tiểu Diệp",  // Tên sản phẩm đầy đủ
  categoryId: "vong-tay",                // ID danh mục thuộc 1 trong 7 danh mục
  woodType: "Tử Đàn Tiểu Diệp Ấn Độ",    // Loại gỗ chính xác
  price: 2500000,                        // Giá số nguyên VNĐ, hoặc null nếu chưa có giá
  priceContactOnly: false,               // True nếu sản phẩm bắt buộc "Liên hệ báo giá"
  shortDesc: "Vân gỗ ánh kim sa sao sa tự nhiên, chất gỗ đanh già, mùi thơm dịu nhẹ.",
  description: "Chi tiết xuất xứ phôi gỗ, kỹ thuật tiện hạt thủ công, ý nghĩa phong thủy bình an...",
  careInstructions: "Tránh tiếp xúc hóa chất tẩy rửa mạnh. Lau bằng khăn mềm khô sau khi đeo...",
  sizes: [                               // Danh sách các kích thước
    { label: "10mm (19 hạt - Nữ)", price: 2200000 },
    { label: "12mm (17 hạt - Nam/Nữ)", price: 2500000 },
    { label: "14mm (15 hạt - Nam)", price: 2900000 },
    { label: "16mm (14 hạt - Nam)", price: null } // Kích thước này chưa có giá -> hiển thị "Liên hệ báo giá"
  ],
  images: [
    "/assets/images/products/vong-tay-tu-dan-1.webp", // Ảnh tổng thể
    "/assets/images/products/vong-tay-tu-dan-2.webp", // Cận cảnh vân gỗ
    "/assets/images/products/vong-tay-tu-dan-3.webp"  // Trên tay thực tế
  ],
  isFeatured: true,                      // Hiển thị ở mục "Sản phẩm nổi bật" trang chủ
  status: "published",                   // "draft" (nháp) hoặc "published" (đã đăng)
  createdAt: "2026-09-08T00:00:00Z"
}
```

---

## 3. Quy tắc Hiển thị Giá (Pricing Display Rules)

1. **Hàm định dạng giá:**
   - Nếu `price` là số dương và `!priceContactOnly`: Hiển thị dạng `X.XXX.XXX ₫` (Ví dụ: `2.500.000 ₫`).
   - Nếu `price === null` hoặc `priceContactOnly === true`: Luôn hiển thị chuỗi `Liên hệ báo giá`.
   - **Tuyệt đối cấm:** Không bao giờ hiển thị `0 ₫` hoặc để trống thẻ giá.
2. **Logic theo biến thể kích thước (Size Variants):**
   - Khi người dùng chọn một kích thước từ danh sách dropdown hoặc tag:
     - Nếu kích thước đó có trường `price` cụ thể: Cập nhật giá chính của trang theo giá kích thước đó.
     - Nếu kích thước đó có `price: null`: Hiển thị `Liên hệ báo giá` ngay lập tức.
3. **Tạo lời nhắn Zalo tự động:**
   - Cú pháp đường dẫn Zalo tư vấn:
     `https://zalo.me/{HOTLINE}?text=Chào%20Mỹ%20Nghệ%20Đông%20Phong,%20tôi%20muốn%20tư%20vấn%20sản%20phẩm%20{NAME}%20(Mã:%20{SKU})`
