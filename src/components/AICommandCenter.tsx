import React, { useState, useEffect } from 'react';
import {
  Activity,
  Zap,
  Droplets,
  Train,
  Cpu,
  ShieldCheck,
  Wind,
  Terminal,
  RefreshCw,
  SlidersHorizontal,
  Flame,
} from 'lucide-react';

export const AICommandCenter: React.FC = () => {
  const [timestamp, setTimestamp] = useState<string>('00:00:00');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(0);

  // Live real-time tick for realistic telemetry
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(
        `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      );
    };
    updateTime();
    const interval = setInterval(() => {
      updateTime();
      setPulseCount((p) => p + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const runEmergencyOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 1500);
  };

  // Sparkline data bars
  const energyLoad = [65, 68, 72, 70, 75, 82, 80, 78, 85, 88, 84, 82, 79, 81];
  const waterFlow = [88, 90, 89, 92, 91, 93, 92, 94, 95, 94, 96, 95, 96, 97];
  const transitVelocity = [94, 92, 95, 98, 99, 96, 97, 98, 100, 99, 98, 99, 97, 99];

  return (
    <section className="py-24 relative overflow-hidden bg-[#030713]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
            <Terminal className="w-3.5 h-3.5" />
            <span>CENTRAL METROPOLITAN KERNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 uppercase">
            THE CITY HAS A DIGITAL BRAIN.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
            A unified glass cockpit monitoring vital city metrics in real time with predictive AI forecasting and autonomous subsystem balancing.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-2xl bg-[#060c1c]">
          {/* Top Bar: Live Status & Quick Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div className="font-mono text-xs">
                <span className="text-slate-400">METRO DIGITAL TWIN: </span>
                <span className="text-cyan-400 font-bold">ONLINE & SYNCHRONIZED</span>
                <span className="text-slate-500 mx-2">·</span>
                <span className="text-amber-400 font-bold">{timestamp} UTC</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runEmergencyOptimization}
                disabled={isOptimizing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider shadow-md transition-all duration-200"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
                <span>{isOptimizing ? 'Re-balancing Grid...' : 'Run Microgrid Auto-Balance'}</span>
              </button>
            </div>
          </div>

          {/* 6 Key Metropolitan Metrics Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Energy Status */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">ENERGY STATUS</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">+18% SURPLUS</span>
              </div>

              <div className="flex items-baseline justify-between mb-3">
                <span className="text-3xl font-bold font-mono text-slate-100 tabular-nums">1.84 GW</span>
                <span className="text-xs font-mono text-slate-400">Demand: 1.56 GW</span>
              </div>

              {/* Sparkline chart */}
              <div className="flex items-end gap-1.5 h-10 pt-2 border-t border-slate-800/80">
                {energyLoad.map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-amber-500/40 rounded-t hover:bg-amber-400 transition-colors"
                    style={{ height: `${val}%` }}
                    title={`Energy Load: ${val}%`}
                  />
                ))}
              </div>
              <div className="mt-2 text-[10px] font-mono text-slate-400 flex justify-between">
                <span>Solar + Kinetic Microgrid</span>
                <span className="text-amber-400">100% Clean</span>
              </div>
            </div>

            {/* 2. Water Circularity */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">WATER RESERVES</span>
                </div>
                <span className="text-[10px] font-mono text-sky-400 font-bold">99.2% PURIFIED</span>
              </div>

              <div className="flex items-baseline justify-between mb-3">
                <span className="text-3xl font-bold font-mono text-slate-100 tabular-nums">48.2M L</span>
                <span className="text-xs font-mono text-slate-400">Retention: 92%</span>
              </div>

              <div className="flex items-end gap-1.5 h-10 pt-2 border-t border-slate-800/80">
                {waterFlow.map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-sky-500/40 rounded-t hover:bg-sky-400 transition-colors"
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 text-[10px] font-mono text-slate-400 flex justify-between">
                <span>Stormwater Aquifers 01-08</span>
                <span className="text-sky-300">Closed Loop</span>
              </div>
            </div>

            {/* 3. Transport Velocity */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Train className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">AUTONOMOUS MOBILITY</span>
                </div>
                <span className="text-[10px] font-mono text-purple-400 font-bold">ZERO CONGESTION</span>
              </div>

              <div className="flex items-baseline justify-between mb-3">
                <span className="text-3xl font-bold font-mono text-slate-100 tabular-nums">1,240</span>
                <span className="text-xs font-mono text-slate-400">Pods Active · 450 km/h</span>
              </div>

              <div className="flex items-end gap-1.5 h-10 pt-2 border-t border-slate-800/80">
                {transitVelocity.map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-purple-500/40 rounded-t hover:bg-purple-400 transition-colors"
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 text-[10px] font-mono text-slate-400 flex justify-between">
                <span>Maglev Subterranean + Skyways</span>
                <span className="text-purple-300">Wait: 38s avg</span>
              </div>
            </div>

            {/* 4. AI Predictions & Decisions */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">AI PREDICTION HORIZON</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">12ms INFERENCE</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Rainfall Ingress</span>
                  <span className="text-cyan-300">Forecast +42m, gates primed</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Harbor Shuttles</span>
                  <span className="text-amber-300">Pre-routed +80 pods</span>
                </div>
              </div>
            </div>

            {/* 5. Cloud Workload & Serverless */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">CLOUD WORKLOAD</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">99.999% HEALTH</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Active Serverless Pods</span>
                  <span className="text-slate-100 font-bold">120 Workers</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Memory Utilization</span>
                  <span className="text-cyan-300 font-bold">42.4% Normal</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">FinOps Scale-to-Zero</span>
                  <span className="text-emerald-400 font-bold">Active in Q4</span>
                </div>
              </div>
            </div>

            {/* 6. Environmental Conditions */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">ENVIRONMENTAL HEALTH</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">AQI: 12 (EXCELLENT)</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">AMBIENT TEMP</span>
                  <span className="text-slate-100 font-bold">22.4°C / 72.3°F</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">RELATIVE HUMIDITY</span>
                  <span className="text-slate-100 font-bold">48% Optimal</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">PARTICULATE PM2.5</span>
                  <span className="text-emerald-400 font-bold">3.2 µg/m³</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">ACOUSTIC LEVEL</span>
                  <span className="text-cyan-300 font-bold">42 dB Quiet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
