import React, { useState } from 'react';
import { Layers, Database, Droplets, Zap, Train, Box, Eye, EyeOff } from 'lucide-react';

export const UndergroundSection: React.FC = () => {
  const [activeLayers, setActiveLayers] = useState<{
    data: boolean;
    water: boolean;
    energy: boolean;
    transport: boolean;
  }>({
    data: true,
    water: true,
    energy: true,
    transport: true,
  });

  const toggleLayer = (layer: 'data' | 'water' | 'energy' | 'transport') => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const systems = [
    {
      id: 'data',
      label: 'DATA INFRASTRUCTURE',
      color: '#06b6d4',
      depth: '-15m to -25m',
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      description: 'Quantum-encrypted optical fiber trunks and decentralized subterranean edge micro-datacenters cooled by geothermal loops.',
      stat: '400 Tbps Core Bus',
    },
    {
      id: 'water',
      label: 'WATER & RECYCLING',
      color: '#0284c7',
      depth: '-25m to -40m',
      icon: <Droplets className="w-4 h-4 text-sky-400" />,
      description: 'Massive closed-loop stormwater filtration vaults, bioreactor recycling chambers, and automated pneumatic black/greywater conduits.',
      stat: '99.2% Closed Loop',
    },
    {
      id: 'energy',
      label: 'ENERGY DISTRIBUTION',
      color: '#f59e0b',
      depth: '-35m to -50m',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      description: 'Superconducting HVDC conduits, kinetic flywheel balancing vaults, and thermal molten salt energy storage reserves.',
      stat: '3.4 GWh Buffer',
    },
    {
      id: 'transport',
      label: 'AUTONOMOUS TRANSPORT',
      color: '#a855f7',
      depth: '-45m to -65m',
      icon: <Train className="w-4 h-4 text-purple-400" />,
      description: 'Automated logistics hyperloop tubes, high-speed passenger maglev transit, and automated 3D robotic parcel retrieval cells.',
      stat: '450 km/h Maglev',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#050914] via-[#02050c] to-[#040813]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
            <span>SUB-SURFACE METROPOLITAN ARTERY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 uppercase">
            THE CITY BENEATH THE CITY
          </h2>
          <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
            A dramatic multi-tiered underground infrastructure network handling heavy logistics, mass transit, circular water loops, and massive energy storage completely hidden below ground.
          </p>
        </div>

        {/* Layer Visibility Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {systems.map((sys) => {
            const isVisible = activeLayers[sys.id as keyof typeof activeLayers];
            return (
              <button
                key={sys.id}
                onClick={() => toggleLayer(sys.id as any)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 ${
                  isVisible
                    ? 'bg-slate-900 border-opacity-80 text-slate-100 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
                style={{ borderColor: isVisible ? sys.color : undefined }}
              >
                {sys.icon}
                <span>{sys.label}</span>
                {isVisible ? (
                  <Eye className="w-3.5 h-3.5 text-slate-300" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Cutaway Architecture Visualization */}
        <div className="rounded-3xl glass-panel border border-cyan-500/30 p-4 sm:p-8 relative overflow-hidden shadow-2xl bg-[#03060f]">
          {/* Depth Scale on Left */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Cross-Section SVG Diagram */}
            <div className="lg:col-span-8 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#02050b] border border-slate-800">
              <svg
                viewBox="0 0 800 500"
                className="w-full h-full object-cover select-none"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Surface Ground Level Line */}
                <line x1="0" y1="60" x2="800" y2="60" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 4" opacity="0.6" />
                <rect x="0" y="0" width="800" height="60" fill="#061224" opacity="0.4" />
                <text x="30" y="40" fill="#38bdf8" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                  SURFACE LEVEL (0.0M) · PEDESTRIAN PARKS & BIOPHILIC TOWERS
                </text>

                {/* Subterranean Geological Strata Background */}
                <rect x="0" y="60" width="800" height="440" fill="#02040a" />

                {/* Depth Grid Lines */}
                {[
                  { y: 140, label: '-15M: URBAN UTILITIES & AUTOMATED PARCEL CONDUITS' },
                  { y: 230, label: '-30M: DATA VAULTS & RAINWATER FILTRATION RESERVES' },
                  { y: 340, label: '-45M: SUPERCONDUCTING ENERGY MATRICES' },
                  { y: 440, label: '-60M: HIGH-SPEED AUTONOMOUS MAGLEV HYPERLOOP' },
                ].map((depth) => (
                  <g key={depth.y}>
                    <line x1="0" y1={depth.y} x2="800" y2={depth.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="20" y={depth.y - 8} fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="JetBrains Mono">
                      {depth.label}
                    </text>
                  </g>
                ))}

                {/* LAYER 1: DATA CONDUITS (Cyan) */}
                {activeLayers.data && (
                  <g className="transition-opacity duration-300">
                    {/* Fiber Trunks */}
                    <path
                      d="M0,120 C200,100 400,150 600,110 C700,90 750,130 800,120"
                      stroke="#06b6d4"
                      strokeWidth="4"
                      fill="none"
                      filter="drop-shadow(0 0 6px rgba(6,182,212,0.8))"
                    />
                    <path
                      d="M0,120 C200,100 400,150 600,110 C700,90 750,130 800,120"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeDasharray="10 20"
                      fill="none"
                    />
                    {/* Subterranean Data Center Pods */}
                    <rect x="220" y="95" width="50" height="40" rx="6" fill="#09253d" stroke="#06b6d4" strokeWidth="1.5" />
                    <circle cx="245" cy="115" r="4" fill="#00f0ff" />
                    <rect x="520" y="95" width="50" height="40" rx="6" fill="#09253d" stroke="#06b6d4" strokeWidth="1.5" />
                    <circle cx="545" cy="115" r="4" fill="#00f0ff" />
                  </g>
                )}

                {/* LAYER 2: WATER RECYCLING & RAINWATER AQUIFERS (Blue/Aqua) */}
                {activeLayers.water && (
                  <g className="transition-opacity duration-300">
                    {/* Water Cistern Tanks */}
                    <ellipse cx="140" cy="220" rx="45" ry="30" fill="#082b4a" stroke="#0284c7" strokeWidth="2" />
                    <text x="115" y="225" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono">VAULT 01</text>
                    
                    <ellipse cx="680" cy="220" rx="45" ry="30" fill="#082b4a" stroke="#0284c7" strokeWidth="2" />
                    <text x="655" y="225" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono">VAULT 02</text>

                    {/* Recirculation Channels */}
                    <path
                      d="M0,230 C200,240 350,190 500,240 C650,280 750,210 800,230"
                      stroke="#0284c7"
                      strokeWidth="5"
                      fill="none"
                      filter="drop-shadow(0 0 6px rgba(2,132,199,0.8))"
                    />
                    <path
                      d="M0,230 C200,240 350,190 500,240 C650,280 750,210 800,230"
                      stroke="#7dd3fc"
                      strokeWidth="1.5"
                      strokeDasharray="8 12"
                      fill="none"
                    />
                  </g>
                )}

                {/* LAYER 3: SUPERCONDUCTING ENERGY GRIDS (Amber/Gold) */}
                {activeLayers.energy && (
                  <g className="transition-opacity duration-300">
                    <path
                      d="M0,320 C180,340 380,300 580,350 C700,320 750,340 800,320"
                      stroke="#f59e0b"
                      strokeWidth="4"
                      fill="none"
                      filter="drop-shadow(0 0 6px rgba(245,158,11,0.8))"
                    />
                    {/* Energy Battery Silos */}
                    <rect x="360" y="300" width="70" height="45" rx="8" fill="#2d1c04" stroke="#f59e0b" strokeWidth="2" />
                    <text x="375" y="328" fill="#fbbf24" fontSize="10" fontFamily="JetBrains Mono">BATTERY</text>
                  </g>
                )}

                {/* LAYER 4: TRANSPORT & LOGISTICS HYPERLOOP (Violet/Neon) */}
                {activeLayers.transport && (
                  <g className="transition-opacity duration-300">
                    {/* Hyperloop Vacuum Tube */}
                    <path
                      d="M0,430 L800,430"
                      stroke="#a855f7"
                      strokeWidth="12"
                      strokeOpacity="0.4"
                    />
                    <path
                      d="M0,430 L800,430"
                      stroke="#c084fc"
                      strokeWidth="2.5"
                      strokeDasharray="16 16"
                    />

                    {/* Maglev Pod 1 */}
                    <rect x="280" y="420" width="80" height="20" rx="10" fill="#581c87" stroke="#e9d5ff" strokeWidth="1.5" />
                    <circle cx="350" cy="430" r="3" fill="#ffffff" />

                    {/* Maglev Pod 2 */}
                    <rect x="620" y="420" width="80" height="20" rx="10" fill="#581c87" stroke="#e9d5ff" strokeWidth="1.5" />
                    <circle cx="690" cy="430" r="3" fill="#ffffff" />
                  </g>
                )}

                {/* Vertical elevator and logistics shafts */}
                <line x1="245" y1="60" x2="245" y2="430" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="545" y1="60" x2="545" y2="430" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {/* Status overlay */}
              <div className="absolute bottom-3 left-3 z-10 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-700 text-[11px] font-mono text-cyan-300">
                <span>SUB-SURFACE REAL-TIME TELEMETRY MATRIX</span>
              </div>
            </div>

            {/* Right: Subterranean Systems Overview */}
            <div className="lg:col-span-4 space-y-4 text-left">
              {systems.map((sys) => (
                <div
                  key={sys.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 transition-all duration-200 hover:border-slate-700"
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: sys.color,
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {sys.icon}
                      <h4 className="text-xs font-mono font-bold text-slate-100">{sys.label}</h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{sys.depth}</span>
                  </div>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-2">
                    {sys.description}
                  </p>
                  <div className="text-[11px] font-mono font-bold" style={{ color: sys.color }}>
                    {sys.stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
