"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Award, Star, ThumbsUp } from "lucide-react";

export default function ManufacturerPage() {
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
        <h1 className="text-3xl font-black">Dịch Vụ Khách Hàng Xuất Sắc</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8 text-center">
          <Award className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-black mb-2">Cam Kết Dịch Vụ</h2>
          <p className="text-base text-textGray">
            Luôn đặt sự hài lòng của khách hàng lên hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-border rounded-2xl p-6 text-center">
            <Star className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-black mb-2">Chất Lượng 5 Sao</h3>
            <p className="text-sm text-textGray">Đánh giá trung bình 4.8/5 từ khách hàng</p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 text-center">
            <ThumbsUp className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-black mb-2">Hỗ Trợ 24/7</h3>
            <p className="text-sm text-textGray">Luôn sẵn sàng giải đáp mọi thắc mắc</p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 text-center">
            <Award className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-black mb-2">Đổi Trả 60 Ngày</h3>
            <p className="text-sm text-textGray">Chính sách đổi trả linh hoạt nhất</p>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-base text-textGray leading-relaxed">
            Tại Unipalm, chúng tôi tin rằng dịch vụ khách hàng xuất sắc là chìa khóa 
            để xây dựng lòng tin và sự trung thành. Đội ngũ của chúng tôi được đào tạo 
            bài bản để đảm bảo mọi trải nghiệm của bạn đều hoàn hảo.
          </p>
        </div>
      </div>
    </div>
  );
}