import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                 rounded-2xl shadow-lg p-6 my-6 mx-auto max-w-3xl"
    >
      {children}
    </motion.div>
  );
};

export default Card;
