"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Lock, Eye } from "lucide-react";

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl font-black">Chính Sách Bảo Mật</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-bold text-black">Cam Kết Bảo Mật</h2>
          </div>
          <p className="text-base text-textGray leading-relaxed">
            Unipalm cam kết bảo vệ thông tin cá nhân của khách hàng. 
            Chúng tôi sử dụng các biện pháp bảo mật tiên tiến để đảm bảo dữ liệu của bạn luôn an toàn.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-black">Thông Tin Chúng Tôi Thu Thập</h3>
            </div>
            <ul className="space-y-2 ml-9">
              <li className="text-base text-textGray">• Họ tên, số điện thoại, email</li>
              <li className="text-base text-textGray">• Địa chỉ giao hàng</li>
              <li className="text-base text-textGray">• Lịch sử mua hàng và thanh toán</li>
              <li className="text-base text-textGray">• Thông tin thiết bị và IP address</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-black">Mục Đích Sử Dụng</h3>
            </div>
            <ul className="space-y-2 ml-9">
              <li className="text-base text-textGray">• Xử lý đơn hàng và giao hàng</li>
              <li className="text-base text-textGray">• Cải thiện trải nghiệm mua sắm</li>
              <li className="text-base text-textGray">• Gửi thông tin khuyến mãi (nếu bạn đồng ý)</li>
              <li className="text-base text-textGray">• Phân tích và nghiên cứu thị trường</li>
            </ul>
          </div>

          <div className="bg-backgroundGray rounded-2xl p-6">
            <h3 className="text-lg font-bold text-black mb-3">Quyền Của Bạn</h3>
            <p className="text-sm text-textGray mb-3">
              Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất cứ lúc nào.
            </p>
            <p className="text-sm text-textGray">
              Liên hệ: hellounipalm@gmail.com hoặc 0969.596.639
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}