import SearchClient from "./SearchClient";

export const metadata = {
  title: "Tìm Kiếm Sản Phẩm & Bài Viết | Mỹ Nghệ Đông Phong",
  description: "Tra cứu nhanh các sản phẩm vòng tay gỗ quý, bút ký, gối đệm và kiến thức đồ gỗ tại Mỹ Nghệ Đông Phong.",
};

interface SearchPageProps {
  searchParams?: {
    q?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <main className="flex-1 w-full bg-bg">
      <SearchClient initialQuery={searchParams?.q || ""} />
    </main>
  );
}
