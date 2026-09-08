/**
 * Danh sách 6 bài viết khởi tạo chuẩn theo kế hoạch Mỹ Nghệ Đông Phong
 */
export const initialArticles = [
  {
    id: "cach-chon-kich-thuoc-hat-vong-tay-go-phu-hop",
    title: "Cách chọn kích thước hạt vòng tay gỗ phù hợp",
    slug: "cach-chon-kich-thuoc-hat-vong-tay-go-phu-hop",
    group: "huong-dan",
    groupName: "Hướng dẫn lựa chọn",
    author: "Nghệ nhân Đông Phong",
    publishedAt: "2026-09-02T09:00:00Z",
    thumbnail: "/assets/images/articles/bai-viet-chon-size-vong.webp",
    excerpt: "Hướng dẫn chi tiết cách đo cổ tay và lựa chọn size hạt 10mm, 12mm, 14mm, 16mm vừa vặn, kết hợp quy tắc số hạt phong thủy Sinh - Lão - Bệnh - Tử.",
    content: `
      <h2>1. Tầm quan trọng của việc chọn đúng kích thước hạt</h2>
      <p>Một chiếc vòng tay gỗ quý không chỉ là vật phẩm phong thủy mà còn là món trang sức thể hiện phong thái của người đeo. Nếu chọn hạt quá to sẽ gây cảm giác cồng kềnh, vướng víu khi gõ phím máy tính hay làm việc; ngược lại, hạt quá nhỏ lại không làm nổi bật được uy lực và vẻ đẹp của thớ vân gỗ.</p>

      <h2>2. Bảng quy chuẩn chọn size hạt theo chu vi cổ tay</h2>
      <ul>
        <li><strong>Size 10mm (19 hạt):</strong> Dành riêng cho nữ giới có cổ tay nhỏ nhắn (chu vi từ 13cm - 15cm) hoặc nam giới thích phong cách thanh nhã.</li>
        <li><strong>Size 12mm (17 hạt):</strong> Kích thước tiêu chuẩn phù hợp với đa số nữ giới hoặc nam giới có cổ tay vừa (chu vi 15cm - 16.5cm).</li>
        <li><strong>Size 14mm (15 hạt):</strong> Kích thước phổ biến và chuẩn mực nhất cho nam giới (chu vi cổ tay 16.5cm - 18cm), tôn lên sự đĩnh đạc và nam tính.</li>
        <li><strong>Size 16mm (14 hạt) - 18mm (13 hạt):</strong> Dành cho nam giới có cổ tay lớn, vóc dáng đậm hoặc yêu thích sự bề thế, đẳng cấp.</li>
      </ul>

      <h2>3. Ý nghĩa số lượng hạt theo quy luật luân hồi</h2>
      <p>Theo quan niệm dân gian, số lượng hạt của vòng nên rơi vào cung <strong>Sinh</strong> (chia cho 4 dư 1) như 13, 17, 21 hạt... hoặc rơi vào cung <strong>Lão</strong> (chia cho 4 dư 2) như 14, 18 hạt. Tuyệt đối tránh các số chia hết cho 4 (cung Tử).</p>
    `,
    relatedProductSkus: ["VT-TD-01", "VT-SUA-02", "VT-NBX-03"],
    status: "published"
  },
  {
    id: "cach-bao-quan-vong-tay-go-khi-su-dung-hang-ngay",
    title: "Cách bảo quản vòng tay gỗ khi sử dụng hằng ngày",
    slug: "cach-bao-quan-vong-tay-go-khi-su-dung-hang-ngay",
    group: "bao-quan",
    groupName: "Bảo quản sản phẩm",
    author: "Mỹ Nghệ Đông Phong",
    publishedAt: "2026-09-03T10:00:00Z",
    thumbnail: "/assets/images/articles/bai-viet-bao-quan-vong.webp",
    excerpt: "Bí quyết giữ vòng tay gỗ luôn sáng bóng, đậm mùi hương tinh dầu tự nhiên và quá trình 'lên nước' bóng gương đẹp mắt.",
    content: `
      <h2>1. Tránh tiếp xúc với hóa chất và xà phòng</h2>
      <p>Gỗ tự nhiên có các mao mạch thở li ti chứa tinh dầu thơm. Khi tiếp xúc với nước hoa, sữa tắm hay nước rửa chén, chất tẩy rửa sẽ thẩm thấu và làm tắc mao mạch, làm mất mùi hương thảo mộc nguyên bản của gỗ.</p>

      <h2>2. Xử lý khi vòng vô tình dính nước</h2>
      <p>Nếu chẳng may bị ướt mưa hoặc dính nước khi rửa tay, đừng vội dùng máy sấy nhiệt độ cao hay phơi nắng gắt vì sự thay đổi nhiệt đột ngột có thể làm nứt hạt. Hãy dùng khăn bông mềm thấm khô nước và để vòng nơi khô thoáng.</p>

      <h2>3. Nghệ thuật 'lên nước' bóng gương (Patina)</h2>
      <p>Vòng tay gỗ quý mộc như Tử Đàn, Sưa hay Trầm hương khi được đeo đều đặn, mồ hôi tự nhiên và ma sát với cổ tay sẽ tạo nên một lớp màng oxit bảo vệ cực kỳ bóng bẩy, dân gian gọi là 'lên nước'.</p>
    `,
    relatedProductSkus: ["VT-TD-01", "VT-CBX-05", "VT-TH-06"],
    status: "published"
  },
  {
    id: "nhung-dieu-can-xem-khi-chon-but-ky-go-lam-qua",
    title: "Những điều cần xem khi chọn bút ký gỗ làm quà",
    slug: "nhung-dieu-can-xem-khi-chon-but-ky-go-lam-qua",
    group: "huong-dan",
    groupName: "Hướng dẫn lựa chọn",
    author: "Mỹ Nghệ Đông Phong",
    publishedAt: "2026-09-04T08:30:00Z",
    thumbnail: "/assets/images/articles/bai-viet-chon-but-ky.webp",
    excerpt: "Cách lựa chọn chiếc bút ký thủ công từ gỗ quý để trao tặng sếp, đối tác kinh doanh hoặc người thân trong những dịp quan trọng.",
    content: `
      <h2>1. Chọn loại gỗ hợp mệnh và tính cách người nhận</h2>
      <p>Mỗi loại gỗ quý mang một thông điệp phong thủy riêng biệt:</p>
      <ul>
        <li><strong>Nu Huyết Long:</strong> Thấu quang đỏ rực, tượng trưng cho năng lượng Hỏa và Thổ, mang lại may mắn và danh tiếng.</li>
        <li><strong>Hoàng Đàn Tuyết:</strong> Hương thơm quý tộc dịu ngọt, thể hiện sự kính trọng tuyệt đối và vị thế tôn nghiêm.</li>
        <li><strong>Mun Sừng:</strong> Màu đen tuyền quyền lực, bền bỉ vĩnh cửu, hợp với người quyết đoán, lãnh đạo.</li>
      </ul>

      <h2>2. Trải nghiệm cầm nắm và cơ cấu ngòi bút</h2>
      <p>Một cây bút ký chất lượng phải đảm bảo sự cân bằng trọng tâm giữa thân gỗ và phần ngòi kim loại. Ruột bút nên dùng chuẩn ruột bi dạ cao cấp, cho nét mực đều, trơn tru, không cào giấy khi ký những bản hợp đồng giá trị.</p>
    `,
    relatedProductSkus: ["BK-HL-01", "BK-HD-03", "BK-MS-04"],
    status: "published"
  },
  {
    id: "van-go-va-nu-go-nhung-dac-diem-thuong-gap",
    title: "Vân gỗ và nu gỗ: những đặc điểm thường gặp",
    slug: "van-go-va-nu-go-nhung-dac-diem-thuong-gap",
    group: "kien-thuc",
    groupName: "Kiến thức về gỗ",
    author: "Nghệ nhân Đông Phong",
    publishedAt: "2026-09-05T09:15:00Z",
    thumbnail: "/assets/images/articles/bai-viet-van-go-nu-go.webp",
    excerpt: "Hiểu đúng về quá trình hình thành nu gỗ, vân mây, vân chớp 3D và lý do tại sao gỗ nu lại có giá trị sưu tầm cao gấp nhiều lần thân gỗ thông thường.",
    content: `
      <h2>1. Nu gỗ được hình thành như thế nào?</h2>
      <p>Nu gỗ (hay còn gọi là bướu gỗ) không phải là một giống cây mà là vết sẹo tự nhiên của thân cây cổ thụ. Khi cây bị sét đánh, sâu đục hoặc trầy xước, cây sẽ dồn toàn bộ dưỡng chất và tinh dầu đến vị trí tổn thương để tự chữa lành. Trải qua hàng trăm năm, vết sẹo này cuộn xoắn thành khối dị biệt với các đường hoa nu kỳ thú.</p>

      <h2>2. Phân biệt các dạng vân quý hiếm</h2>
      <ul>
        <li><strong>Vân Nu Cám / Nu Hoa:</strong> Những chấm tròn li ti kết chùm như hoa đào nở, chỉ có ở những khối nu thượng hạng.</li>
        <li><strong>Vân Chớp (Vân 3D):</strong> Khi nghiêng dưới ánh sáng mặt trời, vân gỗ như chuyển động lấp lánh như sóng nước.</li>
        <li><strong>Vân Mây:</strong> Các đường vân uốn lượn mềm mại như những dải mây bồng bềnh, thường gặp trên gỗ sưa đỏ già.</li>
      </ul>
    `,
    relatedProductSkus: ["VT-NBX-03", "BK-BX-02", "TAU-CAM-02"],
    status: "published"
  },
  {
    id: "cach-ve-sinh-va-bao-quan-dua-go",
    title: "Cách vệ sinh và bảo quản đũa gỗ",
    slug: "cach-ve-sinh-va-bao-quan-dua-go",
    group: "bao-quan",
    groupName: "Bảo quản sản phẩm",
    author: "Mỹ Nghệ Đông Phong",
    publishedAt: "2026-09-06T11:00:00Z",
    thumbnail: "/assets/images/articles/bai-viet-bao-quan-dua.webp",
    excerpt: "Hướng dẫn sử dụng đũa gỗ mun sừng và gỗ trắc mộc đúng cách, chống ẩm mốc tự nhiên, an toàn cho sức khỏe cả gia đình.",
    content: `
      <h2>1. Vì sao nên dùng đũa gỗ mộc tự nhiên?</h2>
      <p>Đũa gỗ cao cấp tại Đông Phong được chế tác từ gỗ mun sừng và trắc đỏ đen nguyên khối, không phủ vec-ni hay sơn bóng công nghiệp. Chất gỗ tự nhiên đanh chắc có khả năng kháng nước và chống vi khuẩn tự nhiên tốt hơn rất nhiều so với gỗ tạp.</p>

      <h2>2. Quy tắc vàng khi vệ sinh đũa gỗ</h2>
      <ul>
        <li>Không ngâm đũa trong chậu nước qua đêm.</li>
        <li>Rửa sạch bằng khăn rửa mềm ngay sau bữa ăn.</li>
        <li>Để đũa đứng trong ống đựng thoáng khí, đầu đũa hướng lên trên để khô tự nhiên.</li>
        <li>Không cho đũa vào máy sấy ở nhiệt độ quá cao trong thời gian dài.</li>
      </ul>
    `,
    relatedProductSkus: ["DUA-MS-01", "DUA-TRAC-02"],
    status: "published"
  },
  {
    id: "gioi-thieu-cac-nhom-san-pham-tai-my-nghe-dong-phong",
    title: "Giới thiệu các nhóm sản phẩm tại Mỹ Nghệ Đông Phong",
    slug: "gioi-thieu-cac-nhom-san-pham-tai-my-nghe-dong-phong",
    group: "kien-thuc",
    groupName: "Kiến thức về gỗ",
    author: "Ban Biên Tập Đông Phong",
    publishedAt: "2026-09-07T14:00:00Z",
    thumbnail: "/assets/images/articles/bai-viet-tong-quan-san-pham.webp",
    excerpt: "Tổng quan 7 dòng tác phẩm mộc nghệ thuật mang giá trị tâm huyết, tinh hoa nghề truyền thống và phong thủy an lành.",
    content: `
      <h2>1. Triết lý chế tác tại Mỹ Nghệ Đông Phong</h2>
      <p>Chúng tôi tôn trọng vẻ đẹp nguyên bản của từng thớ gỗ. Mỗi tác phẩm được hoàn thiện bằng bàn tay tài hoa của các nghệ nhân mộc truyền thống, gìn giữ trọn vẹn mùi hương thanh khiết và vân gỗ tự nhiên.</p>

      <h2>2. Bảy dòng sản phẩm độc đáo</h2>
      <p>Từ những chiếc vòng tay phong thủy mang lại an yên, những chiếc bút ký gỗ nu thấu quang khẳng định vị thế, cho đến những cặp bi lăn tay dưỡng sinh, đệm hạt ô tô mát mẻ hay đũa gỗ cho bữa cơm ấm cúng... tất cả đều hướng tới sự tỉ mỉ và bền vững trường tồn.</p>
    `,
    relatedProductSkus: ["VT-TD-01", "BK-HL-01", "DTO-TRAC-01", "GG-SUA-01"],
    status: "published"
  }
];
