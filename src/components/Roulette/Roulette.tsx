import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import "./Roulette.css";

export const Roulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  // Array de cupons de desconto
  const coupons = [
    "10% OFF",
    "15% OFF",
    "20% OFF",
    "25% OFF",
    "30% OFF",
    "40% OFF",
    "50% OFF",
    "FRETE GRÁTIS",
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const audio = new Audio("/spin.mp3");
    audio.play();

    const spinDuration = 4000 + Math.random() * 2000;
    
    // Seleciona um cupom aleatório
    const randomIndex = Math.floor(Math.random() * coupons.length);
    const selectedCoupon = coupons[randomIndex];
    
    setTimeout(() => {
      setSelectedCoupon(selectedCoupon);
      setIsSpinning(false);
      
      const winAudio = new Audio("/win.mp3");
      winAudio.play();
      
      toast.success(`Parabéns! Você ganhou: ${selectedCoupon}`, {
        description: "Use seu cupom de desconto agora!",
      });
    }, spinDuration);
  };

  return (
    <div className="roulette-container">
      <div className="roulette-content">
        <h1 className="roulette-title">Roleta de Cupons</h1>
        <p className="roulette-subtitle">
          Gire e ganhe descontos exclusivos!
        </p>

        <div className="roulette-wheel-container">
          <div className="roulette-arrow" />

          <div className="roulette-wheel">
            <motion.div
              className="roulette-numbers"
              animate={{
                x: isSpinning ? [-100 * coupons.length, 0] : 0,
              }}
              transition={{
                duration: isSpinning ? 5 : 0,
                ease: "easeOut",
              }}
              style={{
                width: `${coupons.length * 100}px`,
              }}
            >
              {[...coupons, ...coupons, ...coupons].map((coupon, index) => (
                <div
                  key={`${coupon}-${index}`}
                  className="roulette-number"
                >
                  <span>{coupon}</span>
                </div>
              ))}
            </motion.div>

            <div className="roulette-gradient-left" />
            <div className="roulette-gradient-right" />
          </div>

          <div className="roulette-selected">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCoupon || "placeholder"}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="selected-number"
              >
                {isSpinning ? "..." : selectedCoupon || "?"}
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
          {isSpinning ? "Sorteando..." : "Girar Roleta"}
        </motion.button>
      </div>
    </div>
  );
};