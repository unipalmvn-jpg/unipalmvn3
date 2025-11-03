"use client";

import Link from "next/link";
import { Users, DollarSign, TrendingUp, Share2, Copy, CheckCircle, Clock, Gift, Link as LinkIcon, MousePointerClick } from "lucide-react";
import { useAffiliate } from "@/contexts/AffiliateContext";
import { useState } from "react";

export default function AffiliatePage() {
  const {
    isEnrolled,
    affiliateCode,
    stats,
    referrals,
    enrollInProgram,
    commissionRate,
  } = useAffiliate();
  const [copiedCode, setCopiedCode] = useState(false);

  const handleEnroll = () => {
    enrollInProgram();
    alert("Chúc mừng! Bạn đã tham gia chương trình Affiliate thành công.");
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(affiliateCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    alert("Mã giới thiệu đã được sao chép");
  };

  const handleShare = async () => {
    const message = `🌿 Khám phá Unipalm - Thời trang thiên nhiên!\n\nSử dụng mã giới thiệu của tôi: ${affiliateCode}\nĐể nhận ưu đãi đặc biệt khi mua sắm!`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: "Giới Thiệu Unipalm", text: message });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-backgroundGray">
        <div className="bg-gradient-to-br from-primary to-primaryDark text-white px-6 py-12 text-center">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5">
            <Gift className="w-12 h-12 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-black mb-3 leading-tight">
            Kiếm Thu Nhập<br />Với Unipalm Affiliate
          </h1>
          <p className="text-base opacity-95 max-w-md mx-auto">
            Giới thiệu sản phẩm, nhận ngay 10% hoa hồng từ mỗi đơn hàng thành công
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-extrabold text-black mb-4">Lợi Ích Tham Gia</h2>
          
          <div className="space-y-3 mb-8">
            <div className="flex gap-4 bg-white p-5 rounded-2xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black mb-1">Hoa Hồng {commissionRate * 100}%</h3>
                <p className="text-sm text-textGray">
                  Nhận {commissionRate * 100}% hoa hồng từ mỗi đơn hàng được giới thiệu thành công
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-white p-5 rounded-2xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black mb-1">Không Giới Hạn</h3>
                <p className="text-sm text-textGray">
                  Giới thiệu không giới hạn số lượng khách hàng và đơn hàng
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-white p-5 rounded-2xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black mb-1">Theo Dõi Dễ Dàng</h3>
                <p className="text-sm text-textGray">
                  Dashboard chi tiết theo dõi doanh số và hoa hồng realtime
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleEnroll}
            className="w-full bg-primary hover:bg-primaryDark text-white font-extrabold px-8 py-5 rounded-full shadow-lg transition-colors flex items-center justify-center gap-3"
          >
            <Gift className="w-5 h-5" />
            <span>Tham Gia Ngay - Miễn Phí</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroundGray">
      <div className="bg-gradient-to-br from-primary to-primaryDark text-white px-6 py-10 text-center">
        <p className="text-base opacity-90 mb-2">Tổng Hoa Hồng Của Bạn</p>
        <p className="text-5xl font-black mb-6">{stats.totalCommission.toLocaleString("vi-VN")}₫</p>
        <div className="flex justify-center gap-5">
          <div className="text-center">
            <p className="text-2xl font-extrabold mb-1">{stats.totalReferrals}</p>
            <p className="text-sm opacity-85">Giới Thiệu</p>
          </div>
          <div className="w-px h-10 bg-white/30" />
          <div className="text-center">
            <p className="text-2xl font-extrabold mb-1">{stats.clicks}</p>
            <p className="text-sm opacity-85">Lượt Click</p>
          </div>
          <div className="w-px h-10 bg-white/30" />
          <div className="text-center">
            <p className="text-2xl font-extrabold mb-1">{stats.conversionRate.toFixed(1)}%</p>
            <p className="text-sm opacity-85">Tỷ Lệ</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        <h2 className="text-2xl font-extrabold text-black mb-4">Mã Giới Thiệu Của Bạn</h2>
        <div className="bg-white p-5 rounded-2xl shadow-md mb-6">
          <div className="flex items-center gap-2 mb-3">
            <LinkIcon className="w-5 h-5 text-primary" />
            <p className="text-sm font-semibold text-textGray">Mã Affiliate</p>
          </div>
          <p className="text-2xl font-extrabold text-primary mb-4 tracking-wide">{affiliateCode}</p>
          <div className="flex gap-3">
            <button
              onClick={handleCopyCode}
              className="flex-1 bg-primary text-white font-bold px-4 py-4 rounded-xl flex items-center justify-center gap-2"
            >
              {copiedCode ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{copiedCode ? "Đã Sao Chép" : "Sao Chép"}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex-1 bg-backgroundGray border border-primary text-primary font-bold px-4 py-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              <span>Chia Sẻ</span>
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-black mb-4">Thống Kê Hoa Hồng</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-5 rounded-2xl text-center shadow-md">
            <div className="w-12 h-12 rounded-full bg-backgroundGray flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xl font-extrabold text-black mb-1">{stats.totalCommission.toLocaleString("vi-VN")}₫</p>
            <p className="text-sm text-textGray">Tổng Hoa Hồng</p>
          </div>

          <div className="bg-white p-5 rounded-2xl text-center shadow-md">
            <div className="w-12 h-12 rounded-full bg-backgroundGray flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-star" />
            </div>
            <p className="text-xl font-extrabold text-black mb-1">{stats.pendingCommission.toLocaleString("vi-VN")}₫</p>
            <p className="text-sm text-textGray">Đang Chờ</p>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-black mb-4">
          Lịch Sử Giới Thiệu ({referrals.length})
        </h2>
        {referrals.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center shadow-md">
            <Users className="w-12 h-12 text-textLight mx-auto mb-4" />
            <p className="text-lg font-bold text-textGray mb-2">Chưa có giới thiệu nào</p>
            <p className="text-sm text-textLight">
              Chia sẻ mã giới thiệu của bạn để bắt đầu kiếm hoa hồng
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {referrals.map((referral) => (
              <div key={referral.id} className="bg-white p-4 rounded-2xl shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-base font-bold text-black mb-1">{referral.customerName}</p>
                    <p className="text-sm text-textGray">
                      {new Date(referral.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-2 rounded-lg ${
                      referral.status === "paid"
                        ? "bg-[#E8F5E9] text-[#388E3C]"
                        : referral.status === "confirmed"
                        ? "bg-[#E3F2FD] text-[#1976D2]"
                        : "bg-[#FFF3E0] text-[#F57C00]"
                    }`}
                  >
                    <p className="text-xs font-bold">
                      {referral.status === "paid"
                        ? "Đã Thanh Toán"
                        : referral.status === "confirmed"
                        ? "Đã Xác Nhận"
                        : "Chờ Xác Nhận"}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-textGray">Đơn Hàng:</span>
                    <span className="text-sm font-semibold text-black">{referral.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-textGray">Giá Trị:</span>
                    <span className="text-sm font-semibold text-black">
                      {referral.orderTotal.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-textGray">Hoa Hồng:</span>
                    <span className="text-base font-extrabold text-primary">
                      +{referral.commission.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}