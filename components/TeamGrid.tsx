"use client";

import { TEAM } from '@/data/team';
import { PilotCard } from './PilotCard';
import { motion, LayoutGroup } from 'framer-motion';

export function TeamGrid() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto w-full relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Squad</span>
        </h2>
        <p className="text-cyan-500/80 uppercase tracking-widest text-sm md:text-lg font-bold">Meet the legends.</p>
      </motion.div>

      <LayoutGroup>
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {TEAM.map((pilot) => (
            <PilotCard key={pilot.id} pilot={pilot} />
          ))}
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
