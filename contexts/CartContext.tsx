"use client";

import createContextHook from "@/lib/create-context-hook";
import { useState, useCallback, useEffect, useMemo } from "react";
import { CartItem, Product } from "@/types";
import AsyncStorage from "@/lib/async-storage";

const CART_STORAGE_KEY = "@unipalm_cart";

export const [CartProvider, useCart] = createContextHook(() => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCart = async (newItems: CartItem[]) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const addItem = useCallback(
    async (product: Product, selectedColor: string, selectedSize: string, quantity: number = 1) => {
      const existingIndex = items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      let newItems: CartItem[];
      if (existingIndex >= 0) {
        newItems = [...items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
      } else {
        newItems = [
          ...items,
          { product, selectedColor, selectedSize, quantity },
        ];
      }
      setItems(newItems);
      await saveCart(newItems);
    },
    [items]
  );

  const removeItem = useCallback((productId: string, selectedColor: string, selectedSize: string) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      );
      saveCart(newItems);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, selectedColor: string, selectedSize: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, selectedColor, selectedSize);
        return;
      }

      setItems((currentItems) => {
        const newItems = currentItems.map((item) =>
          item.product.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize
            ? { ...item, quantity }
            : item
        );
        saveCart(newItems);
        return newItems;
      });
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
  }, []);

  const updateVariant = useCallback(
    (
      productId: string,
      oldColor: string,
      oldSize: string,
      newColor: string,
      newSize: string
    ) => {
      setItems((currentItems) => {
        const existingItemIndex = currentItems.findIndex(
          (item) =>
            item.product.id === productId &&
            item.selectedColor === oldColor &&
            item.selectedSize === oldSize
        );

        if (existingItemIndex < 0) return currentItems;

        const existingItem = currentItems[existingItemIndex];

        const newVariantIndex = currentItems.findIndex(
          (item) =>
            item.product.id === productId &&
            item.selectedColor === newColor &&
            item.selectedSize === newSize
        );

        let newItems: CartItem[];

        if (newVariantIndex >= 0 && newVariantIndex !== existingItemIndex) {
          newItems = currentItems.filter(
            (_, index) => index !== existingItemIndex
          );
          newItems[newVariantIndex] = {
            ...newItems[newVariantIndex],
            quantity: newItems[newVariantIndex].quantity + existingItem.quantity,
          };
        } else {
          newItems = [...currentItems];
          newItems[existingItemIndex] = {
            ...existingItem,
            selectedColor: newColor,
            selectedSize: newSize,
          };
        }

        saveCart(newItems);
        return newItems;
      });
    },
    []
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [items]
  );

  return useMemo(
    () => ({
      items,
      isLoading,
      addItem,
      removeItem,
      updateQuantity,
      updateVariant,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [
      items,
      isLoading,
      addItem,
      removeItem,
      updateQuantity,
      updateVariant,
      clearCart,
      totalItems,
      totalPrice,
    ]
  );
});