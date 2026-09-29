import React, { useState } from 'react';
import {
  MUNICIPAL_RISK_ZONES,
  EMERGENCY_FACILITIES,
} from '../../data/disasterData';
import { RiskZone, EmergencyFacility, AlertSeverity } from '../../types/disaster';
import {
  ShieldAlert,
  Hospital,
  Flame,
  Home,
  Navigation,
  Compass,
  CheckCircle,
  AlertTriangle,
  Radio,
  Eye,
  Layers,
  PhoneCall,
  Activity,
} from 'lucide-react';

interface InteractiveDisasterMapProps {
  onSelectZone?: (zone: RiskZone) => void;
  activeHighlightedZoneId?: string;
}

export const InteractiveDisasterMap: React.FC<InteractiveDisasterMapProps> = ({
  onSelectZone,
  activeHighlightedZoneId,
}) => {
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(
    MUNICIPAL_RISK_ZONES[2] // default to Marina Estuary (critical flood)
  );
  const [selectedFacility, setSelectedFacility] = useState<EmergencyFacility | null>(null);

  // Layer Toggles
  const [layers, setLayers] = useState({
    zones: true,
    shelters: true,
    hospitals: true,
    fireStations: true,
    evacRoutes: true,
    radarSweep: true,
  });

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const getRiskColor = (level: AlertSeverity) => {
    switch (level) {
      case 'critical':
        return '#ef4444'; // Red
      case 'warning':
        return '#f97316'; // Orange
      case 'advisory':
        return '#eab308'; // Yellow
      case 'safe':
      default:
        return '#10b981'; // Green
    }
  };

  const handleZoneClick = (zone: RiskZone) => {
    setSelectedZone(zone);
    setSelectedFacility(null);
    if (onSelectZone) onSelectZone(zone);
  };

  const handleFacilityClick = (facility: EmergencyFacility) => {
    setSelectedFacility(facility);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Metropolitan Risk &amp; Evacuation Map
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Color-Coded Disaster Risk Polygons, Evacuation Corridors &amp; Emergency Hubs
          </p>
        </div>

        {/* Tactical Legend and Layer Filter Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => toggleLayer('shelters')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                layers.shelters ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-slate-500'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-cyan-400" />
              <span>Shelters</span>
            </button>

            <button
              onClick={() => toggleLayer('hospitals')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                layers.hospitals ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'text-slate-500'
              }`}
            >
              <Hospital className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hospitals</span>
            </button>

            <button
              onClick={() => toggleLayer('fireStations')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                layers.fireStations ? 'bg-red-950 text-red-300 border border-red-500/40' : 'text-slate-500'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>Fire Bases</span>
            </button>

            <button
              onClick={() => toggleLayer('evacRoutes')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                layers.evacRoutes ? 'bg-purple-950 text-purple-300 border border-purple-500/40' : 'text-slate-500'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-purple-400" />
              <span>Routes</span>
            </button>

            <button
              onClick={() => toggleLayer('radarSweep')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                layers.radarSweep ? 'bg-sky-950 text-sky-300 border border-sky-500/40' : 'text-slate-500'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-sky-400" />
              <span>Radar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map Canvas (Left 8 cols) + Detail Panel (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Tactical Map Viewport Frame */}
        <div className="lg:col-span-8 rounded-3xl glass-panel border border-cyan-500/30 p-2 sm:p-3 relative overflow-hidden shadow-2xl bg-[#040813]">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#030611] via-[#060e22] to-[#02050e]">
            {/* SVG Tactical Map Layer */}
            <svg
              viewBox="0 0 1000 620"
              className="w-full h-full object-cover select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Radial Glows */}
                <radialGradient id="radarBeam" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
                  <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>

                {/* Grid pattern */}
                <pattern id="tacGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.07)" strokeWidth="0.8" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect width="1000" height="620" fill="url(#tacGrid)" />

              {/* Coastal Seawall & Waterway Contour */}
              <path
                d="M0,450 C200,430 350,490 500,440 C650,390 850,470 1000,420 L1000,620 L0,620 Z"
                fill="#031528"
                opacity="0.85"
              />
              <path
                d="M0,450 C200,430 350,490 500,440 C650,390 850,470 1000,420"
                stroke="#0284c7"
                strokeWidth="2.5"
                fill="none"
                opacity="0.7"
              />

              {/* District Contour Polygons (Risk Zones) */}
              {layers.zones && (
                <g>
                  {/* Zone 1: Marina Estuary (RED - Critical Risk) */}
                  <polygon
                    points="80,560 360,540 340,380 120,400"
                    fill="rgba(239, 68, 68, 0.22)"
                    stroke="#ef4444"
                    strokeWidth={selectedZone?.id === 'zone-marina-estuary' ? 3.5 : 2}
                    className="cursor-pointer transition-all hover:fill-red-500/35"
                    onClick={() => handleZoneClick(MUNICIPAL_RISK_ZONES[2])}
                  />

                  {/* Zone 2: Harbor Perimeter (ORANGE - High Risk) */}
                  <polygon
                    points="640,540 940,500 900,360 620,410"
                    fill="rgba(249, 115, 22, 0.2)"
                    stroke="#f97316"
                    strokeWidth={selectedZone?.id === 'zone-harbor-perimeter' ? 3.5 : 2}
                    className="cursor-pointer transition-all hover:fill-orange-500/35"
                    onClick={() => handleZoneClick(MUNICIPAL_RISK_ZONES[3])}
                  />

                  {/* Zone 3: North Ridge (YELLOW - Moderate Risk) */}
                  <polygon
                    points="260,70 560,60 520,200 240,190"
                    fill="rgba(234, 179, 8, 0.18)"
                    stroke="#eab308"
                    strokeWidth={selectedZone?.id === 'zone-north-ridge' ? 3.5 : 2}
                    className="cursor-pointer transition-all hover:fill-yellow-500/30"
                    onClick={() => handleZoneClick(MUNICIPAL_RISK_ZONES[0])}
                  />

                  {/* Zone 4: Central Spire & Core (GREEN - Safe) */}
                    <polygon
                      points="380,210 660,200 640,360 360,370"
                      fill="rgba(16, 185, 129, 0.14)"
                      stroke="#10b981"
                      strokeWidth={selectedZone?.id === 'zone-central-spire' ? 3.5 : 2}
                      className="cursor-pointer transition-all hover:fill-emerald-500/25"
                      onClick={() => handleZoneClick(MUNICIPAL_RISK_ZONES[1])}
                    />

                  {/* Zone 5: South Subterranean Quad (GREEN - Safe) */}
                  <polygon
                    points="540,380 780,370 760,490 520,500"
                    fill="rgba(16, 185, 129, 0.14)"
                    stroke="#10b981"
                    strokeWidth={selectedZone?.id === 'zone-south-industrial' ? 3.5 : 2}
                    className="cursor-pointer transition-all hover:fill-emerald-500/25"
                    onClick={() => handleZoneClick(MUNICIPAL_RISK_ZONES[4])}
                  />
                </g>
              )}

              {/* Animated Evacuation Routes */}
              {layers.evacRoutes && (
                <g>
                  {/* Marina to Shelter Gamma (East Civic Podium) */}
                  <path
                    d="M220,440 C250,400 280,380 340,360 C380,340 440,350 480,340"
                    stroke="url(#routeGrad)"
                    strokeWidth="3.5"
                    strokeDasharray="10 8"
                    fill="none"
                    filter="drop-shadow(0 0 6px rgba(192,132,252,0.8))"
                  />
                  {/* Harbor to Central Spire */}
                  <path
                    d="M740,440 C680,410 640,380 540,360"
                    stroke="url(#routeGrad)"
                    strokeWidth="3.5"
                    strokeDasharray="10 8"
                    fill="none"
                    filter="drop-shadow(0 0 6px rgba(56,189,248,0.8))"
                  />
                  {/* North Ridge to SkyHub */}
                  <path
                    d="M380,180 C400,240 420,290 440,320"
                    stroke="url(#routeGrad)"
                    strokeWidth="3.5"
                    strokeDasharray="10 8"
                    fill="none"
                  />
                </g>
              )}

              {/* Radar Scanner Ring Overlay */}
              {layers.radarSweep && (
                <g>
                  <circle cx="500" cy="310" r="260" fill="url(#radarBeam)" />
                  <circle cx="500" cy="310" r="130" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" fill="none" />
                  <circle cx="500" cy="310" r="260" stroke="rgba(6, 182, 212, 0.35)" strokeWidth="1" strokeDasharray="6 6" fill="none" />
                  <line x1="500" y1="50" x2="500" y2="570" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" />
                  <line x1="240" y1="310" x2="760" y2="310" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" />
                </g>
              )}

              {/* Zone Risk Labels */}
              <text x="140" y="470" fill="#ef4444" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">
                SECTOR 4: CRITICAL FLOOD ZONE
              </text>
              <text x="660" y="460" fill="#f97316" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">
                SECTOR 1: CYCLONE SURGE ZONE
              </text>
              <text x="290" y="120" fill="#eab308" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">
                SECTOR 8: LANDSLIDE ADVISORY
              </text>
              <text x="420" y="270" fill="#10b981" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">
                SECTOR 3: QUANTUM CORE (SAFE)
              </text>

              {/* Facility Markers: Shelters, Hospitals, Fire Stations */}
              {EMERGENCY_FACILITIES.map((f) => {
                if (f.type === 'shelter' && !layers.shelters) return null;
                if (f.type === 'hospital' && !layers.hospitals) return null;
                if (f.type === 'fire_station' && !layers.fireStations) return null;

                const cx = f.coordinates.x * 10;
                const cy = f.coordinates.y * 6.2;
                const isSelected = selectedFacility?.id === f.id;

                let markerColor = '#06b6d4';
                if (f.type === 'hospital') markerColor = '#10b981';
                if (f.type === 'fire_station') markerColor = '#ef4444';

                return (
                  <g
                    key={f.id}
                    className="cursor-pointer group"
                    onClick={() => handleFacilityClick(f)}
                  >
                    {/* Pulsing ring */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 16 : 10}
                      fill={markerColor}
                      opacity={isSelected ? 0.4 : 0.2}
                      className={isSelected ? 'animate-ping' : ''}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 10 : 7}
                      fill="#020617"
                      stroke={markerColor}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <circle cx={cx} cy={cy} r={3} fill={markerColor} />
                  </g>
                );
              })}
            </svg>

            {/* Tactical Overlays inside canvas */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 font-mono text-[10px] text-cyan-300">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/30">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>TACTICAL TILE: GRID 28°N 77°E · ELEV: -30M TO +480M</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-300">
                <span className="text-red-400">■ Red: Critical</span>
                <span className="text-orange-400">■ Orange: High</span>
                <span className="text-yellow-400">■ Yellow: Advisory</span>
                <span className="text-emerald-400">■ Green: Safe</span>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/85 border border-slate-800 text-[10px] font-mono text-slate-400">
              <span>CLICK ANY ZONE OR FACILITY PIN TO VIEW TELEMETRY &amp; EVACUATION</span>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Interactive Zone / Facility Inspector */}
        <div className="lg:col-span-4 rounded-3xl glass-panel border border-cyan-500/30 p-5 sm:p-6 text-left space-y-5 shadow-2xl bg-[#070e1f]">
          {selectedFacility ? (
            /* Emergency Facility Detail View */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 uppercase">
                  {selectedFacility.type.replace('_', ' ')}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{selectedFacility.status.toUpperCase()}</span>
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-100">{selectedFacility.name}</h4>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">{selectedFacility.district}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">TOTAL CAPACITY</span>
                  <strong className="text-slate-100">{selectedFacility.capacity}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">OCCUPANCY</span>
                  <strong className="text-amber-300">{selectedFacility.occupancy}</strong>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-400">Facility Features:</span>
                {selectedFacility.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{selectedFacility.contact}</span>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="text-xs font-mono text-slate-400 hover:text-white"
                >
                  Back to Zone
                </button>
              </div>
            </div>
          ) : selectedZone ? (
            /* Selected Risk Zone View */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full animate-ping"
                    style={{ backgroundColor: getRiskColor(selectedZone.riskLevel) }}
                  />
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-0.5 rounded border uppercase"
                    style={{
                      borderColor: getRiskColor(selectedZone.riskLevel),
                      color: getRiskColor(selectedZone.riskLevel),
                      backgroundColor: `${getRiskColor(selectedZone.riskLevel)}20`,
                    }}
                  >
                    {selectedZone.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Status: <strong className="text-white uppercase">{selectedZone.evacuationStatus.replace('_', ' ')}</strong>
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-100">{selectedZone.name}</h4>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">{selectedZone.district}</p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {selectedZone.description}
                </p>
              </div>

              {/* Zone Population & Hazards */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Population at Risk:</span>
                  <strong className="text-slate-100">{selectedZone.population}</strong>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Active Threat Vectors:</span>
                  <span className="text-amber-300 font-bold uppercase">
                    {selectedZone.activeHazards.length > 0
                      ? selectedZone.activeHazards.join(', ')
                      : 'None (Safe Zone)'}
                  </span>
                </div>
              </div>

              {/* Designated Evacuation Route */}
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-300 uppercase">
                  <Navigation className="w-3.5 h-3.5 text-purple-400" />
                  <span>Designated Evacuation Corridor</span>
                </div>
                <p className="text-xs font-mono text-slate-200">
                  {selectedZone.evacuationRoute}
                </p>
              </div>

              {/* Nearest Shelter Callout */}
              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Assigned Shelter</span>
                    <span className="text-cyan-200 font-bold">SkyHub / Shelter Gamma</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                  STAGED READY
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 font-mono text-xs">
              Select any district zone on the map to inspect live risk telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
