"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function Unipalm101Page() {
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
        <h1 className="text-3xl font-black">Unipalm 101</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8 text-center">
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-black mb-2">Tìm Hiểu Về Unipalm</h2>
          <p className="text-base text-textGray">
            Mọi điều bạn cần biết về thương hiệu của chúng tôi
          </p>
        </div>

        <div className="prose max-w-none">
          <h3 className="text-xl font-bold text-black mb-3">Unipalm Là Gì?</h3>
          <p className="text-base text-textGray leading-relaxed mb-6">
            Unipalm là thương hiệu thời trang chống nắng hàng đầu Việt Nam, 
            chuyên cung cấp các sản phẩm bảo vệ da với công nghệ UPF 50+ tiên tiến.
          </p>

          <h3 className="text-xl font-bold text-black mb-3">Sứ Mệnh</h3>
          <p className="text-base text-textGray leading-relaxed mb-6">
            Bảo vệ làn da người Việt khỏi tác hại của tia UV, đồng thời mang đến 
            phong cách thời trang hiện đại và thoải mái.
          </p>

          <h3 className="text-xl font-bold text-black mb-3">Tầm Nhìn</h3>
          <p className="text-base text-textGray leading-relaxed">
            Trở thành thương hiệu thời trang chống nắng số 1 Việt Nam, 
            được tin dùng bởi hàng triệu khách hàng trên toàn quốc.
          </p>
        </div>
      </div>
    </div>
  );
}