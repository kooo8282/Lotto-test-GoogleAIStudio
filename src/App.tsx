/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Sparkles } from 'lucide-react';

export default function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNumbers = useCallback(() => {
    setIsGenerating(true);
    // Simulate a slight delay for the "generating" feel
    setTimeout(() => {
      const newNumbers: number[] = [];
      while (newNumbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!newNumbers.includes(num)) {
          newNumbers.push(num);
        }
      }
      setNumbers(newNumbers.sort((a, b) => a - b));
      setIsGenerating(false);
    }, 600);
  }, []);

  const getBallColor = (num: number) => {
    if (num <= 10) return 'bg-yellow-400 text-yellow-900 border-yellow-500';
    if (num <= 20) return 'bg-blue-500 text-white border-blue-600';
    if (num <= 30) return 'bg-red-500 text-white border-red-600';
    if (num <= 40) return 'bg-zinc-500 text-white border-zinc-600';
    return 'bg-emerald-500 text-white border-emerald-600';
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-black/5"
      >
        <div className="text-center mb-10">
          <motion.div
            animate={{ rotate: isGenerating ? 360 : 0 }}
            transition={{ repeat: isGenerating ? Infinity : 0, duration: 1, ease: "linear" }}
            className="inline-block p-3 bg-indigo-50 rounded-2xl mb-4"
          >
            <Sparkles className="w-8 h-8 text-indigo-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight mb-2">
            Lotto Generator
          </h1>
          <p className="text-stone-500 text-sm">
            Click the button to generate your lucky numbers
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-12 h-16 items-center">
          <AnimatePresence mode="popLayout">
            {numbers.length > 0 ? (
              numbers.map((num, idx) => (
                <motion.div
                  key={`${num}-${idx}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    delay: idx * 0.1 
                  }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold border-2 shadow-md ${getBallColor(num)}`}
                >
                  {num}
                </motion.div>
              ))
            ) : (
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-stone-100 border-2 border-dashed border-stone-200" />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateNumbers}
          disabled={isGenerating}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-indigo-200 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Generate Numbers'}
        </motion.button>

        {numbers.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6 text-stone-400 text-xs uppercase tracking-widest font-medium"
          >
            Good Luck!
          </motion.p>
        )}
      </motion.div>

      <footer className="mt-8 text-stone-400 text-sm">
        Built with Google AI Studio
      </footer>
    </div>
  );
}

