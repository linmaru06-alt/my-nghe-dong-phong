"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = "Chưa có dữ liệu nào trong bảng.",
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full p-8 text-center bg-surface border border-border rounded-card animate-pulse text-sm text-text-muted">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-12 text-center bg-surface border border-border rounded-card text-sm text-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-surface border border-border rounded-card shadow-xs">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-bg/80 text-xs font-semibold text-text-muted uppercase tracking-wider">
            {columns.map((col) => (
              <th key={col.key} className={cn("py-3.5 px-4", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className="hover:bg-bg/50 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className={cn("py-3.5 px-4", col.className)}>
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
