"use client";
import { motion } from "framer-motion";

function Spinner() {
  return (
    <div className="spinner-container">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <style>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
          border-radius: 8px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 4px solid #555;
          border-top-color:rgb(255, 255, 255);
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

export default Spinner;
