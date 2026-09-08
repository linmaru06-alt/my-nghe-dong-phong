import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif text-primary font-bold mb-4">Tổng Quan Quản Trị</h1>
      <p className="text-text-muted mb-6">Trang quản trị nội dung website Mỹ Nghệ Đông Phong.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/san-pham"
          className="p-6 bg-surface border border-border rounded-card hover:border-primary transition"
        >
          <h2 className="text-xl font-bold text-primary mb-2">📦 Quản lý Sản Phẩm</h2>
          <p className="text-text-muted text-sm">Xem, thêm, sửa và quản lý sản phẩm đồ gỗ.</p>
        </Link>
        <Link
          href="/admin/bai-viet"
          className="p-6 bg-surface border border-border rounded-card hover:border-primary transition"
        >
          <h2 className="text-xl font-bold text-primary mb-2">📝 Quản lý Bài Viết</h2>
          <p className="text-text-muted text-sm">Quản lý bài viết kiến thức, cẩm nang chọn gỗ.</p>
        </Link>
      </div>
    </div>
  );
}
