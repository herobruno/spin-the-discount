import React from "react";
import { motion } from "framer-motion";

interface RouletteHistoryProps {
  history: number[];
}

export const RouletteHistory: React.FC<RouletteHistoryProps> = ({ history }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">Números Sorteados</h2>
      
      <div className="grid grid-cols-5 gap-2">
        {history.map((number, index) => (
          <motion.div
            key={`${number}-${index}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-roulette-primary/20 backdrop-blur-sm rounded-lg p-2 text-center"
          >
            <span className="text-white font-medium">{number}</span>
          </motion.div>
        ))}
        {history.length === 0 && (
          <p className="text-roulette-light/60 col-span-5 text-center py-4">
            Nenhum número sorteado ainda
          </p>
        )}
      </div>
    </div>
  );
};