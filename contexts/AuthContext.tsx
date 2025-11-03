"use client";

import createContextHook from "@/lib/create-context-hook.tsx";
import { useState, useEffect, useCallback, useMemo } from "react";
import AsyncStorage from "@/lib/async-storage";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipTier: "basic" | "silver" | "gold" | "platinum";
  points: number;
  joinedDate: string;
}

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const mockUser: User = {
      id: "1",
      name: "Khách Hàng Unipalm",
      email: email,
      phone: "0969596639",
      membershipTier: "gold",
      points: 1500,
      joinedDate: new Date().toISOString(),
    };

    await AsyncStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, [user]);

  return useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  }), [user, isLoading, login, logout, updateUser]);
});