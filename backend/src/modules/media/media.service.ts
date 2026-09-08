import { cloudinary } from "../../config/cloudinary";
import { prisma } from "../../config/database";
import { Readable } from "stream";

export class MediaService {
  static async uploadFile(file: Express.Multer.File, folder = "dongphong/products") {
    return new Promise((resolve, reject) => {
      // If cloudinary keys are placeholder, mock save or return mock URL
      if (process.env.CLOUDINARY_API_KEY === "mock_api_key") {
        const mockUrl = `https://lh3.googleusercontent.com/aida-public/AB6AXuDOqEINELNhogS-gBuKHsu4WSrr10syYzotQSdDiqCs9XvDc8EBls4LXubnhkVqZjyfsOnbl5hmLURkrXOQnJbP3IsmVQdbjbogh1U7rh-t_aDvogzdfu7xNfFPrLrYrGNcPnlE464IVS7-0rAz6JELEHpypEGz_w00Ul8YsgiBQdeyJ5wTpw2sB2WOtMqL5R88bxBTGvyCEJJ2HMCfPNQ8jcFk63MIpOeIeFa3I5J5fpGHkufbOyEdaA`;
        return resolve({
          url: mockUrl,
          publicId: `mock_${Date.now()}`,
          filename: file.originalname,
          format: file.mimetype.split("/")[1] || "jpg",
          bytes: file.size,
        });
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        async (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Lỗi tải ảnh lên Cloudinary"));
          }

          // Save to database
          const media = await prisma.media.create({
            data: {
              publicId: result.public_id,
              url: result.secure_url,
              filename: file.originalname,
              format: result.format,
              bytes: result.bytes,
              width: result.width,
              height: result.height,
            },
          });

          resolve(media);
        }
      );

      const stream = Readable.from(file.buffer);
      stream.pipe(uploadStream);
    });
  }

  static async getAllMedia(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [total, items] = await Promise.all([
      prisma.media.count(),
      prisma.media.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async deleteMedia(idOrPublicId: string) {
    const media = await prisma.media.findFirst({
      where: {
        OR: [{ id: idOrPublicId }, { publicId: idOrPublicId }],
      },
    });

    if (media) {
      if (process.env.CLOUDINARY_API_KEY !== "mock_api_key") {
        await cloudinary.uploader.destroy(media.publicId);
      }
      await prisma.media.delete({ where: { id: media.id } });
    }

    return { message: "Đã xóa ảnh thành công." };
  }
}
