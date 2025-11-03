"use client";

import Link from "next/link";
import { Award, TrendingUp, Sparkles, Wallet, Calendar, CheckCircle, Gift, Clock, ChevronRight, Star } from "lucide-react";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { useAuth } from "@/contexts/AuthContext";

export default function LoyaltyPage() {
  const { stats, rewards, cashbackHistory, getTierBenefits, getProgressToNextTier, claimReward } = useLoyalty();
  const { user } = useAuth();

  const tierBenefits = getTierBenefits();
  const progress = getProgressToNextTier();

  const getTierGradient = (tier: string): [string, string] => {
    switch (tier) {
      case "platinum":
        return ["#E5E4E2", "#C0C0C0"];
      case "gold":
        return ["#FFD700", "#FFA500"];
      case "silver":
        return ["#C0C0C0", "#A8A8A8"];
      default:
        return ["#045433", "#364c43"];
    }
  };

  const unclaimedRewards = rewards.filter((r) => !r.claimed);
  const availableCashback = cashbackHistory.filter((c) => c.status === "available");

  return (
    <div className="min-h-screen bg-backgroundGray">
      <div className="bg-primary text-white px-5 py-5">
        <h1 className="text-2xl font-bold text-center">PalmClub</h1>
      </div>

      <div className="px-5 py-5">
        <div
          className="rounded-3xl p-6 shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${getTierGradient(stats.tier)[0]}, ${getTierGradient(stats.tier)[1]})`,
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 border-4 border-white flex items-center justify-center">
              <Award className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-2xl font-black text-white tracking-wide">{tierBenefits.name.toUpperCase()}</p>
              <p className="text-base text-white/90 font-semibold">{user?.name || "Thành Viên Unipalm"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-white/15 backdrop-blur-sm p-4 rounded-xl text-center">
              <Star className="w-5 h-5 text-white fill-white mx-auto mb-1" />
              <p className="text-xs text-white/90 mb-1">Điểm tích lũy</p>
              <p className="text-xl font-extrabold text-white">{stats.totalPoints.toLocaleString("vi-VN")}</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm p-4 rounded-xl text-center">
              <Wallet className="w-5 h-5 text-white mx-auto mb-1" />
              <p className="text-xs text-white/90 mb-1">Hoàn tiền</p>
              <p className="text-xl font-extrabold text-white">{stats.cashbackBalance.toLocaleString("vi-VN")}đ</p>
            </div>
          </div>

          {stats.tier !== "platinum" && (
            <div>
              <p className="text-sm text-white/95 font-semibold mb-2">
                Còn {(stats.nextTierPoints - stats.totalPoints).toLocaleString("vi-VN")} điểm để lên hạng
              </p>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-extrabold text-black mb-4">Đặc Quyền Của Bạn</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-5 text-center shadow-md">
              <div className="w-14 h-14 rounded-full bg-[#4CAF5015] flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <p className="text-2xl font-black text-black mb-1">{(tierBenefits.cashbackRate * 100).toFixed(0)}%</p>
              <p className="text-sm text-textGray font-semibold">Hoàn tiền</p>
            </div>

            <div className="bg-white rounded-2xl p-5 text-center shadow-md">
              <div className="w-14 h-14 rounded-full bg-[#FF980015] flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-[#FF9800]" />
              </div>
              <p className="text-2xl font-black text-black mb-1">{(tierBenefits.pointsPerVnd * 1000).toFixed(1)}đ</p>
              <p className="text-sm text-textGray font-semibold">Mỗi 1 điểm</p>
            </div>

            <div className="bg-white rounded-2xl p-5 text-center shadow-md">
              <div className="w-14 h-14 rounded-full bg-[#E91E6315] flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-[#E91E63]" />
              </div>
              <p className="text-2xl font-black text-black mb-1">{tierBenefits.birthdayBonus}</p>
              <p className="text-sm text-textGray font-semibold">Quà sinh nhật</p>
            </div>

            <div className="bg-white rounded-2xl p-5 text-center shadow-md">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-black text-black mb-1">{stats.ordersCount}</p>
              <p className="text-sm text-textGray font-semibold">Đơn hàng</p>
            </div>
          </div>
        </div>

        {unclaimedRewards.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-extrabold text-black">Phần Thưởng ({unclaimedRewards.length})</h2>
              <button className="text-sm font-bold text-primary">Xem tất cả</button>
            </div>
            {unclaimedRewards.slice(0, 3).map((reward) => (
              <button
                key={reward.id}
                onClick={() => claimReward(reward.id)}
                className="w-full flex items-center gap-3 bg-white p-4 rounded-2xl mb-3 shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-base font-bold text-black mb-1">{reward.title}</p>
                  <p className="text-sm text-textGray mb-2">{reward.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-primary">+{reward.points} điểm</p>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-textLight" />
                      <p className="text-xs text-textLight">
                        {new Date(reward.expiryDate).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-textLight" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}