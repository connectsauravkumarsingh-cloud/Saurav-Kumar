import React from 'react';
import { PageId } from '../types';
import { ArchitectureFlow } from '../components/ArchitectureFlow';
import { ServerlessScalability } from '../components/ServerlessScalability';
import { EventDrivenCity } from '../components/EventDrivenCity';
import {
  Cpu,
  ArrowLeft,
  Server,
  Zap,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface ArchitecturePageProps {
  onNavigate: (page: PageId) => void;
}

export const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onNavigate }) => {
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
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Cloud-Native Intelligence &amp; Data Pipeline
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>AUTO-BALANCED MESH: 680 TFLOPS</span>
            </div>
            <button
              onClick={() => onNavigate('disaster')}
              className="px-3 py-1 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono hover:bg-red-900/60 transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>View Disaster Early Warning →</span>
            </button>
          </div>
        </div>

        {/* Hero Context Card */}
        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-[#060c1d] border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-[11px] font-mono">
              <span>TIER-0 THROUGH TIER-6 HYPER-SCALABLE ARCHITECTURE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight uppercase">
              The Cloud Architecture of NEXUS CITY
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              An asynchronous, event-driven topology connecting hundreds of millions of smart edge devices to generative microservices and subterranean actuators in under 12 milliseconds.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800">
              <div className="text-slate-400 text-[10px]">AVG LATENCY</div>
              <div className="text-cyan-300 text-base font-extrabold">4.2 ms</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800">
              <div className="text-slate-400 text-[10px]">P99 COLD START</div>
              <div className="text-emerald-400 text-base font-extrabold">36 ms</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. 7-Tier Cloud-Native Architecture Flow */}
      <ArchitectureFlow />

      {/* 2. Dynamic Serverless Scalability Workbench */}
      <ServerlessScalability />

      {/* 3. Event-Driven Real-Time Autonomous Workflows */}
      <EventDrivenCity />

      {/* Page Next Steps CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="p-8 rounded-3xl border border-slate-800 bg-[#060c1d] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-lg font-bold text-slate-100">
              Ready to examine the physical actuators and subterranean twin?
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Explore underground utility conduits, maglev tunnels, and kinetic modular buildings.
            </p>
          </div>
          <button
            onClick={() => onNavigate('infrastructure')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-950/50 hover:opacity-95 transition-all"
          >
            <span>Go to Infrastructure &amp; Twin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
