import React from "react";
import AdminEditPostClient from "./AdminEditPostClient";

interface PageProps {
  params: { id: string };
}

export const metadata = {
  title: "Chỉnh Sửa Bài Viết | Quản Trị Đông Phong",
};

export default function AdminEditPostPage({ params }: PageProps) {
  return <AdminEditPostClient id={params.id} />;
}
