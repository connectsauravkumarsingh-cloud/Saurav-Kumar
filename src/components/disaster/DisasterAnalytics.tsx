import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  Activity,
  Zap,
  TrendingDown,
  Clock,
  ShieldCheck,
  Server,
  Ambulance,
  Waves,
  HeartPulse,
} from 'lucide-react';

export const DisasterAnalytics: React.FC = () => {
  // Simulated Multi-Hazard Time-Series Data (24-Hour Horizon)
  const hazardTimelineData = [
    { time: '00:00', rain: 12, river: 2.1, seismic: 0.01, wind: 35 },
    { time: '03:00', rain: 18, river: 2.3, seismic: 0.01, wind: 42 },
    { time: '06:00', rain: 28, river: 2.7, seismic: 0.02, wind: 58 },
    { time: '09:00', rain: 52, river: 3.4, seismic: 0.02, wind: 74 },
    { time: '12:00', rain: 82, river: 4.8, seismic: 0.03, wind: 118 },
    { time: '15:00', rain: 76, river: 4.7, seismic: 0.02, wind: 110 },
    { time: '18:00', rain: 45, river: 4.1, seismic: 0.01, wind: 85 },
    { time: '21:00', rain: 22, river: 3.2, seismic: 0.01, wind: 48 },
  ];

  // Response Time Comparison: Nexus AI vs Traditional Municipal Workflows
  const responseBenchmarkData = [
    { metric: 'Detection to Ingestion', traditional: 480, nexusAI: 1.2 }, // seconds
    { metric: 'Cognitive Hazard Modeling', traditional: 900, nexusAI: 2.4 },
    { metric: 'Citywide Alert Broadcast', traditional: 360, nexusAI: 0.6 },
    { metric: 'Gate & Solenoid Actuation', traditional: 1200, nexusAI: 0.18 },
    { metric: 'Emergency Dispatch Stage', traditional: 600, nexusAI: 45 },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Analytics Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Disaster Analytics &amp; Resiliency Metrics
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            High-Velocity Predictive Data Streams &amp; Incident Latency Benchmarks
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono">
          <Server className="w-3.5 h-3.5 text-cyan-400" />
          <span>14,200 ENVIRONMENTAL SENSOR NODES · 99.8% UPTIME</span>
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 bg-[#060c1c]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">Mean Early Warning Time</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-cyan-300">4.2s</div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            <span>99.2% faster than manual trigger</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 bg-[#060c1c]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">Floodwater Storage Headroom</span>
            <Waves className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-sky-300">3.4M L</div>
          <div className="text-[11px] font-mono text-cyan-400 mt-1">
            Aquifers 01-09 capacity at 71.6%
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 bg-[#060c1c]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">Emergency Shelter Bed Ready</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-300">107,000</div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            Occupancy at 34% (Safe margin)
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 bg-[#060c1c]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">Medical Trauma Beds</span>
            <HeartPulse className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-300">2,300</div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1">
            Surge capacity pre-staged
          </div>
        </div>
      </div>

      {/* Main Charts: Time-Series Area Chart (Left) + Response Time Comparison (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Multi-Hazard Time-Series Chart */}
        <div className="lg:col-span-7 rounded-3xl glass-panel border border-cyan-500/30 p-5 sm:p-6 bg-[#060d20]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-slate-100">
                Multi-Hazard Environmental Telemetry (24h)
              </h4>
              <p className="text-xs font-mono text-cyan-400">
                Rainfall (mm/h) · River Crest (m) · Sustained Wind (km/h)
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Live Ingestion Bus</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hazardTimelineData}>
                <defs>
                  <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                <YAxis stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#091326',
                    borderColor: '#06b6d4',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Area
                  type="monotone"
                  dataKey="rain"
                  name="Rainfall (mm/h)"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#rainGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="wind"
                  name="Wind Gusts (km/h)"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#windGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Benchmark Bar Chart: Traditional vs NEXUS AI */}
        <div className="lg:col-span-5 rounded-3xl glass-panel border border-cyan-500/30 p-5 sm:p-6 bg-[#060d20]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-slate-100">
                Response Time Benchmark (Log Seconds)
              </h4>
              <p className="text-xs font-mono text-cyan-400">
                Traditional Manual Protocols vs NEXUS AI Autonomous Engine
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={responseBenchmarkData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis type="number" stroke="#64748b" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis
                  dataKey="metric"
                  type="category"
                  stroke="#94a3b8"
                  fontSize={10}
                  fontFamily="JetBrains Mono"
                  width={110}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#091326',
                    borderColor: '#06b6d4',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Bar dataKey="traditional" name="Traditional (Seconds)" fill="#64748b" radius={[0, 4, 4, 0]} />
                <Bar dataKey="nexusAI" name="Nexus AI (Seconds)" fill="#06b6d4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
