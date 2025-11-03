"use client";

import createContextHook from "@/lib/create-context-hook.tsx";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Address } from "@/types";
import AsyncStorage from "@/lib/async-storage";

const ADDRESSES_STORAGE_KEY = "@unipalm_addresses";

export const [AddressProvider, useAddresses] = createContextHook(() => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const stored = await AsyncStorage.getItem(ADDRESSES_STORAGE_KEY);
      if (stored) {
        setAddresses(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAddresses = async (newAddresses: Address[]) => {
    try {
      await AsyncStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(newAddresses));
    } catch (error) {
      console.error("Error saving addresses:", error);
    }
  };

  const addAddress = useCallback(
    (address: Omit<Address, "id">) => {
      const newAddress: Address = {
        ...address,
        id: `ADDR${Date.now()}`,
      };

      let newAddresses = [...addresses, newAddress];

      if (newAddress.isDefault) {
        newAddresses = newAddresses.map((addr) =>
          addr.id === newAddress.id ? addr : { ...addr, isDefault: false }
        );
      }

      setAddresses(newAddresses);
      saveAddresses(newAddresses);

      return newAddress;
    },
    [addresses]
  );

  const updateAddress = useCallback(
    (id: string, updates: Partial<Address>) => {
      let newAddresses = addresses.map((addr) =>
        addr.id === id ? { ...addr, ...updates } : addr
      );

      if (updates.isDefault) {
        newAddresses = newAddresses.map((addr) =>
          addr.id === id ? addr : { ...addr, isDefault: false }
        );
      }

      setAddresses(newAddresses);
      saveAddresses(newAddresses);
    },
    [addresses]
  );

  const removeAddress = useCallback(
    (id: string) => {
      const newAddresses = addresses.filter((addr) => addr.id !== id);
      setAddresses(newAddresses);
      saveAddresses(newAddresses);
    },
    [addresses]
  );

  const setDefaultAddress = useCallback(
    (id: string) => {
      const newAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }));
      setAddresses(newAddresses);
      saveAddresses(newAddresses);
    },
    [addresses]
  );

  const getDefaultAddress = useCallback(() => {
    return addresses.find((addr) => addr.isDefault);
  }, [addresses]);

  return useMemo(
    () => ({
      addresses,
      isLoading,
      addAddress,
      updateAddress,
      removeAddress,
      setDefaultAddress,
      getDefaultAddress,
    }),
    [addresses, isLoading, addAddress, updateAddress, removeAddress, setDefaultAddress, getDefaultAddress]
  );
});