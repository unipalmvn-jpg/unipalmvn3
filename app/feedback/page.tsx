"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";

export default function FeedbackPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
        <h1 className="text-3xl font-black">Đóng Góp Ý Kiến</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {submitted ? (
          <div className="bg-backgroundBeige rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-black mb-3">Cảm ơn bạn!</h2>
            <p className="text-base text-textGray mb-6">
              Unipalm đã nhận được ý kiến đóng góp của bạn. Chúng tôi sẽ xem xét cẩn thận để cải thiện sản phẩm và dịch vụ.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-primary text-white font-bold px-8 py-4 rounded-lg"
            >
              Về Trang Chủ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-bold text-black mb-2 block">Họ và Tên</label>
                <input type="text" id="name" className="w-full p-4 bg-backgroundGray rounded-lg border border-border" placeholder="Nhập họ tên của bạn" />
              </div>
              <div>
                <label htmlFor="email" className="text-base font-bold text-black mb-2 block">Email</label>
                <input type="email" id="email" className="w-full p-4 bg-backgroundGray rounded-lg border border-border" placeholder="Nhập email của bạn" required />
              </div>
              <div>
                <label htmlFor="feedback" className="text-base font-bold text-black mb-2 block">Nội dung góp ý</label>
                <textarea id="feedback" rows={6} className="w-full p-4 bg-backgroundGray rounded-lg border border-border" placeholder="Unipalm lắng nghe bạn..." required />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold px-8 py-5 rounded-lg flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                <span>Gửi Ý Kiến</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}