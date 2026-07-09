/**
 * Renders a single chat bubble.
 * User messages align right (indigo), assistant messages align left (gray).
 *
 * @param {Object} props - Component props.
 * @param {"user" | "assistant"} props.role - The role of the message sender.
 * @param {string} props.content - The text content of the message.
 * @param {string | number} [props.timestamp] - Optional timestamp of the message.
 * @param {string} [props.progress] - Optional progress text for AI generation.
 * @returns {JSX.Element} The rendered component.
 */
const ChatMessage = ({ role, content, timestamp, progress }) => {
  const isUser = role === "user";

  const time = timestamp
    ? new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-start gap-2.5 max-w-[85%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5 ${
            isUser
              ? "bg-primary-100 text-primary-700"
              : "bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
          }`}
        >
          {isUser ? "U" : "AI"}
        </div>

        {/* Bubble + timestamp */}
        <div className="flex flex-col">
          <div
            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              isUser
                ? "bg-primary-600 text-white rounded-br-md"
                : "bg-gray-100 text-gray-800 rounded-bl-md"
            }`}
          >
            {content || (progress && <span className="text-gray-400 italic">Thinking...</span>)}
          </div>
          
          {/* Progress Indicator */}
          {progress && !isUser && (
            <div className="flex items-center gap-2 mt-2 px-1">
              <svg className="animate-spin h-3.5 w-3.5 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs text-teal-600 animate-pulse font-medium">{progress}</span>
            </div>
          )}

          {time && (
            <p
              className={`text-[10px] text-gray-400 mt-1 ${
                isUser ? "text-right mr-1" : "ml-1"
              }`}
            >
              {time}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
