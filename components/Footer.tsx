"use client";

import Link from "next/link";
import { Mail, Phone, Facebook, Instagram, Youtube, MessageCircle, Send, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Feedback Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-black mb-4">UNIPALM lắng nghe bạn!</h3>
          <p className="text-base text-white/80 mb-6 max-w-2xl">
            Chúng tôi luôn trân trọng ý kiến đóng góp từ khách hàng về chất lượng sản phẩm và dịch vụ của Unipalm.
          </p>
          <Link
            href="/feedback"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-7 py-4 rounded-md hover:shadow-lg transition-shadow"
          >
            <span>ĐÓNG GÓP Ý KIẾN</span>
            <Send className="w-4 h-4" />
          </Link>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-white/10">
          <div>
            <h4 className="text-sm font-extrabold mb-4 tracking-wide">LIÊN HỆ</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-white/70" />
                <div>
                  <p className="text-sm text-white/70">Hotline</p>
                  <p className="text-lg font-bold">0969.596.639</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-white/70" />
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="text-lg font-bold">hellounipalm@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-extrabold mb-4 tracking-wide">KẾT NỐI VỚI CHÚNG TÔI</h4>
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-md bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 rounded-md bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 rounded-md bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Send className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 rounded-md bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 rounded-md bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Youtube className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-extrabold mb-4 tracking-wide">VỀ UNIPALM</h4>
            <ul className="space-y-3">
              <li><Link href="/about/values" className="text-sm text-white/70 hover:text-white transition-colors">Quy tắc ứng xử của Unipalm</Link></li>
              <li><Link href="/about/101" className="text-sm text-white/70 hover:text-white transition-colors">Unipalm 101</Link></li>
              <li><Link href="/about/manufacturer" className="text-sm text-white/70 hover:text-white transition-colors">DVKH xuất sắc</Link></li>
              <li><Link href="/about/stories" className="text-sm text-white/70 hover:text-white transition-colors">Câu chuyện về Unipalm</Link></li>
              <li><Link href="/about/core-share" className="text-sm text-white/70 hover:text-white transition-colors">Core & Share</Link></li>
              <li><Link href="/about/sustainability" className="text-sm text-white/70 hover:text-white transition-colors">Cam kết bền vững</Link></li>
              <li><Link href="/about/vision-2030" className="text-sm text-white/70 hover:text-white transition-colors">Tầm nhìn 2030</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-sm font-extrabold mb-4 tracking-wide">PALM CLUB</h4>
            <ul className="space-y-3">
              <li><Link href="/loyalty" className="text-sm text-white/70 hover:text-white transition-colors">Tài khoản Palm Club</Link></li>
              <li><Link href="/loyalty" className="text-sm text-white/70 hover:text-white transition-colors">Đăng ký thành viên</Link></li>
              <li><Link href="/loyalty" className="text-sm text-white/70 hover:text-white transition-colors">Ưu đãi & Đặc quyền</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold mb-4 tracking-wide">CHÍNH SÁCH</h4>
            <ul className="space-y-3">
              <li><Link href="/policies/return" className="text-sm text-white/70 hover:text-white transition-colors">Chính sách đổi trả 60 ngày</Link></li>
              <li><Link href="/policies/promotion" className="text-sm text-white/70 hover:text-white transition-colors">Chính sách khuyến mãi</Link></li>
              <li><Link href="/policies/privacy" className="text-sm text-white/70 hover:text-white transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="/policies/delivery" className="text-sm text-white/70 hover:text-white transition-colors">Chính sách giao hàng</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold mb-4 tracking-wide">CHĂM SÓC KHÁCH HÀNG</h4>
            <ul className="space-y-3">
              <li><Link href="/customer-care/satisfaction" className="text-sm text-white/70 hover:text-white transition-colors">Trải nghiệm 100% hài lòng</Link></li>
              <li><Link href="/customer-care/faq" className="text-sm text-white/70 hover:text-white transition-colors">Hỏi đáp - FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold mb-4 tracking-wide">KIẾN THỨC MẶC ĐẸP</h4>
            <ul className="space-y-3">
              <li><Link href="/size-guide" className="text-sm text-white/70 hover:text-white transition-colors">Hướng dẫn chọn size</Link></li>
              <li><Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>

        {/* Address */}
        <div className="mb-12 pb-12 border-b border-white/10">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-white/70 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-white/70 mb-1">Địa chỉ</p>
              <p className="text-sm text-white font-semibold">
                Số 123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm font-bold text-white/85 mb-2">© 2025 UNIPALM VIỆT NAM</p>
          <p className="text-xs text-white/65">
            Giấy chứng nhận đăng ký doanh nghiệp: 0123456789 do Sở KH & ĐT TP. HCM cấp lần đầu ngày 01/01/2020
          </p>
        </div>
      </div>
    </footer>
  );
}