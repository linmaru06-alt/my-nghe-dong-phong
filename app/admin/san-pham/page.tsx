import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-primary font-bold">Quản Lý Sản Phẩm</h1>
        <Link
          href="/admin/san-pham/them"
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-btn text-sm font-medium"
        >
          + Thêm sản phẩm
        </Link>
      </div>
      <p className="text-text-muted">Danh sách sản phẩm quản trị.</p>
    </div>
  );
}
