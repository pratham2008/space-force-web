"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pilot } from '@/data/team';
import { useAudioEngine } from '@/hooks/useAudioEngine';

export function PilotCard({ pilot }: { pilot: Pilot }) {
  const [isOpen, setIsOpen] = useState(false);
  const { playPilotBgm, playGlobalBgm, playSfx } = useAudioEngine();

  const handleToggle = () => {
    if (!isOpen) {
      playSfx('/audio/swoosh.mp3');
      playPilotBgm(pilot.audioUrl);
      setIsOpen(true);
    } else {
      playSfx('/audio/click.mp3');
      playGlobalBgm();
      setIsOpen(false);
    }
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={handleToggle}
      className={`relative cursor-pointer overflow-hidden p-6 flex flex-col items-center justify-center transition-all duration-300
        ${isOpen 
          ? "bg-[#020617] border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] rounded-2xl" 
          : "bg-[#020617]/50 border-2 border-slate-800 hover:border-cyan-500/50 hover:bg-[#020617]/80 rounded-xl"
        }
      `}
      style={{
        gridColumn: isOpen ? "1 / -1" : "auto",
        minHeight: isOpen ? "340px" : "180px",
        zIndex: isOpen ? 50 : 10,
      }}
      whileTap={!isOpen ? { scale: 0.95 } : undefined}
    >
      <div className={`relative flex flex-col items-center ${isOpen ? 'mb-4' : 'mb-2'}`}>
        {/* Glowing ring behind avatar */}
        <motion.div 
          className={`absolute inset-0 rounded-full border-2 border-cyan-400 bg-cyan-400/20 blur-md ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
          animate={{ scale: isOpen ? [1, 1.1, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        
        <motion.img
          layoutId={`avatar-${pilot.id}`}
          src={pilot.avatarUrl}
          alt={pilot.name}
          className={`relative z-10 rounded-full object-cover border-2 shadow-lg transition-all duration-300
            ${isOpen ? 'w-28 h-28 border-cyan-400' : 'w-20 h-20 border-slate-600'}
          `}
        />
      </div>

      <motion.h3 
        layoutId={`name-${pilot.id}`} 
        className={`font-black tracking-widest text-center uppercase
          ${isOpen ? 'text-2xl text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-lg text-slate-300'}
        `}
      >
        {pilot.name}
      </motion.h3>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center w-full mt-4"
          >
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-4 opacity-50" />
            
            <p className="text-cyan-50 text-center text-sm md:text-base px-4 leading-relaxed max-w-lg font-medium tracking-wide">
              {pilot.bio}
            </p>
            
            <div className="mt-6 flex gap-4 w-full justify-center" onClick={(e) => e.stopPropagation()}>
              <div className="px-6 py-2 border border-cyan-500/50 rounded bg-cyan-900/30 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-colors cursor-pointer">
                SELECT
              </div>
              <div onClick={handleToggle} className="px-6 py-2 border border-slate-600 rounded bg-slate-800/50 text-slate-300 text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors cursor-pointer">
                BACK
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* HUD scanlines decorative overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LD  yNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none mix-blend-overlay" />
    </motion.div>
  );
}
