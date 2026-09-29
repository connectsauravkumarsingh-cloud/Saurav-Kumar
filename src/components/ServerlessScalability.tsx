import React, { useState } from 'react';
import { Cpu, Server, Activity, Zap, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';

export const ServerlessScalability: React.FC = () => {
  const [demandState, setDemandState] = useState<'low' | 'normal' | 'peak'>('normal');

  // Node configurations based on demand state
  const config = {
    low: {
      label: 'Low Demand',
      timeframe: 'Late Night (02:00 - 05:30)',
      activeNodes: 18,
      computePower: '14.2 TFLOPS',
      latency: '8.4 ms',
      energySaving: '92%',
      description: 'Unused municipal workers and microservices scale to zero. Minimal standby nodes maintain life-critical safety and water pressure systems.',
      nodeCount: 16,
      color: '#38bdf8',
    },
    normal: {
      label: 'Normal Demand',
      timeframe: 'Daytime Operations (09:00 - 17:00)',
      activeNodes: 120,
      computePower: '98.5 TFLOPS',
      latency: '11.2 ms',
      energySaving: '64%',
      description: 'Standard cluster topology. Balances traffic lights, ambient temperature control in public zones, and routine transit gliders.',
      nodeCount: 36,
      color: '#06b6d4',
    },
    peak: {
      label: 'Peak Demand',
      timeframe: 'Rush Hour / Storm / Civic Event (17:30 - 20:00)',
      activeNodes: 850,
      computePower: '680 TFLOPS',
      latency: '14.8 ms',
      energySaving: '28%',
      description: 'Instant horizontal autoscaling provisions 800+ serverless pods in <40ms to coordinate complex evacuation, high-volume maglev surges, and microgrid shifts.',
      nodeCount: 64,
      color: '#f59e0b',
    },
  }[demandState];

  return (
    <section id="intelligence" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
            <span>DYNAMIC RESOURCE ELASTICITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 uppercase">
            INFRASTRUCTURE THAT SCALES WITH THE CITY.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
            Computing resources dynamically scale up in sub-seconds according to real-time city demand, and scale to zero to prevent energy waste.
          </p>
        </div>

        {/* State Toggle Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 gap-1.5 shadow-xl">
            <button
              onClick={() => setDemandState('low')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
                demandState === 'low'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🌙 Low Demand</span>
              <span className="text-[10px] opacity-75 font-sans">(Idle Hibernate)</span>
            </button>

            <button
              onClick={() => setDemandState('normal')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
                demandState === 'normal'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>☀️ Normal Demand</span>
              <span className="text-[10px] opacity-75 font-sans">(Balanced)</span>
            </button>

            <button
              onClick={() => setDemandState('peak')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
                demandState === 'peak'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⚡ Peak Demand</span>
              <span className="text-[10px] opacity-75 font-sans">(Surge Scale)</span>
            </button>
          </div>
        </div>

        {/* Scalability Canvas & Metrics Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Dynamic Visual: Expanding/Shrinking Serverless Pods Matrix */}
          <div className="lg:col-span-8 rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl bg-[#060c1a]">
            {/* Visual Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Server className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                  Serverless Edge Cluster Visualization
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AUTOSCALER STATE: STABLE</span>
              </div>
            </div>

            {/* Dynamic Grid of Serverless Micro-Workers */}
            <div className="relative min-h-[300px] flex items-center justify-center p-4">
              <div
                className="grid gap-2.5 sm:gap-3 transition-all duration-500 w-full"
                style={{
                  gridTemplateColumns:
                    demandState === 'low'
                      ? 'repeat(4, minmax(0, 1fr))'
                      : demandState === 'normal'
                      ? 'repeat(6, minmax(0, 1fr))'
                      : 'repeat(8, minmax(0, 1fr))',
                }}
              >
                {Array.from({ length: config.nodeCount }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl flex flex-col items-center justify-center border transition-all duration-300 relative group"
                    style={{
                      backgroundColor:
                        demandState === 'peak'
                          ? 'rgba(245, 158, 11, 0.15)'
                          : demandState === 'normal'
                          ? 'rgba(6, 182, 212, 0.15)'
                          : 'rgba(56, 189, 248, 0.1)',
                      borderColor:
                        demandState === 'peak'
                          ? 'rgba(245, 158, 11, 0.6)'
                          : demandState === 'normal'
                          ? 'rgba(6, 182, 212, 0.5)'
                          : 'rgba(56, 189, 248, 0.3)',
                    }}
                  >
                    <Cpu
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-125"
                      style={{
                        color:
                          demandState === 'peak'
                            ? '#fbbf24'
                            : demandState === 'normal'
                            ? '#38bdf8'
                            : '#7dd3fc',
                      }}
                    />
                    <span className="text-[9px] font-mono text-slate-300 mt-1 hidden sm:block">
                      P-{i + 1}
                    </span>
                    {/* Activity pulse dot */}
                    <span
                      className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-ping"
                      style={{
                        backgroundColor:
                          demandState === 'peak' ? '#f59e0b' : '#06b6d4',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Scale Details */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
              <div>ACTIVE PODS: <span className="text-cyan-300 font-bold">{config.activeNodes}</span></div>
              <div>PROVISIONING DELAY: <span className="text-amber-300 font-bold">&lt; 40ms</span></div>
              <div>SCALE RATIO: <span className="text-emerald-300 font-bold">{demandState === 'low' ? '1x' : demandState === 'normal' ? '6.6x' : '47.2x'}</span></div>
            </div>
          </div>

          {/* Right: Metrics & Operational Description */}
          <div className="lg:col-span-4 rounded-3xl glass-panel border border-cyan-500/30 p-7 text-left space-y-6 shadow-2xl bg-[#081122]">
            <div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 uppercase">
                {config.label}
              </span>
              <h3 className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mt-2">
                Dynamic City Sizing
              </h3>
              <p className="text-xs font-mono text-cyan-400 mt-1">{config.timeframe}</p>
            </div>

            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              {config.description}
            </p>

            {/* Metrics cards */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Total Compute Load</span>
                <span className="text-base font-mono font-bold text-cyan-300 tabular-nums">
                  {config.computePower}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">P99 Dispatch Latency</span>
                <span className="text-base font-mono font-bold text-amber-300 tabular-nums">
                  {config.latency}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Energy Wattage Saved</span>
                <span className="text-base font-mono font-bold text-emerald-400 tabular-nums">
                  {config.energySaving}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>FinOps engine automatically provisions edge pods closest to telemetry surge.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
