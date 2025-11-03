export interface Technology {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: [string, string];
  category: string;
  readTime: string;
  date: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      text: string;
    }[];
    features: string[];
  };
}

export const technologies: Technology[] = [
  {
    id: "1",
    title: "Công Nghệ UPF 50+",
    subtitle: "Bảo vệ tối đa khỏi tia UV",
    icon: "☀️",
    gradient: ["#97d7d9", "#5bc9e1"],
    category: "Sun Protection",
    readTime: "5 phút",
    date: "15/01/2025",
    content: {
      intro:
        "UPF (Ultraviolet Protection Factor) là chỉ số đo lường khả năng chống tia cực tím của vải. Với UPF 50+, sản phẩm của Unipalm chặn được hơn 98% tia UV có hại.",
      sections: [
        {
          heading: "UPF là gì?",
          text: "UPF là viết tắt của Ultraviolet Protection Factor, tương tự như SPF trong kem chống nắng nhưng áp dụng cho vải. Chỉ số UPF 50+ nghĩa là chỉ cho phép 1/50 lượng tia UV đi qua vải.",
        },
        {
          heading: "Tại sao UPF 50+ quan trọng?",
          text: "Tia UV gây hại nghiêm trọng cho da, bao gồm lão hóa da, sạm da, và tăng nguy cơ ung thư da. Với khí hậu nhiệt đới Việt Nam, việc bảo vệ da khỏi tia UV là vô cùng quan trọng.",
        },
        {
          heading: "Công nghệ vải đặc biệt",
          text: "Unipalm sử dụng sợi vải được xử lý đặc biệt với các hạt nano titanium dioxide, tạo ra lớp chắn vật lý chống lại tia UV. Công nghệ này không chỉ hiệu quả mà còn bền vững, không phai màu theo thời gian.",
        },
      ],
      features: [
        "Chặn 98% tia UVA và UVB",
        "Hiệu quả bảo vệ lâu dài",
        "Không chứa hóa chất độc hại",
        "An toàn cho làn da nhạy cảm",
      ],
    },
  },
  {
    id: "2",
    title: "Vải Thoáng Khí Quick-Dry",
    subtitle: "Mát mẻ và nhanh khô",
    icon: "💨",
    gradient: ["#f6c785", "#f3ac71"],
    category: "Fabric Technology",
    readTime: "4 phút",
    date: "10/01/2025",
    content: {
      intro:
        "Công nghệ vải thoáng khí Quick-Dry giúp bạn luôn cảm thấy thoải mái và khô ráo, ngay cả trong điều kiện thời tiết nóng ẩm của Việt Nam.",
      sections: [
        {
          heading: "Cấu trúc vi mô đặc biệt",
          text: "Vải được dệt với cấu trúc vi mô đặc biệt, tạo ra hàng nghìn kênh thoát hơi nước siêu nhỏ. Điều này giúp mồ hôi bay hơi nhanh chóng, giữ cho cơ thể luôn khô ráo.",
        },
        {
          heading: "Công nghệ Moisture-Wicking",
          text: "Sợi vải có khả năng hút ẩm và đẩy nước ra bề mặt ngoài, nơi nó có thể bay hơi nhanh chóng. Quá trình này diễn ra liên tục, đảm bảo bạn luôn cảm thấy khô ráo.",
        },
        {
          heading: "Khô nhanh gấp 3 lần",
          text: "So với vải cotton thông thường, vải Quick-Dry của Unipalm khô nhanh hơn gấp 3 lần. Điều này đặc biệt hữu ích khi bạn ra mồ hôi nhiều hoặc khi giặt và phơi quần áo.",
        },
      ],
      features: [
        "Thoáng khí tối ưu",
        "Khô nhanh sau khi giặt",
        "Không gây bí bách",
        "Phù hợp khí hậu nhiệt đới",
      ],
    },
  },
  {
    id: "3",
    title: "Công Nghệ Cooling Effect",
    subtitle: "Mát lạnh tức thì khi tiếp xúc",
    icon: "🧊",
    gradient: ["#b2d235", "#a5b289"],
    category: "Cooling Technology",
    readTime: "4 phút",
    date: "05/01/2025",
    content: {
      intro:
        "Công nghệ Cooling Effect tạo cảm giác mát lạnh tức thì khi vải tiếp xúc với da, giúp giảm nhiệt độ cơ thể hiệu quả.",
      sections: [
        {
          heading: "Cơ chế hoạt động",
          text: "Vải được tích hợp các phân tử khoáng chất đặc biệt có khả năng hấp thụ và phân tán nhiệt nhanh chóng. Khi tiếp xúc với da, các phân tử này lập tức hút nhiệt, tạo cảm giác mát lạnh dễ chịu.",
        },
        {
          heading: "Giảm nhiệt độ tới 5°C",
          text: "Theo nghiên cứu, công nghệ Cooling Effect có thể giảm nhiệt độ bề mặt da tới 5°C so với vải thông thường. Điều này giúp bạn cảm thấy thoải mái hơn nhiều trong những ngày nắng nóng.",
        },
        {
          heading: "Hiệu quả lâu dài",
          text: "Khác với các sản phẩm làm mát tạm thời, công nghệ Cooling của Unipalm được tích hợp vào cấu trúc vải, duy trì hiệu quả suốt vòng đời sản phẩm.",
        },
      ],
      features: [
        "Mát lạnh tức thì",
        "Giảm nhiệt độ cơ thể",
        "Hiệu quả lâu dài",
        "Không phai sau khi giặt",
      ],
    },
  },
  {
    id: "4",
    title: "Vải Kháng Khuẩn",
    subtitle: "Ngăn ngừa vi khuẩn và mùi hôi",
    icon: "🛡️",
    gradient: ["#c6a9b5", "#e5d3bd"],
    category: "Hygiene Technology",
    readTime: "3 phút",
    date: "01/01/2025",
    content: {
      intro:
        "Công nghệ vải kháng khuẩn giúp ngăn chặn sự phát triển của vi khuẩn và nấm, giữ cho quần áo luôn sạch sẽ và không có mùi hôi.",
      sections: [
        {
          heading: "Ion bạc kháng khuẩn",
          text: "Vải được xử lý với ion bạc có khả năng kháng khuẩn tự nhiên. Ion bạc phá vỡ màng tế bào vi khuẩn, ngăn chặn sự sinh sôi và phát triển của chúng.",
        },
        {
          heading: "Ngăn mùi hôi hiệu quả",
          text: "Vi khuẩn là nguyên nhân chính gây ra mùi hôi trên quần áo. Bằng cách kiểm soát vi khuẩn, vải kháng khuẩn giúp giữ cho quần áo luôn thơm tho, ngay cả khi bạn ra mồ hôi nhiều.",
        },
        {
          heading: "An toàn cho da",
          text: "Ion bạc kháng khuẩn là một giải pháp tự nhiên, an toàn cho làn da, không gây kích ứng hay dị ứng. Đây là lựa chọn lý tưởng cho người có làn da nhạy cảm.",
        },
      ],
      features: [
        "Kháng khuẩn 99.9%",
        "Ngăn mùi hôi",
        "An toàn cho da nhạy cảm",
        "Không chứa hóa chất độc hại",
      ],
    },
  },
  {
    id: "5",
    title: "Vải Co Giãn 4 Chiều",
    subtitle: "Thoải mái vận động tối đa",
    icon: "🤸",
    gradient: ["#97d7d9", "#c0e5e7"],
    category: "Comfort Technology",
    readTime: "3 phút",
    date: "28/12/2024",
    content: {
      intro:
        "Công nghệ vải co giãn 4 chiều mang đến sự thoải mái tuyệt đối, cho phép bạn vận động tự do mà không bị gò bó.",
      sections: [
        {
          heading: "Co giãn đa chiều",
          text: "Khác với vải co giãn thông thường chỉ giãn theo một chiều, vải 4 chiều của Unipalm co giãn theo cả chiều dọc và chiều ngang, mang đến sự thoải mái tối đa.",
        },
        {
          heading: "Giữ form dáng hoàn hảo",
          text: "Mặc dù co giãn tốt, vải vẫn giữ được form dáng ban đầu, không bị nhão hay giãn sau nhiều lần giặt. Điều này đảm bảo sản phẩm luôn vừa vặn và đẹp.",
        },
        {
          heading: "Phục hồi nhanh",
          text: "Sợi elastane chất lượng cao giúp vải nhanh chóng trở lại hình dạng ban đầu sau khi giãn, đảm bảo độ bền lâu dài của sản phẩm.",
        },
      ],
      features: [
        "Co giãn 4 chiều",
        "Thoải mái vận động",
        "Giữ form dáng",
        "Độ bền cao",
      ],
    },
  },
  {
    id: "6",
    title: "Công Nghệ Chống Thấm Nước",
    subtitle: "Bảo vệ khỏi mưa và nước",
    icon: "💧",
    gradient: ["#5bc9e1", "#92d7e7"],
    category: "Water Resistance",
    readTime: "4 phút",
    date: "20/12/2024",
    content: {
      intro:
        "Công nghệ chống thấm nước giúp bảo vệ bạn khỏi mưa bất chợt và các tình huống tiếp xúc với nước, đồng thời vẫn duy trì độ thoáng khí.",
      sections: [
        {
          heading: "Lớp phủ DWR",
          text: "Vải được xử lý với lớp phủ DWR (Durable Water Repellent) bền vững, khiến nước không thấm qua mà tụ thành giọt và lăn ra ngoài.",
        },
        {
          heading: "Thoáng khí nhưng chống thấm",
          text: "Công nghệ đặc biệt cho phép hơi nước từ cơ thể thoát ra ngoài, nhưng ngăn không cho nước từ bên ngoài thấm vào. Điều này đảm bảo bạn luôn khô ráo và thoải mái.",
        },
        {
          heading: "Bền vững với thời gian",
          text: "Lớp phủ chống thấm của Unipalm được thiết kế để duy trì hiệu quả qua nhiều lần giặt, đảm bảo sản phẩm bảo vệ bạn lâu dài.",
        },
      ],
      features: [
        "Chống thấm nước hiệu quả",
        "Vẫn duy trì độ thoáng khí",
        "Bền vững sau nhiều lần giặt",
        "Nhanh khô",
      ],
    },
  },
];

export const technologyCategories = [
  "Sun Protection",
  "Fabric Technology",
  "Cooling Technology",
  "Hygiene Technology",
  "Comfort Technology",
  "Water Resistance",
];
