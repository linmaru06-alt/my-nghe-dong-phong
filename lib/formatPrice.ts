/**
 * Định dạng giá theo quy chuẩn Mỹ Nghệ Đông Phong:
 * - Có giá: "1.200.000 ₫"
 * - Không có giá: "Liên hệ báo giá"
 * - Tuyệt đối không hiển thị "0 ₫"
 */
export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined || price <= 0) {
    return "Liên hệ báo giá";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price).replace(/\s+/g, " ");
}

/**
 * Tạo URL Zalo tư vấn kèm tên sản phẩm và mã SKU
 */
export function createZaloLink(phone: string, productName?: string, code?: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  let msg = "Chào Mỹ Nghệ Đông Phong, tôi cần tư vấn";
  if (productName && code) {
    msg = `Chào Mỹ Nghệ Đông Phong, tôi muốn được tư vấn tác phẩm "${productName}" (Mã: ${code})`;
  } else if (productName) {
    msg = `Chào Mỹ Nghệ Đông Phong, tôi muốn được tư vấn tác phẩm "${productName}"`;
  }
  return `https://zalo.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
}
