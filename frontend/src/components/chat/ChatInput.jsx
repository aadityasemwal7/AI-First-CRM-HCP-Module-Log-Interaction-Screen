import { useState } from "react";

/**
 * Chat input bar with text field and send button.
 * Supports Enter key to send and Shift+Enter for newline.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSend - Callback when a message is sent.
 * @param {boolean} props.disabled - Whether the input is disabled.
 * @returns {JSX.Element} The rendered component.
 */
const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-5 py-4 border-t border-gray-100 bg-white rounded-b-2xl">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask the AI assistant…"
          className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="p-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 disabled:from-primary-400 disabled:to-primary-300 text-white rounded-xl shadow-sm shadow-primary-500/20 transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
