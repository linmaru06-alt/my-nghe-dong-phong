# Quy chuẩn Tối ưu SEO & Nội dung Đồ Gỗ: Mỹ Nghệ Đông Phong

Tài liệu này xác định các tiêu chuẩn tối ưu hóa công cụ tìm kiếm (SEO), cấu trúc thẻ Semantic HTML, định dạng URL thân thiện và dữ liệu có cấu trúc Schema.org cho website **Mỹ Nghệ Đông Phong**.

---

## 1. Cấu trúc Thẻ Semantic & Heading Hierarchy

- Mỗi trang duy nhất chỉ có **1 thẻ `<h1>`** mô tả chủ đề cốt lõi của trang đó:
  - Trang chủ: `Mỹ Nghệ Đông Phong — Đồ Gỗ Mỹ Nghệ & Quà Tặng Phong Thủy Cao Cấp`
  - Trang danh mục: `Vòng Tay Gỗ Quý Tự Nhiên — Mỹ Nghệ Đông Phong`
  - Trang chi tiết sản phẩm: `{Tên Sản Phẩm} — {Loại Gỗ}`
  - Trang bài viết: `{Tiêu Đề Bài Viết}`
- Các thẻ con tuần tự theo cấp `<h2>`, `<h3>`, tuyệt đối không nhảy cóc cấp độ heading.
- Sử dụng các thẻ cấu trúc HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.

---

## 2. Tiêu đề & Thẻ Meta SEO Tiếng Việt

Mỗi trang phải có đầy đủ các thẻ meta trong `<head>`:
- **Title tag:** Tối đa 60-70 ký tự, chứa từ khóa chính + thương hiệu Đông Phong.
- **Meta Description:** 140-160 ký tự, hấp dẫn, nêu rõ nguồn gốc gỗ thật, hoàn thiện thủ công, hotline tư vấn.
- **Open Graph (og:title, og:image, og:description):** Phục vụ chia sẻ đẹp mắt trên Zalo, Facebook.
- **Canonical URL:** Đường dẫn chuẩn tránh trùng lặp nội dung.

---

## 3. Quy chuẩn Dữ liệu có cấu trúc (Schema.org JSON-LD)

1. **Schema LocalBusiness:**
   - Khai báo tại Trang chủ & Trang Liên hệ: Tên doanh nghiệp, số điện thoại, khu vực phục vụ đồ gỗ thủ công mỹ nghệ.
2. **Schema Product:**
   - Khai báo tại từng trang Chi tiết sản phẩm: Tên, hình ảnh, mã SKU, thương hiệu "Mỹ Nghệ Đông Phong", chất liệu gỗ, giá bán hoặc tình trạng còn hàng.
3. **Schema Article:**
   - Khai báo tại các trang Chi tiết bài viết chia sẻ kiến thức đồ gỗ.
4. **Schema BreadcrumbList:**
   - Giúp Google hiển thị thanh điều hướng danh mục phân cấp trên kết quả tìm kiếm.

---

## 4. Quy chuẩn URL Slugs Thân thiện

- Chuyển đổi tiếng Việt có dấu sang không dấu, cách nhau bằng dấu gạch ngang `-`.
- Ví dụ:
  - Danh mục: `/san-pham/vong-tay`, `/san-pham/but-ky`
  - Sản phẩm: `/san-pham/vong-tay-tu-dan-tieu-diep-vt-td-01`
  - Bài viết: `/bai-viet/cach-chon-kich-thuoc-hat-vong-tay-go-phu-hop`
