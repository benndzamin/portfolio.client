import { useState, useEffect, useRef, useCallback } from "react";
import { BsChatDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

// Base URL of the chat backend. Override locally via VITE_API_BASE_URL in a
// .env file (see .env.example) to point at a local server during development.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://portfolio-server-vnua.onrender.com";
const CHAT_URL = `${API_BASE_URL}/api/chat`;
const HEALTH_URL = `${API_BASE_URL}/health`;

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 10;
const REQUEST_TIMEOUT_MS = 20000;
const REFOCUS_DELAY_MS = 50;

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initial chat messages
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "bot", text: "Hi there! 👋" },
    { id: 2, sender: "bot", text: "I'm Benjamin's assistant. Feel free to ask anything about his experience, skills or availability." }
  ]);

  // Refs for automatic scrolling and maintaining input focus
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1 and 2 are already used by the initial greeting messages above.
  const nextIdRef = useRef(2);
  const generateMessageId = () => {
    nextIdRef.current += 1;
    return nextIdRef.current;
  };

  const focusInput = useCallback((delay: number = REFOCUS_DELAY_MS) => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, delay);
  }, []);

  // Effect to ensure the chat ALWAYS scrolls down to the latest message
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Short timeout ensures React renders the bubble before scrolling
    }
  }, [messages, isLoading, isOpen]);

  // Effect to automatically focus the input field as soon as the chat opens
  useEffect(() => {
    if (isOpen) {
      focusInput(300); // Wait for the framer-motion opening animation to finish
    }
  }, [isOpen, focusInput]);

  // Background ping to wake up the Render server as soon as the page loads.
  // Hits a dedicated health-check route (not /api/chat) so it never triggers
  // a real Gemini call.
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await fetch(HEALTH_URL);
      } catch {
        // Quietly ignore errors as this is just a background wake-up ping
      }
    };
    wakeUpServer();
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevents page reload
    const userText = inputText.trim();
    if (!userText || isLoading) return;

    setInputText(""); // Immediately clear the input field
    focusInput(); // Maintain input focus right after hitting Enter/clicking send

    // Snapshot of the conversation so far (before this new message), sent
    // along so the backend can give Gemini multi-turn context.
    const historyForRequest = messages
      .slice(-MAX_HISTORY_MESSAGES)
      .map(({ sender, text }) => ({ sender, text }));

    // Add user's message to the chat window
    setMessages((prev) => [...prev, { id: generateMessageId(), sender: "user", text: userText }]);
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      // Sending the request to your Render backend
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ poruka: userText, history: historyForRequest }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      // Add bot's response to the chat window
      if (data.odgovor) {
        setMessages((prev) => [...prev, { id: generateMessageId(), sender: "bot", text: data.odgovor }]);
      } else {
        setMessages((prev) => [...prev, { id: generateMessageId(), sender: "bot", text: "I'm having trouble connecting to the network. Please try again." }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const isTimeout = error instanceof DOMException && error.name === "AbortError";
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          sender: "bot",
          text: isTimeout
            ? "That's taking longer than usual — the server might just be waking up. Please try again in a moment."
            : "Looks like the connection was interrupted. Please try again shortly.",
        },
      ]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);

      // Refocus the input field after the bot finishes generating the response
      focusInput();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-4 rounded-full shadow-lg shadow-cyan-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition-colors"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <BsChatDots className="text-2xl" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[450px] max-h-[70vh] bg-slate-900/95 backdrop-blur-sm rounded-xl shadow-xl z-50 flex flex-col overflow-hidden border border-slate-800"
          >
            {/* Header */}
            <div className="bg-slate-950/80 border-b border-slate-800 p-3 flex justify-between items-center">
              <span className="font-mono text-xs tracking-[0.3em] text-cyan-400">
                // chat with me
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-slate-400 hover:text-cyan-400 transition text-xl leading-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded"
              >
                <IoClose />
              </button>
            </div>

            {/* Messages Body */}
            <div className="p-3 overflow-y-auto flex-1 bg-slate-950/40 flex flex-col gap-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-slate-800 text-white border border-cyan-500/40 rounded-tr-none"
                        : "bg-slate-800/80 text-slate-200 border border-slate-700 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Loading Animation - Bouncing Dots */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 text-cyan-400 border border-slate-700 rounded-lg rounded-tl-none px-3 py-2 text-xs shadow-sm flex items-center gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce [animation-delay:0.2s]">●</span>
                    <span className="animate-bounce [animation-delay:0.4s]">●</span>
                  </div>
                </div>
              )}

              {/* Anchor that pulls the scroll to the bottom */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-slate-800 bg-slate-900/95 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                maxLength={MAX_MESSAGE_LENGTH}
                className="flex-1 p-2 bg-slate-950 text-white placeholder:text-slate-500 rounded-md outline-none text-sm border border-slate-800 focus:border-cyan-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                aria-label="Send message"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-2 rounded-md transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <IoMdSend className="text-lg" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;
