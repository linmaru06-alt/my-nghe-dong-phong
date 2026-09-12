/**
 * Định dạng giá theo quy chuẩn Mỹ Nghệ Đông Phong:
 * - Có giá: "1.200.000 ₫"
 * - Không có giá: "Liên hệ báo giá"
 * - Tuyệt đối không hiển thị "0 ₫"
 */
export function formatPrice(price: number | bigint | string | null | undefined): string {
  if (price === null || price === undefined) {
    return "Liên hệ báo giá";
  }

  const num = typeof price === "bigint" ? Number(price) : typeof price === "string" ? Number(price) : price;

  if (isNaN(num) || num <= 0) {
    return "Liên hệ báo giá";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(num).replace(/\s+/g, " ");
}

/**
 * Tạo URL Zalo tư vấn kèm mã SKU và tên sản phẩm
 */
export function createZaloLink(
  zaloOrPhone: string,
  code?: string,
  productName?: string
): string {
  // Extract phone if full URL
  const phone = zaloOrPhone.replace(/^https?:\/\/zalo\.me\//, "").replace(/\D/g, "");
  let msg = "Chào Mỹ Nghệ Đông Phong, tôi cần tư vấn tác phẩm đồ gỗ quý.";
  if (code && productName) {
    msg = `Chào Mỹ Nghệ Đông Phong, tôi muốn được tư vấn tác phẩm "${productName}" (Mã: ${code})`;
  } else if (code) {
    msg = `Chào Mỹ Nghệ Đông Phong, tôi muốn được tư vấn tác phẩm có mã "${code}"`;
  } else if (productName) {
    msg = `Chào Mỹ Nghệ Đông Phong, tôi muốn được tư vấn tác phẩm "${productName}"`;
  }
  return `https://zalo.me/${phone || "0968888972"}?text=${encodeURIComponent(msg)}`;
}
