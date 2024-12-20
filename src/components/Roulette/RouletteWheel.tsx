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
    <div className="relative w-full max-w-[800px] mx-auto">
      {/* Seta indicadora */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-red-500" />
      </div>

      {/* Container da roleta */}
      <div className="relative h-[200px] mt-[40px] bg-gradient-to-r from-roulette-dark to-black rounded-xl border-4 border-roulette-primary overflow-hidden">
        {/* Faixa de números que gira */}
        <motion.div
          className="absolute top-0 left-0 h-full flex items-center"
          animate={{
            x: isSpinning ? [-100 * numbers.length, 0] : 0,
          }}
          transition={{
            duration: isSpinning ? 5 : 0,
            ease: "easeOut",
          }}
          style={{
            width: `${numbers.length * 100}px`,
          }}
        >
          {/* Repetir os números várias vezes para criar efeito infinito */}
          {[...numbers, ...numbers, ...numbers].map((number, index) => (
            <div
              key={`${number}-${index}`}
              className="flex-shrink-0 w-[100px] h-full flex items-center justify-center"
            >
              <span className="text-4xl font-bold text-white">
                {number}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gradientes para dar efeito de fade nas bordas */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-roulette-dark to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-roulette-dark to-transparent" />
      </div>

      {/* Número selecionado */}
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[100px] h-[200px] flex items-center justify-center pointer-events-none">
        <div className="text-4xl font-bold text-white opacity-50">
          {isSpinning ? "..." : selectedNumber || "?"}
        </div>
      </div>
    </div>
  );
};