import React from "react";
import AdminEditProductClient from "./AdminEditProductClient";

interface PageProps {
  params: { id: string };
}

export const metadata = {
  title: "Chỉnh Sửa Sản Phẩm | Quản Trị Đông Phong",
};

export default function AdminEditProductPage({ params }: PageProps) {
  return <AdminEditProductClient id={params.id} />;
}
