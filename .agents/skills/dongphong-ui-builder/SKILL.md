---
name: dongphong-ui-builder
description: >-
  Use this skill when developing, refactoring, or polishing user interface components, styles, animations, and responsive mobile layouts for My Nghe Dong Phong.
---

# Dong Phong UI Builder Skill

This skill provides step-by-step instructions and best practices for creating luxury, mobile-optimized interfaces for **Mỹ Nghệ Đông Phong**.

## Design Philosophy: "Tinh hoa gỗ Việt — Tinh tế & Sang trọng"

- **Color Harmony:** Warm ivory base (`#FDFBF7`), rich natural wood tones (`#5C3A21`, `#3A2012`), and subtle metallic gold accents (`#C5A059`).
- **Typography:** Serif headings (`Cinzel` or `Playfair Display`) paired with clean, readable body text (`Be Vietnam Pro`).
- **Texture & Imagery:** Authentic wood grain macro-focus, generous white-space, elegant borders.

## Key UI Components & Interactions

### 1. Floating Fast Consultation CTA (Mobile & Desktop)
- Positioned fixed at bottom-right of viewport (or bottom fixed bar on mobile).
- Must have:
  - Zalo chat button with instant brand icon and hover tooltip "Tư vấn qua Zalo".
  - Hotline telephone button with pulsing ring effect.
  - Passes current product SKU dynamically into the chat prompt.

### 2. Product Detail Gallery & Dynamic Sizing
- Main photo display with click-to-zoom/lightbox.
- Thumbnail carousel below.
- Size selector pills/buttons:
  - Active pill has gold border and warm wood background.
  - Selecting a pill recalculates the displayed price or toggles "Liên hệ báo giá".

### 3. Filter Bar (Search, Category & Wood Type)
- Real-time search by keyword or SKU.
- Category pills with product counts.
- Wood type multi-select dropdown.
- Empty state: Gentle message "Không tìm thấy tác phẩm phù hợp với tiêu chí tìm kiếm" with a "Đặt lại bộ lọc" reset button.

### 4. Admin CMS Interface
- Clean dashboard with tabs: Quản lý Sản phẩm | Quản lý Bài viết | Cấu hình Doanh nghiệp.
- Status toggle badge: "Đã đăng" (Xanh ngọc / Green) vs "Bản nháp" (Vàng hổ phách / Amber).
- Quick search & filter in table view.
