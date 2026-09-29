import React from 'react';
import { PageId } from '../types';
import { DisasterIntelligenceSection } from '../components/disaster/DisasterIntelligenceSection';
import { OFFICIAL_EMERGENCY_CONTACTS } from '../data/disasterData';
import {
  ShieldAlert,
  Radio,
  PhoneCall,
  Clock,
  ArrowLeft,
  Activity,
  HeartPulse,
  Flame,
  CheckCircle2,
  Info,
  BellRing,
} from 'lucide-react';

interface DisasterPageProps {
  onNavigate: (page: PageId) => void;
  onOpenNotifications?: () => void;
}

export const DisasterPage: React.FC<DisasterPageProps> = ({
  onNavigate,
  onOpenNotifications,
}) => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#040814] text-slate-100">
      {/* Top Breadcrumb & Page Command Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
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
            <span className="text-xs font-mono text-red-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              Disaster Early Warning Control Room
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenNotifications && (
              <button
                onClick={onOpenNotifications}
                className="px-3 py-1.5 rounded-xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs font-mono hover:bg-red-900/60 transition-colors flex items-center gap-1.5 shadow-sm shadow-red-950/40"
              >
                <BellRing className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>Open Notification Centre</span>
              </button>
            )}
            <div className="px-3 py-1 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>14,200 SENSORS</span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-mono hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>P99: 4.2s</span>
            </div>
          </div>
        </div>

        {/* Live Threat Bar Summary */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900/60 to-slate-950 border border-red-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-red-950 border border-red-500/50 text-red-400 mt-0.5 md:mt-0">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                Autonomous Disaster Protocol Active
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-normal mt-0.5">
                Multi-hazard intelligence monitoring 7 distinct hazard domains across 4 metropolitan sectors. Simulation Lab ready for demonstration.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                const el = document.querySelector('#disaster-intelligence');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-red-950/50"
            >
              Interact With Systems
            </button>
          </div>
        </div>
      </div>

      {/* Main Disaster Intelligence System Container */}
      <DisasterIntelligenceSection />

      {/* Dedicated Emergency Helpline & Response Network Footer Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl p-6 sm:p-8 border border-slate-800 bg-[#060c1d] shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-red-400" />
                <span>Verified Official Disaster Helplines &amp; Dispatch Links</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Authoritative emergency contact points synchronized with NEXUS Municipal Services
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>All 5 Emergency Dispatch Lines Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {OFFICIAL_EMERGENCY_CONTACTS.map((contact) => (
              <a
                key={contact.agency}
                href={`tel:${contact.number}`}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group block text-left"
              >
                <div className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                  {contact.role}
                </div>
                <div className="text-xl font-extrabold text-slate-100 group-hover:text-cyan-300 transition-colors my-1">
                  {contact.number}
                </div>
                <div className="text-xs font-bold text-cyan-400 truncate">
                  {contact.agency}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {contact.agencyHindi} · {contact.availableHours}
                </div>
              </a>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400 font-mono">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Scientific Notice:</strong> Earthquake alerts represent real-time seismic P-wave trigger detections from the regional seismograph mesh. NEXUS does not claim probabilistic prediction of earthquake timing.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
