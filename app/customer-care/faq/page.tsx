"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Làm thế nào để đặt hàng?",
    answer: "Bạn có thể đặt hàng trực tiếp trên website hoặc app Unipalm. Chọn sản phẩm, thêm vào giỏ hàng, và tiến hành thanh toán."
  },
  {
    question: "Unipalm có miễn phí vận chuyển không?",
    answer: "Có, chúng tôi miễn phí vận chuyển cho đơn hàng từ 500.000đ trở lên trên toàn quốc."
  },
  {
    question: "Thời gian giao hàng là bao lâu?",
    answer: "Thời gian giao hàng từ 2-5 ngày làm việc tùy theo khu vực. Nội thành TP.HCM và Hà Nội thường nhận hàng trong 1-2 ngày."
  },
  {
    question: "Tôi có thể đổi size không?",
    answer: "Có, bạn có thể đổi size miễn phí trong vòng 60 ngày nếu sản phẩm còn nguyên tem mác."
  },
  {
    question: "Làm thế nào để trở thành thành viên PalmClub?",
    answer: "Chỉ cần đăng ký tài khoản trên website hoặc app, bạn sẽ tự động trở thành thành viên PalmClub và nhận ngay ưu đãi."
  },
];

export default function FAQPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        <h1 className="text-3xl font-black">Câu Hỏi Thường Gặp</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-2xl p-6 mb-8 text-center">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-black mb-2">Cần Hỗ Trợ?</h2>
          <p className="text-base text-textGray">
            Tìm câu trả lời cho các câu hỏi phổ biến nhất
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-base font-bold text-black pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-textGray flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-base text-textGray leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-backgroundGray rounded-2xl p-6 text-center">
          <p className="text-base text-textGray mb-4">Không tìm thấy câu trả lời?</p>
          <a
            href="tel:0969596639"
            className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-lg hover:bg-primaryDark transition-colors"
          >
            Liên Hệ Hỗ Trợ
          </a>
        </div>
      </div>
    </div>
  );
}