"use client";

import createContextHook from "@/lib/create-context-hook";
import { useState, useCallback, useEffect, useMemo } from "react";
import AsyncStorage from "@/lib/async-storage";
import { Order } from "@/types";

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  helpful: number;
}

const REVIEWS_STORAGE_KEY = "@unipalm_reviews";

export const [ReviewProvider, useReviews] = createContextHook(() => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const stored = await AsyncStorage.getItem(REVIEWS_STORAGE_KEY);
      if (stored) {
        setReviews(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveReviews = async (newReviews: Review[]) => {
    try {
      await AsyncStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(newReviews));
    } catch (error) {
      console.error("Error saving reviews:", error);
    }
  };

  const addReview = useCallback(
    (
      productId: string,
      userId: string,
      userName: string,
      rating: number,
      comment: string,
      images?: string[]
    ) => {
      const newReview: Review = {
        id: `REVIEW${Date.now()}`,
        productId,
        userId,
        userName,
        rating,
        comment,
        date: new Date().toISOString(),
        images,
        helpful: 0,
      };

      const newReviews = [newReview, ...reviews];
      setReviews(newReviews);
      saveReviews(newReviews);
    },
    [reviews]
  );

  const hasUserPurchasedProduct = useCallback(
    (userId: string, productId: string, orders: Order[]) => {
      return orders.some((order) =>
        order.status === "delivered" &&
        order.items.some((item) => item.product.id === productId)
      );
    },
    []
  );

  const getProductReviews = useCallback(
    (productId: string) => {
      return reviews.filter((review) => review.productId === productId);
    },
    [reviews]
  );

  const getProductRating = useCallback(
    (productId: string) => {
      const productReviews = reviews.filter((review) => review.productId === productId);
      if (productReviews.length === 0) return 0;
      const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
      return totalRating / productReviews.length;
    },
    [reviews]
  );

  const markHelpful = useCallback(
    (reviewId: string) => {
      const newReviews = reviews.map((review) =>
        review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
      );
      setReviews(newReviews);
      saveReviews(newReviews);
    },
    [reviews]
  );

  return useMemo(
    () => ({
      reviews,
      isLoading,
      addReview,
      getProductReviews,
      getProductRating,
      markHelpful,
      hasUserPurchasedProduct,
    }),
    [reviews, isLoading, addReview, getProductReviews, getProductRating, markHelpful, hasUserPurchasedProduct]
  );
});