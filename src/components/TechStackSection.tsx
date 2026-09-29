import React, { useState } from 'react';
import { Cloud, Cpu, Network, Infinity, Zap, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { TechCardData } from '../types';

export const TechStackSection: React.FC = () => {
  const [activeModalCard, setActiveModalCard] = useState<TechCardData | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const techCards: TechCardData[] = [
    {
      id: 'cloud-native',
      title: 'Cloud-Native Architecture',
      badge: 'FOUNDATION',
      icon: 'cloud',
      tagline: 'Microservices & Distributed Edge Mesh',
      description: 'Flexible, modular infrastructure designed for continuously evolving urban systems.',
      urbanImpact: 'Decoupled municipal subsystems allow individual districts to upgrade energy and water services with zero downtown or disruption.',
      telemetry: {
        label: 'System Availability',
        value: '99.999%',
        sublabel: 'Zero downtime rolling upgrades',
      },
      keyFeatures: [
        'Multi-region Kubernetes edge nodes deployed across every city quarter',
        'Service mesh with automated mTLS encryption for all municipal IoT streams',
        'Standardized Open Geospatial & smart-city API connectors',
        'Resilient partition tolerance during localized grid disconnects',
      ],
    },
    {
      id: 'serverless-scale',
      title: 'Serverless Scalability',
      badge: 'ELASTICITY',
      icon: 'hexagon',
      tagline: 'Autonomous Demand Auto-Balancing',
      description: 'Computing resources dynamically scale according to real-time city demand.',
      urbanImpact: 'Instantly bursts compute during extreme weather or civic emergencies, then scales to idle during night hours for 92% compute energy savings.',
      telemetry: {
        label: 'Auto-Scale Velocity',
        value: '< 40ms',
        sublabel: 'Cold start to 10,000 parallel workers',
      },
      keyFeatures: [
        'Sub-second provisioning of sensory analysis containers',
        'Scale-to-zero compute when district activity falls below baseline',
        'Predictive pre-warming keyed to meteorological radar events',
        'FinOps autonomous resource cost and wattage minimization',
      ],
    },
    {
      id: 'generative-ai',
      title: 'Generative Cloud AI',
      badge: 'COGNITION',
      icon: 'neural',
      tagline: 'Multimodal Predictive City Modeling',
      description: 'AI models analyze urban data and generate intelligent decisions and predictions.',
      urbanImpact: 'Runs generative digital twin simulations 6 hours ahead of real-time to preempt traffic gridlocks and pre-charge renewable storage banks.',
      telemetry: {
        label: 'Predictive Horizon',
        value: '6 Hours',
        sublabel: 'Simulated 14,000 spatial parameters',
      },
      keyFeatures: [
        'Multimodal LLM / vision reasoning across satellite, road and drone sensors',
        'Generative traffic light & hyperloop schedule synthesis in real time',
        'Autonomous micro-climate optimization for biophilic skyscraper facades',
        'Dynamic urban evacuation & contingency route generator',
      ],
    },
    {
      id: 'devops-cicd',
      title: 'DevOps & CI/CD Pipelines',
      badge: 'CONTINUITY',
      icon: 'infinity',
      tagline: 'GitOps & Canary Urban Deployments',
      description: 'Continuous integration and deployment keep city services constantly improving.',
      urbanImpact: 'Automated test suites run in virtualized city sandboxes before flashing firmware onto physical traffic beacons or water valves.',
      telemetry: {
        label: 'Deployment Frequency',
        value: '180+/day',
        sublabel: 'Canary verified with rollback triggers',
      },
      keyFeatures: [
        'Infrastructure as Code (IaC) defining all physical and digital sensor topologies',
        'Automated digital twin canary validation before physical field deployment',
        'Zero-trust hardware cryptographic signing for smart grid actuators',
        'Autonomous rollbacks if sensory anomalies exceed 0.05% threshold',
      ],
    },
    {
      id: 'event-driven',
      title: 'Event-Driven Workflows',
      badge: 'REACTION',
      icon: 'zap',
      tagline: 'Sub-Millisecond Message Broker Backbone',
      description: 'Real-time events trigger automated actions across transportation, energy, water and infrastructure.',
      urbanImpact: 'Eliminates polling delays; a single sensor drop instantly activates emergency runoff valves, reroutes mass transit, and alerts civic services.',
      telemetry: {
        label: 'Event Throughput',
        value: '12M / sec',
        sublabel: 'Average broker latency: 2.4ms',
      },
      keyFeatures: [
        'Distributed event streaming protocol connecting 42+ million urban sensors',
        'Complex Event Processing (CEP) identifying cascading urban bottlenecks',
        'Publish-subscribe architecture isolating critical life-safety channels',
        'Hardware-level backpressure mitigation during major seismic or storm alerts',
      ],
    },
  ];

  const renderIcon = (iconName: string, isHovered: boolean) => {
    switch (iconName) {
      case 'cloud':
        return <Cloud className={`w-8 h-8 transition-transform duration-300 ${isHovered ? 'scale-110 text-cyan-300' : 'text-cyan-400'}`} />;
      case 'hexagon':
        return <Cpu className={`w-8 h-8 transition-transform duration-300 ${isHovered ? 'scale-110 text-amber-300' : 'text-amber-400'}`} />;
      case 'neural':
        return <Network className={`w-8 h-8 transition-transform duration-300 ${isHovered ? 'scale-110 text-cyan-300' : 'text-cyan-400'}`} />;
      case 'infinity':
        return <Infinity className={`w-8 h-8 transition-transform duration-300 ${isHovered ? 'scale-110 text-blue-300' : 'text-blue-400'}`} />;
      case 'zap':
        return <Zap className={`w-8 h-8 transition-transform duration-300 ${isHovered ? 'scale-110 text-amber-300' : 'text-amber-400'}`} />;
      default:
        return <Cloud className="w-8 h-8 text-cyan-400" />;
    }
  };

  return (
    <section id="technology" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
            <span>CORE ARCHITECTURAL PILLARS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 uppercase">
            THE INTELLIGENCE LAYER
          </h2>
          <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
            Five technologies transforming the way cities operate.
          </p>
        </div>

        {/* 5 Premium Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCards.map((card, idx) => {
            const isHovered = hoveredCardId === card.id;
            const isWide = idx === 3 || idx === 4; // Give the last two cards equal balance

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`group relative rounded-2xl glass-panel p-6 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isHovered
                    ? 'border-cyan-400/80 -translate-y-2 glow-cyan bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/95'
                    : 'border-slate-800/80 hover:border-cyan-500/40'
                } ${isWide ? 'lg:col-span-1 md:col-span-1' : ''}`}
                onClick={() => setActiveModalCard(card)}
              >
                {/* Subtle top corner gradient line */}
                <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Card Top: Icon & Badge */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-700/60 shadow-inner group-hover:border-cyan-500/40 transition-colors">
                      {renderIcon(card.icon, isHovered)}
                    </div>
                    <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-cyan-300">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/80 dark:text-cyan-400/80 light:text-cyan-600 mb-3">
                    {card.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-5">
                    {card.description}
                  </p>
                </div>

                {/* Card Bottom: Metric & Inspection CTA */}
                <div className="pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold font-mono text-cyan-300 tabular-nums">
                      {card.telemetry.value}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                      {card.telemetry.label}
                    </div>
                  </div>

                  <button
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 group-hover:text-cyan-300 transition-colors"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Specification Modal */}
        {activeModalCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-cyan-400/50 p-6 sm:p-8 bg-[#091224] dark:bg-[#091224] light:bg-white text-left shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                      {activeModalCard.badge} LAYER
                    </span>
                    <span className="text-xs text-slate-400">Competition Key Feature</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {activeModalCard.title}
                  </h3>
                  <p className="text-sm font-mono text-cyan-400">{activeModalCard.tagline}</p>
                </div>
                <button
                  onClick={() => setActiveModalCard(null)}
                  className="p-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Core Purpose & Urban Impact */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">Architectural Role</h4>
                  <p className="text-sm text-slate-200 dark:text-slate-200 light:text-slate-700 leading-relaxed">
                    {activeModalCard.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                  <h4 className="text-xs font-mono uppercase text-cyan-400 mb-1">Urban Metropolitan Impact</h4>
                  <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                    {activeModalCard.urbanImpact}
                  </p>
                </div>
              </div>

              {/* Telemetry Metric Highlight */}
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-mono text-slate-400">{activeModalCard.telemetry.label}</div>
                  <div className="text-sm text-slate-300">{activeModalCard.telemetry.sublabel}</div>
                </div>
                <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                  {activeModalCard.telemetry.value}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Technical Implementation Invariants</h4>
                {activeModalCard.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveModalCard(null)}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Close Specification
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
