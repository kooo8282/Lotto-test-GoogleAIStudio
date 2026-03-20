import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Sparkles, Moon, Sun } from 'lucide-react';

export default function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const generateNumbers = useCallback(() => {
    setIsGenerating(true);
    setNumbers([]); // Clear immediately to show placeholders
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans transition-colors duration-300 bg-stone-50 dark:bg-stone-950">
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 transition-colors"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-xl p-8 border border-black/5 dark:border-white/10 transition-colors"
      >
        <div className="text-center mb-10">
          <motion.div
            animate={{ rotate: isGenerating ? 360 : 0 }}
            transition={{ repeat: isGenerating ? Infinity : 0, duration: 1, ease: "linear" }}
            className="inline-block p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl mb-4"
          >
            <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight mb-2">
            Lotto Generator
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            Click the button to generate your lucky numbers
          </p>
        </div>

        <div className="flex justify-center items-center mb-8 h-[60px] sm:h-[70px]">
          <AnimatePresence mode="wait">
            {numbers.length > 0 ? (
              <motion.div 
                key="balls"
                className="flex gap-2 sm:gap-3"
              >
                {numbers.map((num, idx) => (
                  <motion.div
                    key={`ball-${num}`}
                    initial={{ scale: 0, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      delay: idx * 0.08 
                    }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold border-2 shadow-md ${getBallColor(num)}`}
                  >
                    {num}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="placeholders"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2 sm:gap-3"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={`placeholder-${i}`} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-stone-100 dark:bg-stone-800/50 border-2 border-dashed border-stone-200 dark:border-stone-700" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateNumbers}
          disabled={isGenerating}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Generate Numbers'}
        </motion.button>

        <div className="h-6 mt-6">
          <AnimatePresence>
            {numbers.length > 0 && !isGenerating && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-center text-stone-400 dark:text-stone-500 text-xs uppercase tracking-widest font-medium"
              >
                Good Luck!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <footer className="mt-8 text-stone-400 dark:text-stone-600 text-sm">
        Built with Google AI Studio
      </footer>
    </div>
  );
}
