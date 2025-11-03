"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Leaf, Recycle, Droplets } from "lucide-react";

export default function SustainabilityPage() {
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
        <h1 className="text-3xl font-black">Cam Kết Bền Vững</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8 text-center">
          <Leaf className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-black mb-2">Bảo Vệ Môi Trường</h2>
          <p className="text-base text-textGray">
            Hành động vì một tương lai xanh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-border rounded-2xl p-6 text-center">
            <Leaf className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-black mb-2">Vật Liệu Tái Chế</h3>
            <p className="text-sm text-textGray">50% sản phẩm từ vật liệu tái chế</p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 text-center">
            <Recycle className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-black mb-2">Bao Bì Xanh</h3>
            <p className="text-sm text-textGray">100% bao bì có thể tái chế</p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 text-center">
            <Droplets className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-black mb-2">Tiết Kiệm Nước</h3>
            <p className="text-sm text-textGray">Giảm 30% lượng nước sử dụng</p>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-base text-textGray leading-relaxed">
            Unipalm cam kết giảm thiểu tác động đến môi trường trong mọi khâu sản xuất. 
            Chúng tôi không ngừng nghiên cứu và áp dụng các công nghệ xanh để bảo vệ 
            hành tinh cho thế hệ tương lai.
          </p>
        </div>
      </div>
    </div>
  );
}