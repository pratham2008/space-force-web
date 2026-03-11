"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameButton } from './GameButton';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { ArrowLeft } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  username: string;
  score: string;
}

export function LeaderboardPanel({ onClose }: { onClose: () => void }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { playSfx } = useAudioEngine();

  useEffect(() => {
    const q = query(
      collection(db, "leaderboard"),
      orderBy("score", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newEntries: LeaderboardEntry[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const safeScore = Number(data.score) || 0;
        newEntries.push({
          id: doc.id,
          username: data.username || "UNKNOWN",
          score: safeScore.toString().padStart(6, "0"),
        });
      });
      setEntries(newEntries);
      setLoading(false);
    }, (error) => {
      console.error("Leaderboard unsubscription error: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleClose = () => {
    playSfx('/audio/click.mp3');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-start bg-[#020617]/95 backdrop-blur-xl px-4 py-8 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMzQsMjExLDIzOCwwLjEpIi8+PC9zdmc+')] mix-blend-screen opacity-50" />

      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8 relative z-10 shrink-0">
        <button 
          onClick={handleClose}
          className="p-3 bg-cyan-900/40 border-2 border-cyan-500/50 rounded-xl text-cyan-400 hover:bg-cyan-500 hover:text-[#020617] transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          <ArrowLeft size={28} strokeWidth={3} />
        </button>
        <h2 className="text-3xl md:text-5xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          LEADERBOARD
        </h2>
        <div className="w-14" /> {/* Spacer for centering */}
      </div>

      {/* List Container */}
      <div className="flex-1 w-full max-w-2xl border-2 border-cyan-500/30 rounded-3xl bg-[#020617]/80 overflow-y-auto overflow-x-hidden p-4 md:p-6 mb-8 relative z-10 shadow-[inset_0_0_30px_rgba(34,211,238,0.1)] custom-scrollbar">
        <AnimatePresence>
          {loading ? (
            // Skeleton Loader
            Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 mb-3 rounded-xl border border-cyan-500/20 bg-cyan-900/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-cyan-500/20 animate-pulse" />
                  <div className="w-32 h-6 rounded bg-cyan-500/20 animate-pulse" />
                </div>
                <div className="w-24 h-6 rounded bg-cyan-500/20 animate-pulse" />
              </motion.div>
            ))
          ) : entries.length === 0 ? (
            <div className="h-full flex items-center justify-center flex-col text-cyan-500/50 uppercase tracking-widest font-bold">
              <span className="text-4xl mb-4">📡</span>
              No signals received.
            </div>
          ) : (
            // Actual Data
            entries.map((entry, index) => {
              const rank = index + 1;
              let styleClasses = "border-cyan-500/20 bg-slate-900/50 text-cyan-100 hover:bg-cyan-900/30 hover:border-cyan-500/40";
              let rankClasses = "text-cyan-500/50";
              
              if (rank === 1) {
                styleClasses = "border-yellow-400 bg-yellow-900/30 text-yellow-100 shadow-[0_0_20px_rgba(250,204,21,0.3),inset_0_0_15px_rgba(250,204,21,0.2)]";
                rankClasses = "text-yellow-400 font-black drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]";
              } else if (rank === 2) {
                styleClasses = "border-cyan-400 bg-cyan-900/40 text-cyan-50 shadow-[0_0_15px_rgba(34,211,238,0.3),inset_0_0_10px_rgba(34,211,238,0.2)]";
                rankClasses = "text-cyan-400 font-black drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]";
              } else if (rank === 3) {
                styleClasses = "border-amber-600 bg-amber-900/30 text-amber-100 shadow-[0_0_10px_rgba(217,119,6,0.2)]";
                rankClasses = "text-amber-500 font-black drop-shadow-[0_0_5px_rgba(217,119,6,0.8)]";
              }

              return (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.05 }}
                  key={entry.id}
                  className={`flex items-center justify-between p-4 md:p-5 mb-3 rounded-xl border-2 transition-colors ${styleClasses}`}
                >
                  <div className="flex items-center gap-4 border-r border-white/10 pr-4 md:pr-6 shrink-0 md:w-20">
                    <span className={`text-xl md:text-2xl font-black ${rankClasses}`}>
                      #{rank}
                    </span>
                  </div>
                  
                  <div className="flex-1 px-4 truncate font-bold text-lg md:text-xl uppercase tracking-wider text-left">
                    {entry.username}
                  </div>
                  
                  <div className="shrink-0 text-xl md:text-2xl font-black tracking-widest bg-[#020617]/50 px-3 py-1 rounded-md border border-white/5">
                    {entry.score}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 relative z-10 shrink-0">
        <GameButton 
          variant="secondary" 
          onClick={handleClose}
          className="w-full"
        >
          MAIN MENU
        </GameButton>
        <GameButton 
          variant="primary" 
          className="w-full"
          onClick={() => {
            playSfx('/audio/click.mp3');
            alert("This connects to the game engine in the full App!");
          }}
        >
          PLAY AGAIN
        </GameButton>
      </div>

    </motion.div>
  );
}
