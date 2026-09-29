import React from 'react';
import {
  Users,
  Car,
  Zap,
  Droplets,
  Leaf,
  AlertOctagon,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface IcccKpiStripProps {
  activeIncidentsCount: number;
  criticalIncidentsCount: number;
  trafficFlowPct: number;
  gridPowerGw: number;
  waterSupplyMl: number;
  airQualityAqi: number;
  cityHealthPct: number;
  onFilterIncidents?: () => void;
  onFilterTraffic?: () => void;
}

export const IcccKpiStrip: React.FC<IcccKpiStripProps> = ({
  activeIncidentsCount,
  criticalIncidentsCount,
  trafficFlowPct,
  gridPowerGw,
  waterSupplyMl,
  airQualityAqi,
  cityHealthPct,
  onFilterIncidents,
  onFilterTraffic,
}) => {
  const kpis = [
    {
      id: 'population',
      label: 'Population',
      value: '1.24M',
      delta: '+1.2%',
      isPositive: true,
      sublabel: 'Active Residents',
      icon: <Users className="w-4 h-4 text-blue-400" />,
      borderGlow: 'hover:border-blue-500/40',
      badgeBg: 'bg-blue-500/10 text-blue-300',
    },
    {
      id: 'traffic',
      label: 'Traffic Flow',
      value: `${trafficFlowPct}%`,
      delta: 'Smooth',
      isPositive: true,
      sublabel: 'Arterial Density',
      icon: <Car className="w-4 h-4 text-emerald-400" />,
      borderGlow: 'hover:border-emerald-500/40',
      badgeBg: 'bg-emerald-500/10 text-emerald-300',
      onClick: onFilterTraffic,
    },
    {
      id: 'power',
      label: 'Power Supply',
      value: `${gridPowerGw.toFixed(2)} GW`,
      delta: '98% Clean',
      isPositive: true,
      sublabel: 'Solar + Salt Buffers',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      borderGlow: 'hover:border-amber-500/40',
      badgeBg: 'bg-amber-500/10 text-amber-300',
    },
    {
      id: 'water',
      label: 'Water Supply',
      value: `${waterSupplyMl.toFixed(1)}M L`,
      delta: '99% Purified',
      isPositive: true,
      sublabel: 'Potable Aqueduct',
      icon: <Droplets className="w-4 h-4 text-cyan-400" />,
      borderGlow: 'hover:border-cyan-500/40',
      badgeBg: 'bg-cyan-500/10 text-cyan-300',
    },
    {
      id: 'air',
      label: 'Air Quality',
      value: `AQI ${airQualityAqi}`,
      delta: 'Good',
      isPositive: true,
      sublabel: 'PM2.5: 8.2 µg/m³',
      icon: <Leaf className="w-4 h-4 text-green-400" />,
      borderGlow: 'hover:border-green-500/40',
      badgeBg: 'bg-green-500/10 text-green-300',
    },
    {
      id: 'incidents',
      label: 'Active Incidents',
      value: `${activeIncidentsCount}`,
      delta: `${criticalIncidentsCount} Critical`,
      isPositive: false,
      sublabel: '1 Dispatched, 2 Monitored',
      icon: <AlertOctagon className="w-4 h-4 text-red-400 animate-pulse" />,
      borderGlow: 'border-red-500/40 hover:border-red-500/70',
      badgeBg: 'bg-red-500/20 text-red-300',
      pulseDot: true,
      onClick: onFilterIncidents,
    },
    {
      id: 'health',
      label: 'City Health',
      value: `${cityHealthPct.toFixed(1)}%`,
      delta: 'Operational',
      isPositive: true,
      sublabel: '14,200 Connected Nodes',
      icon: <Activity className="w-4 h-4 text-cyan-300 animate-pulse" />,
      borderGlow: 'hover:border-cyan-500/40',
      badgeBg: 'bg-cyan-500/10 text-cyan-300',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 px-4 pt-3 pb-2 max-w-[1920px] mx-auto">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          onClick={kpi.onClick}
          className={`p-3 rounded-2xl bg-[#060c1e]/90 border border-slate-800/90 transition-all duration-200 ${
            kpi.borderGlow
          } ${
            kpi.onClick ? 'cursor-pointer hover:-translate-y-0.5 shadow-md hover:bg-slate-900/60' : ''
          }`}
        >
          <div className="flex items-center justify-between gap-1.5 mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-lg bg-slate-950 border border-slate-800">
                {kpi.icon}
              </div>
              <span className="text-[11px] font-mono text-slate-400 font-medium truncate">
                {kpi.label}
              </span>
            </div>

            {kpi.pulseDot && (
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping shrink-0" />
            )}
          </div>

          <div className="flex items-baseline justify-between gap-1">
            <span className="text-base sm:text-lg font-extrabold text-slate-100 font-mono tracking-tight">
              {kpi.value}
            </span>

            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md ${kpi.badgeBg}`}
            >
              {kpi.delta}
            </span>
          </div>

          <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
            {kpi.sublabel}
          </div>
        </div>
      ))}
    </div>
  );
};
