import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format ngày tiếng Việt: "12 tháng 6, 2025"
 */
export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day} tháng ${month}, ${year}`;
  } catch {
    return dateString;
  }
}
