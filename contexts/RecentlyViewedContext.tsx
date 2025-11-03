"use client";

import createContextHook from "@/lib/create-context-hook.tsx";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Product } from "@/types";
import AsyncStorage from "@/lib/async-storage";

const RECENTLY_VIEWED_KEY = "@unipalm_recently_viewed";
const MAX_ITEMS = 10;

export const [RecentlyViewedProvider, useRecentlyViewed] = createContextHook(() => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const loadRecentlyViewed = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        setProducts(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading recently viewed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRecentlyViewed = async (newProducts: Product[]) => {
    try {
      await AsyncStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(newProducts));
    } catch (error) {
      console.error("Error saving recently viewed:", error);
    }
  };

  const addProduct = useCallback((product: Product) => {
    setProducts((current) => {
      const filtered = current.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      saveRecentlyViewed(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setProducts([]);
    saveRecentlyViewed([]);
  }, []);

  return useMemo(() => ({
    products,
    isLoading,
    addProduct,
    clearAll,
  }), [products, isLoading, addProduct, clearAll]);
});