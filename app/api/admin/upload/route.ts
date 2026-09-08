import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Cấu hình kích thước tối đa 10MB và định dạng cho phép
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "image/gif",
];

// Hàm làm sạch tên file để an toàn trên đường dẫn web
function sanitizeFileName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "products";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy file tải lên" },
        { status: 400 }
      );
    }

    // Kiểm tra định dạng file
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Định dạng ảnh "${file.type}" không hợp lệ. Chỉ chấp nhận JPG, PNG, WebP, AVIF, SVG, GIF`,
        },
        { status: 400 }
      );
    }

    // Kiểm tra dung lượng
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File dung lượng quá lớn (${(file.size / (1024 * 1024)).toFixed(1)}MB). Giới hạn tối đa là 10MB.`,
        },
        { status: 400 }
      );
    }

    // Thư mục đích trong public/images/
    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");
    const targetDirectory = path.join(process.cwd(), "public", "images", safeFolder);
    await fs.mkdir(targetDirectory, { recursive: true });

    // Tạo tên file duy nhất tránh trùng lặp
    const cleanOriginalName = sanitizeFileName(file.name);
    const extension = path.extname(cleanOriginalName) || ".webp";
    const baseNameWithoutExt = path.basename(cleanOriginalName, extension);
    const uniqueFileName = `${baseNameWithoutExt}-${Date.now()}${extension}`;
    const destinationPath = path.join(targetDirectory, uniqueFileName);

    // Chuyển File thành Buffer và lưu vào đĩa
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(destinationPath, buffer);

    const publicUrl = `/images/${safeFolder}/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      size: file.size,
      mimeType: file.type,
      message: "Tải ảnh thành công và đã lưu vật lý vào thư mục public/images",
    });
  } catch (error: any) {
    console.error("[API /api/admin/upload POST] Lỗi tải ảnh:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi máy chủ khi tải ảnh lên đĩa" },
      { status: 500 }
    );
  }
}
