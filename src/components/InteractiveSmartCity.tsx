import React, { useState } from 'react';
import { Hotspot } from '../types';
import {
  Sun,
  Cpu,
  Train,
  Droplets,
  Zap,
  RotateCw,
  Building2,
  Activity,
  Maximize2,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const InteractiveSmartCity: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const hotspots: Hotspot[] = [
    {
      id: 'solar',
      name: 'Solar Buildings',
      category: 'energy',
      icon: 'sun',
      x: 24,
      y: 32,
      title: 'Perovskite Photovoltaic Skin',
      subtitle: 'Renewable energy generation',
      description: 'Transparent high-efficiency solar glass envelope embedded across all facades, capturing ambient and direct solar photons.',
      metric: '1.8 GW',
      metricLabel: 'Peak Generation',
      telemetryStream: 'Yield: +14.2% vs forecasted irradiance',
      efficiency: '98.4%',
      color: '#fbbf24',
    },
    {
      id: 'cloud-ai',
      name: 'Cloud AI Core',
      category: 'intelligence',
      icon: 'cpu',
      x: 50,
      y: 18,
      title: 'Metropolitan Neural Nexus',
      subtitle: 'Real-time city intelligence',
      description: 'Distributed multimodal inference cluster continuously correlating 42.8 million sensor streams to balance city dynamics.',
      metric: '12ms',
      metricLabel: 'Inference Latency',
      telemetryStream: 'Active Agents: 1,420 dispatching workflows',
      efficiency: '99.99%',
      color: '#06b6d4',
    },
    {
      id: 'transport',
      name: 'Underground Transport',
      category: 'mobility',
      icon: 'train',
      x: 74,
      y: 78,
      title: 'Autonomous Sub-surface Gliders',
      subtitle: 'Autonomous mobility',
      description: 'Zero-friction magnetic levitation tubes connecting commercial, residential, and logistics subterranean hubs.',
      metric: '450 km/h',
      metricLabel: 'Pod Velocity',
      telemetryStream: 'Wait Time: 42s avg interval, 0 surface congestion',
      efficiency: '99.8%',
      color: '#a855f7',
    },
    {
      id: 'water',
      name: 'Water Recycling',
      category: 'environment',
      icon: 'droplets',
      x: 28,
      y: 74,
      title: 'Aquifer Filtration Vaults',
      subtitle: 'Rainwater harvesting & reuse',
      description: 'Automated bio-membrane filters and underground cistern networks purifying rainwater and greywater for 100% circular usage.',
      metric: '99.2%',
      metricLabel: 'Water Circularity',
      telemetryStream: 'Quality: Nanofiltration purity rating 99.98%',
      efficiency: '99.2%',
      color: '#38bdf8',
    },
    {
      id: 'energy-net',
      name: 'Energy Network',
      category: 'energy',
      icon: 'zap',
      x: 78,
      y: 42,
      title: 'Decentralized Microgrid Mesh',
      subtitle: 'Intelligent energy sharing',
      description: 'Bi-directional smart power distribution that dynamically routes excess solar and kinetic power to districts with active surges.',
      metric: '3.4 GWh',
      metricLabel: 'Buffer Reserve',
      telemetryStream: 'Curtailed waste: 0.00% across all districts',
      efficiency: '97.9%',
      color: '#f59e0b',
    },
    {
      id: 'recycling',
      name: 'Autonomous Recycling',
      category: 'environment',
      icon: 'rotate',
      x: 48,
      y: 82,
      title: 'Pneumatic Resource Recovery',
      subtitle: 'Automated waste processing',
      description: 'Subterranean vacuum tubes transport segregated waste directly to automated optical-sorting and bio-conversion processors.',
      metric: '94.7%',
      metricLabel: 'Material Recovery',
      telemetryStream: 'Organic to bio-methane conversion: Active',
      efficiency: '94.7%',
      color: '#10b981',
    },
    {
      id: 'modular',
      name: 'Modular Buildings',
      category: 'architecture',
      icon: 'building',
      x: 62,
      y: 35,
      title: 'Kinetic Adaptive Architecture',
      subtitle: 'Adaptable interiors',
      description: 'Floorplates engineered with autonomous partitions and flexible utility conduits, transitioning between residential and collaborative layouts.',
      metric: '15 Min',
      metricLabel: 'Space Reconfiguration',
      telemetryStream: 'Acoustic seal rating: STC 58 sound isolation',
      efficiency: '96.5%',
      color: '#3b82f6',
    },
  ];

  const filteredHotspots = activeFilter === 'all'
    ? hotspots
    : hotspots.filter((h) => h.category === activeFilter);

  const activeDisplay = hoveredHotspot || selectedHotspot || hotspots[1]; // default to Cloud AI Core

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Sun className="w-4 h-4 text-amber-300" />;
      case 'cpu':
        return <Cpu className="w-4 h-4 text-cyan-300" />;
      case 'train':
        return <Train className="w-4 h-4 text-purple-300" />;
      case 'droplets':
        return <Droplets className="w-4 h-4 text-sky-300" />;
      case 'zap':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'rotate':
        return <RotateCw className="w-4 h-4 text-emerald-300" />;
      case 'building':
        return <Building2 className="w-4 h-4 text-blue-300" />;
      default:
        return <Activity className="w-4 h-4 text-cyan-300" />;
    }
  };

  return (
    <section id="infrastructure" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-transparent blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
            <span>INTERACTIVE METROPOLITAN DIGITAL TWIN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 uppercase">
            ONE CITY. ONE CONNECTED SYSTEM.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
            Hover or click any node on the city grid to inspect its real-time telemetry and autonomous subsystems.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300">
            {[
              { id: 'all', label: 'All Subsystems' },
              { id: 'energy', label: '⚡ Energy' },
              { id: 'intelligence', label: '🌐 Cloud AI' },
              { id: 'mobility', label: '🚇 Mobility' },
              { id: 'environment', label: '💧 Water & Waste' },
              { id: 'architecture', label: '🏢 Modular' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Left Interactive City Map + Right Live Glass Inspection Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive City Visual Centerpiece Canvas / SVG */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 p-2 shadow-2xl">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#050b17] via-[#09152b] to-[#040915]">
              {/* Architectural Isometric Blueprint & Cityscape Vectors */}
              <svg
                viewBox="0 0 1000 620"
                className="w-full h-full object-cover select-none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Sky background */}
                  <linearGradient id="cityTwilight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#040914" />
                    <stop offset="45%" stopColor="#091b38" />
                    <stop offset="100%" stopColor="#030813" />
                  </linearGradient>

                  {/* Tower gradients */}
                  <linearGradient id="towerA" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0e294b" />
                    <stop offset="100%" stopColor="#051429" />
                  </linearGradient>

                  <linearGradient id="solarFacade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
                  </linearGradient>

                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <rect width="1000" height="620" fill="url(#cityTwilight)" />

                {/* Subterranean Section Divider Line */}
                <line x1="0" y1="470" x2="1000" y2="470" stroke="rgba(56, 189, 248, 0.3)" strokeDasharray="6 4" strokeWidth="1.5" />
                <text x="24" y="495" fill="rgba(56, 189, 248, 0.7)" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2">
                  SUBTERRANEAN INFRASTRUCTURE HORIZON (-15M TO -60M)
                </text>

                {/* Subterranean Vaults & Tunnels */}
                <rect x="0" y="470" width="1000" height="150" fill="#030711" opacity="0.9" />

                {/* Maglev Tunnel Line */}
                <path
                  d="M0,530 C300,530 500,550 1000,520"
                  stroke="#a855f7"
                  strokeWidth="6"
                  strokeOpacity="0.4"
                  fill="none"
                />
                <path
                  d="M0,530 C300,530 500,550 1000,520"
                  stroke="#c084fc"
                  strokeWidth="2"
                  strokeDasharray="14 14"
                  fill="none"
                />

                {/* Water Recirculation Aquifer Tube */}
                <path
                  d="M100,600 C250,560 400,580 550,560 C700,540 850,570 1000,560"
                  stroke="#0284c7"
                  strokeWidth="5"
                  strokeOpacity="0.4"
                  fill="none"
                />

                {/* Background City Skyline Blocks */}
                <path
                  d="M50,470 L50,260 L110,260 L110,470 Z"
                  fill="#08182f"
                  stroke="rgba(56, 189, 248, 0.2)"
                />
                <path
                  d="M130,470 L130,190 L220,150 L250,190 L250,470 Z"
                  fill="url(#towerA)"
                  stroke="rgba(56, 189, 248, 0.35)"
                  strokeWidth="1.5"
                />
                {/* Solar Panels on Tower 1 */}
                <rect x="150" y="200" width="80" height="230" fill="url(#solarFacade)" opacity="0.75" />

                {/* Central AI Spire (Cloud AI Core) */}
                <polygon
                  points="460,470 485,90 515,90 540,470"
                  fill="#0c2340"
                  stroke="#06b6d4"
                  strokeWidth="2"
                />
                <line x1="500" y1="90" x2="500" y2="25" stroke="#38bdf8" strokeWidth="3" />
                <circle cx="500" cy="25" r="6" fill="#fbbf24" filter="url(#nodeGlow)" />

                {/* Satellite Beacons & Neural Network Mesh across City */}
                {hotspots.map((h1, i) =>
                  hotspots.slice(i + 1).map((h2, j) => {
                    const dist = Math.hypot(h1.x - h2.x, h1.y - h2.y);
                    if (dist < 45) {
                      return (
                        <line
                          key={`${h1.id}-${h2.id}`}
                          x1={`${h1.x * 10}`}
                          y1={`${h1.y * 6.2}`}
                          x2={`${h2.x * 10}`}
                          y2={`${h2.y * 6.2}`}
                          stroke="rgba(56, 189, 248, 0.2)"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      );
                    }
                    return null;
                  })
                )}

                {/* Modular Building Clusters (Right side) */}
                <path
                  d="M580,470 L580,210 L680,210 L680,470 Z"
                  fill="url(#towerA)"
                  stroke="rgba(56, 189, 248, 0.35)"
                  strokeWidth="1.5"
                />
                <rect x="600" y="230" width="60" height="40" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="1" />
                <rect x="600" y="285" width="60" height="40" fill="rgba(251, 191, 36, 0.2)" stroke="#fbbf24" strokeWidth="1" />
                <rect x="600" y="340" width="60" height="40" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="1" />

                {/* High-Rise Energy Grid Hub */}
                <polygon
                  points="750,470 770,240 820,240 840,470"
                  fill="#0e2849"
                  stroke="rgba(245, 158, 11, 0.5)"
                  strokeWidth="1.5"
                />

                {/* Elevated Skyways connecting Spire and Towers */}
                <path
                  d="M250,250 C350,220 400,230 475,220"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M525,220 C600,210 650,220 770,260"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Ground Waterway Channel */}
                <polygon points="0,440 1000,440 1000,470 0,470" fill="#041b33" />
                <line x1="0" y1="440" x2="1000" y2="440" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
              </svg>

              {/* Glowing Interactive Hotspots */}
              {filteredHotspots.map((spot) => {
                const isSelected = selectedHotspot?.id === spot.id;
                const isHovered = hoveredHotspot?.id === spot.id;

                return (
                  <div
                    key={spot.id}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
                    onMouseEnter={() => setHoveredHotspot(spot)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    onClick={() => setSelectedHotspot(spot)}
                  >
                    {/* Pulsing Outer Radar Ring */}
                    <div
                      className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                        isSelected || isHovered ? 'scale-150' : 'scale-100'
                      }`}
                      style={{
                        backgroundColor: spot.color,
                        width: '32px',
                        height: '32px',
                        marginLeft: '-8px',
                        marginTop: '-8px',
                      }}
                    />

                    {/* Hotspot Button */}
                    <button
                      aria-label={spot.name}
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full border shadow-xl transition-all duration-300 ${
                        isSelected || isHovered
                          ? 'scale-125 border-white bg-slate-900 text-white ring-4 ring-cyan-400/40'
                          : 'border-cyan-400/80 bg-slate-950/90 text-cyan-300 hover:scale-115'
                      }`}
                      style={{ borderColor: spot.color }}
                    >
                      {renderIcon(spot.icon)}
                    </button>

                    {/* Floating Label */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-700/80 text-[11px] font-mono whitespace-nowrap shadow-lg transition-opacity duration-200 pointer-events-none ${
                        isHovered || isSelected ? 'opacity-100 text-cyan-300' : 'opacity-80 text-slate-300 hidden sm:block'
                      }`}
                    >
                      {spot.name}
                    </div>
                  </div>
                );
              })}

              {/* Status Banner inside canvas */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>ACTIVE URBAN MESH · {filteredHotspots.length} NODES ACCESSIBLE</span>
              </div>
            </div>
          </div>

          {/* Right: Glass Telemetry & Detail Panel */}
          <div className="lg:col-span-4 rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-7 text-left space-y-6 shadow-2xl bg-[#070e1c] dark:bg-[#070e1c] light:bg-white">
            {/* Header: Name and Status */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 uppercase">
                  {activeDisplay.category}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                {activeDisplay.name}
              </h3>
              <p className="text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-600">
                {activeDisplay.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              {activeDisplay.description}
            </p>

            {/* Telemetry Metrics Box */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
              <div>
                <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                  {activeDisplay.metric}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                  {activeDisplay.metricLabel}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                  {activeDisplay.efficiency}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                  Operational Yield
                </div>
              </div>
            </div>

            {/* Live Sensor Stream Line */}
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
              <div className="text-[11px] font-mono uppercase text-cyan-400 mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Live Telemetry Feed</span>
              </div>
              <p className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                {activeDisplay.telemetryStream}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setSelectedHotspot(activeDisplay)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-md hover:opacity-95 transition-opacity"
              >
                <span>Synchronize System Telemetry</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
