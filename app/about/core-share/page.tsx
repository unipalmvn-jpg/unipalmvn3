"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, Heart } from "lucide-react";

export default function CoreSharePage() {
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
        <h1 className="text-3xl font-black">Core & Share</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8 text-center">
          <Share2 className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-black mb-2">Chia Sẻ Giá Trị</h2>
          <p className="text-base text-textGray">
            Cùng nhau xây dựng cộng đồng bền vững
          </p>
        </div>

        <div className="prose max-w-none space-y-6">
          <div className="bg-white border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold text-black">Chia Sẻ Cộng Đồng</h3>
            </div>
            <p className="text-base text-textGray leading-relaxed">
              Chúng tôi tin rằng thành công thực sự là khi có thể chia sẻ giá trị với cộng đồng. 
              Unipalm cam kết dành 1% doanh thu cho các hoạt động từ thiện và bảo vệ môi trường.
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-black mb-3">Các Hoạt Động</h3>
            <ul className="space-y-2">
              <li className="text-base text-textGray">• Tặng sản phẩm chống nắng cho trẻ em vùng cao</li>
              <li className="text-base text-textGray">• Hỗ trợ các chương trình bảo vệ môi trường</li>
              <li className="text-base text-textGray">• Đào tạo nghề cho thanh niên khó khăn</li>
              <li className="text-base text-textGray">• Tài trợ các hoạt động thể thao ngoài trời</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}