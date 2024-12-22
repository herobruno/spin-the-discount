import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { toast } from "sonner";
import "./Roulette.css";

export const Roulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);
  const controls = useAnimation();

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

  // Número de vezes que o array de prêmios será repetido
  const repetitions = 10;
  const itemWidth = 160; // Largura de cada item em pixels
  const stripWidth = prizes.length * itemWidth * repetitions;

  const spin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null);

    // Tocar som de início
    const spinSound = new Audio("/spin.mp3");
    spinSound.play();

    // Selecionar prêmio aleatório
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];

    // Calcular posição final
    const baseRotations = 3; // Número mínimo de rotações completas
    const additionalRotations = Math.random() * 2; // Rotações adicionais aleatórias
    const totalRotations = baseRotations + additionalRotations;
    
    // Posição final considerando as rotações e o item selecionado
    const finalPosition = -(totalRotations * stripWidth + (randomIndex * itemWidth));

    // Animar a roleta
    await controls.start({
      x: finalPosition,
      transition: {
        duration: 4,
        ease: [0.25, 0.1, 0.25, 1], // Curva de easing personalizada
      },
    });

    // Tocar som de vitória
    const winSound = new Audio("/win.mp3");
    winSound.play();

    // Atualizar estado e mostrar toast
    setIsSpinning(false);
    setSelectedPrize(prize);
    
    toast.success(`Parabéns! Você ganhou: ${prize}`, {
      description: "Use seu cupom de desconto agora!",
    });
  };

  // Resetar posição quando necessário
  useEffect(() => {
    if (!isSpinning) {
      controls.set({ x: 0 });
    }
  }, [isSpinning, controls]);

  return (
    <div className="roulette-container">
      <div className="roulette-content">
        <h1 className="roulette-title">Roleta de Cupons</h1>
        <p className="roulette-subtitle">
          Gire e ganhe descontos exclusivos!
        </p>

        <div className="roulette-wheel-container">
          <div className="roulette-pointer" />
          
          <div className="roulette-display">
            <motion.div
              className="roulette-strip"
              animate={controls}
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