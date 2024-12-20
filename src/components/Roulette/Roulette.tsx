import React, { useState } from "react";
import { RouletteWheel } from "./RouletteWheel";
import { RouletteHistory } from "./RouletteHistory";
import { RouletteControls } from "./RouletteControls";
import { toast } from "sonner";

export const Roulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(20);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const audio = new Audio("/spin.mp3");
    audio.play();

    // Random spin duration between 4 and 6 seconds
    const spinDuration = 4000 + Math.random() * 2000;
    
    setTimeout(() => {
      const newNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      setSelectedNumber(newNumber);
      setHistory(prev => [newNumber, ...prev].slice(0, 10));
      setIsSpinning(false);
      
      const winAudio = new Audio("/win.mp3");
      winAudio.play();
      
      toast.success(`Número sorteado: ${newNumber}`, {
        description: "Parabéns ao ganhador!",
      });
    }, spinDuration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-roulette-dark to-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">Roleta de Sorteios</h1>
          <p className="text-roulette-light opacity-80">
            Sorteie números de cupons de desconto
          </p>
        </div>

        <div className="space-y-8">
          <div className="animate-scale-in">
            <RouletteWheel
              isSpinning={isSpinning}
              selectedNumber={selectedNumber}
              minNumber={minNumber}
              maxNumber={maxNumber}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RouletteControls
              isSpinning={isSpinning}
              onSpin={handleSpin}
              minNumber={minNumber}
              maxNumber={maxNumber}
              onMinChange={setMinNumber}
              onMaxChange={setMaxNumber}
            />
            
            <RouletteHistory history={history} />
          </div>
        </div>
      </div>
    </div>
  );
};