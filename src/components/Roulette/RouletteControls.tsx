import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface RouletteControlsProps {
  isSpinning: boolean;
  onSpin: () => void;
  minNumber: number;
  maxNumber: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

export const RouletteControls: React.FC<RouletteControlsProps> = ({
  isSpinning,
  onSpin,
  minNumber,
  maxNumber,
  onMinChange,
  onMaxChange,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">Configurações</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-roulette-light block mb-2">
              Número Mínimo
            </label>
            <Input
              type="number"
              value={minNumber}
              onChange={(e) => onMinChange(parseInt(e.target.value) || 1)}
              min={1}
              max={maxNumber - 1}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-roulette-light block mb-2">
              Número Máximo
            </label>
            <Input
              type="number"
              value={maxNumber}
              onChange={(e) => onMaxChange(parseInt(e.target.value) || 2)}
              min={minNumber + 1}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onSpin}
            disabled={isSpinning}
            className="w-full bg-roulette-primary hover:bg-roulette-secondary text-white font-semibold py-6 text-lg transition-colors"
          >
            {isSpinning ? "Sorteando..." : "Sortear Número"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};