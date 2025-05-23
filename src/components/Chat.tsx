import { useState } from "react";
import { BsChatDots } from "react-icons/bs"; // Nova ikona
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none"
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
            className="fixed bottom-20 right-6 w-80 max-h-[70vh] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
              <span className="font-semibold">Chat with me.</span>
              <IoClose
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition text-xl cursor-pointer"
              />
            </div>

            <div className="p-4 text-sm text-gray-700 overflow-y-auto flex-1 bg-gray-100">
              <p className="mb-2">Hi there! 👋</p>
              <p className="mb-2">
                I'm Benjamin's assistant. Feel free to ask anything about his
                experience, skills or availability.
              </p>
              <p className="italic text-xs text-gray-400">
                Chatbot coming soon...
              </p>
            </div>

            <div className="p-3 border-t border-gray-300 bg-white">
              <input
                type="text"
                disabled
                placeholder="Type your message..."
                className="w-full p-2 bg-gray-200 text-gray-500 rounded-md outline-none cursor-not-allowed"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;
