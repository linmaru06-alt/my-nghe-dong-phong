import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Bắt đầu khởi tạo dữ liệu mẫu (Seeding) cho Mỹ Nghệ Đông Phong...");

  // 1. Tạo Super Admin
  const passwordHash = await bcrypt.hash("DongPhong@2025", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@dongphong.vn" },
    update: { passwordHash },
    create: {
      email: "admin@dongphong.vn",
      name: "Nghệ Nhân Đông Phong",
      passwordHash,
      role: "SUPER_ADMIN",
      avatar: "https://lh3.googleusercontent.com/aida/AEtjO1Wv-Nv0NV-zUQsGyPVIlJSw2dr-eXrrFLhX4vV0jbqhyvWeJcJssNwwhKvoquU3yskfSy-xlhJfLgzQF-S0GKdWMwgWyJPqzgve4jv0Ag9OVbXuBJk-pweNhKb9QKxiql41pkh3UmgY2r2Ny9hVZ-xO1NG97ADNZJ3sji-iLCEcPRRYxtFDN5-WUHsJNxpm5v3PbBkTiemGlql1xLod_mzgUQVJaj9Na60qh98swVAR-Wzk1hcdEz1V5lgX",
    },
  });
  console.log(`✅ Admin: ${admin.email}`);

  // 2. Tạo 7 Danh Mục Chuẩn
  const categoriesData = [
    {
      slug: "vong-tay",
      name: "Vòng tay phong thủy",
      description: "Vòng tay chế tác từ danh mộc quý hiếm, tiện tròn đều hạt và giữ mộc tự nhiên.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcCRajqgcCPBuPbGHZf3YC7nX0sUbO1SpzdhA4E-pNFSrLGfxYZ6mJbxpdumFZk-JGzbAoZnNT2izHxaOjpSt_YZG0Z9_zi1S9RmxTbxo0moFuyoiGCCtK2TVh5Be6il1x1kiqoHW97DeFtyMjmbqeVAczKdZy3i8DKMGgZYBc8RalgxYMGGdNCFYWQv1SAUbvNA_xh_mcbOgkEKb16q-pI-OZGCvG4qsUcBba8TQfj2xZ0-etPro15w",
      displayOrder: 1,
    },
    {
      slug: "but-ky",
      name: "Bút ký gỗ quý",
      description: "Bút ký cao cấp phối gỗ quý và ngòi mạ vàng, phong cách doanh nhân sang trọng.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr4O4Gin3xgSyel0LsXL99XnDNbvMmrUhFKFC9J8GAi4lpMgZWqF-9p9hPtNU7rzUo2-V8Oyx14a0mi3rslz2O6mldFSXS8SzprLHU0D8d9cnf7tFrSJAJOqfgAVW1pV4hH2PMbhugyRdNUQ7JXcfdTu3bNN2y_u7G4TSCT0BEGPs357E1VgYCrsTu-tXXJEbBmkN0HlOEudb7SIej_qW_KBbPptF4IYgto4MRSGylCKKBSLs6B6Q6yQ",
      displayOrder: 2,
    },
    {
      slug: "bi-lan-tay",
      name: "Bi lăn tay dưỡng sinh",
      description: "Cặp bi lăn tay kích thích huyệt vị lòng bàn tay, gỗ tỏa hương dịu nhẹ thư thái.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_NFWN3Xik8wwqA-pExcs9VOqXpJOUxtEwt94RWqR9ZB2bQQ0OPgPr1qyJYdL8JuqiYGvsSlbOerHpHEPAN2TcGzO81aVJbJU2gP9v6VJCdivCcA6qfqzIY4Yeyx17ssybY_tLwBXmDyS3DgxcVKnFKsurcbjGhtg1WLvetjkoZ_brmHj2gZUom-Hg3-64UdLa48CJF_TOxjyV06x_BSm7KibuNSLYr2_ICV7orS0tlzJZMjAVi8UjGA",
      displayOrder: 3,
    },
    {
      slug: "goi-go",
      name: "Gối gỗ hạt tròn",
      description: "Gối đan hạt gỗ massage vùng cổ gáy, thoáng khí và có hương thơm thảo mộc.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQVz93cO-Z6_iE12K_gXhQ5e0bK307h5H620R_3RjG_T413C6_c78V9N9G_J1483L12879F496V2H8N8P0D1G5I6N8U4T9",
      displayOrder: 4,
    },
    {
      slug: "tau-go",
      name: "Tẩu thuốc nghệ thuật",
      description: "Tẩu gỗ thủ công từ cẩm lai và mun sừng, đường nét đục chạm tinh tế.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB8akGMuG7kCFGnufrpRuMsblcSqWriSjLeisPreSYuKm4bXfnB2BYFiusueSgQfwRcCMB8hvVJBJMZGYWjcWCemqv7qipD_6B1NT7AMkUhIQkRay8PfSFmwZje-F77PHisleWGNXgu9Q8gBdAbngiIVE_4rso8qjjipIC77SmvqNrLqEOB2aYojdVwEFI0Afco1dkMZ00b510IIhBe4noUVRmR5mRHAfovA_zouq7y_5IaehbfRy6hw",
      displayOrder: 5,
    },
    {
      slug: "dua-go",
      name: "Đũa gỗ quý",
      description: "Bộ đũa gỗ mun sừng và gỗ trắc nguyên khối, không phủ sơn hóa chất.",
      image: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?w=800&auto=format&fit=crop&q=80",
      displayOrder: 6,
    },
    {
      slug: "dem-oto",
      name: "Đệm khoác ghế ô tô",
      description: "Đệm lót hạt gỗ massage lưng, chống hầm bí khi lái xe đường dài.",
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&auto=format&fit=crop&q=80",
      displayOrder: 7,
    },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log(`✅ Đã nạp ${categoriesData.length} danh mục.`);

  // 3. Tạo 11 Loại Gỗ Quý
  const woodTypesData = [
    {
      slug: "sua-do",
      name: "Gỗ Sưa Đỏ Bắc Bộ",
      scientificName: "Dalbergia tonkinensis",
      rarity: "Đặc biệt quý hiếm (Nhóm 1A)",
      origin: "Vĩnh Phúc, Phú Thọ, Bắc Bộ",
      characteristics: "Vân sóng mắt quỷ uốn lượn đa chiều huyền ảo, thớ dăm khít lì, dầu gỗ đanh chắc, hương thơm thanh khiết thoang thoảng mùi trầm.",
    },
    {
      slug: "tu-dan",
      name: "Gỗ Tử Đàn Ấn Độ",
      scientificName: "Pterocarpus santalinus",
      rarity: "Đặc biệt quý hiếm",
      origin: "Vùng núi cao bang Andhra Pradesh, Nam Ấn Độ",
      characteristics: "Chất gỗ cực kỳ nặng, chìm nước ngay lập tức, tôm sao vàng óng ánh kim tuyến li ti, màu đỏ thẫm quý phái chuyển dần sang tím hoàng gia.",
    },
    {
      slug: "bach-xanh",
      name: "Gỗ Bách Xanh Mộc Châu",
      scientificName: "Calocedrus macrolepis",
      rarity: "Quý hiếm nhóm 2A",
      origin: "Vùng núi đá Mộc Châu, Sơn La",
      characteristics: "Gỗ chứa hàm lượng tinh dầu cao, thơm ngọt bền bỉ quanh năm, vân mây lượn sóng màu vàng ánh xanh rêu ngọc độc đáo.",
    },
    {
      slug: "hoang-dan",
      name: "Hoàng Đàn Tuyết Lạng Sơn",
      scientificName: "Cupressus torulosa",
      rarity: "Cực kỳ quý hiếm",
      origin: "Hữu Lũng, Lạng Sơn",
      characteristics: "Khi để trong không gian kín tỏa lớp tuyết trắng óng ánh như sương muối, hương thơm ngọt lịm như sâm ngọc linh, thanh tẩy uế khí.",
    },
    {
      slug: "mun-sung",
      name: "Gỗ Mun Sừng Khánh Hòa",
      scientificName: "Diospyros mun",
      rarity: "Quý hiếm nhóm 1",
      origin: "Rừng đá Khánh Hòa, Ninh Thuận",
      characteristics: "Màu đen tuyền bóng loáng như sừng trâu, chất gỗ đanh cứng không có tom gỗ, bóng gương tự nhiên khi mài giũa.",
    },
    {
      slug: "huyet-long",
      name: "Gỗ Huyết Long",
      scientificName: "Agathis borneensis",
      rarity: "Quý",
      origin: "Rừng nhiệt đới đảo Borneo",
      characteristics: "Đặc tính thấu quang phát sáng đỏ rực như máu khi soi đèn pin, tượng trưng cho ánh sáng tâm linh và năng lượng dương mạnh mẽ.",
    },
    {
      slug: "tram-huong",
      name: "Gỗ Trầm Hương Rừng",
      scientificName: "Aquilaria crassna",
      rarity: "Đặc biệt quý hiếm",
      origin: "Khánh Hòa, Quảng Nam",
      characteristics: "Tích tụ dầu trầm tự nhiên hàng chục năm, chìm trong nước, hương thơm trường tồn ngàn năm, được mệnh danh là hương của trời đất.",
    },
    {
      slug: "trac",
      name: "Gỗ Trắc Đỏ Đen",
      scientificName: "Dalbergia cochinchinensis",
      rarity: "Quý hiếm nhóm 1",
      origin: "Tây Nguyên, Quảng Trị",
      characteristics: "Vân đen đỏ đan xen tuyệt đẹp, chất gỗ đanh chắc mịn màng, càng dùng càng lên nước bóng gương sẫm màu cổ kính.",
    },
    {
      slug: "cam-lai",
      name: "Gỗ Cẩm Lai Gia Lai",
      scientificName: "Dalbergia oliveri",
      rarity: "Quý hiếm nhóm 1",
      origin: "Gia Lai, Đắk Lắk",
      characteristics: "Thớ gỗ mịn màng, vân chỉ đen li ti chạy dọc, màu đỏ hồng ánh tím ấm áp, đanh chắc và không bị mối mọt co ngót.",
    },
    {
      slug: "ngoc-am",
      name: "Gỗ Ngọc Am Hà Giang",
      scientificName: "Cupressus funebris",
      rarity: "Quý",
      origin: "Hoàng Su Phì, Hà Giang",
      characteristics: "Mùi thơm thảo dược nồng nàn quyến rũ, chất gỗ nu nhiều vân xoáy cuộn như mây ngũ sắc.",
    },
    {
      slug: "nu-cam",
      name: "Nu Cẩm Chỉ Tuyển Chọn",
      scientificName: "Dalbergia oliveri",
      rarity: "Độc bản sưu tầm",
      origin: "Rừng nguyên sinh Tây Nguyên",
      characteristics: "Dị tật sinh học tự nhiên tạo thành các khối nu hoa văn xoắn ốc cực kỳ phức tạp và hiếm có.",
    },
  ];

  for (const wt of woodTypesData) {
    await prisma.woodType.upsert({
      where: { slug: wt.slug },
      update: wt,
      create: wt,
    });
  }
  console.log(`✅ Đã nạp ${woodTypesData.length} loại gỗ quý.`);

  // 4. Đọc sản phẩm từ data/products.json và seed vào DB
  const productsFilePath = path.join(__dirname, "../../../data/products.json");
  if (fs.existsSync(productsFilePath)) {
    const rawProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
    for (const p of rawProducts) {
      // Tìm Category và WoodType tương ứng
      const cat = await prisma.category.findUnique({ where: { slug: p.category } });
      const wt = await prisma.woodType.findFirst({
        where: {
          OR: [
            { name: { contains: p.woodType } },
            { slug: p.woodType.toLowerCase().replace(/\s+/g, "-") },
          ],
        },
      });

      if (cat && wt) {
        await prisma.product.upsert({
          where: { code: p.code },
          update: {
            name: p.name,
            slug: p.slug,
            description: p.description,
            isFeatured: p.featured || false,
            categoryId: cat.id,
            woodTypeId: wt.id,
          },
          create: {
            code: p.code,
            name: p.name,
            slug: p.slug,
            description: p.description,
            isFeatured: p.featured || false,
            categoryId: cat.id,
            woodTypeId: wt.id,
            sizes: {
              create: (p.sizes || []).map((s: any, idx: number) => ({
                size: s.label,
                price: s.price,
                displayOrder: idx,
              })),
            },
            images: {
              create: (p.images || []).map((img: string, idx: number) => ({
                url: img,
                isPrimary: idx === 0,
                displayOrder: idx,
              })),
            },
          },
        });
      }
    }
    console.log(`✅ Đã đồng bộ ${rawProducts.length} sản phẩm mẫu vào database.`);
  }

  // 5. Đọc bài viết từ data/posts.json và seed vào DB
  const postsFilePath = path.join(__dirname, "../../../data/posts.json");
  if (fs.existsSync(postsFilePath)) {
    const rawPosts = JSON.parse(fs.readFileSync(postsFilePath, "utf8"));
    for (const post of rawPosts) {
      await prisma.post.upsert({
        where: { slug: post.slug },
        update: {
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          thumbnail: post.thumbnail,
          category: post.category,
          status: "PUBLISHED",
          publishedAt: new Date(post.publishedAt || Date.now()),
          authorName: post.author,
          readTime: post.readTime,
        },
        create: {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          thumbnail: post.thumbnail,
          category: post.category,
          status: "PUBLISHED",
          publishedAt: new Date(post.publishedAt || Date.now()),
          authorName: post.author,
          readTime: post.readTime,
        },
      });
    }
    console.log(`✅ Đã đồng bộ ${rawPosts.length} bài viết mẫu vào database.`);
  }

  // 6. Cài đặt hệ thống từ data/settings.json
  const settingsFilePath = path.join(__dirname, "../../../data/settings.json");
  if (fs.existsSync(settingsFilePath)) {
    const rawSettings = JSON.parse(fs.readFileSync(settingsFilePath, "utf8"));
    await prisma.setting.upsert({
      where: { key: "general_settings" },
      update: { value: rawSettings },
      create: { key: "general_settings", value: rawSettings },
    });
    console.log("✅ Đã nạp cấu hình thương hiệu vào database.");
  }

  console.log("🎉 Hoàn tất quá trình khởi tạo dữ liệu.");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi chạy seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
