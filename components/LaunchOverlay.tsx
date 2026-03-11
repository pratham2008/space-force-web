"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useAudioEngine } from '@/hooks/useAudioEngine';

export function LaunchOverlay() {
  const { isUnlocked, unlockAudio } = useAudioEngine();

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]/90 backdrop-blur-xl"
          onClick={unlockAudio}
        >
          <motion.div
            animate={{ 
              textShadow: ["0 0 10px #22d3ee", "0 0 20px #22d3ee", "0 0 10px #22d3ee"],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-widest text-center cursor-pointer select-none px-4"
          >
            [ INITIALIZE SPACEFORCE ]
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="text-cyan-500/60 mt-8 text-sm md:text-base font-medium tracking-widest uppercase"
          >
            Tap anywhere to deploy
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
