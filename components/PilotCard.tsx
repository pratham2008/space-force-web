"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pilot } from '@/data/team';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { Github, Twitter, Linkedin, InstagramIcon, Instagram } from 'lucide-react';

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
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleToggle}
      className={`relative rounded-3xl cursor-pointer overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 p-6 flex flex-col items-center justify-center transition-colors ${
        isOpen ? "shadow-[0_0_50px_rgba(34,211,238,0.4)] border-cyan-400/50 bg-[#020617]/80" : "hover:bg-white/10"
      }`}
      style={{
        gridColumn: isOpen ? "1 / -1" : "auto",
        minHeight: isOpen ? "320px" : "220px",
        zIndex: isOpen ? 50 : 10,
      }}
    >
      <motion.img
        layoutId={`avatar-${pilot.id}`}
        src={pilot.avatarUrl}
        alt={pilot.name}
        className={`rounded-full object-cover border-2 border-cyan-400/50 shadow-lg ${isOpen ? 'w-24 h-24 mb-4' : 'w-20 h-20 mb-3'}`}
      />
      <motion.h3 layoutId={`name-${pilot.id}`} className="text-xl font-black tracking-tight text-white text-center">
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
            <p className="text-cyan-100/80 text-center text-sm md:text-base px-2 mb-6 leading-relaxed max-w-sm">
              {pilot.bio}
            </p>
            {pilot.socials && pilot.socials.length > 0 && (
              <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                {pilot.socials.map((social) => {
                  const Icon = social.platform === 'github' ? Github : social.platform === 'linkedin' ? Linkedin : social.platform === 'instagram' ? Instagram : Twitter;
                  return (
                    <motion.a 
                      key={social.platform}
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/5 hover:bg-cyan-500/20 text-cyan-400 transition-colors border border-white/10 hover:border-cyan-400/50"
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative neon glow behind avatar */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl -z-10 pointer-events-none" 
        />
      )}
    </motion.div>
  );
}
