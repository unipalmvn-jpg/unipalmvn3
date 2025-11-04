"use client";

import createContextHook from "@/lib/create-context-hook";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Order, OrderItem, Address, OrderStatus } from "@/types";
import AsyncStorage from "@/lib/async-storage";

const ORDERS_STORAGE_KEY = "@unipalm_orders";

export const [OrderProvider, useOrders] = createContextHook(() => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const stored = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  const saveOrders = async (newOrders: Order[]) => {
    try {
      await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(newOrders));
    } catch (error) {
      console.error("Error saving orders:", error);
    }
  };

  const createOrder = useCallback(
    (
      items: OrderItem[],
      address: Address,
      paymentMethod: string,
      shippingFee: number = 30000,
      discount: number = 0,
      affiliateCode?: string | null
    ): Order => {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const finalTotal = total + shippingFee - discount;

      const newOrder: Order = {
        id: `ORDER${Date.now()}`,
        items,
        total: finalTotal,
        shippingFee,
        discount,
        status: "pending",
        address,
        paymentMethod,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingNumber: `VN${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        affiliateCode,
      };

      const newOrders = [newOrder, ...orders];
      setOrders(newOrders);
      saveOrders(newOrders);

      return newOrder;
    },
    [orders]
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      const newOrders = orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      );
      setOrders(newOrders);
      saveOrders(newOrders);
    },
    [orders]
  );

  const cancelOrder = useCallback(
    (orderId: string) => {
      updateOrderStatus(orderId, "cancelled");
    },
    [updateOrderStatus]
  );

  const getOrder = useCallback(
    (orderId: string) => {
      return orders.find((order) => order.id === orderId);
    },
    [orders]
  );

  const getOrdersByStatus = useCallback(
    (status: OrderStatus) => {
      return orders.filter((order) => order.status === status);
    },
    [orders]
  );

  return useMemo(
    () => ({
      orders,
      isLoading,
      isInitialized,
      createOrder,
      updateOrderStatus,
      cancelOrder,
      getOrder,
      getOrdersByStatus,
    }),
    [orders, isLoading, isInitialized, createOrder, updateOrderStatus, cancelOrder, getOrder, getOrdersByStatus]
  );
});