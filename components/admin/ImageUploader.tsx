"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, X, Star, Plus } from "lucide-react";

export interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxFiles?: number;
}

export function ImageUploader({
  images = [],
  onChange,
  maxFiles = 10,
}: ImageUploaderProps) {
  const [urlInput, setUrlInput] = useState("");

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim() && images.length < maxFiles) {
      onChange([...images, urlInput.trim()]);
      setUrlInput("");
    }
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleSetMain = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const remaining = images.filter((_, i) => i !== index);
    onChange([selected, ...remaining]);
  };

  // Mock file input handler (converts local file to data URL)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (images.length >= maxFiles) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange([...images, event.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-text uppercase tracking-wider block">
          Hình ảnh tác phẩm ({images.length}/{maxFiles})
        </label>
        <span className="text-[11px] text-text-muted">Ảnh đầu tiên là ảnh đại diện</span>
      </div>

      {/* Grid of uploaded images */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {images.map((img, index) => (
          <div
            key={index}
            className="group relative aspect-square rounded-lg overflow-hidden border-2 bg-bg border-border flex items-center justify-center"
          >
            <Image
              src={img}
              alt={`Upload ${index + 1}`}
              fill
              className="object-cover"
            />

            {/* Main Image Badge */}
            {index === 0 && (
              <span className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-pill shadow-xs z-10">
                Ảnh chính
              </span>
            )}

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleSetMain(index)}
                  title="Đặt làm ảnh đại diện"
                  className="p-1.5 rounded-full bg-white/80 hover:bg-white text-amber-600 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                </button>
              )}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                title="Xóa ảnh"
                className="p-1.5 rounded-full bg-white/80 hover:bg-white text-red-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Upload Button Placeholder */}
        {images.length < maxFiles && (
          <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-colors bg-bg/50 hover:bg-surface">
            <Upload className="w-5 h-5 text-text-muted mb-1" />
            <span className="text-[11px] font-medium text-text-muted">Chọn ảnh</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Or Paste Direct Image URL */}
      {images.length < maxFiles && (
        <form onSubmit={handleAddUrl} className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Hoặc dán URL ảnh trực tuyến..."
            className="flex-1 bg-surface border border-border rounded-btn px-3 py-1.5 text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={!urlInput.trim()}
            className="px-3 py-1.5 bg-surface border border-border hover:border-primary text-text hover:text-primary rounded-btn text-xs font-medium transition-colors disabled:opacity-40"
          >
            Thêm
          </button>
        </form>
      )}
    </div>
  );
}

export default ImageUploader;
