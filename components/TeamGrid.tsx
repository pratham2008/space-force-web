"use client";

import { TEAM } from '@/data/team';
import { PilotCard } from './PilotCard';
import { motion, LayoutGroup } from 'framer-motion';

export function TeamGrid() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto w-full relative z-20">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          SELECT PILOT
        </h2>
        <div className="h-1 w-32 bg-cyan-500 mx-auto shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
      </motion.div>

      <LayoutGroup>
        <motion.div 
          layout
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          {TEAM.map((pilot) => (
            <PilotCard key={pilot.id} pilot={pilot} />
          ))}
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
