import Link from "next/link";

export default function AdminAddProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin/san-pham" className="text-sm text-text-muted hover:text-primary mb-4 inline-block">
        ← Quay lại danh sách sản phẩm
      </Link>
      <h1 className="text-2xl font-serif text-primary font-bold mb-6">Thêm Sản Phẩm Mới</h1>
    </div>
  );
}
