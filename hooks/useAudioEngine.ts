"use client";

import { useState, useCallback } from 'react';
import { audioManager } from '@/lib/audioManager';

export function useAudioEngine() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const unlockAudio = useCallback(() => {
    if (audioManager && !isUnlocked) {
      audioManager.init();
      // Play startup sound
      audioManager.playSfx('/audio/swoosh.mp3', 1.0);
      // Start global BGM
      audioManager.playGlobalBgm();
      setIsUnlocked(true);
    }
  }, [isUnlocked]);

  const playSfx = useCallback((url: string, volume?: number) => {
    audioManager?.playSfx(url, volume);
  }, []);

  const playPilotBgm = useCallback((url: string) => {
    audioManager?.playPilotBgm(url);
  }, []);

  const playGlobalBgm = useCallback(() => {
    audioManager?.playGlobalBgm();
  }, []);

  return {
    isUnlocked,
    unlockAudio,
    playSfx,
    playPilotBgm,
    playGlobalBgm,
  };
}
