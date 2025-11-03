"use client";

import createContextHook from "@/lib/create-context-hook.tsx";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { products } from "@/data/products";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: string;
  isTyping?: boolean;
  products?: { id: string; name: string; price: number }[];
}

export const [ChatSupportProvider, useChatSupport] = createContextHook(() => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là trợ lý của Unipalm. Tôi có thể giúp bạn tìm sản phẩm, tư vấn size, giải đáp về chính sách đổi trả và nhiều thông tin khác. Bạn cần hỗ trợ gì?",
      sender: "support",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const sendMessage = useCallback((text: string) => {
    const userMessage: ChatMessage = {
      id: `MSG${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const supportMessage: ChatMessage = {
        id: `SUPPORT${Date.now()}`,
        text: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.",
        sender: "support",
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, supportMessage]);
      
      if (!isChatOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, 1000);
  }, [isChatOpen]);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen) {
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  const openChat = useCallback(() => {
    setIsChatOpen(true);
    setUnreadCount(0);
  }, []);

  return useMemo(
    () => ({
      messages,
      isChatOpen,
      unreadCount,
      sendMessage,
      toggleChat,
      closeChat,
      openChat,
    }),
    [messages, isChatOpen, unreadCount, sendMessage, toggleChat, closeChat, openChat]
  );
});