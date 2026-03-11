export class AudioManager {
  private static instance: AudioManager;
  
  private contextUnlocked = false;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private currentBgm: HTMLAudioElement | null = null;
  private fadeIntervals: Map<string, NodeJS.Timeout> = new Map();
  
  private readonly GLOBAL_BGM_VOLUME = 0.3;
  private readonly PILOT_BGM_VOLUME = 0.5;
  private readonly SFX_VOLUME = 0.8;

  private constructor() {}

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public init() {
    if (this.contextUnlocked) return;
    this.contextUnlocked = true;
  }

  private getAudio(url: string, loop = false): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;
    if (this.audioCache.has(url)) {
      return this.audioCache.get(url)!;
    }
    const audio = new Audio(url);
    audio.loop = loop;
    this.audioCache.set(url, audio);
    return audio;
  }

  public playSfx(url: string, volume = this.SFX_VOLUME) {
    if (!this.contextUnlocked) return;
    const audio = this.getAudio(url, false);
    if (!audio) return;
    
    // Create a clone to allow overlapping sounds of same SFX
    const clone = audio.cloneNode() as HTMLAudioElement;
    clone.volume = volume;
    clone.play().catch(e => console.error('Audio play failed:', e));
  }

  public playGlobalBgm() {
    if (!this.contextUnlocked) return;
    this.crossfadeTo('/audio/bgm-global.mp3', this.GLOBAL_BGM_VOLUME);
  }

  public playPilotBgm(url: string) {
    if (!this.contextUnlocked) return;
    this.crossfadeTo(url, this.PILOT_BGM_VOLUME);
  }

  private crossfadeTo(newUrl: string, targetVolume: number) {
    if (typeof window === 'undefined') return;
    const newAudio = this.getAudio(newUrl, true);
    if (!newAudio) return;

    if (this.currentBgm === newAudio) {
      this.fadeVolume(newAudio, targetVolume);
      return;
    }

    if (this.currentBgm) {
      const oldBgm = this.currentBgm;
      this.fadeVolume(oldBgm, 0, () => {
        oldBgm.pause();
      });
    }

    newAudio.volume = 0;
    newAudio.play().catch(e => console.error('BGM play failed:', e));
    this.fadeVolume(newAudio, targetVolume);
    this.currentBgm = newAudio;
  }

  private fadeVolume(audio: HTMLAudioElement, target: number, onComplete?: () => void) {
    const url = audio.src;
    if (this.fadeIntervals.has(url)) {
      clearInterval(this.fadeIntervals.get(url)!);
    }

    const step = 0.05;
    const interval = setInterval(() => {
      // Ensure volume is between 0 and 1
      const currentVol = Math.max(0, Math.min(1, audio.volume));
      const safeTarget = Math.max(0, Math.min(1, target));

      if (Math.abs(currentVol - safeTarget) <= step) {
        audio.volume = safeTarget;
        clearInterval(interval);
        this.fadeIntervals.delete(url);
        if (onComplete) onComplete();
      } else {
        audio.volume = currentVol < safeTarget 
          ? Math.min(1, currentVol + step)
          : Math.max(0, currentVol - step);
      }
    }, 50);

    this.fadeIntervals.set(url, interval);
  }
}

export const audioManager = (typeof window !== 'undefined') ? AudioManager.getInstance() : null;
