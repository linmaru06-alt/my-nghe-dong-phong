# Website Mỹ Nghệ Đông Phong

Dự án website chính thức của thương hiệu **Mỹ Nghệ Đông Phong** — Chuyên chế tác thủ công các vật phẩm đồ gỗ quý phong thủy & đời sống (Vòng tay, Bút ký, Bi lăn tay, Gối gỗ, Tẩu thuốc, Đũa gỗ, Đệm khoác ô tô).

---

## 1. Kiến Trúc AI Agent Coding (`.agents/` & `AGENTS.md`)

Dự án được cấu hình sẵn môi trường chuyên biệt cho các AI Coding Agent trong Antigravity IDE:

```text
├── AGENTS.md                                # Quy chuẩn kim chỉ nam cho AI Agent
└── .agents/
    ├── rules/
    │   ├── design-system.md                 # Quy chuẩn màu sắc (kem/nâu gỗ), font chữ & tương tác
    │   ├── product-catalog-rules.md         # Quy chuẩn schema 20 sản phẩm & quy tắc hiển thị giá
    │   ├── admin-cms-rules.md               # Quy chuẩn luồng quản trị nháp/đã đăng, storage adapter
    │   └── seo-content-rules.md             # Quy chuẩn SEO, thẻ semantic và Schema JSON-LD
    └── skills/
        ├── dongphong-data-manager/SKILL.md  # Skill quản lý 20 sản phẩm & 6 bài viết khởi tạo
        └── dongphong-ui-builder/SKILL.md    # Skill dựng giao diện mộc sang trọng & responsive
```

---

## 2. Cấu Trúc Thư Mục Mã Nguồn

```text
├── docs/                                    # Kế hoạch & sơ đồ sitemap chi tiết
│   ├── plan.md
│   └── sitemap-flow.md
├── src/
│   ├── config/
│   │   └── site-config.js                   # Hotline, Zalo, địa chỉ xưởng, chính sách
│   ├── data/
│   │   ├── categories.js                    # 7 danh mục cốt lõi
│   │   ├── wood-types.js                    # Danh sách các dòng gỗ quý
│   │   ├── products.js                      # 20 sản phẩm mẫu chuẩn dữ liệu
│   │   ├── articles.js                      # 6 bài viết kiến thức chuyên sâu
│   │   └── storage-adapter.js               # Quản lý dữ liệu LocalStorage & CRUD cho Admin
│   ├── styles/                              # Hệ thống Vanilla CSS sang trọng
│   │   ├── variables.css                    # Design tokens
│   │   ├── base.css                         # Typography & layout reset
│   │   ├── layout.css                       # Header, Footer, Breadcrumbs, Floating CTA
│   │   ├── components.css                   # Card sản phẩm, bộ lọc, size selector
│   │   ├── responsive.css                   # Tối ưu giao diện di động
│   │   └── admin.css                        # Bảng điều khiển quản trị CMS
│   ├── components/                          # Các thành phần tái sử dụng
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── FloatingContact.jsx
│   ├── pages/                               # Các trang theo sitemap
│   │   ├── Home.jsx                         # Trang chủ
│   │   ├── Catalog.jsx                      # Danh mục & tìm kiếm / lọc sản phẩm
│   │   ├── ProductDetail.jsx                # Chi tiết sản phẩm & tư vấn theo mã SKU
│   │   ├── About.jsx                        # Giới thiệu câu chuyện Đông Phong
│   │   ├── Articles.jsx                     # Danh sách bài viết kiến thức
│   │   ├── ArticleDetail.jsx                # Chi tiết bài viết & sản phẩm liên quan
│   │   ├── Contact.jsx                      # Liên hệ & form tư vấn Zalo
│   │   └── Admin.jsx                        # Quản trị sản phẩm, bài viết & cấu hình
│   ├── utils/
│   │   ├── formatters.js                    # Format tiền VNĐ, URL Zalo tự điền mã SKU
│   │   └── seo.js                           # Cập nhật Title, Meta tags tự động
│   ├── App.jsx
│   └── main.jsx
```

---

## 3. Khởi Chạy Dự Án Trên Máy Tính

Trên Windows PowerShell, sử dụng lệnh `npm.cmd`:

```powershell
# Cài đặt thư viện phụ thuộc (nếu chưa có)
npm.cmd install

# Chạy server phát triển (Development Server)
npm.cmd run dev

# Đóng gói sản phẩm (Production Build)
npm.cmd run build
```
