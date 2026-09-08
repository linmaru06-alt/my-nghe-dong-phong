# Kế hoạch website Mỹ Nghệ Đông Phong

## 1. Mục tiêu và định hướng

Website tiếng Việt giới thiệu doanh nghiệp, sản phẩm và kiến thức về đồ gỗ. Khách hàng chính là người mua cá nhân; hành động mong muốn là nhắn Zalo hoặc gọi điện để được tư vấn.

Giao diện sang trọng, tinh gọn: nền trắng hoặc kem nhạt, điểm nhấn nâu gỗ, ảnh sản phẩm lớn, dễ xem trên điện thoại.

Bản đầu gồm giới thiệu sản phẩm và bài viết; không có mục Dịch vụ, giỏ hàng, thanh toán trực tuyến hoặc tài khoản khách hàng.

## 2. Sơ đồ website — Sitemap

```text
Trang chủ
├── Sản phẩm
│   ├── Vòng tay
│   ├── Bút ký
│   ├── Bi lăn tay
│   ├── Gối gỗ
│   ├── Tẩu
│   ├── Đũa gỗ
│   └── Đệm khoác ô tô
│       └── Trang chi tiết từng sản phẩm
├── Giới thiệu
├── Bài viết
│   ├── Kiến thức về gỗ
│   ├── Hướng dẫn lựa chọn
│   └── Bảo quản sản phẩm
│       └── Trang chi tiết từng bài viết
└── Liên hệ
```

Đầu trang có logo, menu và tìm kiếm sản phẩm. Cuối trang có thông tin doanh nghiệp, liên hệ, các liên kết chính và chính sách bán hàng thực tế.

## 3. Luồng sử dụng — Flow

**Luồng xem và hỏi mua sản phẩm**

```text
Trang chủ hoặc liên kết được chia sẻ
→ Danh mục sản phẩm
→ Tìm kiếm / lọc sản phẩm
→ Chi tiết sản phẩm
→ Xem ảnh, chất liệu, kích thước và giá
→ Nhấn Zalo hoặc gọi điện
→ Trao đổi và chốt đơn ngoài website
```

Trang chi tiết hiển thị mã sản phẩm gần nút liên hệ để khách dễ cung cấp khi hỏi mua.

**Luồng đọc bài viết**

```text
Trang chủ / trang Bài viết / công cụ tìm kiếm
→ Đọc bài viết
→ Xem sản phẩm liên quan
→ Chi tiết sản phẩm
→ Liên hệ tư vấn
```

**Luồng tìm hiểu doanh nghiệp**

```text
Trang chủ
→ Giới thiệu Mỹ Nghệ Đông Phong
→ Xem sản phẩm hoặc thông tin liên hệ
→ Nhắn Zalo / gọi điện
```

**Luồng quản trị**

```text
Đăng nhập quản trị
→ Chọn Sản phẩm hoặc Bài viết
→ Thêm mới / chỉnh sửa
→ Nhập nội dung và tải ảnh
→ Lưu nháp → Xem trước → Đăng
→ Nội dung xuất hiện trên website
```

## 4. Nội dung và tính năng từng trang

| Trang | Nội dung chính | Tính năng |
|---|---|---|
| **Trang chủ** | Ảnh đại diện thương hiệu; giới thiệu ngắn; 7 danh mục; sản phẩm nổi bật; bài viết mới; liên hệ | Đi đến danh mục, xem sản phẩm, nhắn Zalo |
| **Sản phẩm** | Danh sách ảnh, tên, loại gỗ và giá hoặc “Liên hệ báo giá” | Tìm theo tên/mã; lọc theo danh mục và loại gỗ; phân trang |
| **Chi tiết sản phẩm** | Bộ ảnh; tên và mã; loại gỗ; kích thước; giá; mô tả; hướng dẫn bảo quản; sản phẩm cùng danh mục | Xem ảnh lớn, chọn kích thước nếu có, nhắn Zalo, gọi điện |
| **Giới thiệu** | Câu chuyện Đông Phong; hoạt động kinh doanh; dòng sản phẩm; ảnh thực tế; thông tin tạo niềm tin có thể xác nhận | Đi đến sản phẩm và liên hệ |
| **Bài viết** | Danh sách bài theo 3 nhóm nội dung, ảnh đại diện và đoạn giới thiệu | Lọc theo nhóm, phân trang |
| **Chi tiết bài viết** | Tiêu đề; ngày đăng; nội dung; ảnh; bài và sản phẩm liên quan | Đọc tiếp, xem sản phẩm liên quan |
| **Liên hệ** | Số điện thoại, Zalo, địa chỉ và giờ hoạt động nếu có | Gọi, mở Zalo, mở bản đồ khi có địa chỉ xác nhận |

**Cách trình bày giá và kích thước**

- Sản phẩm có giá: hiển thị giá bằng VNĐ.
- Sản phẩm chưa có giá: hiển thị “Liên hệ báo giá”.
- Sản phẩm có nhiều kích thước: dùng một trang chung, liệt kê các lựa chọn. Khi có giá riêng theo kích thước, giá thay đổi theo lựa chọn; kích thước chưa có giá hiển thị “Liên hệ báo giá”.
- Không hiển thị giá bằng 0 khi chưa nhập giá.

**Trang quản trị**

Cho phép bạn quản lý sản phẩm, danh mục, loại gỗ, kích thước, giá, ảnh, bài viết và thông tin doanh nghiệp. Có trạng thái nháp/đã đăng và lựa chọn sản phẩm nổi bật trên trang chủ. Bản đầu dùng một tài khoản quản trị.

## 5. Kế hoạch nội dung

**Danh mục sản phẩm khởi tạo**

| Danh mục | Số sản phẩm | Sản phẩm đã có |
|---|---:|---|
| Vòng tay | 6 | Tử đàn, sưa, nu bách xanh, nu ngọc am chìm, chớp bách xanh, trầm |
| Bút ký | 4 | Nu huyết long, nu bách xanh, hoàng đàn, mun sừng |
| Bi lăn tay | 2 | Cẩm, sưa |
| Gối gỗ | 2 | Sưa, bách xanh |
| Tẩu | 2 | Gỗ trắc cán sừng, gỗ nu cẩm |
| Đũa gỗ | 2 | Mun sừng, gỗ trắc |
| Đệm khoác ô tô | 2 | Gỗ trắc, bách xanh |
| **Tổng** | **20** | |

**Sáu bài viết đề xuất cho đợt đầu**

1. Cách chọn kích thước hạt vòng tay gỗ phù hợp.
2. Cách bảo quản vòng tay gỗ khi sử dụng hằng ngày.
3. Những điều cần xem khi chọn bút ký gỗ làm quà.
4. Vân gỗ và nu gỗ: những đặc điểm thường gặp.
5. Cách vệ sinh và bảo quản đũa gỗ.
6. Giới thiệu các nhóm sản phẩm tại Mỹ Nghệ Đông Phong.
