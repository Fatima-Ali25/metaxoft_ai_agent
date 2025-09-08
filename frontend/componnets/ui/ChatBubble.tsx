"use client";

import { motion } from "framer-motion";

type ChatBubbleProps = {
  role: "user" | "assistant";
  content?: string;
  isTyping?: boolean;
};

export default function ChatBubble({
  role,
  content = "",
  isTyping = false,
}: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
        }`}
      >
        {isTyping ? (
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.2s]"></span>
            <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.1s]"></span>
            <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>
          </div>
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        )}
      </motion.div>
    </div>
  );
}
