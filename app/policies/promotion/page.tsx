"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Tag, Clock } from "lucide-react";

export default function PromotionPolicyPage() {
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
        <h1 className="text-3xl font-black">Chính Sách Khuyến Mãi</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-bold text-black">Điều Khoản & Điều Kiện</h2>
          </div>
          <p className="text-base text-textGray leading-relaxed">
            Các chương trình khuyến mãi của Unipalm được áp dụng theo các điều khoản và điều kiện dưới đây để đảm bảo tính công bằng và minh bạch.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-black mb-3">1. Mã Giảm Giá (Voucher)</h3>
            <ul className="space-y-3 list-disc list-inside text-base text-textGray">
              <li>Mỗi mã giảm giá có thể có các điều kiện áp dụng riêng (giá trị đơn hàng tối thiểu, sản phẩm áp dụng, thời hạn sử dụng).</li>
              <li>Mỗi đơn hàng chỉ được áp dụng một mã giảm giá duy nhất.</li>
              <li>Mã giảm giá không có giá trị quy đổi thành tiền mặt.</li>
              <li>Unipalm có quyền từ chối áp dụng mã giảm giá nếu phát hiện gian lận.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-3">2. Chương Trình Flash Sale</h3>
            <ul className="space-y-3 list-disc list-inside text-base text-textGray">
              <li>Sản phẩm trong chương trình Flash Sale có số lượng giới hạn.</li>
              <li>Giá khuyến mãi chỉ áp dụng trong thời gian diễn ra chương trình.</li>
              <li>Một số sản phẩm Flash Sale có thể không được áp dụng đồng thời với mã giảm giá khác.</li>
            </ul>
          </div>

          <div className="bg-backgroundGray rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-black">Lưu Ý Chung</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-textGray">• Unipalm có quyền thay đổi, điều chỉnh hoặc kết thúc các chương trình khuyến mãi mà không cần thông báo trước.</li>
              <li className="text-sm text-textGray">• Mọi quyết định cuối cùng liên quan đến các chương trình khuyến mãi thuộc về Unipalm.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}