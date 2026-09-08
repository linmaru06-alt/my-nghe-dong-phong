# Quy chuẩn Quản trị CMS & Luồng Dữ liệu: Mỹ Nghệ Đông Phong

Tài liệu này xác định các quy tắc quản lý dữ liệu, kiểm soát trạng thái xuất bản, xác thực đơn giản và các luồng chức năng cho trang Quản trị (Admin CMS) của **Mỹ Nghệ Đông Phong**.

---

## 1. Mục tiêu & Phạm vi Trang Quản trị

Trang quản trị phục vụ chủ xưởng / người quản lý cửa hàng:
- Quản lý kho sản phẩm (20 sản phẩm khởi tạo và các sản phẩm thêm mới).
- Quản lý danh mục & các loại gỗ quý.
- Quản lý bài viết kiến thức (6 bài viết ban đầu và các bài viết bổ sung).
- Quản lý thông tin doanh nghiệp (Hotline, Zalo, địa chỉ xưởng/showroom, giờ làm việc).
- Không yêu cầu hệ thống thanh toán hay quản lý đơn hàng online (vì chốt đơn qua điện thoại/Zalo).

---

## 2. Quy chuẩn Trạng thái Nội dung (Publishing Lifecycle)

Mỗi Sản phẩm hoặc Bài viết đều có chu kỳ trạng thái nghiêm ngặt:
1. **Trạng thái `draft` (Nháp):**
   - Đang chuẩn bị nội dung, hình ảnh hoặc chưa xác nhận giá phôi gỗ.
   - Chỉ hiển thị trong trang Admin để chủ cơ sở biên tập và xem trước (`Preview`).
   - **Tuyệt đối không xuất hiện** trên Trang chủ, Trang danh mục hay kết quả Tìm kiếm của khách hàng.
2. **Trạng thái `published` (Đã đăng):**
   - Đầy đủ thông tin, ảnh rõ nét, loại gỗ chính xác.
   - Xuất hiện công khai trên toàn bộ website.
3. **Cờ `isFeatured` (Sản phẩm nổi bật):**
   - Dành riêng cho các sản phẩm đẹp nhất, hàng tuyển chọn đại diện thương hiệu.
   - Hiển thị trực tiếp ở khối "Tác phẩm Nổi Bật" trên Trang chủ.

---

## 3. Lớp Lưu trữ Dữ liệu (Storage Adapter Architecture)

Để đảm bảo vừa chạy offline/local mượt mà, vừa dễ dàng nâng cấp lên cơ sở dữ liệu thật:
- Hệ thống sử dụng một lớp trừu tượng `src/data/storage-adapter.js`.
- **Giai đoạn khởi đầu (Phase 1):** Khởi tạo từ bộ dữ liệu mẫu tĩnh (`products.js`, `articles.js`), sau đó lưu và đồng bộ vào `localStorage` của trình duyệt quản trị.
- Cung cấp đầy đủ các phương thức:
  - `getProducts(filters)`
  - `getProductById(id)`
  - `saveProduct(productData)`
  - `deleteProduct(id)`
  - `getArticles(category)`
  - `saveArticle(articleData)`
  - `getSiteConfig()`
  - `updateSiteConfig(configData)`
  - `resetToDefaults()` (Hỗ trợ khôi phục nhanh về 20 sản phẩm & 6 bài viết chuẩn ban đầu).

---

## 4. Quy chuẩn Tải ảnh & Thư viện Media

- Hỗ trợ lưu trữ ảnh dưới dạng URL đường dẫn tĩnh `/assets/images/...` hoặc tải trực tiếp ảnh từ máy (chuyển đổi base64 / Object URL lưu local).
- Luôn khuyến khích nhập ảnh có tỉ lệ chuẩn (1:1 vuông cho sản phẩm, 16:9 cho bài viết) để không làm vỡ khung hiển thị trên thiết bị di động.
