"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Ruler } from "lucide-react";

export default function SizeGuidePage() {
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
        <h1 className="text-3xl font-black">Hướng Dẫn Chọn Size</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8 text-center">
          <Ruler className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-black mb-2">Chọn Size Phù Hợp</h2>
          <p className="text-base text-textGray">
            Tìm size hoàn hảo cho bạn với bảng size chi tiết
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-black mb-4">Bảng Size Áo</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-backgroundGray">
                    <th className="border border-border p-3 text-left font-bold">Size</th>
                    <th className="border border-border p-3 text-left font-bold">Chiều Cao (cm)</th>
                    <th className="border border-border p-3 text-left font-bold">Cân Nặng (kg)</th>
                    <th className="border border-border p-3 text-left font-bold">Vòng Ngực (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-semibold">S</td>
                    <td className="border border-border p-3">155-160</td>
                    <td className="border border-border p-3">45-50</td>
                    <td className="border border-border p-3">80-85</td>
                  </tr>
                  <tr className="bg-backgroundGray/30">
                    <td className="border border-border p-3 font-semibold">M</td>
                    <td className="border border-border p-3">160-165</td>
                    <td className="border border-border p-3">50-55</td>
                    <td className="border border-border p-3">85-90</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-semibold">L</td>
                    <td className="border border-border p-3">165-170</td>
                    <td className="border border-border p-3">55-65</td>
                    <td className="border border-border p-3">90-95</td>
                  </tr>
                  <tr className="bg-backgroundGray/30">
                    <td className="border border-border p-3 font-semibold">XL</td>
                    <td className="border border-border p-3">170-175</td>
                    <td className="border border-border p-3">65-75</td>
                    <td className="border border-border p-3">95-100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-backgroundGray rounded-2xl p-6">
            <h3 className="text-lg font-bold text-black mb-3">Lưu Ý Khi Chọn Size</h3>
            <ul className="space-y-2">
              <li className="text-sm text-textGray">• Nếu số đo của bạn nằm giữa 2 size, nên chọn size lớn hơn</li>
              <li className="text-sm text-textGray">• Sản phẩm có độ co giãn tốt, phù hợp với nhiều vóc dáng</li>
              <li className="text-sm text-textGray">• Liên hệ 0969.596.639 nếu cần tư vấn thêm</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}