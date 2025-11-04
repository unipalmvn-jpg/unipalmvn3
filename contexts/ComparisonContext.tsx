"use client";

import createContextHook from "@/lib/create-context-hook";
import { useState, useCallback, useMemo } from "react";
import { Product } from "@/types";

const MAX_COMPARISON_ITEMS = 4;

export const [ComparisonProvider, useComparison] = createContextHook(() => {
  const [items, setItems] = useState<Product[]>([]);

  const addToComparison = useCallback((product: Product) => {
    setItems((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) {
        return current;
      }
      
      if (current.length >= MAX_COMPARISON_ITEMS) {
        return current;
      }
      
      return [...current, product];
    });
  }, []);

  const removeFromComparison = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  }, []);

  const clearComparison = useCallback(() => {
    setItems([]);
  }, []);

  const isInComparison = useCallback(
    (productId: string) => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  const canAddMore = useMemo(() => items.length < MAX_COMPARISON_ITEMS, [items]);

  return useMemo(
    () => ({
      items,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison,
      canAddMore,
      totalItems: items.length,
      maxItems: MAX_COMPARISON_ITEMS,
    }),
    [items, addToComparison, removeFromComparison, clearComparison, isInComparison, canAddMore]
  );
});