"use client";

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import { useAudioEngine } from '@/hooks/useAudioEngine';

interface MagneticButtonProps {
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ className, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { playSfx } = useAudioEngine();

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const x = (clientX - centerX) * 0.2;
    const y = (clientY - centerY) * 0.2;
    setPosition({ x, y });
  };

  const handlePointerLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    playSfx('/audio/click.mp3');
    if (onClick) onClick();
  };

  return (
    <motion.button
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold tracking-wide text-white transition-colors cursor-pointer",
        "bg-[#020617] shadow-[0_0_20px_rgba(34,211,238,0.5)]",
        "hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] border border-cyan-400/50",
        "overflow-hidden group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <Download className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      <span className="text-cyan-400 group-hover:text-white transition-colors z-10 text-lg uppercase tracking-wider">
        Download APK
      </span>
    </motion.button>
  );
}
