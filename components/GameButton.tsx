"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAudioEngine } from '@/hooks/useAudioEngine';

interface GameButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function GameButton({ children, className, onClick, variant = 'primary', disabled }: GameButtonProps) {
  const { playSfx } = useAudioEngine();

  const handleClick = () => {
    if (disabled) return;
    playSfx('/audio/click.mp3');
    if (onClick) onClick();
  };

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      className={cn(
        "relative flex items-center justify-center rounded-2xl px-10 py-5 font-black uppercase tracking-widest transition-all",
        "border-2 overflow-hidden shadow-lg",
        isPrimary 
          ? "border-cyan-400 bg-[#020617] text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]"
          : "border-emerald-400 bg-[#020617] text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)] hover:shadow-[0_0_40px_rgba(52,211,153,0.8)]",
        disabled && "opacity-50 cursor-not-allowed border-gray-600 text-gray-400 shadow-none hover:shadow-none",
        className
      )}
    >
      {/* Inner Gradient */}
      <div 
        className={cn(
          "absolute inset-0 opacity-20 hover:opacity-40 transition-opacity z-0 pointer-events-none",
          isPrimary ? "bg-gradient-to-b from-cyan-400 to-transparent" : "bg-gradient-to-b from-emerald-400 to-transparent"
        )} 
      />
      
      {/* Inner Glow/Shadow at bottom */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t to-transparent opacity-50 pointer-events-none z-0",
          isPrimary ? "from-cyan-400" : "from-emerald-400"
        )} 
      />
      
      <span className="relative z-10 drop-shadow-md text-lg sm:text-xl">
        {children}
      </span>
    </motion.button>
  );
}
