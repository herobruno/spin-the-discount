import React from "react";
import { motion } from "framer-motion";

interface RouletteWheelProps {
  isSpinning: boolean;
  selectedNumber: number | null;
  minNumber: number;
  maxNumber: number;
}

export const RouletteWheel: React.FC<RouletteWheelProps> = ({
  isSpinning,
  selectedNumber,
  minNumber,
  maxNumber,
}) => {
  return (
    <div className="relative aspect-square">
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20" />
      
      {/* Spinning wheel */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-roulette-primary"
        animate={{
          rotate: isSpinning ? 360 * 10 : 0,
        }}
        transition={{
          duration: isSpinning ? 5 : 0,
          ease: "easeOut",
        }}
      >
        {/* Wheel markers */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-roulette-light/50"
            style={{
              left: "50%",
              top: "0",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* Center display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="bg-roulette-primary/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          animate={{
            scale: isSpinning ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpinning ? Infinity : 0,
          }}
        >
          <span className="text-4xl font-bold text-white">
            {isSpinning ? "..." : selectedNumber || "?"}
          </span>
        </motion.div>
      </div>
    </div>
  );
};