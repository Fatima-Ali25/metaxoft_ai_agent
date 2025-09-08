"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBubble from "@/componnets/ui/ChatBubble";
import ChatInput from "@/componnets/ui/ChatInput";

// A small avatar placeholder; can be swapped with an image later
function AiAvatar() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow">
      AI
    </div>
  );
}

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Compute responsive sizing classes
  const panelClasses = useMemo(() => {
    return "fixed bottom-20 right-4 z-50 w-[22rem] max-h-[70vh] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl md:bottom-24 md:right-6 md:w-[26rem]";
  }, []);

  const drawerClasses =
    "fixed inset-x-2 bottom-20 z-50 mx-auto w-auto max-w-xl rounded-2xl border border-gray-200 bg-white shadow-2xl md:hidden";

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const aiText = data?.reply ?? "Sorry, I couldn't get a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating circular trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle chat"
        className="fixed bottom-6 right-6 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl ring-1 ring-inset ring-white/10 hover:bg-indigo-700 focus:outline-none"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">💬</span>
      </motion.button>

      {/* Desktop/Tablet panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            className={`${panelClasses} hidden md:flex md:flex-col`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3">
              <AiAvatar />
              <div>
                <p className="text-xl font-semibold text-gray-900">
                  Metaxoft AI Assistant
                </p>
                <p className="text-sm text-gray-500">Here to help you</p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-white p-4"
            >
              {messages.map((m, i) => (
                <ChatBubble key={i} role={m.role} content={m.content} />
              ))}
              {isTyping && <ChatBubble role="assistant" isTyping />}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 bg-white">
              <ChatInput onSend={sendMessage} disabled={isTyping} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className={`${drawerClasses} flex flex-col md:hidden`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3">
              <AiAvatar />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Metaxoft AI Assistant
                </p>
                <p className="text-xs text-gray-500">Here to help you</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-white p-4"
            >
              {messages.map((m, i) => (
                <ChatBubble key={i} role={m.role} content={m.content} />
              ))}
              {isTyping && <ChatBubble role="assistant" isTyping />}
            </div>
            <div className="border-t border-gray-200 bg-white">
              <ChatInput onSend={sendMessage} disabled={isTyping} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
