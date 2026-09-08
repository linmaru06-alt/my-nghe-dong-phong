import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default function AdminEditPostPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin/bai-viet" className="text-sm text-text-muted hover:text-primary mb-4 inline-block">
        ← Quay lại danh sách bài viết
      </Link>
      <h1 className="text-2xl font-serif text-primary font-bold mb-6">
        Chỉnh Sửa Bài Viết: {params.id}
      </h1>
    </div>
  );
}
