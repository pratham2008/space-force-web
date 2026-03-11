import { Hero } from '@/components/Hero';
import { TeamGrid } from '@/components/TeamGrid';
import { RatingSystem } from '@/components/RatingSystem';
import { LaunchOverlay } from '@/components/LaunchOverlay';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 selection:text-cyan-100 relative overflow-x-hidden pt-10 pb-32 font-sans">
      <LaunchOverlay />
      <Hero />
      <TeamGrid />
      <RatingSystem />
      
      {/* Ambient center light */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[-1]">
        <div className="w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] bg-cyan-900/5 rounded-full blur-[150px]" />
      </div>

      <footer className="w-full text-center py-10 mt-20 border-t border-white/5 relative z-10">
        <p className="text-cyan-500/40 text-sm font-medium tracking-widest uppercase">
          Spaceforce © 2026. Deploy responsibly.
        </p>
      </footer>
    </main>
  );
}
