import React from "react";
import Badge from "@/components/ui/Badge";

export interface StatusBadgeProps {
  status: "published" | "draft" | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isPublished = status.toLowerCase() === "published";

  return (
    <Badge variant={isPublished ? "status-published" : "status-draft"}>
      {isPublished ? "Đã đăng" : "Bản nháp"}
    </Badge>
  );
}

export default StatusBadge;
