import { useState, useEffect, useRef } from "react";
import { BsChatDots } from "react-icons/bs"; 
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io"; 
import { motion, AnimatePresence } from "framer-motion";

// URL of your live backend on Render
const BACKEND_URL = "https://portfolio-server-vnua.onrender.com/api/chat";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Initial chat messages
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi there! 👋" },
    { sender: "bot", text: "I'm Benjamin's assistant. Feel free to ask anything about his experience, skills or availability." }
  ]);

  // Refs for automatic scrolling and maintaining input focus
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Wait for the framer-motion opening animation to finish
    }
  }, [isOpen]);

  // Background ping to wake up the Render server as soon as the page loads
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await fetch(BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ poruka: "ping" }),
        });
      } catch (e) {
        // Quietly ignore errors as this is just a background wake-up ping
      }
    };
    wakeUpServer();
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevents page reload
    if (!inputText.trim() || isLoading) return;

    const userText = inputText;
    setInputText(""); // Immediately clear the input field
    
    // Maintain input focus right after hitting Enter/clicking send
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    // Add user's message to the chat window
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsLoading(true);

    try {
      // Sending the request to your Render backend
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ poruka: userText }),
      });

      const data = await response.json();

      // Add bot's response to the chat window
      if (data.odgovor) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.odgovor }]);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: "I'm having trouble connecting to the network. Please try again." }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Looks like the connection was interrupted. Please try again shortly." }]);
    } finally {
      setIsLoading(false);
      
      // Refocus the input field after the bot finishes generating the response
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none transition-colors"
        aria-label="Open chat"
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
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[450px] max-h-[70vh] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 flex justify-between items-center shadow-sm">
              <span className="font-semibold text-sm md:text-base">Chat with me.</span>
              <IoClose
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition text-xl cursor-pointer"
              />
            </div>

            {/* Messages Body */}
            <div className="p-3 overflow-y-auto flex-1 bg-gray-50 flex flex-col gap-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Loading Animation - Bouncing Dots */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-400 border border-gray-200 rounded-lg rounded-tl-none px-3 py-2 text-xs shadow-sm flex items-center gap-1">
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
              className="p-3 border-t border-gray-200 bg-white flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 bg-gray-100 text-gray-800 rounded-md outline-none text-sm border border-transparent focus:border-blue-400 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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