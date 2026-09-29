import React, { useState } from 'react';
import {
  RoadAsset,
  IncidentRecord,
  CctvFeed,
} from '../../data/commandCenterData';
import {
  Search,
  Layers,
  ZoomIn,
  ZoomOut,
  PenTool,
  Ruler,
  Filter,
  RotateCcw,
  Train,
  TrafficCone,
  AlertTriangle,
  Flame,
  Radio,
  Video,
  Zap,
  Droplets,
  Car,
  Compass,
  MapPin,
  Eye,
  Crosshair,
} from 'lucide-react';

interface IcccDigitalTwinMapProps {
  roads: RoadAsset[];
  incidents: IncidentRecord[];
  cctvFeeds: CctvFeed[];
  selectedRoadId: string | null;
  onSelectRoad: (road: RoadAsset) => void;
  selectedIncidentId: string | null;
  onSelectIncident: (incident: IncidentRecord | null) => void;
  onSelectCctv: (cctv: CctvFeed) => void;
}

export const IcccDigitalTwinMap: React.FC<IcccDigitalTwinMapProps> = ({
  roads,
  incidents,
  cctvFeeds,
  selectedRoadId,
  onSelectRoad,
  selectedIncidentId,
  onSelectIncident,
  onSelectCctv,
}) => {
  const [mapMode, setMapMode] = useState<'live' | 'satellite' | '3d' | 'heatmap'>('3d');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [layersMenuOpen, setLayersMenuOpen] = useState(false);
  const [activeLayers, setActiveLayers] = useState({
    roads: true,
    traffic: true,
    incidents: true,
    cctv: true,
    metro: true,
    flood: true,
    power: true,
  });

  const [activeTool, setActiveTool] = useState<'select' | 'measure' | 'draw' | null>(null);
  const [measureDistance, setMeasureDistance] = useState<string | null>(null);
  const [drawZoneActive, setDrawZoneActive] = useState<boolean>(false);
  const [mapSearchText, setMapSearchText] = useState('');
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(1.8, Math.max(0.8, prev + delta)));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setActiveTool(null);
    setMeasureDistance(null);
    setDrawZoneActive(false);
    setMapSearchText('');
    setSearchFeedback(null);
  };

  const handleMeasureClick = () => {
    if (activeTool === 'measure') {
      setActiveTool(null);
      setMeasureDistance(null);
    } else {
      setActiveTool('measure');
      setMeasureDistance('Measured corridor: 3.42 km (Est. Transit: 4.8 min)');
      setDrawZoneActive(false);
    }
  };

  const handleDrawClick = () => {
    if (activeTool === 'draw') {
      setActiveTool(null);
      setDrawZoneActive(false);
    } else {
      setActiveTool('draw');
      setDrawZoneActive(true);
      setMeasureDistance(null);
    }
  };

  const handleMapSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapSearchText.trim()) return;
    const q = mapSearchText.toLowerCase();
    const matchedRoad = roads.find(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.sector.toLowerCase().includes(q)
    );
    if (matchedRoad) {
      onSelectRoad(matchedRoad);
      setSearchFeedback(`Located: ${matchedRoad.name} (${matchedRoad.code})`);
      setTimeout(() => setSearchFeedback(null), 3000);
      return;
    }
    const matchedInc = incidents.find(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.sector.toLowerCase().includes(q)
    );
    if (matchedInc) {
      onSelectIncident(matchedInc);
      setSearchFeedback(`Located: ${matchedInc.title}`);
      setTimeout(() => setSearchFeedback(null), 3000);
      return;
    }
    setSearchFeedback(`No matching municipal asset found for "${mapSearchText}"`);
    setTimeout(() => setSearchFeedback(null), 3000);
  };

  // Helper functions for dynamic live road status colors
  const getRoadColor = (road?: RoadAsset, isSelected?: boolean) => {
    if (isSelected) return '#38bdf8'; // Active cyan selection
    if (!road) return '#10b981';
    switch (road.status) {
      case 'Full Closure':
        return '#ef4444'; // Red
      case 'Partial Closure':
        return '#f97316'; // Orange
      case 'Diversion':
        return '#f59e0b'; // Amber
      case 'Under Construction':
        return '#eab308'; // Yellow
      case 'Open':
      default:
        return '#10b981'; // Green
    }
  };

  const getRoadFilter = (road?: RoadAsset, isSelected?: boolean) => {
    if (isSelected) return 'url(#neon-glow-cyan)';
    if (!road) return 'url(#neon-glow-cyan)';
    if (road.status === 'Full Closure') return 'url(#neon-glow-red)';
    if (road.status === 'Partial Closure' || road.status === 'Diversion') return 'url(#neon-glow-amber)';
    return 'url(#neon-glow-cyan)';
  };

  const nh24Road = roads.find((r) => r.id === 'road-nh24');
  const mgRoad = roads.find((r) => r.id === 'road-mg');
  const riverRoad = roads.find((r) => r.id === 'road-river');
  const indRoad = roads.find((r) => r.id === 'road-ind');
  const parkRoad = roads.find((r) => r.id === 'road-park');

  return (
    <div className="relative flex-1 h-full min-h-[520px] rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#02050e] shadow-2xl flex flex-col justify-between group select-none">
      {/* 1. Map Top Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between gap-3 pointer-events-auto">
        {/* Search Map Bar */}
        <form onSubmit={handleMapSearchSubmit} className="relative max-w-sm w-full hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={mapSearchText}
            onChange={(e) => setMapSearchText(e.target.value)}
            placeholder="Search location, road, asset code, or sector..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#060c1d]/90 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-mono shadow-xl backdrop-blur-md"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:scale-110 transition-transform"
            title="Locate asset on map"
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* View Mode Pills (Live, Satellite, 3D, Heatmap, Layers) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#060c1d]/90 border border-slate-700/80 shadow-xl backdrop-blur-md text-[11px] font-mono">
          {(['live', 'satellite', '3d', 'heatmap'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setMapMode(mode)}
              className={`px-3 py-1 rounded-lg uppercase font-bold transition-all ${
                mapMode === mode
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}

          {/* Layers Toggle Button */}
          <div className="relative">
            <button
              onClick={() => setLayersMenuOpen(!layersMenuOpen)}
              className={`px-3 py-1 rounded-lg uppercase font-bold flex items-center gap-1.5 transition-all ${
                layersMenuOpen
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Layers</span>
            </button>

            {/* Layers Dropdown Menu */}
            {layersMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#060e24] border border-cyan-500/40 shadow-2xl p-2.5 z-40 text-left font-mono">
                <div className="text-[10px] text-slate-400 uppercase font-bold px-2 py-1 border-b border-slate-800 mb-1">
                  Active Display Layers
                </div>
                {[
                  { key: 'roads', label: 'Road Networks', color: 'text-cyan-400' },
                  { key: 'traffic', label: 'Traffic Velocity Heat', color: 'text-amber-400' },
                  { key: 'incidents', label: 'Hazards & Incidents', color: 'text-red-400' },
                  { key: 'cctv', label: 'CCTV Camera Nodes', color: 'text-blue-400' },
                  { key: 'metro', label: 'Metro & Maglev Lines', color: 'text-purple-400' },
                  { key: 'flood', label: 'Flood Risk Channels', color: 'text-sky-400' },
                  { key: 'power', label: 'Power Grid Substations', color: 'text-yellow-400' },
                ].map((lyr) => (
                  <label
                    key={lyr.key}
                    className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-900 cursor-pointer text-xs text-slate-300"
                  >
                    <span className={lyr.color}>{lyr.label}</span>
                    <input
                      type="checkbox"
                      checked={activeLayers[lyr.key as keyof typeof activeLayers]}
                      onChange={() => toggleLayer(lyr.key as keyof typeof activeLayers)}
                      className="accent-cyan-500 w-3.5 h-3.5"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Left Floating Tool Icons (Zoom, Draw, Measure, Filter, Reset) */}
      <div className="absolute left-3 top-20 z-20 flex flex-col gap-1.5 p-1 rounded-2xl bg-[#060c1d]/90 border border-slate-700/80 shadow-2xl backdrop-blur-md">
        <button
          onClick={() => handleZoom(0.15)}
          className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleZoom(-0.15)}
          className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <div className="w-full h-px bg-slate-800 my-0.5" />

        <button
          onClick={handleDrawClick}
          className={`p-2 rounded-xl transition-colors ${
            activeTool === 'draw'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800'
          }`}
          title="Draw Operational Perimeter Zone"
        >
          <PenTool className="w-4 h-4" />
        </button>

        <button
          onClick={handleMeasureClick}
          className={`p-2 rounded-xl transition-colors ${
            activeTool === 'measure'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800'
          }`}
          title="Measure Corridor Distance"
        >
          <Ruler className="w-4 h-4" />
        </button>

        <button
          onClick={() => setLayersMenuOpen(!layersMenuOpen)}
          className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
          title="Filter Infrastructure Layers"
        >
          <Filter className="w-4 h-4" />
        </button>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Measurement Banner Overlay if active */}
      {measureDistance && (
        <div className="absolute top-16 left-16 z-30 px-3.5 py-1.5 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-200 text-xs font-mono shadow-xl animate-in fade-in">
          📏 {measureDistance}
        </div>
      )}

      {/* Draw Perimeter Zone Banner if active */}
      {drawZoneActive && (
        <div className="absolute top-16 left-16 z-30 px-3.5 py-1.5 rounded-xl bg-purple-950 border border-purple-400 text-purple-200 text-xs font-mono shadow-xl animate-in fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>Active Perimeter Zone Defined: Sector 8 Marina Security Buffer (4.8 sq km)</span>
        </div>
      )}

      {/* Search Feedback Banner */}
      {searchFeedback && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/60 text-cyan-200 text-xs font-mono shadow-2xl animate-in fade-in">
          🔍 {searchFeedback}
        </div>
      )}

      {/* 3. Interactive SVG Digital Twin Map Canvas */}
      <div
        className="relative w-full h-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg
          viewBox="0 0 1000 680"
          className="w-full h-full object-cover"
          style={{ minHeight: '520px' }}
        >
          <defs>
            {/* Dark Grid Background Pattern */}
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={mapMode === 'satellite' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(6, 182, 212, 0.05)'}
                strokeWidth="1"
              />
            </pattern>

            {/* Glowing neon path filters */}
            <filter id="neon-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="neon-glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="neon-glow-amber" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="neon-glow-yellow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Map Background (Deep Navy or Satellite Texture) */}
          <rect width="1000" height="680" fill={mapMode === 'satellite' ? '#020b18' : '#030814'} />
          <rect width="1000" height="680" fill="url(#grid-pattern)" />

          {/* Water Body / Estuary River with organic curve */}
          <path
            d="M 680,0 C 720,120 690,260 740,380 C 780,480 840,580 920,680 L 1000,680 L 1000,0 Z"
            fill={mapMode === 'satellite' ? '#041c38' : '#051937'}
            fillOpacity="0.8"
            stroke="#0284c7"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Metro Lines (Purple Neon dashed) */}
          {activeLayers.metro && (
            <g id="metro-routes" opacity="0.85">
              <path
                d="M 120,580 L 320,440 L 420,280 L 640,160 L 880,120"
                fill="none"
                stroke="#a855f7"
                strokeWidth="4"
                strokeDasharray="8 6"
              />
              <path
                d="M 420,280 L 440,460 L 620,580"
                fill="none"
                stroke="#c084fc"
                strokeWidth="3.5"
                strokeDasharray="6 4"
              />
            </g>
          )}

          {/* Power Grid Transmission Layer */}
          {activeLayers.power && (
            <g id="power-grid-layer" opacity="0.85">
              <path
                d="M 80,180 L 260,240 L 460,340 L 680,240 L 880,360"
                fill="none"
                stroke="#eab308"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <path
                d="M 260,240 L 340,520 L 580,620"
                fill="none"
                stroke="#facc15"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
              {/* Substation 1: Sector 12 */}
              <g transform="translate(260, 240)">
                <circle r="7" fill="#eab308" className="animate-pulse" filter="url(#neon-glow-yellow)" />
                <text x="12" y="4" fill="#fef08a" fontSize="9" fontFamily="monospace">SUB-12 (420MW)</text>
              </g>
              {/* Substation 2: River Shore */}
              <g transform="translate(680, 240)">
                <circle r="6" fill="#eab308" filter="url(#neon-glow-yellow)" />
                <text x="12" y="4" fill="#fef08a" fontSize="9" fontFamily="monospace">SUB-04 (280MW)</text>
              </g>
            </g>
          )}

          {/* Flood Risk Channels & Stormwater Retention */}
          {activeLayers.flood && (
            <g id="flood-channels-layer" opacity="0.9">
              <path
                d="M 520,440 L 640,490 L 740,460 L 820,440"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeDasharray="8 4"
              />
              <g transform="translate(740, 460)">
                <circle r="9" fill="#0284c7" opacity="0.6" className="animate-ping" />
                <circle r="5" fill="#38bdf8" />
                <text x="12" y="4" fill="#bae6fd" fontSize="9" fontFamily="monospace">PUMP P-17</text>
              </g>
            </g>
          )}

          {/* Traffic Velocity Heatmap Overlay (When mapMode === 'heatmap') */}
          {mapMode === 'heatmap' && (
            <g id="traffic-heatmap-layer" opacity="0.75">
              <path
                d="M 100,620 L 440,460 L 620,580 L 920,640"
                fill="none"
                stroke="#ef4444"
                strokeWidth="26"
                strokeLinecap="round"
                opacity="0.55"
              />
              <path
                d="M 440,460 L 440,140 L 220,60"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="20"
                strokeLinecap="round"
                opacity="0.5"
              />
              <path
                d="M 220,60 L 300,320 L 440,460"
                fill="none"
                stroke="#10b981"
                strokeWidth="16"
                strokeLinecap="round"
                opacity="0.45"
              />
            </g>
          )}

          {/* City Arterial Roads Network */}
          {activeLayers.roads && (
            <g id="road-network">
              {/* Arterial 1: NH-24 Elevated Expressway (Red/Amber closure segment) */}
              <path
                d="M 100,620 L 440,460 L 620,580 L 920,640"
                fill="none"
                stroke={getRoadColor(nh24Road, selectedRoadId === 'road-nh24')}
                strokeWidth={selectedRoadId === 'road-nh24' ? '12' : '8'}
                strokeLinecap="round"
                filter={getRoadFilter(nh24Road, selectedRoadId === 'road-nh24')}
                className="cursor-pointer transition-all hover:stroke-width-12"
                onClick={() => {
                  if (nh24Road) onSelectRoad(nh24Road);
                }}
              />

              {/* Arterial 2: MG Road Central Transit Boulevard (Smooth Green flow) */}
              <path
                d="M 440,460 L 440,140 L 220,60"
                fill="none"
                stroke={getRoadColor(mgRoad, selectedRoadId === 'road-mg')}
                strokeWidth={selectedRoadId === 'road-mg' ? '12' : '8'}
                strokeLinecap="round"
                filter={getRoadFilter(mgRoad, selectedRoadId === 'road-mg')}
                className="cursor-pointer transition-all hover:stroke-width-12"
                onClick={() => {
                  if (mgRoad) onSelectRoad(mgRoad);
                }}
              />

              {/* Arterial 3: Marina River Bridge (Orange Diversion) */}
              <path
                d="M 620,580 L 740,520 L 860,540 L 980,520"
                fill="none"
                stroke={getRoadColor(riverRoad, selectedRoadId === 'road-river')}
                strokeWidth={selectedRoadId === 'road-river' ? '12' : '8'}
                strokeLinecap="round"
                filter={getRoadFilter(riverRoad, selectedRoadId === 'road-river')}
                className="cursor-pointer transition-all hover:stroke-width-12"
                onClick={() => {
                  if (riverRoad) onSelectRoad(riverRoad);
                }}
              />

              {/* Arterial 4: Industrial Logistics Ring */}
              <path
                d="M 120,420 L 260,720 L 460,660"
                fill="none"
                stroke={getRoadColor(indRoad, selectedRoadId === 'road-ind')}
                strokeWidth="6"
                strokeLinecap="round"
                filter={getRoadFilter(indRoad, selectedRoadId === 'road-ind')}
                className="cursor-pointer transition-all"
                onClick={() => {
                  if (indRoad) onSelectRoad(indRoad);
                }}
              />

              {/* Arterial 5: Eco-Park Perimeter */}
              <path
                d="M 220,60 L 300,320 L 440,460"
                fill="none"
                stroke={getRoadColor(parkRoad, selectedRoadId === 'road-park')}
                strokeWidth="6"
                strokeLinecap="round"
                filter={getRoadFilter(parkRoad, selectedRoadId === 'road-park')}
                className="cursor-pointer transition-all"
                onClick={() => {
                  if (parkRoad) onSelectRoad(parkRoad);
                }}
              />

              {/* Secondary Street Meshes */}
              <g stroke="rgba(56, 189, 248, 0.25)" strokeWidth="2.5" fill="none">
                <line x1="280" y1="200" x2="520" y2="200" />
                <line x1="280" y1="360" x2="580" y2="360" />
                <line x1="320" y1="120" x2="320" y2="440" />
                <line x1="520" y1="140" x2="520" y2="480" />
                <line x1="620" y1="320" x2="800" y2="320" />
                <line x1="720" y1="200" x2="720" y2="440" />
              </g>
            </g>
          )}

          {/* Traffic Flow Particles / Animated Pulses */}
          {activeLayers.traffic && (
            <g id="traffic-pulses">
              <circle cx="440" cy="300" r="5" fill="#10b981" className="animate-ping" />
              <circle cx="620" cy="580" r="6" fill="#ef4444" className="animate-pulse" />
              <circle cx="740" cy="520" r="5" fill="#f59e0b" className="animate-ping" />
            </g>
          )}

          {/* Operational Drawn Perimeter Polygon */}
          {drawZoneActive && (
            <g id="drawn-perimeter-zone">
              <polygon
                points="560,400 760,360 880,500 700,600"
                fill="rgba(168, 85, 247, 0.2)"
                stroke="#c084fc"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />
              <circle cx="560" cy="400" r="4" fill="#a855f7" />
              <circle cx="760" cy="360" r="4" fill="#a855f7" />
              <circle cx="880" cy="500" r="4" fill="#a855f7" />
              <circle cx="700" cy="600" r="4" fill="#a855f7" />
            </g>
          )}

          {/* 3D Isometric Buildings Silhouette (Cyberpunk Wireframes) */}
          {(mapMode === '3d' || mapMode === 'live') && (
            <g id="3d-buildings" fill="rgba(8, 28, 60, 0.6)" stroke="#0ea5e9" strokeWidth="1">
              {/* Cluster 1: Central Spire */}
              <polygon points="460,240 480,210 500,240 500,320 460,320" />
              <polygon points="480,210 500,240 520,220 500,190" />
              {/* Cluster 2: Commercial Tower */}
              <polygon points="360,280 390,260 410,290 410,360 360,360" />
              {/* Cluster 3: Marina Towers */}
              <polygon points="780,260 810,240 830,270 830,340 780,340" />
              <polygon points="840,280 870,260 890,290 890,360 840,360" />
            </g>
          )}
        </svg>

        {/* 4. Interactive Floating Callout Badges on the Map (Matching user screenshot) */}

        {/* Callout 1: Central Metro Station */}
        {activeLayers.metro && (
          <div
            className="absolute top-[28%] left-[38%] z-20 p-2.5 rounded-2xl bg-[#06102a]/95 border border-blue-500/80 shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 transition-transform flex items-center gap-3"
            onClick={() => {
              const r = roads.find((x) => x.id === 'road-metro');
              if (r) onSelectRoad(r);
            }}
          >
            <div className="p-2 rounded-xl bg-blue-600/30 border border-blue-400 text-blue-300">
              <Train className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                <span>Central Metro Station</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Operational</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                2,415 passengers/hr
              </div>
            </div>
          </div>
        )}

        {/* Callout 2: Smart Traffic Signal */}
        {activeLayers.traffic && (
          <div
            className="absolute top-[36%] left-[54%] z-20 p-2.5 rounded-2xl bg-[#06102a]/95 border border-emerald-500/80 shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 transition-transform flex items-center gap-3"
            onClick={() => {
              const r = roads.find((x) => x.id === 'road-mg');
              if (r) onSelectRoad(r);
            }}
          >
            <div className="p-2 rounded-xl bg-emerald-600/30 border border-emerald-400 text-emerald-300">
              <TrafficCone className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100">
                Smart Traffic Signal
              </div>
              <div className="text-[10px] font-mono text-cyan-300 font-bold">
                AI Optimized
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                Traffic: 72%
              </div>
            </div>
          </div>
        )}

        {/* Callout 3: Flood Risk Zone (Riverside Area - Sector 8) */}
        {activeLayers.flood && (
          <div
            className="absolute top-[52%] left-[64%] z-20 p-3 rounded-2xl bg-gradient-to-r from-red-950/95 via-[#0e0712]/95 to-slate-950 border-2 border-red-500 shadow-2xl shadow-red-950/80 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform flex items-center gap-3 animate-pulse"
            onClick={() => {
              const inc = incidents.find((x) => x.id === 'INC-2026-0928-0142');
              if (inc) onSelectIncident(inc);
            }}
          >
            <div className="p-2 rounded-xl bg-red-900/60 border border-red-400 text-red-300">
              <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce-slow" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-red-200 uppercase tracking-tight flex items-center gap-1.5">
                <span>Flood Risk Zone</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <div className="text-[11px] font-mono text-slate-200">
                Water Level: <strong className="text-red-400">3.2m</strong>
              </div>
              <div className="text-[10px] font-mono text-red-300 font-bold uppercase">
                Risk: High • Sector 8
              </div>
            </div>
          </div>
        )}

        {/* Callout 4: Road Accident (NH-24 Flyover) */}
        {activeLayers.incidents && (
          <div
            className="absolute top-[68%] left-[48%] z-20 p-2.5 rounded-2xl bg-[#06102a]/95 border border-amber-500/80 shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 transition-transform flex items-center gap-2.5"
            onClick={() => {
              const inc = incidents.find((x) => x.id === 'INC-2026-0928-0143');
              if (inc) onSelectIncident(inc);
            }}
          >
            <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/50">
              <Car className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-200">
                NH-24 Flyover Accident
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                Partial lane blocked • Queue 1.8km
              </div>
            </div>
          </div>
        )}

        {/* CCTV Camera Pins across the map */}
        {activeLayers.cctv &&
          cctvFeeds.map((cam) => (
            <button
              key={cam.id}
              onClick={() => onSelectCctv(cam)}
              className="absolute z-20 p-1.5 rounded-full bg-slate-950/90 border border-cyan-400 hover:border-cyan-300 hover:scale-125 transition-transform shadow-lg group"
              style={{ top: `${cam.coordinates.y}%`, left: `${cam.coordinates.x}%` }}
              title={`View Live CCTV: ${cam.name} (${cam.code})`}
            >
              <Video className="w-3 h-3 text-cyan-400 group-hover:text-cyan-200" />
            </button>
          ))}
      </div>

      {/* 5. Bottom Map Overlays: Radar Legend & Live Data Stream Badge */}
      <div className="absolute bottom-3 left-3 right-3 z-30 flex items-end justify-between pointer-events-none">
        {/* Bottom Left: Mini Layer Legend */}
        <div className="p-2.5 rounded-2xl bg-[#060c1d]/90 border border-slate-700/80 shadow-2xl backdrop-blur-md pointer-events-auto flex items-center gap-3 text-[10px] font-mono text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Traffic</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span>Water Level</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span>Power Grid</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>CCTV</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span>Incidents</span>
          </div>
        </div>

        {/* Bottom Right: Live Data Stream Badge */}
        <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 shadow-xl backdrop-blur-md pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Data Stream</span>
        </div>
      </div>
    </div>
  );
};
