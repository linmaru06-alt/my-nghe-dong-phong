import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-screen">
      <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4 font-bold">
        Mỹ Nghệ Đông Phong
      </h1>
      <p className="text-lg text-text-muted max-w-xl mb-8">
        Tinh hoa từ những thớ gỗ quý — Khởi tạo nền tảng dự án Next.js 14 App Router thành công.
      </p>
      <div className="flex gap-4">
        <Link
          href="/san-pham"
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-btn font-medium transition"
        >
          Xem Sản Phẩm
        </Link>
        <Link
          href="/admin"
          className="border border-border hover:border-primary text-text px-6 py-3 rounded-btn font-medium transition"
        >
          Trang Quản Trị
        </Link>
      </div>
    </main>
  );
}
