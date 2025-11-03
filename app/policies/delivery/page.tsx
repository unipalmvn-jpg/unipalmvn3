"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Truck, Clock, MapPin } from "lucide-react";

export default function DeliveryPolicyPage() {
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
        <h1 className="text-3xl font-black">Chính Sách Giao Hàng</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-bold text-black">Giao Hàng Nhanh Chóng & Tin Cậy</h2>
          </div>
          <p className="text-base text-textGray leading-relaxed">
            Unipalm hợp tác với các đối tác vận chuyển uy tín để đảm bảo đơn hàng đến tay bạn nhanh chóng và an toàn.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-black mb-3">Phí Vận Chuyển</h3>
            <ul className="space-y-3 list-disc list-inside text-base text-textGray">
              <li><strong>Miễn phí vận chuyển:</strong> Áp dụng cho tất cả đơn hàng có giá trị từ 500.000đ trở lên.</li>
              <li><strong>Phí vận chuyển tiêu chuẩn:</strong> 30.000đ cho các đơn hàng dưới 500.000đ, áp dụng trên toàn quốc.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-3">Thời Gian Giao Hàng</h3>
            <ul className="space-y-3 list-disc list-inside text-base text-textGray">
              <li><strong>Nội thành TP.HCM & Hà Nội:</strong> 1-2 ngày làm việc.</li>
              <li><strong>Các tỉnh thành khác:</strong> 3-5 ngày làm việc.</li>
              <li>Thời gian giao hàng không bao gồm Chủ Nhật và các ngày lễ, Tết.</li>
              <li>Đơn hàng đặt sau 16:00 sẽ được xử lý vào ngày làm việc tiếp theo.</li>
            </ul>
          </div>

          <div className="bg-backgroundGray rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-black">Kiểm Tra Đơn Hàng</h3>
            </div>
            <p className="text-sm text-textGray">
              Sau khi đặt hàng thành công, bạn sẽ nhận được mã vận đơn qua email để theo dõi hành trình đơn hàng. Vui lòng kiểm tra kỹ thông tin sản phẩm và thanh toán trước khi nhận hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}