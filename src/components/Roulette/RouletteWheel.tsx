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
  // Gera um array com todos os números possíveis
  const numbers = Array.from(
    { length: maxNumber - minNumber + 1 },
    (_, i) => i + minNumber
  );

  return (
    <div className="relative aspect-square max-w-[500px] mx-auto">
      {/* Ponteiro fixo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-red-500" />
      </div>

      {/* Roda da roleta */}
      <motion.div
        className="relative w-full h-full rounded-full border-8 border-roulette-primary bg-gradient-to-br from-roulette-dark to-black shadow-xl"
        animate={{
          rotate: isSpinning ? 360 * 10 : 0,
        }}
        transition={{
          duration: isSpinning ? 5 : 0,
          ease: "easeOut",
        }}
      >
        {numbers.map((number, index) => {
          const angle = (360 / numbers.length) * index;
          const radius = 42; // Porcentagem do raio onde os números serão posicionados

          return (
            <div
              key={number}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl"
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateY(-${radius}%)
                  rotate(-${angle}deg)
                `,
              }}
            >
              {number}
            </div>
          );
        })}

        {/* Linhas divisórias */}
        {numbers.map((_, index) => {
          const angle = (360 / numbers.length) * index;
          return (
            <div
              key={`line-${index}`}
              className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-roulette-primary/30"
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 50%",
              }}
            />
          );
        })}
      </motion.div>

      {/* Círculo central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-roulette-primary flex items-center justify-center">
        <span className="text-white font-bold">
          {isSpinning ? "..." : selectedNumber || "?"}
        </span>
      </div>
    </div>
  );
};