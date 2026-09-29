import React from 'react';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { NexusLogo } from './NexusLogo';

interface FinalCTAProps {
  onExploreArchitecture: () => void;
  onDiscoverTechnology: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onExploreArchitecture,
  onDiscoverTechnology,
}) => {
  return (
    <section className="py-28 relative overflow-hidden text-center cyber-grid">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-cyan-500/15 via-blue-600/15 to-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Top Mini Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>AUTONOMOUS URBAN OPERATING SYSTEM</span>
        </div>

        {/* Large Headline */}
        <div className="space-y-2">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 leading-[1.08] uppercase">
            BUILD THE CITY.
          </h2>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent leading-[1.08] uppercase">
            BUILD THE FUTURE.
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Cloud-native intelligence for a more adaptive, connected and sustainable world.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreArchitecture}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_auto] hover:bg-right text-slate-950 font-bold text-sm uppercase tracking-wider font-mono shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Layers className="w-4 h-4 text-slate-950" />
            <span>Explore the Architecture</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onDiscoverTechnology}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-700 hover:border-cyan-400 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold text-sm tracking-wide transition-all hover:bg-slate-800/80"
          >
            <span>Discover the Technology</span>
          </button>
        </div>

        {/* Prominent Logo Placement beneath CTA */}
        <div className="pt-10 flex flex-col items-center justify-center">
          <NexusLogo size={68} showText={true} subtitle={true} />
        </div>
      </div>
    </section>
  );
};
