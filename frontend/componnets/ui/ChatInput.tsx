"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        placeholder="Ask Metaxoft AI..."
        disabled={disabled}
      />
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSend}
        disabled={disabled}
        className="rounded-full bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Send message"
      >
        Send
      </motion.button>
    </div>
  );
}
