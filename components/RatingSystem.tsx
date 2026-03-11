"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import Confetti from 'react-confetti';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { GameButton } from './GameButton';

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
      setMessage("WARNING: 1 STAR DETECTED. RECALCULATING...");
    } else if (nextCount === 2) {
      playSfx('/audio/airhorn.mp3');
      setMessage("CRITICAL ERROR: RATING TOO LOW.");
    } else if (nextCount === 3) {
      setIsDodging(true);
      setMessage("EVASIVE MANEUVERS ENGAGED.");
    } else if (nextCount === 4) {
      setIsDodging(false);
      playSfx('/audio/sad-violin.mp3');
      setMessage("SYSTEM OVERRIDE FAILED. PLEASE HAVE MERCY.");
    } else if (nextCount >= 5) {
      playSfx('/audio/swoosh.mp3');
      setMessage("RECORDED. WE WILL REMEMBER THIS.");
      setTrollCount(0); 
    }
  };

  const handle5StarSubmit = () => {
    playSfx('/audio/airhorn.mp3');
    setShowConfetti(true);
    setMessage("ACQUIRED: ABSOLUTE CINEMA 🎬");
  };

  const handleSubmit = () => {
    if (rating === 1) {
      handle1StarSubmit();
    } else if (rating === 5) {
      handle5StarSubmit();
    } else if (rating > 0) {
      playSfx('/audio/click.mp3');
      setMessage("RATING ACCEPTED.");
    }
  };

  const handleDodge = () => {
    if (!isDodging) return;
    setDodgeOffset({
      x: (Math.random() - 0.5) * 250,
      y: (Math.random() - 0.5) * 200
    });
  };

  return (
    <section className="py-24 px-4 w-full flex flex-col items-center justify-center relative z-30">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <Confetti 
            width={dimensions.width || 1000} 
            height={dimensions.height || 1000} 
            recycle={false} 
            numberOfPieces={600}
            colors={['#22d3ee', '#0ea5e9', '#ef4444', '#ffffff']}
          />
        </div>
      )}
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-[#020617] border-[3px] border-cyan-500 p-8 md:p-12 max-w-lg w-full text-center shadow-[0_0_30px_rgba(34,211,238,0.3),inset_0_0_20px_rgba(34,211,238,0.1)] relative overflow-hidden"
        style={{ borderRadius: '2rem' }} // Arcade rounded container wrapper
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-300 rounded-tl-[1.8rem]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-300 rounded-tr-[1.8rem]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-300 rounded-bl-[1.8rem]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-300 rounded-br-[1.8rem]" />
        
        {/* Scanlines layer */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMzQsMjExLDIzOCwwLjE1KSIvPjwvc3ZnPg==')] pointer-events-none opacity-50 mix-blend-screen" />

        <h3 className="relative text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
          MISSION RATING
        </h3>
        
        <div className="relative flex justify-center gap-2 mb-10">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleStarClick(star)}
              className="focus:outline-none p-2 rounded-full hover:bg-cyan-900/40 transition-colors"
            >
              <Star 
                size={40} 
                strokeWidth={2.5}
                className={`transition-all duration-300 ${rating >= star ? 'fill-cyan-400 text-cyan-400' : 'text-slate-600'}`}
                style={{ filter: rating >= star ? 'drop-shadow(0 0 12px rgba(34,211,238,0.9))' : 'none' }}
              />
            </motion.button>
          ))}
        </div>

        <div className="relative h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                key={message}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-900/20 border border-red-500/50 px-4 py-3 rounded uppercase tracking-widest text-red-400 font-bold text-sm md:text-base w-full shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                style={{
                  color: rating === 5 ? '#34d399' : rating === 1 ? '#ef4444' : '#60a5fa',
                  borderColor: rating === 5 ? 'rgba(52,211,153,0.5)' : rating === 1 ? 'rgba(239,68,68,0.5)' : 'rgba(96,165,250,0.5)',
                  backgroundColor: rating === 5 ? 'rgba(52,211,153,0.1)' : rating === 1 ? 'rgba(239,68,68,0.1)' : 'rgba(96,165,250,0.1)'
                }}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          animate={isDodging ? { x: dodgeOffset.x, y: dodgeOffset.y } : { x: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="relative mt-4 inline-block w-full"
        >
          <div onPointerEnter={handleDodge}>
            <GameButton 
              onClick={isDodging ? handleDodge : handleSubmit}
              disabled={rating === 0}
              className="w-full text-sm md:text-base py-4"
              variant="primary"
            >
              TRANSMIT LOG
            </GameButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
