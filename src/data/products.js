/**
 * Danh sách 20 sản phẩm khởi tạo chuẩn theo kế hoạch Mỹ Nghệ Đông Phong
 */
export const initialProducts = [
  // --- 1. VÒNG TAY (6 sản phẩm) ---
  {
    id: "vong-tay-tu-dan-tieu-diep",
    sku: "VT-TD-01",
    name: "Vòng Tay Gỗ Tử Đàn Tiểu Diệp Kim Sa",
    categoryId: "vong-tay",
    woodTypeId: "tu-dan",
    woodType: "Tử Đàn Tiểu Diệp Ấn Độ",
    price: 2600000,
    priceContactOnly: false,
    shortDesc: "Chất gỗ cực đanh nặng chìm nước, tôm gỗ mịn tít với các hạt kim sa sao sa lấp lánh tự nhiên.",
    description: "Vòng tay được chế tác thủ công từ phôi gỗ Tử Đàn Tiểu Diệp già cỗi nhiều năm tuổi. Hạt gỗ tròn đều, bóng gương tự nhiên không phun keo hay phủ bóng nhân tạo. Đeo càng lâu chất gỗ càng lên nước bóng sâu thẫm huyền bí.",
    careInstructions: "Tránh tiếp xúc trực tiếp với xà phòng, chất tẩy rửa hóa học. Khi không đeo nên cất trong túi nhung hoặc hộp gấm kèm gói hút ẩm nhẹ.",
    sizes: [
      { label: "10mm (19 hạt - Nữ)", price: 2100000 },
      { label: "12mm (17 hạt - Tay vừa)", price: 2400000 },
      { label: "14mm (15 hạt - Nam)", price: 2600000 },
      { label: "16mm (14 hạt - Nam)", price: 3200000 },
      { label: "18mm (13 hạt - VIP)", price: null } // Liên hệ báo giá
    ],
    images: [
      "/assets/images/products/vong-tay-tu-dan-1.webp",
      "/assets/images/products/vong-tay-tu-dan-2.webp",
      "/assets/images/products/vong-tay-tu-dan-3.webp"
    ],
    isFeatured: true,
    status: "published",
    createdAt: "2026-09-01T08:00:00Z"
  },
  {
    id: "vong-tay-sua-do-bac-bo",
    sku: "VT-SUA-02",
    name: "Vòng Tay Gỗ Sưa Đỏ Bắc Bộ Vân Mây",
    categoryId: "vong-tay",
    woodTypeId: "sua",
    woodType: "Sưa Đỏ Bắc Bộ",
    price: 3800000,
    priceContactOnly: false,
    shortDesc: "Vân mây biến hóa 4 mặt huyền ảo, mùi thơm dịu ngọt quý phái đặc trưng của dòng sưa đỏ cổ thụ.",
    description: "Gỗ sưa đỏ từ lâu đã là biểu tượng của sự may mắn, bình an và vượng tài. Phôi sưa chọn lọc có vân cuộn xoáy sắc nét, mùi thơm ngọt thanh giữ mãi không phai. Từng hạt tiện chỉn chu, lỗ xâu nhỏ gọn tinh tế.",
    careInstructions: "Lau bằng khăn vải cotton khô sạch sau khi vận động ra mồ hôi. Để nơi thoáng mát, tránh phơi nắng gắt.",
    sizes: [
      { label: "12mm (17 hạt)", price: 3500000 },
      { label: "14mm (15 hạt)", price: 3800000 },
      { label: "16mm (14 hạt)", price: 4600000 },
      { label: "20mm (12 hạt - Hàng tuyển)", price: null }
    ],
    images: [
      "/assets/images/products/vong-tay-sua-1.webp",
      "/assets/images/products/vong-tay-sua-2.webp"
    ],
    isFeatured: true,
    status: "published",
    createdAt: "2026-09-01T09:00:00Z"
  },
  {
    id: "vong-tay-nu-bach-xanh-chim-nuoc",
    sku: "VT-NBX-03",
    name: "Vòng Tay Nu Bách Xanh Mộc Châu Chìm Nước",
    categoryId: "vong-tay",
    woodTypeId: "nu-bach-xanh",
    woodType: "Nu Bách Xanh Mộc Châu",
    price: 1850000,
    priceContactOnly: false,
    shortDesc: "Vân nu hoa dầy đặc, hàm lượng tinh dầu cao chìm nước 100%, mùi hương nồng ấm bền bỉ quanh năm.",
    description: "Chế tác từ phần bướu nu bách xanh Mộc Châu cổ thụ tích tụ hàng trăm năm. Mỗi hạt là một bức tranh vân nu độc nhất vô nhị. Mùi hương gỗ tự nhiên giúp thư giãn tinh thần, giảm stress hiệu quả.",
    careInstructions: "Hạn chế ngâm nước. Khi thấy giảm mùi thơm chỉ cần xoa nhẹ vào lòng bàn tay để nhiệt lượng kích thích tinh dầu gỗ tỏa hương.",
    sizes: [
      { label: "12mm (17 hạt)", price: 1600000 },
      { label: "14mm (15 hạt)", price: 1850000 },
      { label: "16mm (14 hạt)", price: 2200000 }
    ],
    images: [
      "/assets/images/products/vong-tay-nu-bach-xanh-1.webp",
      "/assets/images/products/vong-tay-nu-bach-xanh-2.webp"
    ],
    isFeatured: true,
    status: "published",
    createdAt: "2026-09-02T08:00:00Z"
  },
  {
    id: "vong-tay-nu-ngoc-am-chim-nuoc",
    sku: "VT-NNA-04",
    name: "Vòng Tay Nu Ngọc Am Hà Giang Chìm Nước",
    categoryId: "vong-tay",
    woodTypeId: "nu-ngoc-am",
    woodType: "Nu Ngọc Am Hà Giang",
    price: 1450000,
    priceContactOnly: false,
    shortDesc: "Nu hoa cám chìm nước, tinh dầu thơm ngào ngạt lan tỏa, mang ý nghĩa xua uế khí và đem lại an lành.",
    description: "Ngọc am đỏ vùng núi đá Hà Giang được săn đón bởi mùi thơm đặc trưng không loài gỗ nào sánh được. Phôi chìm nước đanh nặng, hạt tiện mịn màng sang trọng.",
    careInstructions: "Tránh hóa chất, bảo quản nơi khô ráo. Thường xuyên lau khăn mềm để hạt lên nước bóng sâu.",
    sizes: [
      { label: "12mm (17 hạt)", price: 1250000 },
      { label: "14mm (15 hạt)", price: 1450000 },
      { label: "16mm (14 hạt)", price: 1750000 }
    ],
    images: [
      "/assets/images/products/vong-tay-ngoc-am-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-02T09:00:00Z"
  },
  {
    id: "vong-tay-chop-bach-xanh",
    sku: "VT-CBX-05",
    name: "Vòng Tay Chớp Bách Xanh Thơm Ngát",
    categoryId: "vong-tay",
    woodTypeId: "chop-bach-xanh",
    woodType: "Gỗ Chớp Bách Xanh",
    price: 1100000,
    priceContactOnly: false,
    shortDesc: "Hiệu ứng vân chớp ánh kim 3D chuyển động khi nghiêng dưới ánh sáng, mùi hương thanh mát dễ chịu.",
    description: "Gỗ chớp bách xanh sở hữu những dải vân khúc xạ ánh sáng độc đáo. Từng hạt hạt tròn xoe, đường nét chế tác chuẩn chỉ, rất thích hợp đeo hàng ngày hoặc làm quà tặng bạn bè, người thân.",
    careInstructions: "Tránh ngâm nước nóng lâu. Bảo quản nơi thoáng khí.",
    sizes: [
      { label: "10mm (19 hạt)", price: 950000 },
      { label: "12mm (17 hạt)", price: 1100000 },
      { label: "14mm (15 hạt)", price: 1350000 }
    ],
    images: [
      "/assets/images/products/vong-tay-chop-bx-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-02T10:00:00Z"
  },
  {
    id: "vong-tay-tram-huong-tu-nhien",
    sku: "VT-TH-06",
    name: "Vòng Tay Trầm Hương Tự Nhiên",
    categoryId: "vong-tay",
    woodTypeId: "tram-huong",
    woodType: "Trầm Hương Tự Nhiên",
    price: null, // Liên hệ báo giá theo trọng lượng và chỉ dầu
    priceContactOnly: true,
    shortDesc: "Thớ dầu dầy đặc, vân chỉ đen tuyền đan xen, hương thơm trầm tĩnh tích tụ tinh hoa đất trời.",
    description: "Vòng tay Trầm hương tự nhiên tại Đông Phong được tuyển chọn kỹ lưỡng từng phôi trầm có lượng tinh dầu tốt. Mùi hương thanh tịnh vĩnh cửu, giá trị tăng dần theo thời gian sử dụng.",
    careInstructions: "Tuyệt đối không để dính nước hoa, xà phòng hay nước nóng vì sẽ làm tắc nghẽn các lỗ chân lông tiết dầu của gỗ trầm.",
    sizes: [
      { label: "10mm (Chuỗi hạt)", price: null },
      { label: "12mm (Nam/Nữ)", price: null },
      { label: "14mm (Hàng tuyển)", price: null }
    ],
    images: [
      "/assets/images/products/vong-tay-tram-huong-1.webp"
    ],
    isFeatured: true,
    status: "published",
    createdAt: "2026-09-03T08:00:00Z"
  },

  // --- 2. BÚT KÝ (4 sản phẩm) ---
  {
    id: "but-ky-nu-huyet-long-thau-quang",
    sku: "BK-HL-01",
    name: "Bút Ký Gỗ Nu Huyết Long Thấu Quang",
    categoryId: "but-ky",
    woodTypeId: "nu-huyet-long",
    woodType: "Nu Huyết Long (Thấu Quang)",
    price: 950000,
    priceContactOnly: false,
    shortDesc: "Thân bút gỗ nu huyết long thấu quang đỏ rực dưới ánh đèn, phối khoen kim loại mạ vàng sang trọng.",
    description: "Bút ký chế tác thủ công từ bướu nu Huyết Long. Khi soi đèn pin thấu quang đỏ như ngọc hồng bảo. Ruột bút bi ngòi dạ Parker thay thế dễ dàng, mực ra êm mượt thích hợp ký kết hợp đồng quan trọng.",
    careInstructions: "Lau thân bút bằng khăn khô mềm. Tránh làm rơi va đập mạnh làm ảnh hưởng cơ cấu ngòi bút.",
    sizes: [
      { label: "Bút đơn tiêu chuẩn kèm hộp gấm", price: 950000 },
      { label: "Set quà tặng (Bút + 2 ruột phụ + Hộp gỗ)", price: 1250000 }
    ],
    images: [
      "/assets/images/products/but-ky-huyet-long-1.webp",
      "/assets/images/products/but-ky-huyet-long-2.webp"
    ],
    isFeatured: true,
    status: "published",
    createdAt: "2026-09-03T09:00:00Z"
  },
  {
    id: "but-ky-nu-bach-xanh-van-hoa",
    sku: "BK-BX-02",
    name: "Bút Ký Gỗ Nu Bách Xanh Vân Hoa",
    categoryId: "but-ky",
    woodTypeId: "nu-bach-xanh",
    woodType: "Nu Bách Xanh Mộc Châu",
    price: 850000,
    priceContactOnly: false,
    shortDesc: "Vân nu đan kết hài hòa, thoang thoảng hương thơm thảo mộc tự nhiên mỗi khi cầm bút viết.",
    description: "Sự kết hợp giữa chất gỗ nu bách xanh hương thơm vĩnh cửu và các chi tiết kim loại gia công tỉ mỉ. Sản phẩm là món quà tinh tế gửi gắm lời chúc may mắn và thăng tiến trong sự nghiệp.",
    careInstructions: "Để nơi khô ráo, tránh nhiệt độ cao.",
    sizes: [
      { label: "Bút ký tiêu chuẩn", price: 850000 },
      { label: "Kèm hộp quà sang trọng", price: 1050000 }
    ],
    images: [
      "/assets/images/products/but-ky-nu-bach-xanh-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-03T10:00:00Z"
  },
  {
    id: "but-ky-hoang-dan-lang-son",
    sku: "BK-HD-03",
    name: "Bút Ký Gỗ Hoàng Đàn Tuyết Lạng Sơn",
    categoryId: "but-ky",
    woodTypeId: "hoang-dan",
    woodType: "Hoàng Đàn Tuyết Lạng Sơn",
    price: null, // Liên hệ báo giá
    priceContactOnly: true,
    shortDesc: "Dòng bút quý tộc chế tác từ phôi hoàng đàn tuyết già, tinh dầu lên tuyết óng ánh, hương thơm ngát bậc nhất.",
    description: "Được mệnh danh là 'gỗ của đế vương', Hoàng Đàn Lạng Sơn ngày càng hiếm có. Thân bút tỏa hương thơm ngọt ngào khó quên, là tuyệt phẩm quà tặng dành riêng cho đối tác thượng lưu.",
    careInstructions: "Cất giữ trong hộp kín khi không sử dụng để tinh dầu tự nhiên kết tinh thành tuyết trắng.",
    sizes: [
      { label: "Bản kỷ niệm giới hạn", price: null }
    ],
    images: [
      "/assets/images/products/but-ky-hoang-dan-1.webp"
    ],
    isFeatured: true,
    status: "published",
    createdAt: "2026-09-04T08:00:00Z"
  },
  {
    id: "but-ky-mun-sung-den-bong",
    sku: "BK-MS-04",
    name: "Bút Ký Gỗ Mun Sừng Đen Bóng",
    categoryId: "but-ky",
    woodTypeId: "mun-sung",
    woodType: "Mun Sừng Khánh Hòa",
    price: 750000,
    priceContactOnly: false,
    shortDesc: "Chất gỗ đen tuyền huyền bí, bề mặt bóng mượt không tôm gỗ, thể hiện khí chất cương trực và quyền uy.",
    description: "Gỗ Mun Sừng nổi tiếng với độ bền vĩnh cửu và màu đen tuyền tự nhiên thuần khiết. Bút cầm đầm tay, cân bằng trọng lực tốt khi ký.",
    careInstructions: "Lau sạch bằng khăn bông khô.",
    sizes: [
      { label: "Bút tiêu chuẩn", price: 750000 },
      { label: "Set quà khắc tên theo yêu cầu", price: 950000 }
    ],
    images: [
      "/assets/images/products/but-ky-mun-sung-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-04T09:00:00Z"
  },

  // --- 3. BI LĂN TAY (2 sản phẩm) ---
  {
    id: "bi-lan-tay-go-cam-lai",
    sku: "BL-CAM-01",
    name: "Cặp Bi Lăn Tay Gỗ Cẩm Lai Vân Chỉ",
    categoryId: "bi-lan-tay",
    woodTypeId: "cam-lai",
    woodType: "Gỗ Cẩm Lai",
    price: 450000,
    priceContactOnly: false,
    shortDesc: "Vân chỉ cẩm lai đen tím uốn lượn tinh tế, tròn xoe tuyệt đối, kích thích huyệt đạo bàn tay khi tập.",
    description: "Được gia công tiện tròn chuẩn xác trên máy tiện vi tính sau đó đánh bóng mịn thủ công. Thường xuyên lăn bi giúp kích thích các huyệt vị kinh lạc, giảm tê mỏi tay và tăng cường minh mẫn.",
    careInstructions: "Lăn tay hàng ngày, mồ hôi tay sẽ làm gỗ càng lúc càng lên màu nâu bóng đậm đà.",
    sizes: [
      { label: "Đường kính 4.5cm (Cặp 2 quả)", price: 450000 },
      { label: "Đường kính 5.0cm (Cặp 2 quả)", price: 550000 }
    ],
    images: [
      "/assets/images/products/bi-lan-tay-cam-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-04T10:00:00Z"
  },
  {
    id: "bi-lan-tay-go-sua-do",
    sku: "BL-SUA-02",
    name: "Cặp Bi Lăn Tay Gỗ Sưa Đỏ Dưỡng Sinh",
    categoryId: "bi-lan-tay",
    woodTypeId: "sua",
    woodType: "Sưa Đỏ Bắc Bộ",
    price: 1800000,
    priceContactOnly: false,
    shortDesc: "Cặp bi tiện từ phôi sưa đỏ già nguyên khối, vân vần vũ 3D, mùi thơm dịu ngọt giúp thư thái đầu óc.",
    description: "Sản phẩm dành cho người yêu thích dưỡng sinh và sưu tầm gỗ quý. Khi lăn tay, hương thơm sưa đỏ khuếch tán giúp giảm căng thẳng, thư thái tinh thần sau giờ làm việc mệt mỏi.",
    careInstructions: "Lau khăn khô mềm.",
    sizes: [
      { label: "Đường kính 4.8cm (Cặp 2 quả)", price: 1800000 },
      { label: "Đường kính 5.2cm (Cặp 2 quả)", price: 2300000 }
    ],
    images: [
      "/assets/images/products/bi-lan-tay-sua-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-05T08:00:00Z"
  },

  // --- 4. GỐI GỖ (2 sản phẩm) ---
  {
    id: "goi-hat-go-sua-do",
    sku: "GG-SUA-01",
    name: "Gối Hạt Gỗ Sưa Đỏ Tự Nhiên Cao Cấp",
    categoryId: "goi-go",
    woodTypeId: "sua",
    woodType: "Sưa Đỏ Bắc Bộ",
    price: null, // Liên hệ báo giá
    priceContactOnly: true,
    shortDesc: "Đan kết từ hàng nghìn hạt sưa đỏ tuyển chọn, độ cong công thái học nâng đỡ cột sống cổ hoàn hảo.",
    description: "Tuyệt phẩm gối gỗ sưa đỏ chăm sóc giấc ngủ đỉnh cao. Các hạt gỗ đan thoáng khí, mùi thơm sưa thoang thoảng ru êm giấc ngủ sâu, điều hòa tuần hoàn máu não và giảm đau mỏi vai gáy.",
    careInstructions: "Thỉnh thoảng lau sạch hạt bằng khăn ẩm vắt kiệt, phơi trong bóng râm thoáng mát.",
    sizes: [
      { label: "Kích thước 30cm x 50cm", price: null },
      { label: "Kích thước 35cm x 55cm", price: null }
    ],
    images: [
      "/assets/images/products/goi-go-sua-1.webp"
    ],
    isFeatured: true,
    status: "published",
    createdAt: "2026-09-05T09:00:00Z"
  },
  {
    id: "goi-hat-go-bach-xanh",
    sku: "GG-BX-02",
    name: "Gối Hạt Gỗ Bách Xanh Hương Thơm An Thần",
    categoryId: "goi-go",
    woodTypeId: "nu-bach-xanh",
    woodType: "Gỗ Bách Xanh Mộc Châu",
    price: 1350000,
    priceContactOnly: false,
    shortDesc: "Hạt bách xanh thơm nồng ấm, giúp xua tan căng thẳng mệt mỏi, mang lại giấc ngủ ngon và thông thoáng.",
    description: "Gối được xâu từ các hạt gỗ bách xanh đều tăm tắp bằng dây cước dù đàn hồi bền chắc. Khi nằm, lực phân bổ đều khắp gáy, hạt xoay tự nhiên massage nhẹ nhàng cho vùng cổ.",
    careInstructions: "Vệ sinh nhẹ bằng khăn sạch, tránh ngâm nước hay phơi dưới nắng gắt.",
    sizes: [
      { label: "Kích thước 30cm x 48cm", price: 1350000 },
      { label: "Kích thước 35cm x 52cm", price: 1650000 }
    ],
    images: [
      "/assets/images/products/goi-go-bach-xanh-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-05T10:00:00Z"
  },

  // --- 5. TẨU (2 sản phẩm) ---
  {
    id: "tau-hut-go-trac-can-sung",
    sku: "TAU-TRAC-01",
    name: "Tẩu Thuốc Gỗ Trắc Đỏ Đen Cán Sừng",
    categoryId: "tau",
    woodTypeId: "go-trac",
    woodType: "Gỗ Trắc Cán Sừng",
    price: 850000,
    priceContactOnly: false,
    shortDesc: "Buồng đốt gỗ trắc già chịu nhiệt cao, cán sừng uốn cong cổ điển mang phong thái lịch lãm phong trần.",
    description: "Tẩu gỗ được tiện và khoét lòng chuẩn xác, chất gỗ trắc đanh dẻo không nứt vỡ khi tiếp xúc nhiệt độ cao. Cán ngậm chế tác từ sừng tự nhiên êm ái, cách nhiệt tốt.",
    careInstructions: "Vệ sinh buồng đốt định kỳ bằng que thông chuyên dụng sau khi nguội hẳn.",
    sizes: [
      { label: "Chiều dài tiêu chuẩn 14.5cm", price: 850000 }
    ],
    images: [
      "/assets/images/products/tau-go-trac-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-06T08:00:00Z"
  },
  {
    id: "tau-thuoc-go-nu-cam",
    sku: "TAU-CAM-02",
    name: "Tẩu Thuốc Chế Tác Gỗ Nu Cẩm Lai",
    categoryId: "tau",
    woodTypeId: "cam-lai",
    woodType: "Gỗ Nu Cẩm",
    price: 1150000,
    priceContactOnly: false,
    shortDesc: "Vân hoa nu cẩm sắc sảo phủ kín thân tẩu, kiểu dáng đứng vững chãi, độc bản dành cho người sành chơi.",
    description: "Phôi nu cẩm hiếm gặp được gọt giũa tỉ mỉ tôn vinh trọn vẹn hoa nu tự nhiên. Lòng tẩu tráng lớp carbon bảo vệ gỗ, luồng khói êm và ngọt.",
    careInstructions: "Tránh cạy cạo mạnh đáy buồng đốt khi còn nóng.",
    sizes: [
      { label: "Chiều dài 15cm (Dáng Freehand độc bản)", price: 1150000 }
    ],
    images: [
      "/assets/images/products/tau-nu-cam-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-06T09:00:00Z"
  },

  // --- 6. ĐŨA GỖ (2 sản phẩm) ---
  {
    id: "dua-go-mun-sung-cao-cap",
    sku: "DUA-MS-01",
    name: "Hộp Đũa Gỗ Mun Sừng Cao Cấp (10 Đôi)",
    categoryId: "dua-go",
    woodTypeId: "mun-sung",
    woodType: "Mun Sừng Khánh Hòa",
    price: 650000,
    priceContactOnly: false,
    shortDesc: "Gỗ mun sừng đen tuyền tự nhiên 100%, không sơn phủ độc hại, gắp thức ăn đầm tay và không ẩm mốc.",
    description: "Đũa gỗ mun sừng Đông Phong được mài chuốt kỹ lưỡng từng đôi đồng đều. Chất gỗ đanh như đá, không thấm nước nên không bao giờ lo mốc hay xơ nứt dù dùng qua nhiều năm trong bữa cơm gia đình.",
    careInstructions: "Rửa với nước rửa chén dịu nhẹ, để ráo nơi thoáng khí. Không ngâm ngập trong bồn rửa chén qua đêm.",
    sizes: [
      { label: "Hộp 10 đôi (Dài 24.5cm tiêu chuẩn)", price: 650000 },
      { label: "Hộp 10 đôi bọc đầu đồng / bạc trang trí", price: 890000 }
    ],
    images: [
      "/assets/images/products/dua-mun-sung-1.webp"
    ],
    isFeatured: true,
    status: "published",
    createdAt: "2026-09-06T10:00:00Z"
  },
  {
    id: "dua-go-trac-do-den",
    sku: "DUA-TRAC-02",
    name: "Hộp Đũa Gỗ Trắc Đỏ Đen Tự Nhiên (10 Đôi)",
    categoryId: "dua-go",
    woodTypeId: "go-trac",
    woodType: "Gỗ Trắc Đỏ Đen",
    price: 480000,
    priceContactOnly: false,
    shortDesc: "Vân gỗ trắc đỏ đen tự nhiên sang trọng, bề mặt mộc đánh sáp ong truyền thống an toàn tuyệt đối.",
    description: "Gỗ trắc dẻo dai, bóng đẹp theo thời gian sử dụng. Hộp đũa đựng trong bao bì lịch thiệp thích hợp làm quà tân gia, quà Tết ý nghĩa cho gia đình và bạn bè.",
    careInstructions: "Sau khi rửa lau khô trước khi cất vào ống đũa.",
    sizes: [
      { label: "Hộp 10 đôi tiêu chuẩn", price: 480000 }
    ],
    images: [
      "/assets/images/products/dua-go-trac-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-07T08:00:00Z"
  },

  // --- 7. ĐỆM KHOÁC Ô TÔ (2 sản phẩm) ---
  {
    id: "dem-ghe-oto-go-trac",
    sku: "DTO-TRAC-01",
    name: "Đệm Ghế Ô Tô Hạt Gỗ Trắc Đỏ Đen",
    categoryId: "dem-khoac-oto",
    woodTypeId: "go-trac",
    woodType: "Gỗ Trắc Đỏ Đen",
    price: 1850000,
    priceContactOnly: false,
    shortDesc: "Hạt tròn 12mm gỗ trắc mát lạnh chống ê mỏi, chống nóng lưng trên những hành trình dài.",
    description: "Đệm khoác ghế ô tô Đông Phong được đan từ các hạt gỗ trắc đỏ đen tuyển lựa kỹ càng không lỗi sứt mẻ. Sợi dây đan chuyên dụng chịu lực kéo mạnh, thiết kế bao trùm vừa vặn tất cả các form ghế lái xe hơi hiện nay.",
    careInstructions: "Dùng khăn ẩm lau bề mặt khi bám bụi bẩn, không dùng chất tẩy rửa ăn mòn.",
    sizes: [
      { label: "Đệm 1 ghế đơn (Ghế lái hoặc phụ)", price: 1850000 },
      { label: "Bộ 2 ghế trước", price: 3500000 }
    ],
    images: [
      "/assets/images/products/dem-oto-trac-1.webp"
    ],
    isFeatured: true,
    status: "published",
    createdAt: "2026-09-07T09:00:00Z"
  },
  {
    id: "dem-ghe-oto-go-bach-xanh",
    sku: "DTO-BX-02",
    name: "Đệm Ghế Ô Tô Hạt Gỗ Bách Xanh Thơm Tự Nhiên",
    categoryId: "dem-khoac-oto",
    woodTypeId: "nu-bach-xanh",
    woodType: "Gỗ Bách Xanh Mộc Châu",
    price: 1550000,
    priceContactOnly: false,
    shortDesc: "Mùi hương gỗ bách xanh thơm ngọt tự nhiên khử mùi hôi xe hơi, tạo cảm giác tỉnh táo khi lái xe.",
    description: "Hạt bách xanh tự nhiên dồi dào tinh dầu, vừa có tác dụng bấm huyệt lưng chống mỏi mệt, vừa hoạt động như một túi thơm khử mùi máy lạnh ô tô tự nhiên an toàn cho sức khỏe.",
    careInstructions: "Lau bằng khăn ẩm mềm.",
    sizes: [
      { label: "Đệm 1 ghế đơn", price: 1550000 },
      { label: "Bộ 2 ghế trước", price: 2900000 }
    ],
    images: [
      "/assets/images/products/dem-oto-bach-xanh-1.webp"
    ],
    isFeatured: false,
    status: "published",
    createdAt: "2026-09-07T10:00:00Z"
  }
];
