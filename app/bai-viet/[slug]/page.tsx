import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import postsData from "@/data/posts.json";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return postsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = postsData.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết | Mỹ Nghệ Đông Phong",
    };
  }

  return {
    title: `${post.title} | Mỹ Nghệ Đông Phong`,
    description: post.excerpt.slice(0, 160),
    openGraph: {
      title: `${post.title} — Mỹ Nghệ Đông Phong`,
      description: post.excerpt.slice(0, 160),
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
    },
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  return (
    <main className="flex-1 w-full">
      <BlogDetailClient slug={params.slug} />
    </main>
  );
}
