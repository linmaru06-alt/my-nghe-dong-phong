"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Save, Send, Eye } from "lucide-react";
import { usePostsStore } from "@/lib/usePosts";
import { slugify } from "@/lib/slugify";

export interface BlogFormData {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  readingTime: number;
  status: "published" | "draft";
  publishedAt?: string;
}

export interface BlogFormProps {
  initialData?: BlogFormData;
  isEdit?: boolean;
}

export function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const { addPost, updatePost } = usePostsStore();

  const [formData, setFormData] = useState<BlogFormData>(
    initialData || {
      title: "",
      slug: "",
      category: "kien-thuc-ve-go",
      excerpt: "",
      content: "## 1. Giới thiệu tổng quan\n\nNội dung chi tiết bài viết...",
      thumbnail: "/images/blog-placeholder.jpg",
      readingTime: 5,
      status: "published",
    }
  );

  const [isPreviewTab, setIsPreviewTab] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const updates: Partial<BlogFormData> = { title };
    if (!isEdit) {
      updates.slug = slugify(title);
    }
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  // Estimate reading time from words
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    setFormData((prev) => ({ ...prev, content, readingTime }));
  };

  const handleSave = (statusToSet?: "published" | "draft") => {
    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    const finalStatus = statusToSet || formData.status;
    const postPayload = {
      ...formData,
      status: finalStatus,
      id: formData.id || `post-${Date.now()}`,
      publishedAt:
        (formData as any).publishedAt ||
        new Date().toISOString().split("T")[0],
    };

    if (isEdit && formData.id) {
      updatePost(formData.id, postPayload);
    } else {
      addPost(postPayload as any);
    }

    setToastMessage("✓ Đã lưu bài viết thành công!");
    setTimeout(() => {
      setToastMessage(null);
      router.push("/admin/bai-viet");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-16 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-btn shadow-xl text-sm font-semibold animate-in fade-in duration-200">
          {toastMessage}
        </div>
      )}

      {/* Main Form Fields */}
      <div className="bg-surface p-6 md:p-8 rounded-card border border-border shadow-xs space-y-6">
        <h2 className="font-serif text-lg font-bold text-primary border-b border-border pb-3">
          Nội Dung Bài Viết
        </h2>

        <div>
          <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
            Tiêu đề bài viết *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            required
            placeholder="VD: Cẩm nang phân biệt gỗ Tử Đàn Ấn Độ và Tử Đàn Nam Phi"
            className="w-full bg-bg border border-border rounded-btn px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-primary font-serif font-bold text-base"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
              Đường dẫn (Slug) *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              className="w-full font-mono text-xs bg-bg border border-border rounded-btn px-3.5 py-2.5 text-text focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
              Nhóm chủ đề *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full bg-bg border border-border rounded-btn px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-primary"
            >
              <option value="kien-thuc-ve-go">Kiến thức về gỗ</option>
              <option value="huong-dan-lua-chon">Hướng dẫn lựa chọn</option>
              <option value="bao-quan-san-pham">Bảo quản sản phẩm</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
              Thời gian đọc (ước tính)
            </label>
            <input
              type="number"
              value={formData.readingTime}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  readingTime: Number(e.target.value),
                }))
              }
              className="w-full bg-bg border border-border rounded-btn px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
            URL Ảnh đại diện thumbnail
          </label>
          <input
            type="text"
            value={formData.thumbnail}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))
            }
            className="w-full bg-bg border border-border rounded-btn px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
            Tóm tắt ngắn (Excerpt)
          </label>
          <textarea
            rows={2}
            value={formData.excerpt}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
            }
            placeholder="Tóm tắt ngắn 1-2 câu hiển thị ngoài trang danh sách..."
            className="w-full bg-bg border border-border rounded-btn p-3 text-sm text-text focus:outline-none focus:border-primary"
          />
        </div>

        {/* Markdown Editor with Preview Toggle */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-text uppercase tracking-wider">
              Nội dung bài viết (Markdown)
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPreviewTab(false)}
                className={`px-3 py-1 rounded text-xs font-medium ${
                  !isPreviewTab
                    ? "bg-primary text-white"
                    : "bg-bg text-text-muted hover:text-text"
                }`}
              >
                Soạn thảo
              </button>
              <button
                type="button"
                onClick={() => setIsPreviewTab(true)}
                className={`px-3 py-1 rounded text-xs font-medium ${
                  isPreviewTab
                    ? "bg-primary text-white"
                    : "bg-bg text-text-muted hover:text-text"
                }`}
              >
                Xem trước
              </button>
            </div>
          </div>

          {!isPreviewTab ? (
            <textarea
              rows={14}
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Sử dụng cú pháp Markdown: ## Tiêu đề h2, ### Tiêu đề h3, > Trích dẫn..."
              className="w-full font-mono text-xs bg-bg border border-border rounded-btn p-4 text-text focus:outline-none focus:border-primary leading-relaxed"
            />
          ) : (
            <div className="p-6 rounded-btn border border-border bg-bg min-h-[300px] prose prose-stone max-w-none text-sm">
              <ReactMarkdown>{formData.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-4 z-30 p-4 rounded-card bg-surface/95 backdrop-blur-md border border-border shadow-xl flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.open(`/bai-viet/${formData.slug}?preview=true`, "_blank")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-btn border border-border hover:border-primary text-xs font-semibold text-text transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Xem trước bài viết</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn border border-border hover:border-primary text-xs font-semibold text-text transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Lưu nháp</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave("published")}
            className="inline-flex items-center gap-1.5 px-6 py-2 rounded-btn bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Đăng bài viết</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogForm;
