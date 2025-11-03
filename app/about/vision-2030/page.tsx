"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Target, TrendingUp, Globe } from "lucide-react";

export default function Vision2030Page() {
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
        <h1 className="text-3xl font-black">Tầm Nhìn 2030</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8 text-center">
          <Target className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-black mb-2">Hướng Tới Tương Lai</h2>
          <p className="text-base text-textGray">
            Mục tiêu và định hướng phát triển đến năm 2030
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold text-black">Mục Tiêu Kinh Doanh</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-base text-textGray">• Trở thành thương hiệu số 1 Việt Nam về thời trang chống nắng</li>
              <li className="text-base text-textGray">• Phục vụ 1 triệu khách hàng mỗi năm</li>
              <li className="text-base text-textGray">• Mở rộng 100 cửa hàng trên toàn quốc</li>
              <li className="text-base text-textGray">• Xuất khẩu sản phẩm ra thị trường quốc tế</li>
            </ul>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold text-black">Trách Nhiệm Xã Hội</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-base text-textGray">• 100% sản phẩm từ nguồn bền vững</li>
              <li className="text-base text-textGray">• Trung hòa carbon trong sản xuất</li>
              <li className="text-base text-textGray">• Tạo việc làm cho 10,000 người</li>
              <li className="text-base text-textGray">• Đóng góp 5% doanh thu cho cộng đồng</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary to-primaryDark rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-black mb-3">Cùng Nhau Xây Dựng Tương Lai</h3>
            <p className="text-base opacity-95">
              Hãy đồng hành cùng Unipalm trên hành trình hướng tới một tương lai 
              tốt đẹp hơn cho người Việt và môi trường.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}