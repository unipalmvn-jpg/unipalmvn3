"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Package, Clock, CheckCircle } from "lucide-react";

export default function ReturnPolicyPage() {
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
        <h1 className="text-3xl font-black">Chính Sách Đổi Trả 60 Ngày</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-bold text-black">Cam Kết Của Chúng Tôi</h2>
          </div>
          <p className="text-base text-textGray leading-relaxed">
            Tại Unipalm, chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất. 
            Nếu bạn không hài lòng với sản phẩm, bạn có thể đổi trả trong vòng 60 ngày.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-black mb-3">Điều Kiện Đổi Trả</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-base text-textGray">Sản phẩm còn nguyên tem mác, chưa qua sử dụng</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-base text-textGray">Có hóa đơn mua hàng hoặc mã đơn hàng</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-base text-textGray">Trong thời hạn 60 ngày kể từ ngày mua</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-base text-textGray">Sản phẩm không có dấu hiệu hư hỏng do người dùng</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-3">Quy Trình Đổi Trả</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-base font-bold text-black mb-1">Liên Hệ</h4>
                  <p className="text-sm text-textGray">
                    Gọi hotline 0969.596.639 hoặc gửi email đến hellounipalm@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-base font-bold text-black mb-1">Gửi Sản Phẩm</h4>
                  <p className="text-sm text-textGray">
                    Đóng gói sản phẩm cẩn thận và gửi về địa chỉ của Unipalm
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-base font-bold text-black mb-1">Kiểm Tra</h4>
                  <p className="text-sm text-textGray">
                    Chúng tôi sẽ kiểm tra sản phẩm trong vòng 2-3 ngày làm việc
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-base font-bold text-black mb-1">Hoàn Tiền/Đổi Hàng</h4>
                  <p className="text-sm text-textGray">
                    Hoàn tiền trong 5-7 ngày hoặc gửi sản phẩm mới cho bạn
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-backgroundGray rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-black">Lưu Ý Quan Trọng</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-textGray">• Phí vận chuyển đổi trả do khách hàng chịu (trừ trường hợp lỗi từ nhà sản xuất)</li>
              <li className="text-sm text-textGray">• Sản phẩm sale off không áp dụng chính sách đổi trả</li>
              <li className="text-sm text-textGray">• Thời gian xử lý có thể kéo dài hơn vào dịp lễ, Tết</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}