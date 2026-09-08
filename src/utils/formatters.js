/**
 * Tiện ích định dạng giá, ngày tháng và liên kết tư vấn
 */

/**
 * Định dạng giá theo quy chuẩn Mỹ Nghệ Đông Phong:
 * - Có giá dương: 1.850.000 ₫
 * - Chưa có giá hoặc đánh dấu báo giá riêng: "Liên hệ báo giá"
 * - Tuyệt đối không hiển thị 0 ₫
 */
export function formatPrice(price, priceContactOnly = false) {
  if (priceContactOnly || price === null || price === undefined || price <= 0) {
    return "Liên hệ báo giá";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(price).replace(/\s+/g, " ");
}

/**
 * Tạo link Zalo tư vấn kèm mã sản phẩm và tên tác phẩm tự động
 */
export function createZaloConsultUrl(phone, productName = "", sku = "") {
  const cleanPhone = phone.replace(/\D/g, "");
  let text = "Chào Mỹ Nghệ Đông Phong, tôi cần tư vấn";
  if (productName && sku) {
    text = `Chào Mỹ Nghệ Đông Phong, tôi muốn được tư vấn về tác phẩm "${productName}" (Mã: ${sku}).`;
  } else if (productName) {
    text = `Chào Mỹ Nghệ Đông Phong, tôi muốn được tư vấn về tác phẩm "${productName}".`;
  }
  return `https://zalo.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Định dạng số điện thoại gọi trực tiếp
 */
export function createTelUrl(phone) {
  const cleanPhone = phone.replace(/\D/g, "");
  return `tel:${cleanPhone}`;
}

/**
 * Định dạng ngày đăng bài viết tiếng Việt
 */
export function formatDateVi(isoDateString) {
  try {
    const d = new Date(isoDateString);
    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  } catch {
    return isoDateString;
  }
}
