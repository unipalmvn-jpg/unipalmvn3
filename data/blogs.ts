export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: string;
  date: string;
  views: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      text: string;
    }[];
    conclusion: string;
  };
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Bí Quyết Bảo Vệ Làn Da Dưới Ánh Nắng Mặt Trời Việt Nam",
    excerpt:
      "Khám phá những cách hiệu quả nhất để bảo vệ làn da khỏi tác hại của tia UV trong khí hậu nhiệt đới.",
    coverImage: "#97d7d9",
    category: "Chăm Sóc Da",
    author: {
      name: "Dr. Minh Hà",
      avatar: "#f6c785",
    },
    readTime: "7 phút",
    date: "25/01/2025",
    views: "2.5K",
    content: {
      intro:
        "Việt Nam có khí hậu nhiệt đới nóng ẩm với cường độ tia UV rất cao, đặc biệt vào mùa hè. Việc bảo vệ da khỏi tác hại của tia UV không chỉ giúp ngăn ngừa sạm da mà còn giảm nguy cơ lão hóa sớm và các bệnh về da.",
      sections: [
        {
          heading: "1. Sử Dụng Kem Chống Nắng Hàng Ngày",
          text: "Kem chống nắng với chỉ số SPF 30+ là điều không thể thiếu. Thoa kem 15-20 phút trước khi ra ngoài và bôi lại sau mỗi 2 giờ hoặc sau khi ra mồ hôi nhiều.",
        },
        {
          heading: "2. Mặc Quần Áo Chống Nắng UPF 50+",
          text: "Quần áo với chỉ số UPF 50+ chặn được 98% tia UV, bảo vệ da hiệu quả hơn nhiều so với kem chống nắng đơn thuần. Đây là lựa chọn lý tưởng cho những ngày nắng gắt.",
        },
        {
          heading: "3. Đội Mũ Rộng Vành",
          text: "Mũ rộng vành giúp che chắn tia UV cho khuôn mặt, tai và cổ. Chọn mũ có vành rộng ít nhất 7-10cm để đạt hiệu quả tốt nhất.",
        },
        {
          heading: "4. Tránh Ra Ngoài Vào Giữa Trưa",
          text: "Tia UV mạnh nhất từ 10h sáng đến 4h chiều. Nếu có thể, hạn chế hoạt động ngoài trời trong khung giờ này.",
        },
        {
          heading: "5. Uống Đủ Nước",
          text: "Uống đủ nước giúp da duy trì độ ẩm, tăng khả năng chống lại tác hại của tia UV. Mục tiêu là 2-2.5 lít nước mỗi ngày.",
        },
      ],
      conclusion:
        "Bảo vệ da khỏi tia UV là một quá trình liên tục đòi hỏi sự kiên trì. Kết hợp nhiều biện pháp bảo vệ sẽ mang lại hiệu quả tốt nhất cho làn da của bạn.",
    },
    tags: ["Chăm sóc da", "Chống nắng", "Sức khỏe"],
  },
  {
    id: "2",
    title: "Xu Hướng Thời Trang Chống Nắng 2025: Phong Cách & Bảo Vệ",
    excerpt:
      "Cập nhật những xu hướng mới nhất trong thời trang chống nắng, nơi phong cách gặp gỡ chức năng.",
    coverImage: "#f6c785",
    category: "Thời Trang",
    author: {
      name: "Nguyễn An",
      avatar: "#97d7d9",
    },
    readTime: "5 phút",
    date: "22/01/2025",
    views: "3.2K",
    content: {
      intro:
        "Năm 2025 đánh dấu sự chuyển mình mạnh mẽ của ngành thời trang chống nắng tại Việt Nam. Không còn là những sản phẩm đơn điệu, thời trang chống nắng giờ đây kết hợp hoàn hảo giữa tính năng bảo vệ và phong cách thời thượng.",
      sections: [
        {
          heading: "Màu Sắc Pastel Trendy",
          text: "Màu pastel nhẹ nhàng như mint, lavender, và peach đang thống trị xu hướng. Những gam màu này không chỉ dễ phối đồ mà còn tạo cảm giác tươi mát, phù hợp với mùa hè.",
        },
        {
          heading: "Thiết Kế Oversized Thoải Mái",
          text: "Form oversized rộng rãi không chỉ trendy mà còn tạo sự thoáng mát tối đa. Đây là lựa chọn hoàn hảo cho những ngày nắng nóng.",
        },
        {
          heading: "Phụ Kiện Đa Năng",
          text: "Khăn choàng, mũ bucket, và găng tay chống nắng với thiết kế đa năng đang được giới trẻ ưa chuộng. Những phụ kiện này có thể kết hợp linh hoạt với nhiều trang phục khác nhau.",
        },
        {
          heading: "Công Nghệ In Họa Tiết",
          text: "Công nghệ in chuyển nhiệt cho phép tạo ra các họa tiết độc đáo, từ minimalist đến bold pattern, đáp ứng mọi phong cách cá nhân.",
        },
        {
          heading: "Sustainable Fashion",
          text: "Vải tái chế và thân thiện môi trường đang trở thành yếu tố quan trọng. Người tiêu dùng ngày càng ưu tiên các sản phẩm bền vững.",
        },
      ],
      conclusion:
        "Thời trang chống nắng 2025 chứng minh rằng bạn không cần phải hy sinh phong cách để bảo vệ làn da. Hãy lựa chọn những sản phẩm vừa thời trang vừa chức năng để tự tin tỏa sáng.",
    },
    tags: ["Thời trang", "Xu hướng", "2025"],
  },
  {
    id: "3",
    title: "Làm Thế Nào Để Chọn Áo Khoác Chống Nắng Phù Hợp?",
    excerpt:
      "Hướng dẫn chi tiết giúp bạn chọn áo khoác chống nắng hoàn hảo cho nhu cầu và phong cách của mình.",
    coverImage: "#b2d235",
    category: "Hướng Dẫn",
    author: {
      name: "Lê Thảo",
      avatar: "#c6a9b5",
    },
    readTime: "6 phút",
    date: "18/01/2025",
    views: "1.8K",
    content: {
      intro:
        "Với vô số lựa chọn trên thị trường, việc tìm được chiếc áo khoác chống nắng phù hợp có thể khiến bạn bối rối. Bài viết này sẽ giúp bạn hiểu rõ những yếu tố cần xem xét.",
      sections: [
        {
          heading: "Kiểm Tra Chỉ Số UPF",
          text: "Chỉ số UPF là yếu tố quan trọng nhất. UPF 50+ cung cấp khả năng bảo vệ tốt nhất, chặn 98% tia UV. Không chọn sản phẩm có UPF dưới 30.",
        },
        {
          heading: "Chọn Vải Phù Hợp",
          text: "Vải thoáng khí và nhanh khô rất quan trọng trong khí hậu nhiệt đới. Polyester và nylon thường có tính năng này tốt hơn cotton.",
        },
        {
          heading: "Xem Xét Kiểu Dáng",
          text: "Kiểu dáng phải phù hợp với hoạt động của bạn. Nếu đi làm, chọn kiểu basic thanh lịch. Nếu chơi thể thao, chọn kiểu sporty linh hoạt.",
        },
        {
          heading: "Màu Sắc Và Họa Tiết",
          text: "Màu sáng phản xạ ánh sáng tốt hơn, nhưng màu tối lại hấp thụ tia UV hiệu quả hơn. Chọn theo sở thích và nhu cầu của bạn.",
        },
        {
          heading: "Thử Và Cảm Nhận",
          text: "Luôn thử sản phẩm trước khi mua. Vận động thử xem có bị gò bó không, kiểm tra độ thoáng khí và cảm giác mặc.",
        },
      ],
      conclusion:
        "Áo khoác chống nắng phù hợp sẽ đồng hành cùng bạn trong mọi hoạt động. Đầu tư thời gian để chọn lựa kỹ càng sẽ mang lại giá trị lâu dài.",
    },
    tags: ["Hướng dẫn", "Mua sắm", "Chống nắng"],
  },
  {
    id: "4",
    title: "Sự Khác Biệt Giữa SPF Và UPF: Bạn Cần Biết",
    excerpt:
      "Hiểu rõ sự khác biệt giữa SPF và UPF để bảo vệ làn da hiệu quả hơn.",
    coverImage: "#c6a9b5",
    category: "Kiến Thức",
    author: {
      name: "BS. Phương Anh",
      avatar: "#b2d235",
    },
    readTime: "4 phút",
    date: "15/01/2025",
    views: "2.1K",
    content: {
      intro:
        "Nhiều người thường nhầm lẫn giữa SPF và UPF. Mặc dù cả hai đều liên quan đến bảo vệ da khỏi tia UV, nhưng chúng hoàn toàn khác nhau về cách thức hoạt động và ứng dụng.",
      sections: [
        {
          heading: "SPF - Sun Protection Factor",
          text: "SPF là chỉ số đo khả năng bảo vệ da khỏi tia UVB của kem chống nắng. Nó cho biết thời gian da có thể tiếp xúc với nắng trước khi bị cháy so với không dùng kem.",
        },
        {
          heading: "UPF - Ultraviolet Protection Factor",
          text: "UPF đo khả năng chống tia UV của vải. Nó đánh giá cả tia UVA và UVB, cho biết tỷ lệ tia UV bị chặn bởi vải.",
        },
        {
          heading: "Ưu Điểm Của UPF",
          text: "UPF có nhiều ưu điểm hơn SPF: không cần bôi lại liên tục, không gây nhờn rít, hiệu quả ổn định suốt cả ngày, và bảo vệ diện tích da lớn hơn.",
        },
        {
          heading: "Kết Hợp Cả Hai",
          text: "Cách tốt nhất là kết hợp cả SPF và UPF. Mặc quần áo UPF 50+ và thoa kem chống nắng SPF 30+ ở những vùng da hở để đạt hiệu quả bảo vệ tối đa.",
        },
        {
          heading: "Lựa Chọn Phù Hợp",
          text: "Với hoạt động ngoài trời lâu dài, ưu tiên quần áo UPF. Với những vùng da không thể che phủ như mặt và tay, sử dụng kem chống nắng SPF.",
        },
      ],
      conclusion:
        "Hiểu rõ sự khác biệt giữa SPF và UPF giúp bạn xây dựng chiến lược bảo vệ da toàn diện và hiệu quả nhất.",
    },
    tags: ["Kiến thức", "SPF", "UPF", "Chống nắng"],
  },
  {
    id: "5",
    title: "5 Hoạt Động Ngoài Trời Cần Có Đồ Chống Nắng",
    excerpt:
      "Khám phá những hoạt động mà bạn tuyệt đối cần trang bị đồ chống nắng để bảo vệ sức khỏe.",
    coverImage: "#5bc9e1",
    category: "Lifestyle",
    author: {
      name: "Trần Hải",
      avatar: "#f6c785",
    },
    readTime: "5 phút",
    date: "12/01/2025",
    views: "1.5K",
    content: {
      intro:
        "Hoạt động ngoài trời rất tốt cho sức khỏe, nhưng cũng đồng nghĩa với việc da bị phơi nhiễm nhiều với tia UV. Dưới đây là 5 hoạt động mà bạn cần trang bị đồ chống nắng.",
      sections: [
        {
          heading: "1. Đi Biển & Bơi Lội",
          text: "Tia UV phản xạ từ mặt nước rất mạnh. Mặc đồ bơi chống nắng UPF 50+ và áo khoác chống nắng khi không bơi sẽ bảo vệ da hiệu quả.",
        },
        {
          heading: "2. Chạy Bộ & Đạp Xe",
          text: "Các hoạt động cardio ngoài trời khiến bạn tiếp xúc với nắng liên tục. Áo khoác chống nắng thoáng khí và nhanh khô là lựa chọn lý tưởng.",
        },
        {
          heading: "3. Hiking & Trekking",
          text: "Leo núi và đi bộ đường dài đồng nghĩa với nhiều giờ dưới trời nắng. Trang phục chống nắng toàn thân là điều không thể thiếu.",
        },
        {
          heading: "4. Picnic & Camping",
          text: "Ngay cả khi nghỉ ngơi ngoài trời, da bạn vẫn bị tác động bởi tia UV. Mũ rộng vành và áo khoác nhẹ giúp bạn thoải mái suốt cả ngày.",
        },
        {
          heading: "5. Làm Vườn",
          text: "Làm vườn có thể khiến bạn ở ngoài trời hàng giờ. Găng tay chống nắng và mũ là những phụ kiện cần thiết để bảo vệ tay và mặt.",
        },
      ],
      conclusion:
        "Bất kể hoạt động ngoài trời nào, luôn trang bị đồ chống nắng phù hợp. Đầu tư vào sức khỏe làn da chính là đầu tư vào tương lai.",
    },
    tags: ["Lifestyle", "Hoạt động", "Ngoài trời"],
  },
  {
    id: "6",
    title: "Cách Giặt Và Bảo Quản Đồ Chống Nắng Đúng Cách",
    excerpt:
      "Hướng dẫn chi tiết để giữ cho quần áo chống nắng luôn hiệu quả và bền đẹp.",
    coverImage: "#e5d3bd",
    category: "Hướng Dẫn",
    author: {
      name: "Mai Linh",
      avatar: "#97d7d9",
    },
    readTime: "4 phút",
    date: "08/01/2025",
    views: "1.2K",
    content: {
      intro:
        "Quần áo chống nắng là khoản đầu tư cho sức khỏe, và việc bảo quản đúng cách sẽ giúp duy trì hiệu quả bảo vệ lâu dài. Dưới đây là những tips quan trọng.",
      sections: [
        {
          heading: "Giặt Đúng Nhiệt Độ",
          text: "Giặt ở nhiệt độ nước lạnh hoặc ấm (không quá 30°C) để bảo vệ sợi vải và lớp chống UV. Nước nóng có thể làm giảm hiệu quả UPF.",
        },
        {
          heading: "Chọn Chất Tẩy Rửa Nhẹ",
          text: "Sử dụng nước giặt nhẹ, không chứa chất tẩy trắng hay hóa chất mạnh. Chất tẩy trắng có thể phá hủy lớp bảo vệ UV của vải.",
        },
        {
          heading: "Tránh Vắt Mạnh",
          text: "Vắt nhẹ nhàng hoặc để ráo tự nhiên. Việc vắt mạnh có thể làm giãn sợi vải và giảm khả năng chống UV.",
        },
        {
          heading: "Phơi Ở Nơi Thoáng Mát",
          text: "Phơi trong bóng râm, tránh ánh nắng trực tiếp. Tia UV từ ánh nắng có thể làm giảm hiệu quả UPF của vải theo thời gian.",
        },
        {
          heading: "Bảo Quản Đúng Cách",
          text: "Cất trong tủ kín, tránh nơi ẩm ướt. Kiểm tra định kỳ và thay thế khi thấy vải bị mòn, phai màu nghiêm trọng.",
        },
      ],
      conclusion:
        "Chăm sóc đúng cách sẽ giúp quần áo chống nắng giữ được hiệu quả bảo vệ tối đa trong nhiều năm. Hãy xem đó như một phần quan trọng trong việc bảo vệ làn da.",
    },
    tags: ["Hướng dẫn", "Bảo quản", "Chăm sóc"],
  },
];

export const blogCategories = [
  "Chăm Sóc Da",
  "Thời Trang",
  "Hướng Dẫn",
  "Kiến Thức",
  "Lifestyle",
];
