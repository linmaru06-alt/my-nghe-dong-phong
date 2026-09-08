import Link from "next/link";

export default function AdminAddPostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin/bai-viet" className="text-sm text-text-muted hover:text-primary mb-4 inline-block">
        ← Quay lại danh sách bài viết
      </Link>
      <h1 className="text-2xl font-serif text-primary font-bold mb-6">Thêm Bài Viết Mới</h1>
    </div>
  );
}
