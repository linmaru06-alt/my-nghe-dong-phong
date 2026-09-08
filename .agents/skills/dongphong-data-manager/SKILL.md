---
name: dongphong-data-manager
description: >-
  Use this skill when seeding, validating, updating, or formatting products, wood types, categories, and articles for My Nghe Dong Phong website.
---

# Dong Phong Data Manager Skill

This skill guides AI agents and developers on managing the 20 initial woodcraft products, 7 categories, and 6 knowledge articles according to the brand's business specifications.

## Categories & 20 Seed Products Overview

1. **Vòng tay (6 products):**
   - Tử đàn tiểu diệp
   - Sưa đỏ Bắc Bộ
   - Nu bách xanh Mộc Châu chìm nước
   - Nu ngọc am Hà Giang chìm nước
   - Chớp bách xanh thơm ngát
   - Trầm hương tự nhiên
2. **Bút ký (4 products):**
   - Nu huyết long thấu quang
   - Nu bách xanh
   - Hoàng đàn Lạng Sơn
   - Mun sừng đen bóng
3. **Bi lăn tay (2 products):**
   - Cẩm lai vân chỉ
   - Sưa đỏ già
4. **Gối gỗ (2 products):**
   - Gối hạt sưa đỏ
   - Gối hạt bách xanh thơm tự nhiên
5. **Tẩu thuốc (2 products):**
   - Tẩu gỗ trắc cán sừng
   - Tẩu gỗ nu cẩm
6. **Đũa gỗ (2 products):**
   - Đũa gỗ mun sừng cao cấp
   - Đũa gỗ trắc đỏ đen
7. **Đệm khoác ô tô (2 products):**
   - Đệm hạt gỗ trắc
   - Đệm hạt bách xanh

## 6 Seed Knowledge Articles

1. `cach-chon-kich-thuoc-hat-vong-tay-go-phu-hop`: Hướng dẫn chọn size hạt 10mm, 12mm, 14mm, 16mm theo cổ tay nam nữ và số hạt phong thủy (sinh - lão - bệnh - tử).
2. `cach-bao-quan-vong-tay-go-khi-su-dung-hang-ngay`: Giữ mùi thơm tự nhiên, tránh hóa chất, cách lên nước bóng đẹp theo thời gian.
3. `nhung-dieu-can-xem-khi-chon-but-ky-go-lam-qua`: Chọn loại gỗ theo tính cách và mệnh (Huyết long, Hoàng đàn, Mun sừng), cách chọn ruột bút cao cấp.
4. `van-go-va-nu-go-nhung-dac-diem-thuong-gap`: Phân biệt nu, chớp, chun, vân hoa tự nhiên và giá trị sưu tầm của phôi gỗ quý.
5. `cach-ve-sinh-va-bao-quan-dua-go`: Cách dùng đũa mun sừng và gỗ trắc không bị mốc, không xơ, an toàn sức khỏe gia đình.
6. `gioi-thieu-cac-nhom-san-pham-tai-my-nghe-dong-phong`: Tinh hoa chế tác mộc thủ công, các dòng vật phẩm mang lại giá trị bền vững và phong thủy an lành.

## Data Validation Checklist

When updating or adding a product:
- [ ] Has unique, memorable `sku` (e.g. `VT-TD-01`, `BK-HL-01`).
- [ ] Category belongs to one of the 7 official IDs.
- [ ] `price` is positive integer OR `null` (never `0`).
- [ ] If size variants exist, each has a clear label and appropriate price/null.
- [ ] Status is set to `'published'` or `'draft'`.
