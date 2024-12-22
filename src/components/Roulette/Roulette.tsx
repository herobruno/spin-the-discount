import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import "./Roulette.css";

export const Roulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [spinPosition, setSpinPosition] = useState(0);

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

    const randomIndex = Math.floor(Math.random() * coupons.length);
    const selectedCoupon = coupons[randomIndex];
    
    // Calcular a posição final considerando rotações completas
    const fullRotations = 5 + Math.floor(Math.random() * 3); // Aumentado para mais rotações
    const finalPosition = -(fullRotations * (coupons.length * 100) + (randomIndex * 100));
    
    setSpinPosition(finalPosition);
    setSelectedCoupon(null);
    
    const spinDuration = 4000 + Math.random() * 2000;
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedCoupon(selectedCoupon);
      
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
                x: spinPosition % (coupons.length * 100), // Garante que a posição seja cíclica
              }}
              initial={{
                x: 0,
              }}
              transition={{
                duration: isSpinning ? 5 : 0,
                ease: "easeOut",
              }}
              style={{
                width: `${coupons.length * 100 * 5}px`, // Aumentado para mais repetições
              }}
            >
              {[...Array(5)].flatMap((_, i) => // Repetir o array 5 vezes
                coupons.map((coupon, index) => (
                  <div
                    key={`${coupon}-${i}-${index}`}
                    className="roulette-number"
                  >
                    <span>{coupon}</span>
                  </div>
                ))
              )}
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