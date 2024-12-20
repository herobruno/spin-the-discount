import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import "./Roulette.css";

export const Roulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [minNumber] = useState(1);
  const [maxNumber] = useState(20);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const audio = new Audio("/spin.mp3");
    audio.play();

    const spinDuration = 4000 + Math.random() * 2000;
    
    setTimeout(() => {
      const newNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      setSelectedNumber(newNumber);
      setIsSpinning(false);
      
      const winAudio = new Audio("/win.mp3");
      winAudio.play();
      
      toast.success(`Número sorteado: ${newNumber}`, {
        description: "Parabéns ao ganhador!",
      });
    }, spinDuration);
  };

  // Generate numbers array
  const numbers = Array.from(
    { length: maxNumber - minNumber + 1 },
    (_, i) => i + minNumber
  );

  return (
    <div className="roulette-container">
      <div className="roulette-content">
        <h1 className="roulette-title">Roleta de Sorteios</h1>
        <p className="roulette-subtitle">
          Sorteie números de cupons de desconto
        </p>

        <div className="roulette-wheel-container">
          {/* Seta indicadora */}
          <div className="roulette-arrow" />

          {/* Container da roleta */}
          <div className="roulette-wheel">
            {/* Faixa de números que gira */}
            <motion.div
              className="roulette-numbers"
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
              {[...numbers, ...numbers, ...numbers].map((number, index) => (
                <div
                  key={`${number}-${index}`}
                  className="roulette-number"
                >
                  <span>{number}</span>
                </div>
              ))}
            </motion.div>

            {/* Gradientes */}
            <div className="roulette-gradient-left" />
            <div className="roulette-gradient-right" />
          </div>

          {/* Número selecionado */}
          <div className="roulette-selected">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNumber || "placeholder"}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="selected-number"
              >
                {isSpinning ? "..." : selectedNumber || "?"}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSpin}
          disabled={isSpinning}
          className="spin-button"
        >
          {isSpinning ? "Sorteando..." : "Sortear Número"}
        </motion.button>
      </div>
    </div>
  );
};