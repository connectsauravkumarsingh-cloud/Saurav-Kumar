import React from 'react';
import { PageId } from '../types';
import { InteractiveSmartCity } from '../components/InteractiveSmartCity';
import { UndergroundSection } from '../components/UndergroundSection';
import { ModularArchitecture } from '../components/ModularArchitecture';
import {
  Layers,
  ArrowLeft,
  Activity,
  ArrowRight,
  Boxes,
  Zap,
  Globe2,
} from 'lucide-react';

interface InfrastructurePageProps {
  onNavigate: (page: PageId) => void;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#050914] text-slate-100">
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
            <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-400" />
              Autonomous Infrastructure &amp; Digital Twin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300 text-xs font-mono flex items-center gap-2">
              <Boxes className="w-3.5 h-3.5 text-blue-400" />
              <span>ACTIVE HARDWARE NODES: 142M</span>
            </div>
            <button
              onClick={() => onNavigate('command-center')}
              className="px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono hover:bg-purple-900/60 transition-colors flex items-center gap-1.5"
            >
              <span>Command Center Cockpit →</span>
            </button>
          </div>
        </div>

        {/* Hero Context Card */}
        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-[#060c1d] border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-blue-500/30 bg-blue-950/60 text-blue-300 text-[11px] font-mono">
              <span>METROPOLITAN DIGITAL TWIN &amp; MORPHING ARCHITECTURE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight uppercase">
              Autonomous Physical Infrastructure
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              High-fidelity digital twin telemetry across skyway transit gliders, kinetic adaptable towers, and the multi-layer subterranean utility spine beneath the surface.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800">
              <div className="text-slate-400 text-[10px]">SUB-SURFACE TRANSIT</div>
              <div className="text-blue-300 text-base font-extrabold">100% PNEUMATIC</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800">
              <div className="text-slate-400 text-[10px]">RECONFIGURATION</div>
              <div className="text-emerald-400 text-base font-extrabold">8 - 18 MIN</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Interactive Smart City Digital Twin (Visual Centerpiece & Hotspots) */}
      <InteractiveSmartCity />

      {/* 2. Underground Intelligence: The City Beneath the City */}
      <UndergroundSection />

      {/* 3. Modular Adaptive Architecture: Buildings That Adapt */}
      <ModularArchitecture />

      {/* Page Next Steps CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="p-8 rounded-3xl border border-slate-800 bg-[#060c1d] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-lg font-bold text-slate-100">
              Need real-time operational sparklines and system balancing?
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Enter the AI Command Center to monitor live grid frequency, water velocity, and optimization controls.
            </p>
          </div>
          <button
            onClick={() => onNavigate('command-center')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-950/50 hover:opacity-95 transition-all"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
