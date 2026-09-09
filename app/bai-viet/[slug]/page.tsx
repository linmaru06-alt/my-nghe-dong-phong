import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";
import { getAllPosts, getPostBySlug } from "@/lib/server/posts";

export const dynamicParams = true;
export const revalidate = 0;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết | Mỹ Nghệ Đông Phong",
    };
  }

  const thumb = post.thumbnail || "/images/placeholder.svg";

  return {
    title: `${post.title} | Mỹ Nghệ Đông Phong`,
    description: post.excerpt?.slice(0, 160) || "",
    openGraph: {
      title: `${post.title} — Mỹ Nghệ Đông Phong`,
      description: post.excerpt?.slice(0, 160) || "",
      images: [{ url: thumb }],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 w-full">
      <BlogDetailClient post={post} />
    </main>
  );
}

