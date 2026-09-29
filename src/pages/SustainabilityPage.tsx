import React from 'react';
import { PageId } from '../types';
import { SustainabilitySection } from '../components/SustainabilitySection';
import {
  Leaf,
  ArrowLeft,
  Sun,
  Droplets,
  Wind,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface SustainabilityPageProps {
  onNavigate: (page: PageId) => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#040814] text-slate-100">
      {/* Page Breadcrumbs & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
            <span className="text-slate-600 font-mono">/</span>
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-400" />
              Net-Positive Urban Ledger &amp; Circular Ecology
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-emerald-400" />
              <span>SOLAR CANOPY: +1.84 GW PEAK</span>
            </div>
            <button
              onClick={() => onNavigate('disaster')}
              className="px-3 py-1 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono hover:bg-red-900/60 transition-colors flex items-center gap-1.5"
            >
              <span>Disaster Early Warning →</span>
            </button>
          </div>
        </div>

        {/* Hero Context Card */}
        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-[#060c1d] border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-300 text-[11px] font-mono">
              <span>DESIGNED TO GIVE MORE THAN IT TAKES</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight uppercase">
              Net-Positive Ecological Architecture
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              NEXUS CITY operates on a carbon-negative ledger, generating 18% surplus clean energy, recovering 94% of municipal wastewater, and eliminating surface diesel exhaust through subterranean maglevs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800">
              <div className="text-slate-400 text-[10px]">CARBON IMPACT</div>
              <div className="text-emerald-400 text-base font-extrabold">-28.4% NET</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800">
              <div className="text-slate-400 text-[10px]">WATER RECOVERY</div>
              <div className="text-cyan-300 text-base font-extrabold">94.2% RECYCLED</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Sustainability Section */}
      <SustainabilitySection />

      {/* Page Next Steps CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="p-8 rounded-3xl border border-slate-800 bg-[#060c1d] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-lg font-bold text-slate-100">
              Return to the high-level NEXUS CITY vision?
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Explore the five core technologies, interactive digital twin preview, and community blueprint.
            </p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/50 hover:opacity-95 transition-all"
          >
            <span>Back to Home Overview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
