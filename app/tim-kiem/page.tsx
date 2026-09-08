export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif text-primary mb-4 font-bold">
        Kết Quả Tìm Kiếm {query && `cho "${query}"`}
      </h1>
    </div>
  );
}
