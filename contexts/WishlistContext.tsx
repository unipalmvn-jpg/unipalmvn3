"use client";

import createContextHook from "@/lib/create-context-hook.tsx";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Product } from "@/types";
import AsyncStorage from "@/lib/async-storage";

const WISHLIST_STORAGE_KEY = "@unipalm_wishlist";

export const [WishlistProvider, useWishlist] = createContextHook(() => {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const stored = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveWishlist = async (newItems: Product[]) => {
    try {
      await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newItems));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  const addItem = useCallback((product: Product) => {
    setItems((currentItems) => {
      const exists = currentItems.find((item) => item.id === product.id);
      if (exists) {
        return currentItems;
      }
      const newItems = [...currentItems, product];
      saveWishlist(newItems);
      return newItems;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter((item) => item.id !== productId);
      saveWishlist(newItems);
      return newItems;
    });
  }, []);

  const toggleItem = useCallback(
    (product: Product) => {
      const exists = items.find((item) => item.id === product.id);
      if (exists) {
        removeItem(product.id);
      } else {
        addItem(product);
      }
    },
    [items, addItem, removeItem]
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
    saveWishlist([]);
  }, []);

  return useMemo(
    () => ({
      items,
      isLoading,
      addItem,
      removeItem,
      toggleItem,
      isInWishlist,
      clearWishlist,
      totalItems: items.length,
    }),
    [items, isLoading, addItem, removeItem, toggleItem, isInWishlist, clearWishlist]
  );
});