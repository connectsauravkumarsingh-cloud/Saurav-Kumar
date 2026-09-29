import React, { useState } from 'react';
import {
  Waves,
  Activity,
  Wind,
  Flame,
  SunMedium,
  Zap,
  Mountain,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  X,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import { DisasterCardData, AlertSeverity } from '../../types/disaster';

interface HazardMonitoringCardsProps {
  cards: DisasterCardData[];
  onSelectHazard?: (card: DisasterCardData) => void;
}

export const HazardMonitoringCards: React.FC<HazardMonitoringCardsProps> = ({
  cards,
  onSelectHazard,
}) => {
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState<string>('all');
  const [activeModalCard, setActiveModalCard] = useState<DisasterCardData | null>(null);

  const getIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Waves':
        return <Waves className={`${className} text-cyan-400`} />;
      case 'Activity':
        return <Activity className={`${className} text-amber-400`} />;
      case 'Wind':
        return <Wind className={`${className} text-sky-400`} />;
      case 'Flame':
        return <Flame className={`${className} text-red-400`} />;
      case 'SunMedium':
        return <SunMedium className={`${className} text-orange-400`} />;
      case 'Zap':
        return <Zap className={`${className} text-amber-400`} />;
      case 'Mountain':
        return <Mountain className={`${className} text-emerald-400`} />;
      default:
        return <AlertTriangle className={`${className} text-cyan-400`} />;
    }
  };

  const getSeverityBadge = (level: AlertSeverity) => {
    switch (level) {
      case 'critical':
        return {
          label: 'CRITICAL',
          classes: 'bg-red-950/80 border-red-500/80 text-red-300',
          dot: 'bg-red-500 animate-ping',
        };
      case 'warning':
        return {
          label: 'WARNING',
          classes: 'bg-amber-950/80 border-amber-500/80 text-amber-300',
          dot: 'bg-amber-500 animate-pulse',
        };
      case 'advisory':
        return {
          label: 'ADVISORY',
          classes: 'bg-cyan-950/80 border-cyan-500/80 text-cyan-300',
          dot: 'bg-cyan-400',
        };
      case 'safe':
      default:
        return {
          label: 'SAFE',
          classes: 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300',
          dot: 'bg-emerald-400',
        };
    }
  };

  const filteredCards = cards.filter((c) => {
    if (selectedSeverityFilter === 'all') return true;
    return c.alertLevel === selectedSeverityFilter;
  });

  return (
    <div className="space-y-6">
      {/* Filter and Overview Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Hazard Surveillance Matrix
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            7 Multi-Hazard Domains Connected to 14,200 Environmental IoT Sensors
          </p>
        </div>

        {/* Severity Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          {[
            { id: 'all', label: 'All Hazards (7)' },
            { id: 'critical', label: 'Critical' },
            { id: 'warning', label: 'Warning' },
            { id: 'advisory', label: 'Advisory' },
            { id: 'safe', label: 'Safe' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSeverityFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedSeverityFilter === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 7 Hazard Monitoring Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => {
          const badge = getSeverityBadge(card.alertLevel);
          return (
            <div
              key={card.id}
              onClick={() => {
                setActiveModalCard(card);
                if (onSelectHazard) onSelectHazard(card);
              }}
              className={`group relative rounded-2xl glass-panel p-5 sm:p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 ${
                card.alertLevel === 'critical'
                  ? 'border-red-500/60 hover:border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.2)]'
                  : card.alertLevel === 'warning'
                  ? 'border-amber-500/50 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                  : 'border-slate-800 hover:border-cyan-500/50'
              }`}
            >
              {/* Card Top: Icon & Severity Badge */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-700/80 group-hover:border-cyan-500/50 transition-colors">
                    {getIcon(card.iconName)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badge.classes}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>

                {/* Name & Headline */}
                <h4 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-1 text-left">
                  {card.name}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 text-left mb-4">
                  {card.headline}
                </p>

                {/* Location & Timestamp */}
                <div className="space-y-1.5 mb-4 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{card.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Updated: {card.lastUpdated}</span>
                  </div>
                </div>

                {/* Key Sensor Measurements (2 highlights) */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4 text-left">
                  {card.measurements.slice(0, 2).map((m, idx) => (
                    <div key={idx}>
                      <div className="text-[10px] font-mono text-slate-400 truncate">{m.label}</div>
                      <div className="text-base font-bold font-mono text-cyan-300">
                        {m.value}{' '}
                        <span className="text-[10px] font-sans text-slate-400">{m.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: AI Risk Verdict + Inspect Button */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400">
                  AI Confidence: {card.confidenceScore}%
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span>Inspect Domain</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Modal */}
      {activeModalCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl glass-panel border border-cyan-400/50 p-6 sm:p-8 bg-[#070e1e] text-left shadow-2xl overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-700">
                  {getIcon(activeModalCard.iconName, 'w-7 h-7')}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getSeverityBadge(activeModalCard.alertLevel).classes}`}>
                      {getSeverityBadge(activeModalCard.alertLevel).label}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Telemetry Ingestion: Active</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">{activeModalCard.name}</h3>
                  <p className="text-xs font-mono text-cyan-400">{activeModalCard.location}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalCard(null)}
                className="p-2 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scientific Note if Earthquake */}
            {activeModalCard.scientificNote && (
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 mb-6 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200 leading-relaxed font-mono">
                  {activeModalCard.scientificNote}
                </p>
              </div>
            )}

            {/* 4 Sensor Measurements Grid */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Environmental Sensor Readings</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeModalCard.measurements.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 truncate">{m.label}</div>
                    <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
                      {m.value}{' '}
                      <span className="text-xs font-sans text-slate-400">{m.unit}</span>
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 mt-1">
                      Threshold: {m.threshold}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Risk Analysis */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 mb-6 space-y-1.5">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold">
                AI Cognitive Hazard Forecast
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed font-mono">
                {activeModalCard.aiRiskAnalysis}
              </p>
            </div>

            {/* Safety Checklist */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">
                Recommended Safety Precautions &amp; Actions
              </h4>
              {activeModalCard.recommendedPrecautions.map((pre, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pre}</span>
                </div>
              ))}
            </div>

            {/* Modal Bottom Close */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModalCard(null)}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Close Domain Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
