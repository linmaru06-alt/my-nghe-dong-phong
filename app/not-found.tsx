import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[70vh]">
      <h1 className="text-7xl font-serif text-primary mb-4 font-bold">404</h1>
      <h2 className="text-2xl font-serif text-text mb-4">Không Tìm Thấy Tác Phẩm</h2>
      <p className="text-text-muted max-w-md mb-8">
        Đường dẫn bạn truy cập có thể đã được thay đổi hoặc không tồn tại trên hệ thống Mỹ Nghệ Đông Phong.
      </p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-btn font-medium transition"
      >
        Về Trang Chủ
      </Link>
    </div>
  );
}
