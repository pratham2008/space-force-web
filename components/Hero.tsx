"use client";

import { motion } from 'framer-motion';
import { GameButton } from './GameButton';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-10 z-10 overflow-hidden">
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto w-full px-4">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 flex flex-col items-center mt-auto"
        >
          <span className="text-cyan-500/80 uppercase tracking-widest text-sm font-bold mb-2">GLOBAL BEST SCORE</span>
          <span className="text-4xl md:text-5xl font-black text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            1,337,420
          </span>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="mb-20 w-full"
        >
          <h1 className="text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.9] drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
            <span className="text-white">SPACE</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-600 block pt-2">
              FORCE
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex flex-col gap-6 w-full max-w-xs md:max-w-sm mb-auto"
        >
          <GameButton variant="primary" className="w-full">
            PLAY / DOWNLOAD APK
          </GameButton>
          <GameButton variant="secondary" className="w-full">
            LEADERBOARD
          </GameButton>
        </motion.div>
      </div>
    </section>
  );
}
