import { Hero } from '@/components/Hero';
import { TeamGrid } from '@/components/TeamGrid';
import { RatingSystem } from '@/components/RatingSystem';
import { LaunchOverlay } from '@/components/LaunchOverlay';
import { StarfieldBackground } from '@/components/StarfieldBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100 flex flex-col pt-10 pb-32">
      <StarfieldBackground />
      <LaunchOverlay />
      
      {/* Screens */}
      <div className="z-10 flex flex-col w-full h-full relative space-y-32">
        <Hero />
        
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-900/5 blur-[100px] rounded-full pointer-events-none" />
          <RatingSystem />
        </div>
        
        <div className="relative">
          <TeamGrid />
        </div>
      </div>

      <footer className="w-full text-center py-10 mt-32 border-t border-white/5 relative z-10">
        <p className="text-cyan-500/40 text-sm font-medium tracking-widest uppercase">
          Spaceforce © 2026. Take step into space fight.</p>
      </footer>
    </main>
  );
}
