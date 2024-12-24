import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { toast } from "sonner";
import { Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import "./Roulette.css";

export const Roulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);
  const [itemWidth, setItemWidth] = useState(160);
  const controls = useAnimation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateItemWidth = () => {
      if (window.innerWidth < 768) {
        setItemWidth(120); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemWidth(140); // Tablet
      } else {
        setItemWidth(160); // Desktop
      }
    };

    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  }, []);

  const prizes = [
    "10% OFF",
    "15% OFF",
    "20% OFF",
    "25% OFF",
    "30% OFF",
    "40% OFF",
    "50% OFF",
    "FRETE GRÁTIS",
  ];

  const repetitions = 50;
  const stripWidth = prizes.length * itemWidth * repetitions;

  const spin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null);

    const spinSound = new Audio("/spin.mp3");
    spinSound.play();

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];

    const baseRotations = 4;
    const finalPosition = -(baseRotations * prizes.length * itemWidth + randomIndex * itemWidth);

    await controls.start({
      x: [0, finalPosition],
      transition: {
        duration: 5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    });

    const winSound = new Audio("/win.mp3");
    winSound.play();

    setIsSpinning(false);
    setSelectedPrize(prize);
    
    toast.success(`Parabéns! Você ganhou: ${prize}`, {
      description: "Use seu cupom de desconto agora!",
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="roulette-container">
      <div className="roulette-content">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            className="text-white hover:text-white hover:bg-roulette-primary/20"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-2 text-white">
            <Info className="h-4 w-4 text-roulette-primary" />
            <span>Chances restantes: <strong>4</strong></span>
          </div>
        </div>

        <h1 className="roulette-title">Roleta de Cupons</h1>
        <p className="roulette-subtitle">
          Gire e ganhe descontos exclusivos!
        </p>

        <div className="roulette-wheel-container">
          <div className="roulette-display">
            <div className="roulette-pointer" />
            <motion.div
              className="roulette-strip"
              animate={controls}
              initial={{ x: 0 }}
              style={{
                width: stripWidth,
              }}
            >
              {Array(repetitions)
                .fill(prizes)
                .flat()
                .map((prize, index) => (
                  <div
                    key={`${prize}-${index}`}
                    className="roulette-item"
                    style={{ width: itemWidth }}
                  >
                    <span>{prize}</span>
                  </div>
                ))}
            </motion.div>

            <div className="roulette-overlay-left" />
            <div className="roulette-overlay-right" />
          </div>
        </div>

        <motion.button
          className="spin-button"
          onClick={spin}
          disabled={isSpinning}
          whileHover={{ scale: isSpinning ? 1 : 1.02 }}
          whileTap={{ scale: isSpinning ? 1 : 0.98 }}
        >
          {isSpinning ? "Girando..." : "Girar Roleta"}
        </motion.button>

        {selectedPrize && (
          <div className="result-display">
            {selectedPrize}
          </div>
        )}
      </div>
    </div>
  );
};