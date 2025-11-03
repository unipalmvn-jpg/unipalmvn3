"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Users, Shield, Sparkles } from "lucide-react";

export default function ValuesPage() {
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
        <h1 className="text-3xl font-black">Quy Tắc Ứng Xử Của Unipalm</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8 text-center">
          <Heart className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-black mb-2">Giá Trị Cốt Lõi</h2>
          <p className="text-base text-textGray">
            Những nguyên tắc định hướng mọi hành động của chúng tôi
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold text-black">Khách Hàng Là Trung Tâm</h3>
            </div>
            <p className="text-base text-textGray leading-relaxed">
              Chúng tôi luôn đặt lợi ích và trải nghiệm của khách hàng lên hàng đầu. 
              Mọi quyết định đều hướng đến việc mang lại giá trị tốt nhất cho khách hàng.
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold text-black">Chất Lượng & Trung Thực</h3>
            </div>
            <p className="text-base text-textGray leading-relaxed">
              Cam kết về chất lượng sản phẩm và minh bạch trong mọi giao dịch. 
              Chúng tôi không bao giờ thỏa hiệp với chất lượng.
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold text-black">Đổi Mới & Sáng Tạo</h3>
            </div>
            <p className="text-base text-textGray leading-relaxed">
              Không ngừng nghiên cứu và phát triển để mang đến những sản phẩm 
              với công nghệ tiên tiến nhất cho khách hàng Việt Nam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}