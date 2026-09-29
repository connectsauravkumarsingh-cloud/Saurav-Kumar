import React, { useState } from 'react';
import {
  CctvFeed,
  IncidentRecord,
} from '../../data/commandCenterData';
import {
  Video,
  AlertTriangle,
  Flame,
  Activity,
  Car,
  Zap,
  Droplets,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Clock,
  Radio,
  Maximize2,
} from 'lucide-react';

interface IcccBottomDockProps {
  cctvFeeds: CctvFeed[];
  onSelectCctv: (cctv: CctvFeed) => void;
  incidents: IncidentRecord[];
  onSelectIncident: (incident: IncidentRecord) => void;
  onViewAllIncidents: () => void;
  onViewAllCctv?: () => void;
}

export const IcccBottomDock: React.FC<IcccBottomDockProps> = ({
  cctvFeeds,
  onSelectCctv,
  incidents,
  onSelectIncident,
  onViewAllIncidents,
  onViewAllCctv,
}) => {
  const [cctvPageIndex, setCctvPageIndex] = useState(0);
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'24H' | '7D' | 'LIVE'>('24H');

  const pageSize = 6;
  const maxPages = Math.max(1, Math.ceil(cctvFeeds.length / pageSize));
  const displayedCctv = cctvFeeds.slice(cctvPageIndex * pageSize, (cctvPageIndex + 1) * pageSize);

  const handleNextCctvPage = () => {
    setCctvPageIndex((prev) => (prev + 1) % maxPages);
  };

  const handlePrevCctvPage = () => {
    setCctvPageIndex((prev) => (prev - 1 + maxPages) % maxPages);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-3">
      {/* 1. Live CCTV Feeds (Left: 4 Cols) */}
      <div className="lg:col-span-4 rounded-3xl p-4 bg-[#050b1a] border border-cyan-500/20 shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-100 font-mono">
              Live CCTV Feeds
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onViewAllCctv) {
                  onViewAllCctv();
                } else if (cctvFeeds.length > 0) {
                  onSelectCctv(cctvFeeds[0]);
                }
              }}
              className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              View All ({cctvFeeds.length}) &gt;
            </button>
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handlePrevCctvPage}
                className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Previous CCTV page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[9px] font-mono text-slate-500 px-0.5">
                {cctvPageIndex + 1}/{maxPages}
              </span>
              <button
                onClick={handleNextCctvPage}
                className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Next CCTV page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 CCTV Camera Thumbnails Grid */}
        <div className="grid grid-cols-3 gap-2 my-2.5">
          {displayedCctv.map((cam) => (
            <div
              key={cam.id}
              onClick={() => onSelectCctv(cam)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-400 bg-slate-950 transition-all hover:scale-[1.03] shadow-md flex flex-col justify-between"
            >
              {/* Simulated Video Display Thumbnail with scanline overlay */}
              <div
                className={`h-16 relative bg-gradient-to-br ${cam.thumbnailGradient} flex items-center justify-center overflow-hidden`}
              >
                {/* Scanline pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-40 pointer-events-none" />

                {/* Animated vehicle simulation particle */}
                <div className="w-2 h-2 rounded-full bg-cyan-400/80 animate-ping absolute top-3 left-4" />
                <div className="w-2 h-2 rounded-full bg-amber-400/80 animate-pulse absolute bottom-3 right-5" />

                <span className="absolute top-1 right-1 px-1 rounded bg-red-600/90 text-white font-mono text-[8px] font-extrabold tracking-wider">
                  LIVE
                </span>

                <Maximize2 className="w-4 h-4 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />

                <div className="absolute bottom-1 left-1.5 text-[8px] font-mono text-slate-300 drop-shadow">
                  {cam.code}
                </div>
              </div>

              {/* Camera Name Footer */}
              <div className="p-1.5 bg-[#060c1d] border-t border-slate-900 text-center">
                <div className="text-[10px] font-mono font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                  {cam.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
          <span>All {cctvFeeds.length} PTZ Units Online</span>
          <span className="text-emerald-400 font-bold">100% Fiber Link</span>
        </div>
      </div>

      {/* 2. Active Incidents Feed (Center-Left: 4 Cols) */}
      <div className="lg:col-span-4 rounded-3xl p-4 bg-[#050b1a] border border-red-500/20 shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-100 font-mono">
              Active Incidents ({incidents.length})
            </h4>
          </div>

          <button
            onClick={onViewAllIncidents}
            className="text-[10px] font-mono text-red-400 hover:text-red-300 hover:underline"
          >
            View All &gt;
          </button>
        </div>

        {/* Incident List */}
        <div className="space-y-2 my-2.5 max-h-52 overflow-y-auto scrollbar-thin">
          {incidents.map((inc) => {
            const isCritical = inc.severity === 'Critical';
            const isHigh = inc.severity === 'High';

            return (
              <div
                key={inc.id}
                onClick={() => onSelectIncident(inc)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer hover:scale-[1.01] flex items-center justify-between gap-3 ${
                  isCritical
                    ? 'border-red-500/60 bg-red-950/30 hover:bg-red-950/50'
                    : isHigh
                    ? 'border-amber-500/50 bg-amber-950/20 hover:bg-amber-950/40'
                    : 'border-slate-800 bg-slate-950/70 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      isCritical
                        ? 'bg-red-950 text-red-400 border border-red-500/50'
                        : isHigh
                        ? 'bg-amber-950 text-amber-400 border border-amber-500/50'
                        : 'bg-blue-950 text-blue-400 border border-blue-500/50'
                    }`}
                  >
                    {isCritical ? (
                      <Flame className="w-4 h-4" />
                    ) : isHigh ? (
                      <Car className="w-4 h-4" />
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100 truncate">
                        {inc.type}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase ${
                          isCritical
                            ? 'border-red-500 bg-red-950 text-red-200'
                            : isHigh
                            ? 'border-amber-500 bg-amber-950 text-amber-200'
                            : 'border-cyan-500 bg-cyan-950 text-cyan-200'
                        }`}
                      >
                        {inc.severity}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-slate-300 truncate">
                      {inc.location}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 text-right shrink-0">
                  <div>{inc.timeAgo}</div>
                  <div className="text-cyan-400 text-[9px] font-bold">Inspect →</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
          <span>Incident Command AI Active</span>
          <span className="text-red-400 font-bold">1 Critical Sector</span>
        </div>
      </div>

      {/* 3. City Analytics (Live) (Center-Right: 4 Cols matching reference image) */}
      <div className="lg:col-span-4 rounded-3xl p-4 bg-[#050b1a] border border-cyan-500/20 shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-100 font-mono">
              City Analytics (Live)
            </h4>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono">
            {(['24H', '7D', 'LIVE'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setAnalyticsTimeframe(tf)}
                className={`px-2 py-0.5 rounded transition-all font-bold ${
                  analyticsTimeframe === tf
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Quick Analytics Metric Cards */}
        <div className="grid grid-cols-4 gap-2 my-2 text-center font-mono">
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[9px] text-slate-500 flex items-center justify-center gap-1">
              <Car className="w-3 h-3 text-amber-400" />
              <span>Speed</span>
            </div>
            <div className="text-xs font-extrabold text-slate-100 mt-0.5">
              42 km/h
            </div>
            <div className="text-[9px] text-emerald-400">+12%</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[9px] text-slate-500 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>Clean</span>
            </div>
            <div className="text-xs font-extrabold text-slate-100 mt-0.5">
              78%
            </div>
            <div className="text-[9px] text-emerald-400">+5%</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[9px] text-slate-500 flex items-center justify-center gap-1">
              <Droplets className="w-3 h-3 text-blue-400" />
              <span>Water</span>
            </div>
            <div className="text-xs font-extrabold text-slate-100 mt-0.5">
              312 ML
            </div>
            <div className="text-[9px] text-cyan-400">-8%</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[9px] text-slate-500 flex items-center justify-center gap-1">
              <Trash2 className="w-3 h-3 text-emerald-400" />
              <span>Waste</span>
            </div>
            <div className="text-xs font-extrabold text-slate-100 mt-0.5">
              420 T
            </div>
            <div className="text-[9px] text-emerald-400">+10%</div>
          </div>
        </div>

        {/* 24h Multi-Metric Wave Sparkline SVG Canvas */}
        <div className="h-20 w-full relative pt-1">
          <svg viewBox="0 0 400 80" className="w-full h-full">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <line x1="0" y1="45" x2="400" y2="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

            {/* Wave 1: Traffic Load (Yellow) */}
            <path
              d="M 0,55 Q 60,30 120,40 T 240,25 T 320,60 T 400,35"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
            />

            {/* Wave 2: Renewable Power (Green/Cyan) */}
            <path
              d="M 0,35 Q 80,60 160,20 T 280,15 T 360,45 T 400,20"
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
            />

            {/* Wave 3: Water Demand (Blue) */}
            <path
              d="M 0,65 Q 100,50 180,65 T 290,40 T 360,55 T 400,60"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />

            {/* Wave 4: Air Quality (Purple) */}
            <path
              d="M 0,25 Q 70,45 140,30 T 260,60 T 350,25 T 400,45"
              fill="none"
              stroke="#c084fc"
              strokeWidth="1.5"
            />
          </svg>

          {/* Sparkline Legend */}
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-amber-400" />
              <span>Traffic</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-emerald-400" />
              <span>Power</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-sky-400" />
              <span>Water</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-purple-400" />
              <span>Air</span>
            </span>
            <span className="text-slate-400">{analyticsTimeframe === '7D' ? 'Last 7 Days' : '00:00 - 24:00'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
