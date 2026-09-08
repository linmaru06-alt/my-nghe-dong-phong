# Sơ đồ Website & Thiết kế Luồng Tương tác (User Flow)

Tài liệu này chi tiết hóa cấu trúc Sitemap và các luồng hành vi của người dùng trên website **Mỹ Nghệ Đông Phong**.

---

## 1. Cây Sơ đồ Trang (Sitemap Hierarchy)

```text
Trang chủ (/)
├── Danh mục & Sản phẩm (/san-pham)
│   ├── Vòng tay (/san-pham?danh-muc=vong-tay)
│   ├── Bút ký (/san-pham?danh-muc=but-ky)
│   ├── Bi lăn tay (/san-pham?danh-muc=bi-lan-tay)
│   ├── Gối gỗ (/san-pham?danh-muc=goi-go)
│   ├── Tẩu (/san-pham?danh-muc=tau)
│   ├── Đũa gỗ (/san-pham?danh-muc=dua-go)
│   ├── Đệm khoác ô tô (/san-pham?danh-muc=dem-khoac-oto)
│   └── Chi tiết từng sản phẩm (/san-pham/:id)
├── Giới thiệu (/gioi-thieu)
├── Bài viết (/bai-viet)
│   ├── Kiến thức về gỗ (/bai-viet?nhom=kien-thuc)
│   ├── Hướng dẫn lựa chọn (/bai-viet?nhom=huong-dan)
│   ├── Bảo quản sản phẩm (/bai-viet?nhom=bao-quan)
│   └── Chi tiết từng bài viết (/bai-viet/:id)
├── Liên hệ (/lien-he)
└── Quản trị hệ thống (/admin)
    ├── Quản lý Sản phẩm (Danh sách, Thêm mới, Sửa, Đổi trạng thái Nháp/Đăng, Nổi bật)
    ├── Quản lý Bài viết
    └── Cấu hình thông tin liên hệ (Hotline, Zalo, Địa chỉ)
```

---

## 2. Thiết kế Luồng Hành vi Khách hàng

### Luồng 1: Tìm kiếm, Tham khảo và Hỏi mua Sản phẩm
```mermaid
graph TD
    A[Khách truy cập Trang chủ / Link mạng xã hội] --> B[Xem 7 Danh mục hoặc Thanh tìm kiếm]
    B --> C[Lọc theo Danh mục & Loại gỗ]
    C --> D[Vào Trang Chi tiết sản phẩm]
    D --> E[Xem ảnh lớn, cận cảnh vân gỗ]
    D --> F[Chọn kích thước phù hợp]
    F --> G[Giá cập nhật hoặc hiện Liên hệ báo giá]
    D --> H[Thấy Mã Sản Phẩm SKU & Nút Tư vấn]
    H --> I1[Bấm Nhắn Zalo: Mở Zalo kèm Mã SKU]
    H --> I2[Bấm Gọi Điện: Quay số Hotline trực tiếp]
    I1 --> J[Tư vấn & Chốt đơn ngoài website]
    I2 --> J
```

### Luồng 2: Đọc Bài viết Kiến thức và Khám phá Sản phẩm
```mermaid
graph TD
    A[Đọc bài viết: VD Hướng dẫn chọn size vòng tay] --> B[Tiếp nhận kiến thức chuyên sâu]
    B --> C[Xem khối Sản phẩm liên quan trong bài viết]
    C --> D[Chuyển hướng đến Chi tiết sản phẩm]
    D --> E[Liên hệ tư vấn Zalo / Gọi điện]
```

### Luồng 3: Quản trị viên cập nhật Nội dung
```mermaid
graph TD
    A[Đăng nhập Quản trị /admin] --> B{Chọn tác vụ}
    B --> C[Thêm/Sửa Sản phẩm]
    B --> D[Viết/Sửa Bài viết]
    B --> E[Cập nhật Hotline, Zalo, Địa chỉ]
    C --> F[Chọn trạng thái Nháp hoặc Đã đăng]
    C --> G[Tích chọn Hiển thị Nổi bật trang chủ]
    F --> H[Lưu dữ liệu vào Storage Adapter]
    H --> I[Trang khách hàng tự động cập nhật]
```
