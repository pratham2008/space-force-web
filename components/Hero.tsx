"use client";

import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

export function Hero() {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#020617]" />
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-500/30"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.top}%`,
              left: `${p.left}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-10 w-full"
        >
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }} 
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-bold tracking-widest uppercase"
          >
            V 2.0.4 Online
          </motion.div>
          <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
            <span className="text-white">Space</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 block mt-[-2%] pb-4">
              force
            </span>
          </h1>
          <p className="mt-8 text-xl sm:text-2xl text-cyan-100/60 font-medium tracking-wide max-w-2xl mx-auto px-4">
            Defy Gravity. Break the rules. The most unhinged space shooter on Android.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mt-4"
        >
          <MagneticButton />
        </motion.div>
      </div>

      {/* Decorative gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
