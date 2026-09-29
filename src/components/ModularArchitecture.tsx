import React, { useState } from 'react';
import { Home, Briefcase, FlaskConical, Users2, Clock, Zap, Maximize, Check } from 'lucide-react';
import { ModularConfig } from '../types';

export const ModularArchitecture: React.FC = () => {
  const [activeConfigId, setActiveConfigId] = useState<'home' | 'office' | 'lab' | 'community'>('office');

  const configs: ModularConfig[] = [
    {
      id: 'home',
      name: 'Residential Sanctuary',
      icon: 'home',
      tagline: 'Quiet Living & Restorative Wellness',
      description: 'Partitions glide into place creating private bedroom suites, acoustic sleep chambers, and an open culinary garden kitchen.',
      reconfigurationTime: '8 Minutes',
      energyProfile: 'Low Ambient (0.4 kW/unit)',
      spatialFeatures: [
        'Acoustically isolated circadian sleep pods (STC 62)',
        'Kinetic wall with recessed fold-away dining table',
        'Hydroponic kitchen herb vertical wall with micro-drip',
        'Soft warm spectrum ambient biophilic lighting (2700K)',
      ],
      zones: [
        { name: 'Private Bedroom Pod', area: '28 m²', type: 'Acoustic Suite' },
        { name: 'Culinary & Dining', area: '34 m²', type: 'Social Kitchen' },
        { name: 'Wellness & Balcony', area: '18 m²', type: 'Air Garden' },
        { name: 'Lounge / Retreat', area: '40 m²', type: 'Adaptive Living' },
      ],
    },
    {
      id: 'office',
      name: 'Collaborative Workspace',
      icon: 'office',
      tagline: 'Ergonomic Agile Team Headquarters',
      description: 'Partitions retract to form high-ceiling collaborative scrum arenas, video telepresence cells, and hot-desk pods.',
      reconfigurationTime: '12 Minutes',
      energyProfile: 'Dynamic Active (1.2 kW/unit)',
      spatialFeatures: [
        'Motorized height-adjustable ergonomic workstations',
        'Sound-isolated holographic conference chambers',
        'Pneumatic utility conduits for high-speed edge hardware',
        'Cool daylight focus lighting calibrated to cognitive peak (5000K)',
      ],
      zones: [
        { name: 'Scrum Amphitheater', area: '45 m²', type: 'Group Ideation' },
        { name: 'Hot-Desk Matrix', area: '35 m²', type: 'Focus Pods' },
        { name: 'Holo-Meet Chamber', area: '20 m²', type: 'Telepresence' },
        { name: 'Breakout Lounge', area: '20 m²', type: 'Refreshment' },
      ],
    },
    {
      id: 'lab',
      name: 'Biotech & Research Lab',
      icon: 'lab',
      tagline: 'Cleanroom Class-100 & Sensory Rig',
      description: 'Flooring seals and positive-pressure HEPA filtration engage. Wall panels deploy robotic reagent dispensers and clean benches.',
      reconfigurationTime: '18 Minutes',
      energyProfile: 'Regulated Clean (2.8 kW/unit)',
      spatialFeatures: [
        'Positive pressure HEPA-14 laminar air circulation',
        'Chemical-resistant antibacterial composite bench surfaces',
        'Integrated cryo-cooling and high-purity water taps',
        'Anti-vibration decoupled optical table isolation',
      ],
      zones: [
        { name: 'Laminar Clean Bench', area: '38 m²', type: 'Bio-Safety L2' },
        { name: 'Spectrometry Station', area: '28 m²', type: 'Analytical' },
        { name: 'Specimen Cryo-Vault', area: '24 m²', type: 'Cryogenics' },
        { name: 'Data Logging Desk', area: '30 m²', type: 'Analysis Hub' },
      ],
    },
    {
      id: 'community',
      name: 'Civic Community Space',
      icon: 'community',
      tagline: 'Cultural Forum & Civic Assembly',
      description: 'All interior partitions recess completely into perimeter structural columns, opening an expansive 120m² public auditorium.',
      reconfigurationTime: '15 Minutes',
      energyProfile: 'High Density (1.8 kW/unit)',
      spatialFeatures: [
        'Unobstructed 120m² clear-span modular auditorium',
        'Concealed retractable tiered amphitheater seating',
        'Integrated surround 360-degree holographic projection walls',
        'Direct connection to vertical urban sky-garden park',
      ],
      zones: [
        { name: 'Central Arena Forum', area: '70 m²', type: 'Auditorium' },
        { name: 'Exhibition Gallery', area: '30 m²', type: 'Showcase' },
        { name: 'Civic Reception', area: '20 m²', type: 'Welcome Foyer' },
      ],
    },
  ];

  const currentConfig = configs.find((c) => c.id === activeConfigId) || configs[1];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="w-4 h-4" />;
      case 'office':
        return <Briefcase className="w-4 h-4" />;
      case 'lab':
        return <FlaskConical className="w-4 h-4" />;
      case 'community':
        return <Users2 className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
            <span>KINETIC METROPOLITAN LIVING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 uppercase">
            BUILDINGS THAT ADAPT.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
            Modular interiors allow buildings to continuously adapt to changing human and commercial requirements within minutes.
          </p>
        </div>

        {/* Configuration Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {configs.map((config) => {
            const isSelected = activeConfigId === config.id;
            return (
              <button
                key={config.id}
                onClick={() => setActiveConfigId(config.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-lg glow-cyan scale-105'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {renderIcon(config.id)}
                <span>{config.name}</span>
              </button>
            );
          })}
        </div>

        {/* Morphing Floor Plan Visualization & Blueprint Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Dynamic Animated Architectural Floorplan Canvas */}
          <div className="lg:col-span-7 rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-8 bg-[#050b18] shadow-2xl relative overflow-hidden">
            {/* Visual Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Maximize className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                  Kinetic Floorplate Schematic (120 m²)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Clock className="w-3.5 h-3.5" />
                <span>SHIFT TIME: {currentConfig.reconfigurationTime}</span>
              </div>
            </div>

            {/* SVG Floorplan Blueprint */}
            <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#040814] border border-cyan-500/20 p-4 flex items-center justify-center">
              <svg
                viewBox="0 0 600 450"
                className="w-full h-full object-contain select-none transition-all duration-700"
              >
                <defs>
                  <pattern id="planGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="0.8" />
                  </pattern>
                </defs>

                {/* Grid */}
                <rect width="600" height="450" fill="url(#planGrid)" />

                {/* Outer Structural Perimeter Walls */}
                <rect
                  x="30"
                  y="30"
                  width="540"
                  height="390"
                  rx="12"
                  fill="rgba(8, 20, 40, 0.6)"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />

                {/* Corner Structural Pillars */}
                {[
                  { x: 30, y: 30 },
                  { x: 550, y: 30 },
                  { x: 30, y: 400 },
                  { x: 550, y: 400 },
                  { x: 290, y: 30 },
                  { x: 290, y: 400 },
                ].map((col, idx) => (
                  <rect key={idx} x={col.x} y={col.y} width="20" height="20" fill="#06b6d4" rx="3" />
                ))}

                {/* DYNAMIC ROOM PARTITIONS & FURNITURE ACCORDING TO CONFIGURATION */}
                {activeConfigId === 'home' && (
                  <g className="animate-in fade-in duration-500">
                    {/* Living Room Divider */}
                    <line x1="300" y1="30" x2="300" y2="420" stroke="#00f0ff" strokeWidth="2.5" strokeDasharray="6 3" />
                    <line x1="30" y1="230" x2="300" y2="230" stroke="#00f0ff" strokeWidth="2.5" />
                    
                    {/* Room Labels */}
                    <text x="70" y="130" fill="#38bdf8" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">BEDROOM SUITE</text>
                    <text x="70" y="150" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">Acoustic Shield STC 62</text>

                    <text x="70" y="320" fill="#38bdf8" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">CULINARY & DINING</text>
                    <text x="70" y="340" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">Hydroponic Fresh Wall</text>

                    <text x="360" y="230" fill="#fbbf24" fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold">ADAPTIVE LOUNGE</text>
                    <text x="360" y="250" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">Kinetic Fold-Away Seating</text>

                    {/* Lounge Sofa Furniture */}
                    <rect x="360" y="120" width="160" height="60" rx="8" fill="rgba(251, 191, 36, 0.2)" stroke="#fbbf24" strokeWidth="1.5" />
                    <circle cx="440" cy="150" r="14" fill="#fbbf24" opacity="0.4" />
                  </g>
                )}

                {activeConfigId === 'office' && (
                  <g className="animate-in fade-in duration-500">
                    {/* Collaborative Center Boundary */}
                    <circle cx="200" cy="225" r="110" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2" strokeDasharray="8 4" />
                    
                    <line x1="350" y1="30" x2="350" y2="420" stroke="#06b6d4" strokeWidth="2.5" />
                    <line x1="350" y1="225" x2="570" y2="225" stroke="#06b6d4" strokeWidth="2" />

                    <text x="130" y="220" fill="#00f0ff" fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold">SCRUM ARENA</text>
                    <text x="125" y="240" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">Holo-Ideation Ring</text>

                    <text x="380" y="120" fill="#38bdf8" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">HOT-DESK PODS</text>
                    <text x="380" y="140" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">8 Motorized Desks</text>

                    <text x="380" y="320" fill="#a855f7" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">TELEPRESENCE</text>
                    <text x="380" y="340" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">Acoustic Video Suite</text>

                    {/* Hot-Desks Blocks */}
                    <rect x="380" y="60" width="60" height="25" rx="4" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" />
                    <rect x="470" y="60" width="60" height="25" rx="4" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" />
                  </g>
                )}

                {activeConfigId === 'lab' && (
                  <g className="animate-in fade-in duration-500">
                    <line x1="280" y1="30" x2="280" y2="420" stroke="#10b981" strokeWidth="3" />
                    <line x1="30" y1="225" x2="280" y2="225" stroke="#10b981" strokeWidth="2" />
                    <line x1="280" y1="225" x2="570" y2="225" stroke="#10b981" strokeWidth="2" />

                    <text x="60" y="120" fill="#10b981" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">LAMINAR BENCH</text>
                    <text x="60" y="140" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">HEPA-14 Cleanroom</text>

                    <text x="60" y="320" fill="#10b981" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">SPECTROMETRY</text>
                    <text x="60" y="340" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">Anti-Vibration Isolator</text>

                    <text x="320" y="120" fill="#38bdf8" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">CRYO STORAGE</text>
                    <text x="320" y="140" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">-80°C Specimen Bank</text>

                    <text x="320" y="320" fill="#fbbf24" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">DATA LOGGING</text>
                    <text x="320" y="340" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono">Direct Edge Cloud Link</text>
                  </g>
                )}

                {activeConfigId === 'community' && (
                  <g className="animate-in fade-in duration-500">
                    {/* Retracted Partitions Indicator */}
                    <rect x="35" y="35" width="530" height="380" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1" strokeDasharray="10 5" />
                    
                    <text x="180" y="210" fill="#60a5fa" fontSize="16" fontFamily="JetBrains Mono" fontWeight="bold">OPEN CIVIC AMPHITHEATER</text>
                    <text x="190" y="235" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono">120 m² Clear Span · 140 People Capacity</text>
                    <text x="210" y="260" fill="#fbbf24" fontSize="10" fontFamily="JetBrains Mono">Partitions Recessed into Perimeter Columns</text>
                  </g>
                )}
              </svg>

              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan-400">
                ACTIVE MODE: {currentConfig.name.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Right Column: Space Profile & Details */}
          <div className="lg:col-span-5 rounded-3xl glass-panel border border-cyan-500/30 p-7 text-left space-y-6 shadow-2xl bg-[#070f21]">
            <div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 uppercase">
                {currentConfig.name}
              </span>
              <h3 className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mt-2">
                Kinetic Space Morphing
              </h3>
              <p className="text-xs font-mono text-cyan-400 mt-1">{currentConfig.tagline}</p>
            </div>

            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              {currentConfig.description}
            </p>

            {/* Performance metrics */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-400">Reconfiguration</span>
                <div className="text-lg font-bold font-mono text-cyan-300">{currentConfig.reconfigurationTime}</div>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400">Energy Profile</span>
                <div className="text-lg font-bold font-mono text-amber-300">{currentConfig.energyProfile}</div>
              </div>
            </div>

            {/* Spatial Features List */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase text-slate-400">Automated Kinetic Features</h4>
              {currentConfig.spatialFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
