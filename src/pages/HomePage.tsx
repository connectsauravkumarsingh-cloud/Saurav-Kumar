import React from 'react';
import { PageId } from '../types';
import { HeroSection } from '../components/HeroSection';
import { TechStackSection } from '../components/TechStackSection';
import { InteractiveSmartCity } from '../components/InteractiveSmartCity';
import { EcosystemDiagram } from '../components/EcosystemDiagram';
import { FinalCTA } from '../components/FinalCTA';
import {
  ShieldAlert,
  Cpu,
  Layers,
  Activity,
  Leaf,
  ArrowRight,
  Radio,
  Sparkles,
  Zap,
  Globe2,
  BellRing,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenNotifications?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenNotifications,
}) => {
  const portalCards = [
    {
      id: 'disaster' as PageId,
      badge: 'PRIORITY SURVEILLANCE',
      badgeColor: 'border-red-500/50 bg-red-950/60 text-red-300',
      title: 'Disaster Control & Early Warning',
      icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
      description:
        'Multi-hazard early warning platform with real-time hazard cards, tactical evacuation map, simulation lab, and NEXUS RESCUE AI.',
      stats: '14,200 Edge Sensors · 4.2s AI Detection',
      gradient: 'from-red-500/20 via-slate-900/80 to-slate-950',
      borderGlow: 'hover:border-red-500/60 hover:shadow-red-950/50',
      actionLabel: 'Launch Disaster Room',
    },
    {
      id: 'architecture' as PageId,
      badge: 'CLOUD-NATIVE TIERS',
      badgeColor: 'border-cyan-500/50 bg-cyan-950/60 text-cyan-300',
      title: 'Cloud Architecture & Scalability',
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      description:
        '7-tier event-driven infrastructure, sub-second serverless autoscaling workbench, and low-latency autonomous action arbiters.',
      stats: '680 TFLOPS Peak · 40ms Cold-Start',
      gradient: 'from-cyan-500/20 via-slate-900/80 to-slate-950',
      borderGlow: 'hover:border-cyan-500/60 hover:shadow-cyan-950/50',
      actionLabel: 'Inspect Pipeline',
    },
    {
      id: 'infrastructure' as PageId,
      badge: 'PHYSICAL & SUBTERRANEAN',
      badgeColor: 'border-blue-500/50 bg-blue-950/60 text-blue-300',
      title: 'Autonomous Infrastructure & Twin',
      icon: <Layers className="w-6 h-6 text-blue-400" />,
      description:
        'Interactive metropolitan digital twin, subterranean multi-layer cross-section, and kinetic modular building floorplans.',
      stats: '142M Connected Nodes · 8-Min Morphing',
      gradient: 'from-blue-500/20 via-slate-900/80 to-slate-950',
      borderGlow: 'hover:border-blue-500/60 hover:shadow-blue-950/50',
      actionLabel: 'Explore Digital Twin',
    },
    {
      id: 'command-center' as PageId,
      badge: 'OPERATIONS COCKPIT',
      badgeColor: 'border-purple-500/50 bg-purple-950/60 text-purple-300',
      title: 'AI Command Center & Cockpit',
      icon: <Activity className="w-6 h-6 text-purple-400" />,
      description:
        'Live municipal sparkline telemetry, autonomous microgrid balancing, dynamic optimization actuators, and circular ecosystem loops.',
      stats: '99.98% System Uptime · Live UTC Sync',
      gradient: 'from-purple-500/20 via-slate-900/80 to-slate-950',
      borderGlow: 'hover:border-purple-500/60 hover:shadow-purple-950/50',
      actionLabel: 'Open Command Center',
    },
    {
      id: 'sustainability' as PageId,
      badge: 'NET-POSITIVE LEDGER',
      badgeColor: 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300',
      title: 'Sustainability & Circular Ledger',
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      description:
        'Closed-loop carbon-negative facades, +1.84 GW peak solar canopy, pneumatic freight waste routing, and 94% rainwater recovery.',
      stats: '+18% Net Energy Surplus · Zero Runoff',
      gradient: 'from-emerald-500/20 via-slate-900/80 to-slate-950',
      borderGlow: 'hover:border-emerald-500/60 hover:shadow-emerald-950/50',
      actionLabel: 'View Sustainability',
    },
  ];

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection
        onExploreCity={() => onNavigate('infrastructure')}
        onViewArchitecture={() => onNavigate('architecture')}
      />

      {/* 2. Metropolitan Command Portals Deck with Notification Centre Quick-Bar */}
      <section className="py-20 relative bg-gradient-to-b from-[#050914] via-[#060c1d] to-[#040813] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Notification Centre Quick Banner */}
          {onOpenNotifications && (
            <div className="mb-10 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-red-950/60 via-slate-900/90 to-cyan-950/40 border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-red-950 border border-red-500/60 text-red-400 shrink-0">
                  <BellRing className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-red-300 uppercase tracking-wider">
                      Live City Alert Surveillance Active
                    </span>
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal mt-0.5">
                    Real-time updates for flooding in Marina Estuary, seismic micro-tremors, cyclones, fires, and microgrid loads.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                <button
                  onClick={onOpenNotifications}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>Open Notification Centre</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium mb-2">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>MODULAR METROPOLITAN WORKSPACES</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight uppercase">
                Explore Dedicated City Operations
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-normal mt-1">
                Access each specialized digital interface powering NEXUS CITY's autonomous core.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 5 subsystems running synchronized</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portalCards.map((portal) => (
              <div
                key={portal.id}
                onClick={() => onNavigate(portal.id)}
                className={`group cursor-pointer rounded-3xl p-6 sm:p-7 border border-slate-800 bg-gradient-to-br ${portal.gradient} transition-all duration-300 ${portal.borderGlow} hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800/90 group-hover:scale-110 transition-transform">
                      {portal.icon}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${portal.badgeColor}`}
                    >
                      {portal.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
                    {portal.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4">
                    {portal.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 text-[11px] truncate">
                    {portal.stats}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono font-bold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all whitespace-nowrap ml-2">
                    <span>{portal.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Intelligence Layer: 5 Core Technologies */}
      <TechStackSection />

      {/* 4. Digital Twin Interactive Map Preview */}
      <div className="relative">
        <InteractiveSmartCity />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
          <button
            onClick={() => onNavigate('infrastructure')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 border border-cyan-400/40 hover:border-cyan-400 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-950/60 shadow-lg shadow-cyan-950/40 transition-all hover:scale-105"
          >
            <span>Launch Full Infrastructure &amp; Subterranean Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. Technology Relationship Loop */}
      <EcosystemDiagram />

      {/* 6. Final CTA */}
      <FinalCTA
        onExploreArchitecture={() => onNavigate('architecture')}
        onDiscoverTechnology={() => onNavigate('command-center')}
      />
    </div>
  );
};
