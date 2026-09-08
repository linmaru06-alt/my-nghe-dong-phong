import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

function findPostBySlug(rawSlug: string) {
  if (!rawSlug) return undefined;
  const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
  return (
    postsData.find((p) => p.slug.toLowerCase() === decoded) ||
    postsData.find((p) => p.id.toLowerCase() === decoded)
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = findPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết | Mỹ Nghệ Đông Phong",
    };
  }

  const thumb = post.thumbnail || "/images/placeholder.svg";

  return {
    title: `${post.title} | Mỹ Nghệ Đông Phong`,
    description: post.excerpt.slice(0, 160),
    openGraph: {
      title: `${post.title} — Mỹ Nghệ Đông Phong`,
      description: post.excerpt.slice(0, 160),
      images: [{ url: thumb }],
    },
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  const post = findPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 w-full">
      <BlogDetailClient post={post} />
    </main>
  );
}
