"use client";

import createContextHook from "@/lib/create-context-hook.tsx";
import { useState, useCallback, useEffect, useMemo } from "react";
import { AffiliateReferral, AffiliateStats } from "@/types";
import AsyncStorage from "@/lib/async-storage";
import { useAuth } from "./AuthContext";

const AFFILIATE_STORAGE_KEY = "@unipalm_affiliate";
const COMMISSION_RATE = 0.1;

export const [AffiliateProvider, useAffiliate] = createContextHook(() => {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState<AffiliateReferral[]>([]);
  const [affiliateCode, setAffiliateCode] = useState<string>("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAffiliateData();
  }, [user]);

  const loadAffiliateData = async () => {
    try {
      const stored = await AsyncStorage.getItem(AFFILIATE_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setReferrals(data.referrals || []);
        setAffiliateCode(data.affiliateCode || "");
        setIsEnrolled(data.isEnrolled || false);
        setClicks(data.clicks || 0);
      }
    } catch (error) {
      console.error("Error loading affiliate data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAffiliateData = async (
    data: {
      referrals: AffiliateReferral[];
      affiliateCode: string;
      isEnrolled: boolean;
      clicks: number;
    }
  ) => {
    try {
      await AsyncStorage.setItem(AFFILIATE_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving affiliate data:", error);
    }
  };

  const enrollInProgram = useCallback(() => {
    if (!user) return;
    
    const code = `UNIPALM${user.id.toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setAffiliateCode(code);
    setIsEnrolled(true);
    
    saveAffiliateData({
      referrals,
      affiliateCode: code,
      isEnrolled: true,
      clicks,
    });
  }, [user, referrals, clicks]);

  const trackClick = useCallback(() => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    
    saveAffiliateData({
      referrals,
      affiliateCode,
      isEnrolled,
      clicks: newClicks,
    });
  }, [clicks, referrals, affiliateCode, isEnrolled]);

  const addReferral = useCallback(
    (orderId: string, orderTotal: number, customerName: string) => {
      const commission = orderTotal * COMMISSION_RATE;
      
      const newReferral: AffiliateReferral = {
        id: `REF${Date.now()}`,
        orderId,
        orderTotal,
        commission,
        status: "pending",
        date: new Date().toISOString(),
        customerName,
      };

      const newReferrals = [newReferral, ...referrals];
      setReferrals(newReferrals);
      
      saveAffiliateData({
        referrals: newReferrals,
        affiliateCode,
        isEnrolled,
        clicks,
      });

      return newReferral;
    },
    [referrals, affiliateCode, isEnrolled, clicks]
  );

  const updateReferralStatus = useCallback(
    (referralId: string, status: 'pending' | 'confirmed' | 'paid') => {
      const newReferrals = referrals.map((ref) =>
        ref.id === referralId ? { ...ref, status } : ref
      );
      setReferrals(newReferrals);
      
      saveAffiliateData({
        referrals: newReferrals,
        affiliateCode,
        isEnrolled,
        clicks,
      });
    },
    [referrals, affiliateCode, isEnrolled, clicks]
  );

  const validateAffiliateCode = useCallback((code: string) => {
    return code.startsWith("UNIPALM") && code.length >= 10;
  }, []);

  const stats: AffiliateStats = useMemo(() => {
    const totalReferrals = referrals.length;
    const totalCommission = referrals.reduce((sum, ref) => sum + ref.commission, 0);
    const pendingCommission = referrals
      .filter((ref) => ref.status === "pending")
      .reduce((sum, ref) => sum + ref.commission, 0);
    const paidCommission = referrals
      .filter((ref) => ref.status === "paid")
      .reduce((sum, ref) => sum + ref.commission, 0);
    const conversionRate = clicks > 0 ? (totalReferrals / clicks) * 100 : 0;

    return {
      totalReferrals,
      totalCommission,
      pendingCommission,
      paidCommission,
      conversionRate,
      clicks,
    };
  }, [referrals, clicks]);

  return useMemo(
    () => ({
      referrals,
      affiliateCode,
      isEnrolled,
      isLoading,
      stats,
      enrollInProgram,
      trackClick,
      addReferral,
      updateReferralStatus,
      validateAffiliateCode,
      commissionRate: COMMISSION_RATE,
    }),
    [
      referrals,
      affiliateCode,
      isEnrolled,
      isLoading,
      stats,
      enrollInProgram,
      trackClick,
      addReferral,
      updateReferralStatus,
      validateAffiliateCode,
    ]
  );
});