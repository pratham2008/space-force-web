"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import Confetti from 'react-confetti';
import { useAudioEngine } from '@/hooks/useAudioEngine';

export function RatingSystem() {
  const [rating, setRating] = useState(0);
  const [trollCount, setTrollCount] = useState(0);
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDodging, setIsDodging] = useState(false);
  const [dodgeOffset, setDodgeOffset] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const { playSfx } = useAudioEngine();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  const handleStarClick = (value: number) => {
    playSfx('/audio/click.mp3');
    setRating(value);
    setMessage("");
    setShowConfetti(false);
    
    // Reset troll state if changing rating
    if (value !== 1) {
      setTrollCount(0);
      setIsDodging(false);
    }
  };

  const handle1StarSubmit = () => {
    const nextCount = trollCount + 1;
    setTrollCount(nextCount);
    
    if (nextCount === 1) {
      playSfx('/audio/womp.mp3');
      setMessage("🥺 1 star is cursed. Think again.");
    } else if (nextCount === 2) {
      playSfx('/audio/airhorn.mp3');
      setMessage("North Korea will fire nuke 🚀. Give 5 stars.");
    } else if (nextCount === 3) {
      setIsDodging(true);
      setMessage("Bro stop trying 💀");
    } else if (nextCount === 4) {
      setIsDodging(false);
      playSfx('/audio/sad-violin.mp3');
      setMessage("Pls bro… we worked so hard.");
    } else if (nextCount >= 5) {
      playSfx('/audio/swoosh.mp3');
      setMessage("Review submitted... we will remember this.");
      setTrollCount(0); // Allow reset
    }
  };

  const handle5StarSubmit = () => {
    playSfx('/audio/airhorn.mp3');
    setShowConfetti(true);
    setMessage("ABSOLUTE CINEMA 🎬");
  };

  const handleSubmit = () => {
    if (rating === 1) {
      handle1StarSubmit();
    } else if (rating === 5) {
      handle5StarSubmit();
    } else if (rating > 0) {
      playSfx('/audio/click.mp3');
      setMessage("Mid. But we'll take it.");
    }
  };

  const handleDodge = () => {
    if (!isDodging) return;
    setDodgeOffset({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200
    });
  };

  return (
    <section className="py-24 px-4 w-full flex flex-col items-center justify-center relative z-20">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti 
            width={dimensions.width || 1000} 
            height={dimensions.height || 1000} 
            recycle={false} 
            numberOfPieces={500} 
          />
        </div>
      )}
      
      <div className="backdrop-blur-xl bg-white/5 border border-cyan-500/30 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full text-center shadow-[0_0_50px_rgba(34,211,238,0.15)] relative">
        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-8">
          Rate the Game
        </h3>
        
        <div className="flex justify-center gap-3 mb-10">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleStarClick(star)}
              className="focus:outline-none"
            >
              <Star 
                size={48} 
                className={`transition-colors duration-300 ${rating >= star ? 'fill-cyan-400 text-cyan-400' : 'text-white/20'}`}
                style={{ filter: rating >= star ? 'drop-shadow(0 0 15px rgba(34,211,238,0.8))' : 'none' }}
              />
            </motion.button>
          ))}
        </div>

        <div className="h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {message && (
              <motion.p
                key={message}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-cyan-300 font-bold text-xl md:text-2xl px-4"
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          animate={isDodging ? { x: dodgeOffset.x, y: dodgeOffset.y } : { x: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="mt-6 inline-block"
        >
          <button
            onPointerEnter={handleDodge}
            onClick={isDodging ? handleDodge : handleSubmit}
            disabled={rating === 0}
            className={`
              px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all text-lg
              ${rating === 0 
                ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10' 
                : 'bg-cyan-500 hover:bg-cyan-400 text-[#020617] shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]'
              }
            `}
          >
            Submit Review
          </button>
        </motion.div>
      </div>
    </section>
  );
}
