import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Cấu hình Cloudinary từ biến môi trường
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const isCloudinaryConfigured = Boolean(CLOUD_NAME && API_KEY && API_SECRET);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
  });
}

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

    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");
    const cleanOriginalName = sanitizeFileName(file.name);
    const extension = path.extname(cleanOriginalName) || ".webp";
    const baseNameWithoutExt = path.basename(cleanOriginalName, extension);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Ưu tiên tải trực tiếp lên Cloudinary đám mây nếu đã cấu hình
    if (isCloudinaryConfigured) {
      try {
        const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;
        const uploadResult = await cloudinary.uploader.upload(base64Data, {
          folder: `dongphong/${safeFolder}`,
          public_id: `${baseNameWithoutExt}-${Date.now()}`,
          resource_type: "image",
          overwrite: false,
        });

        return NextResponse.json({
          success: true,
          url: uploadResult.secure_url,
          fileName: uploadResult.public_id,
          size: file.size,
          mimeType: file.type,
          storage: "cloudinary",
          message: "Tải ảnh thành công lên Cloudinary đám mây vĩnh viễn",
        });
      } catch (cloudErr: any) {
        console.error("[API Upload] Lỗi tải lên Cloudinary, đang thử fallback sang đĩa:", cloudErr);
      }
    }

    // 2. Dự phòng: Lưu vào ổ đĩa vật lý (cho môi trường Localhost)
    try {
      const targetDirectory = path.join(process.cwd(), "public", "images", safeFolder);
      await fs.mkdir(targetDirectory, { recursive: true });

      const uniqueFileName = `${baseNameWithoutExt}-${Date.now()}${extension}`;
      const destinationPath = path.join(targetDirectory, uniqueFileName);

      await fs.writeFile(destinationPath, buffer);
      const publicUrl = `/images/${safeFolder}/${uniqueFileName}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        fileName: uniqueFileName,
        size: file.size,
        mimeType: file.type,
        storage: "local",
        message: "Tải ảnh thành công vào thư mục public/images",
      });
    } catch (diskErr: any) {
      // Nếu chạy trên Vercel mà chưa điền Cloudinary keys, đĩa sẽ báo lỗi EROFS
      if (diskErr.code === "EROFS" || diskErr.message?.includes("read-only")) {
        return NextResponse.json(
          {
            success: false,
            error: "Hệ thống máy chủ Vercel ở chế độ Read-Only. Vui lòng cấu hình CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET trong Environment Variables của Vercel để lưu ảnh vĩnh viễn trên đám mây.",
          },
          { status: 500 }
        );
      }
      throw diskErr;
    }
  } catch (error: any) {
    console.error("[API /api/admin/upload POST] Lỗi tải ảnh:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi máy chủ khi tải ảnh" },
      { status: 500 }
    );
  }
}

