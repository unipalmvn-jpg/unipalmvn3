"use client";

import createContextHook from "@/lib/create-context-hook.tsx";
import { useState, useCallback, useMemo } from "react";

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
  minPurchase: number;
  maxDiscount?: number;
  expiryDate: string;
  description: string;
  isActive: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  discountPercent?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const mockCoupons: Coupon[] = [
  {
    id: "1",
    code: "WELCOME50",
    discount: 50000,
    discountType: "fixed",
    minPurchase: 500000,
    description: "Giảm 50K cho đơn hàng đầu tiên từ 500K",
    expiryDate: "2025-12-31",
    isActive: true,
  },
  {
    id: "2",
    code: "SUMMER20",
    discount: 20,
    discountType: "percentage",
    minPurchase: 300000,
    maxDiscount: 100000,
    description: "Giảm 20% tối đa 100K cho đơn từ 300K",
    expiryDate: "2025-08-31",
    isActive: true,
  },
  {
    id: "3",
    code: "FREESHIP",
    discount: 30000,
    discountType: "fixed",
    minPurchase: 0,
    description: "Miễn phí vận chuyển toàn quốc",
    expiryDate: "2025-12-31",
    isActive: true,
  },
];

const mockPromotions: Promotion[] = [
  {
    id: "1",
    title: "FLASH SALE",
    subtitle: "Giảm đến 50%",
    description: "Săn sale sốc cuối tuần, giảm giá cực mạnh cho tất cả sản phẩm",
    discountPercent: 50,
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    isActive: true,
  },
  {
    id: "2",
    title: "MUA 1 TẶNG 1",
    subtitle: "Khẩu trang chống nắng",
    description: "Mua 1 khẩu trang tặng 1, áp dụng cho tất cả mẫu mã",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    isActive: true,
  },
];

export const [PromoProvider, usePromo] = createContextHook(() => {
  const [coupons] = useState<Coupon[]>(mockCoupons);
  const [promotions] = useState<Promotion[]>(mockPromotions);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = useCallback((code: string, cartTotal: number) => {
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive
    );

    if (!coupon) {
      return { success: false, message: "Mã giảm giá không hợp lệ" };
    }

    if (cartTotal < coupon.minPurchase) {
      return {
        success: false,
        message: `Đơn hàng tối thiểu ${coupon.minPurchase.toLocaleString("vi-VN")}₫`,
      };
    }

    const expiryDate = new Date(coupon.expiryDate);
    if (expiryDate < new Date()) {
      return { success: false, message: "Mã giảm giá đã hết hạn" };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: "Áp dụng mã giảm giá thành công!", coupon };
  }, [coupons]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const calculateDiscount = useCallback((cartTotal: number) => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.discountType === "fixed") {
      return appliedCoupon.discount;
    } else {
      const discount = (cartTotal * appliedCoupon.discount) / 100;
      return appliedCoupon.maxDiscount
        ? Math.min(discount, appliedCoupon.maxDiscount)
        : discount;
    }
  }, [appliedCoupon]);

  const activePromotions = useMemo(() => {
    const now = new Date();
    return promotions.filter((promo) => {
      const start = new Date(promo.startDate);
      const end = new Date(promo.endDate);
      return promo.isActive && now >= start && now <= end;
    });
  }, [promotions]);

  return useMemo(() => ({
    coupons,
    promotions,
    activePromotions,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    calculateDiscount,
  }), [coupons, promotions, activePromotions, appliedCoupon, applyCoupon, removeCoupon, calculateDiscount]);
});