import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default function AdminEditProductPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin/san-pham" className="text-sm text-text-muted hover:text-primary mb-4 inline-block">
        ← Quay lại danh sách sản phẩm
      </Link>
      <h1 className="text-2xl font-serif text-primary font-bold mb-6">
        Chỉnh Sửa Sản Phẩm: {params.id}
      </h1>
    </div>
  );
}
