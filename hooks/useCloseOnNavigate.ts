"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Hook tự động đóng các menu/modal, giải phóng khóa cuộn body overflow: hidden
 * và đưa thanh cuộn lên đầu trang một cách mượt mà khi người dùng đổi trang.
 */
export function useCloseOnNavigate(callbacks?: (() => void)[]) {
  const pathname = usePathname();

  useEffect(() => {
    // Đảm bảo body không bị khóa cuộn
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    }

    // Thực thi các callback đóng panel/dropdown nếu được truyền vào
    if (callbacks && callbacks.length > 0) {
      callbacks.forEach((cb) => {
        try {
          cb();
        } catch (e) {
          console.error("[useCloseOnNavigate] Lỗi đóng modal:", e);
        }
      });
    }

    // Reset cuộn chuột về đầu trang
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);
}

export default useCloseOnNavigate;
