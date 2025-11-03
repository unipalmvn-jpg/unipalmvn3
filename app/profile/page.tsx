"use client";

import Link from "next/link";
import { User, Package, Heart, MapPin, CreditCard, Bell, Shield, HelpCircle, LogOut, ChevronRight, Gift } from "lucide-react";
import { useOrders } from "@/contexts/OrderContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { orders } = useOrders();
  const { items: wishlistItems } = useWishlist();
  const { stats, getTierBenefits } = useLoyalty();
  const { user } = useAuth();
  
  const tierBenefits = getTierBenefits();

  const menuSections = [
    {
      title: "Tài Khoản",
      items: [
        { icon: Package, label: "Đơn Hàng Của Tôi", color: "#045433", route: "/orders" },
        { icon: Heart, label: "Danh Sách Yêu Thích", color: "#ff4444", route: "/wishlist" },
        { icon: User, label: "PalmClub - Thành Viên", color: "#daae62", route: "/loyalty" },
        { icon: Gift, label: "Chương Trình Affiliate", color: "#4CAF50", route: "/affiliate" },
        { icon: MapPin, label: "Địa Chỉ Giao Hàng", color: "#045433", route: "/address-select" },
      ],
    },
    {
      title: "Cài Đặt",
      items: [
        { icon: Bell, label: "Thông Báo", color: "#daae62", route: null },
        { icon: Shield, label: "Bảo Mật", color: "#045433", route: null },
        { icon: HelpCircle, label: "Trợ Giúp & Hỗ Trợ", color: "#f5ebce", route: null },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-backgroundGray">
      <div
        className="bg-gradient-to-br from-primary to-primaryDark text-white px-5 py-10 text-center"
      >
        <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-extrabold mb-1">{user?.name || "Khách Hàng Unipalm"}</h1>
        <p className="text-sm opacity-90 mb-5">{user?.email || "customer@unipalm.vn"}</p>
        
        <div className="flex items-center justify-center gap-3 bg-white/25 backdrop-blur-sm border border-white/40 px-4 py-2 rounded-full inline-flex mb-3">
          <span className="text-sm font-extrabold tracking-wide">{tierBenefits.name.toUpperCase()}</span>
          <span className="text-sm font-bold opacity-95">{stats.totalPoints} điểm</span>
        </div>
        
        <button className="bg-white text-primary font-bold px-6 py-3 rounded-full text-sm">
          Chỉnh Sửa Hồ Sơ
        </button>
      </div>

      <div className="flex gap-3 px-5 -mt-8 mb-5">
        <Link href="/orders" className="flex-1 bg-white rounded-2xl p-5 text-center shadow-md">
          <p className="text-3xl font-black text-primary mb-1">{orders.length}</p>
          <p className="text-xs text-textGray font-semibold">Đơn Hàng</p>
        </Link>
        <Link href="/wishlist" className="flex-1 bg-white rounded-2xl p-5 text-center shadow-md">
          <p className="text-3xl font-black text-primary mb-1">{wishlistItems.length}</p>
          <p className="text-xs text-textGray font-semibold">Yêu Thích</p>
        </Link>
        <Link href="/loyalty" className="flex-1 bg-white rounded-2xl p-5 text-center shadow-md">
          <p className="text-3xl font-black text-primary mb-1">{stats.totalPoints}</p>
          <p className="text-xs text-textGray font-semibold">Điểm Tích Lũy</p>
        </Link>
      </div>

      <div className="px-5 space-y-6">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-lg font-bold text-black mb-3 ml-1">{section.title}</h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.route || "#"}
                  className={`flex items-center justify-between px-4 py-4 ${
                    itemIndex !== section.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <span className="text-base font-semibold text-black">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-textLight" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-3 bg-white border border-[#ff444420] text-[#ff4444] font-bold px-4 py-4 rounded-2xl">
          <LogOut className="w-5 h-5" />
          <span>Đăng Xuất</span>
        </button>
      </div>

      {/* Footer */}
      <div className="bg-black text-white px-5 py-8 mt-8 rounded-t-3xl">
        <h3 className="text-xl font-bold text-center mb-6">Thông Tin Thêm</h3>
        
        <div className="grid grid-cols-2 gap-5 mb-6">
          <div>
            <h4 className="text-sm font-bold mb-3 tracking-wide">PALMCLUB</h4>
            <ul className="space-y-2">
              <li><Link href="/loyalty" className="text-sm text-white/70">Tài khoản PalmClub</Link></li>
              <li><Link href="/loyalty" className="text-sm text-white/70">Đăng ký thành viên</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-3 tracking-wide">CHÍNH SÁCH</h4>
            <ul className="space-y-2">
              <li><Link href="/policies/return" className="text-sm text-white/70">Đổi trả 60 ngày</Link></li>
              <li><Link href="/policies/privacy" className="text-sm text-white/70">Bảo mật</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-5 border-t border-white/10">
          <p className="text-sm text-white/50 mb-1">Unipalm v1.0.0</p>
          <p className="text-xs text-white/40">© 2025 Made in Vietnam with ❤️</p>
        </div>
      </div>
    </div>
  );
}