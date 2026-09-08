export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif text-primary mb-4 font-bold">Chi Tiết Sản Phẩm: {params.slug}</h1>
    </div>
  );
}
