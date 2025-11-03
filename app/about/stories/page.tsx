"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, BookHeart } from "lucide-react";

export default function StoriesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-primary text-white px-6 py-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold">Quay lại</span>
        </button>
        <h1 className="text-3xl font-black">Câu Chuyện Về Unipalm</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8 text-center">
          <BookHeart className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-black mb-2">Hành Trình Của Chúng Tôi</h2>
          <p className="text-base text-textGray">
            Từ ý tưởng đến thương hiệu được yêu thích
          </p>
        </div>

        <div className="prose max-w-none space-y-6">
          <div>
            <h3 className="text-xl font-bold text-black mb-3">Khởi Đầu (2020)</h3>
            <p className="text-base text-textGray leading-relaxed">
              Unipalm ra đời từ mong muốn bảo vệ làn da người Việt khỏi tác hại của 
              tia UV trong khí hậu nhiệt đới. Chúng tôi bắt đầu với một sản phẩm đơn giản 
              nhưng hiệu quả.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-3">Phát Triển (2021-2023)</h3>
            <p className="text-base text-textGray leading-relaxed">
              Với sự tin tưởng của khách hàng, chúng tôi không ngừng mở rộng dòng sản phẩm 
              và cải tiến công nghệ. Từ 1 cửa hàng, Unipalm đã phát triển thành chuỗi 
              với 15 cửa hàng trên toàn quốc.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-3">Hiện Tại (2025)</h3>
            <p className="text-base text-textGray leading-relaxed">
              Hôm nay, Unipalm tự hào là thương hiệu được hơn 50,000 khách hàng tin dùng. 
              Chúng tôi tiếp tục đổi mới để mang đến những sản phẩm tốt nhất cho bạn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}