"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameButton } from './GameButton';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { LeaderboardPanel } from './LeaderboardPanel';

export function Hero() {
  const [bestScore, setBestScore] = useState<string | null>(null);
  const [bestUser, setBestUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    async function fetchGlobalBest() {
      try {
        const q = query(
          collection(db, "leaderboard"),
          orderBy("score", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          const safeScore = Number(docData.score) || 0;
          setBestScore(safeScore.toString().padStart(6, "0"));
          setBestUser(docData.username || "UNKNOWN");
        } else {
          setBestScore("000000");
          setBestUser("NO DATA");
        }
      } catch (error) {
        console.error("Error fetching global best:", error);
        setBestScore("ERROR_");
        setBestUser("SYSTEM");
      } finally {
        setLoading(false);
      }
    }

    fetchGlobalBest();
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-10 z-10 overflow-hidden">
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto w-full px-4">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 flex flex-col items-center mt-auto min-h-[120px]"
        >
          <span className="text-cyan-500/80 uppercase tracking-widest text-sm font-bold mb-2">
            GLOBAL BEST SCORE
          </span>
          
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="h-12 w-48 bg-cyan-900/40 rounded-lg animate-pulse mb-2 border border-cyan-500/30" />
                <div className="h-4 w-24 bg-cyan-900/30 rounded animate-pulse" />
              </motion.div>
            ) : (
              <motion.div
                key="score"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl md:text-5xl font-black text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  {bestScore}
                </div>
                <div className="text-cyan-400 mt-1 text-sm md:text-base font-bold tracking-widest uppercase opacity-80">
                  by {bestUser}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
          <GameButton 
            variant="secondary" 
            className="w-full"
            onClick={() => setShowLeaderboard(true)}
          >
            LEADERBOARD
          </GameButton>
        </motion.div>
      </div>

      {/* Leaderboard Overlay yaya*/}
      <AnimatePresence>
        {showLeaderboard && (
          <LeaderboardPanel onClose={() => setShowLeaderboard(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
