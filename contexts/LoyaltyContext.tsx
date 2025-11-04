"use client";

import createContextHook from "@/lib/create-context-hook";
import { useState, useCallback, useEffect, useMemo } from "react";
import AsyncStorage from "@/lib/async-storage";
import { useAuth } from "./AuthContext";

export type MemberTier = "basic" | "silver" | "gold" | "platinum";

export interface LoyaltyReward {
  id: string;
  type: "birthday" | "anniversary" | "special" | "achievement";
  title: string;
  description: string;
  points: number;
  expiryDate: string;
  claimed: boolean;
}

export interface CashbackTransaction {
  id: string;
  orderId: string;
  amount: number;
  percentage: number;
  date: string;
  status: "pending" | "available" | "used";
}

export interface LoyaltyStats {
  totalPoints: number;
  cashbackBalance: number;
  tier: MemberTier;
  nextTierPoints: number;
  lifetimeSpent: number;
  ordersCount: number;
  memberSince: string;
}

const TIER_BENEFITS = {
  basic: {
    name: "Basic",
    color: "#8B9AAA",
    cashbackRate: 0.03,
    pointsPerVnd: 0.01,
    birthdayBonus: 100,
    requiredPoints: 0,
  },
  silver: {
    name: "Silver",
    color: "#C0C0C0",
    cashbackRate: 0.05,
    pointsPerVnd: 0.015,
    birthdayBonus: 200,
    requiredPoints: 1000,
  },
  gold: {
    name: "Gold",
    color: "#FFD700",
    cashbackRate: 0.07,
    pointsPerVnd: 0.02,
    birthdayBonus: 500,
    requiredPoints: 5000,
  },
  platinum: {
    name: "Platinum",
    color: "#E5E4E2",
    cashbackRate: 0.10,
    pointsPerVnd: 0.025,
    birthdayBonus: 1000,
    requiredPoints: 15000,
  },
};

const LOYALTY_STORAGE_KEY = "@unipalm_loyalty";

export const [LoyaltyProvider, useLoyalty] = createContextHook(() => {
  const { user, updateUser } = useAuth();
  const [stats, setStats] = useState<LoyaltyStats>({
    totalPoints: 0,
    cashbackBalance: 0,
    tier: "basic",
    nextTierPoints: 1000,
    lifetimeSpent: 0,
    ordersCount: 0,
    memberSince: new Date().toISOString(),
  });
  const [rewards, setRewards] = useState<LoyaltyReward[]>([]);
  const [cashbackHistory, setCashbackHistory] = useState<CashbackTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLoyaltyData();
  }, []);

  const loadLoyaltyData = async () => {
    try {
      const stored = await AsyncStorage.getItem(LOYALTY_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setStats(data.stats || stats);
        setRewards(data.rewards || []);
        setCashbackHistory(data.cashbackHistory || []);
      }
    } catch (error) {
      console.error("Error loading loyalty data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLoyaltyData = async (
    newStats: LoyaltyStats,
    newRewards: LoyaltyReward[],
    newCashback: CashbackTransaction[]
  ) => {
    try {
      await AsyncStorage.setItem(
        LOYALTY_STORAGE_KEY,
        JSON.stringify({
          stats: newStats,
          rewards: newRewards,
          cashbackHistory: newCashback,
        })
      );
    } catch (error) {
      console.error("Error saving loyalty data:", error);
    }
  };

  const calculateTier = (points: number): MemberTier => {
    if (points >= 15000) return "platinum";
    if (points >= 5000) return "gold";
    if (points >= 1000) return "silver";
    return "basic";
  };

  const getNextTierPoints = (tier: MemberTier): number => {
    switch (tier) {
      case "basic":
        return 1000;
      case "silver":
        return 5000;
      case "gold":
        return 15000;
      case "platinum":
        return 0;
      default:
        return 1000;
    }
  };

  const addPointsFromOrder = useCallback(
    (orderTotal: number, orderId: string) => {
      const newTier = calculateTier(stats.totalPoints);
      const benefits = TIER_BENEFITS[newTier];
      
      const pointsEarned = Math.floor(orderTotal * benefits.pointsPerVnd);
      const cashbackAmount = Math.floor(orderTotal * benefits.cashbackRate);
      
      const newPoints = stats.totalPoints + pointsEarned;
      const finalTier = calculateTier(newPoints);
      
      const newCashback: CashbackTransaction = {
        id: `CB${Date.now()}`,
        orderId,
        amount: cashbackAmount,
        percentage: benefits.cashbackRate * 100,
        date: new Date().toISOString(),
        status: "available",
      };

      const newStats: LoyaltyStats = {
        ...stats,
        totalPoints: newPoints,
        cashbackBalance: stats.cashbackBalance + cashbackAmount,
        tier: finalTier,
        nextTierPoints: getNextTierPoints(finalTier),
        lifetimeSpent: stats.lifetimeSpent + orderTotal,
        ordersCount: stats.ordersCount + 1,
      };

      const newCashbackHistory = [newCashback, ...cashbackHistory];
      
      setStats(newStats);
      setCashbackHistory(newCashbackHistory);
      saveLoyaltyData(newStats, rewards, newCashbackHistory);

      if (user) {
        updateUser({ points: newPoints, membershipTier: finalTier });
      }

      return {
        pointsEarned,
        cashbackAmount,
        newTier: finalTier,
        tierUpgraded: finalTier !== stats.tier,
      };
    },
    [stats, cashbackHistory, rewards, user, updateUser]
  );

  const useCashback = useCallback(
    (amount: number): boolean => {
      if (amount > stats.cashbackBalance) {
        return false;
      }

      const newStats = {
        ...stats,
        cashbackBalance: stats.cashbackBalance - amount,
      };

      setStats(newStats);
      saveLoyaltyData(newStats, rewards, cashbackHistory);
      return true;
    },
    [stats, rewards, cashbackHistory]
  );

  const redeemPoints = useCallback(
    (points: number): number => {
      if (points > stats.totalPoints) {
        return 0;
      }

      const cashValue = points * 10;
      
      const newStats = {
        ...stats,
        totalPoints: stats.totalPoints - points,
        cashbackBalance: stats.cashbackBalance + cashValue,
      };

      setStats(newStats);
      saveLoyaltyData(newStats, rewards, cashbackHistory);
      
      return cashValue;
    },
    [stats, rewards, cashbackHistory]
  );

  const addBirthdayReward = useCallback(() => {
    const tierBenefits = TIER_BENEFITS[stats.tier];
    const birthdayReward: LoyaltyReward = {
      id: `BIRTHDAY${Date.now()}`,
      type: "birthday",
      title: "🎂 Quà Tặng Sinh Nhật",
      description: `Chúc mừng sinh nhật! Bạn nhận được ${tierBenefits.birthdayBonus} điểm thưởng`,
      points: tierBenefits.birthdayBonus,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      claimed: false,
    };

    const newRewards = [birthdayReward, ...rewards];
    setRewards(newRewards);
    saveLoyaltyData(stats, newRewards, cashbackHistory);
  }, [stats, rewards, cashbackHistory]);

  const claimReward = useCallback(
    (rewardId: string) => {
      const reward = rewards.find((r) => r.id === rewardId);
      if (!reward || reward.claimed) return false;

      const newStats = {
        ...stats,
        totalPoints: stats.totalPoints + reward.points,
      };

      const newRewards = rewards.map((r) =>
        r.id === rewardId ? { ...r, claimed: true } : r
      );

      setStats(newStats);
      setRewards(newRewards);
      saveLoyaltyData(newStats, newRewards, cashbackHistory);
      
      return true;
    },
    [stats, rewards, cashbackHistory]
  );

  const getTierBenefits = useCallback((tier?: MemberTier) => {
    return TIER_BENEFITS[tier || stats.tier];
  }, [stats.tier]);

  const getProgressToNextTier = useCallback(() => {
    if (stats.tier === "platinum") return 100;
    
    const currentTierReq = TIER_BENEFITS[stats.tier].requiredPoints;
    const nextTierReq = stats.nextTierPoints;
    const progress = ((stats.totalPoints - currentTierReq) / (nextTierReq - currentTierReq)) * 100;
    
    return Math.min(Math.max(progress, 0), 100);
  }, [stats]);

  return useMemo(
    () => ({
      stats,
      rewards,
      cashbackHistory,
      isLoading,
      addPointsFromOrder,
      useCashback,
      redeemPoints,
      addBirthdayReward,
      claimReward,
      getTierBenefits,
      getProgressToNextTier,
      TIER_BENEFITS,
    }),
    [
      stats,
      rewards,
      cashbackHistory,
      isLoading,
      addPointsFromOrder,
      useCashback,
      redeemPoints,
      addBirthdayReward,
      claimReward,
      getTierBenefits,
      getProgressToNextTier,
    ]
  );
});