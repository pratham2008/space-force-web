"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { useAudioEngine } from '@/hooks/useAudioEngine';

const TAUNT_LINES = [
  "no one has guts to rate 1 star 😏",
  "i bet you can't give 1 star 😏",
  "5 stars or we hack your phone 🔓",
  "choose wisely… or don't 💀",
  "we accept only 5 stars. policy.",
  "tap a star. we dare you. 👀",
];

export function RatingSystem() {
  const [rating, setRating] = useState(0);
  const [trollCount, setTrollCount] = useState(0);
  const [message, setMessage] = useState("");
  const [subMessage, setSubMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDodging, setIsDodging] = useState(false);
  const [dodgeOffset, setDodgeOffset] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const { playSfx } = useAudioEngine();

  const taunt = useMemo(() => TAUNT_LINES[Math.floor(Math.random() * TAUNT_LINES.length)], []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  const handleStarClick = (value: number) => {
    playSfx('/audio/click.mp3');
    setRating(value);
    setMessage("");
    setSubMessage("");
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
      setSubMessage("click again");
    } else if (nextCount === 2) {
      playSfx('/audio/airhorn.mp3');
      setMessage("North Korea will fire nuke 🚀. Give 5 stars.");
      setSubMessage("click again");
    } else if (nextCount === 3) {
      setIsDodging(true);
      setMessage("Bro stop trying 💀");
      setSubMessage("click again");
    } else if (nextCount === 4) {
      setIsDodging(false);
      playSfx('/audio/sad-violin.mp3');
      setMessage("Pls bro… we worked so hard.");
      setSubMessage("click again");
    } else if (nextCount >= 5) {
      playSfx('/audio/swoosh.mp3');
      setMessage("Review submitted... we will remember this.");
      setSubMessage("");
      setTrollCount(0);
    }
  };

  const handle5StarSubmit = () => {
    playSfx('/audio/airhorn.mp3');
    setShowConfetti(true);
    setMessage("ABSOLUTE CINEMA 🎬");
    setSubMessage("");
  };

  const handleSubmit = () => {
    if (rating === 1) {
      handle1StarSubmit();
    } else if (rating === 5) {
      handle5StarSubmit();
    } else if (rating > 0) {
      playSfx('/audio/click.mp3');
      setMessage("Mid. But we'll take it.");
      setSubMessage("");
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
      
      <div className="relative backdrop-blur-2xl bg-gradient-to-br from-[#0f172a]/95 to-[#020617]/95 border border-cyan-500/20 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full text-center shadow-[inset_0_0_80px_rgba(34,211,238,0.03),0_0_50px_rgba(34,211,238,0.15)] overflow-visible">
        
        {/* Floating Badge */}
        <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-cyan-500 text-[#020617] font-black uppercase tracking-widest text-xs md:text-sm px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] whitespace-nowrap z-10 transform -rotate-3 hover:rotate-0 transition-transform cursor-default">
          BE HONEST 💀
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Title with sparkle icon */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 mt-2 md:mt-4">
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 animate-pulse" />
          <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 uppercase tracking-tighter drop-shadow-[0_2px_10px_rgba(34,211,238,0.3)]">
            Rate the Game
          </h3>
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 animate-pulse" />
        </div>

        {/* Pre-rating taunt line */}
        <AnimatePresence mode="wait">
          {rating === 0 && !message && (
            <motion.p
              key="taunt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-cyan-400/60 text-sm md:text-base italic mb-6 md:mb-8 font-medium tracking-wide max-w-[250px] mx-auto"
            >
              {taunt}
            </motion.p>
          )}
          {(rating > 0 || message) && (
            <motion.div
              key="spacer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6 md:mb-8"
            />
          )}
        </AnimatePresence>
        
        {/* Stars */}
        <div className="flex justify-center gap-2 md:gap-4 mb-10 w-full flex-wrap">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.3, rotate: 15 }}
              whileTap={{ scale: 0.8, rotate: -15 }}
              onClick={() => handleStarClick(star)}
              className="focus:outline-none relative p-1 md:p-2"
            >
              <Star 
                size={40} 
                strokeWidth={rating >= star ? 0 : 2}
                className={`transition-colors duration-300 md:w-12 md:h-12 w-10 h-10 ${rating >= star ? 'fill-cyan-400 text-cyan-400' : 'text-white/20 hover:text-white/40'}`}
                style={{ filter: rating >= star ? 'drop-shadow(0 0 15px rgba(34,211,238,0.8))' : 'none' }}
              />
              {/* Glow dot under active star */}
              {rating >= star && (
                <motion.div
                  layoutId={`glow-${star}`}
                  className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Message Area */}
        <div className="min-h-[80px] flex flex-col items-center justify-center w-full px-2">
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                key={message}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="flex flex-col items-center w-full"
              >
                <p className="text-cyan-300 font-black text-xl md:text-2xl break-words w-full px-1">
                  {message}
                </p>
                {subMessage && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-fuchsia-400 text-xs md:text-sm font-bold mt-3 uppercase tracking-[0.2em] bg-fuchsia-900/20 px-4 py-1.5 rounded-full border border-fuchsia-500/30"
                  >
                    ↓ {subMessage} ↓
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <motion.div 
          animate={isDodging ? { x: dodgeOffset.x, y: dodgeOffset.y } : { x: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="mt-8 inline-block w-full max-w-[250px] relative z-20"
        >
          <button
            onPointerEnter={handleDodge}
            onClick={isDodging ? handleDodge : handleSubmit}
            disabled={rating === 0}
            className={`
              w-full px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-lg md:text-xl transition-all relative
              ${rating === 0 
                ? 'bg-slate-800/40 text-white/20 cursor-not-allowed border-2 border-white/5 shadow-none' 
                : 'bg-cyan-500 text-[#020617] shadow-[0_0_30px_rgba(34,211,238,0.4)] border-b-[6px] border-r-[2px] border-cyan-700 hover:bg-cyan-400 hover:border-cyan-600 active:border-b-0 active:border-r-0 active:translate-y-[6px] active:translate-x-[2px] active:shadow-[0_0_10px_rgba(34,211,238,0.6)]'
              }
            `}
          >
            Submit
          </button>
        </motion.div>
      </div>
    </section>
  );
}
