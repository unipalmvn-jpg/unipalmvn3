"use client";

import createContextHook from "@/lib/create-context-hook.tsx";
import { useState, useCallback, useEffect, useMemo } from "react";
import AsyncStorage from "@/lib/async-storage";

export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  balance: number;
  expiryDate: string;
  isActive: boolean;
  purchaseDate: string;
  recipientName?: string;
  recipientEmail?: string;
  message?: string;
}

export interface GiftCardTransaction {
  id: string;
  giftCardCode: string;
  amount: number;
  type: "purchase" | "redeem";
  date: string;
  orderId?: string;
}

const GIFTCARDS_STORAGE_KEY = "@unipalm_giftcards";
const TRANSACTIONS_STORAGE_KEY = "@unipalm_giftcard_transactions";

export const [GiftCardProvider, useGiftCards] = createContextHook(() => {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [transactions, setTransactions] = useState<GiftCardTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [storedCards, storedTransactions] = await Promise.all([
        AsyncStorage.getItem(GIFTCARDS_STORAGE_KEY),
        AsyncStorage.getItem(TRANSACTIONS_STORAGE_KEY),
      ]);

      if (storedCards) {
        setGiftCards(JSON.parse(storedCards));
      }
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    } catch (error) {
      console.error("Error loading gift cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveGiftCards = async (cards: GiftCard[]) => {
    try {
      await AsyncStorage.setItem(GIFTCARDS_STORAGE_KEY, JSON.stringify(cards));
    } catch (error) {
      console.error("Error saving gift cards:", error);
    }
  };

  const saveTransactions = async (txs: GiftCardTransaction[]) => {
    try {
      await AsyncStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(txs));
    } catch (error) {
      console.error("Error saving transactions:", error);
    }
  };

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "UP";
    for (let i = 0; i < 12; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const purchaseGiftCard = useCallback(
    (
      amount: number,
      recipientName?: string,
      recipientEmail?: string,
      message?: string
    ): GiftCard => {
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      const newCard: GiftCard = {
        id: `GIFT${Date.now()}`,
        code: generateCode(),
        amount,
        balance: amount,
        expiryDate: expiryDate.toISOString(),
        isActive: true,
        purchaseDate: new Date().toISOString(),
        recipientName,
        recipientEmail,
        message,
      };

      const newCards = [...giftCards, newCard];
      setGiftCards(newCards);
      saveGiftCards(newCards);

      const transaction: GiftCardTransaction = {
        id: `TX${Date.now()}`,
        giftCardCode: newCard.code,
        amount,
        type: "purchase",
        date: new Date().toISOString(),
      };

      const newTransactions = [...transactions, transaction];
      setTransactions(newTransactions);
      saveTransactions(newTransactions);

      return newCard;
    },
    [giftCards, transactions]
  );

  const validateGiftCard = useCallback(
    (code: string): { valid: boolean; card?: GiftCard; error?: string } => {
      const card = giftCards.find((c) => c.code === code);

      if (!card) {
        return { valid: false, error: "Mã gift card không tồn tại" };
      }

      if (!card.isActive) {
        return { valid: false, error: "Gift card đã bị vô hiệu hóa" };
      }

      if (card.balance <= 0) {
        return { valid: false, error: "Gift card đã hết số dư" };
      }

      if (new Date(card.expiryDate) < new Date()) {
        return { valid: false, error: "Gift card đã hết hạn" };
      }

      return { valid: true, card };
    },
    [giftCards]
  );

  const redeemGiftCard = useCallback(
    (code: string, amount: number, orderId: string): boolean => {
      const validation = validateGiftCard(code);
      if (!validation.valid || !validation.card) {
        return false;
      }

      const card = validation.card;
      if (card.balance < amount) {
        return false;
      }

      const newCards = giftCards.map((c) =>
        c.code === code ? { ...c, balance: c.balance - amount } : c
      );
      setGiftCards(newCards);
      saveGiftCards(newCards);

      const transaction: GiftCardTransaction = {
        id: `TX${Date.now()}`,
        giftCardCode: code,
        amount,
        type: "redeem",
        date: new Date().toISOString(),
        orderId,
      };

      const newTransactions = [...transactions, transaction];
      setTransactions(newTransactions);
      saveTransactions(newTransactions);

      return true;
    },
    [giftCards, transactions, validateGiftCard]
  );

  const getGiftCardByCode = useCallback(
    (code: string) => {
      return giftCards.find((card) => card.code === code);
    },
    [giftCards]
  );

  const getActiveGiftCards = useCallback(() => {
    return giftCards.filter((card) => card.isActive && card.balance > 0);
  }, [giftCards]);

  return useMemo(
    () => ({
      giftCards,
      transactions,
      isLoading,
      purchaseGiftCard,
      validateGiftCard,
      redeemGiftCard,
      getGiftCardByCode,
      getActiveGiftCards,
    }),
    [
      giftCards,
      transactions,
      isLoading,
      purchaseGiftCard,
      validateGiftCard,
      redeemGiftCard,
      getGiftCardByCode,
      getActiveGiftCards,
    ]
  );
});