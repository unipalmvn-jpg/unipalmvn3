"use client";

import { useChatSupport } from "@/contexts/ChatSupportContext";
import { MessageCircle, Send, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const { messages, isChatOpen, unreadCount, sendMessage, toggleChat, closeChat } = useChatSupport();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <>
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-24 right-5 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl z-50"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
              {unreadCount}
            </div>
          )}
        </button>
      )}

      {isChatOpen && (
        <div className="fixed bottom-5 right-5 w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-bold">Hỗ Trợ Trực Tuyến</h3>
            <button onClick={closeChat}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-backgroundGray">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-black rounded-bl-none'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-border bg-white flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-backgroundGray rounded-full px-4 py-3 outline-none"
            />
            <button onClick={handleSend} className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}