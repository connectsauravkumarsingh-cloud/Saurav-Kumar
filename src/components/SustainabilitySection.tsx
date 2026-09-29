import React, { useState } from 'react';
import { Sun, Droplets, Car, Trash2, Zap, Leaf, Award, ArrowUpRight } from 'lucide-react';

export const SustainabilitySection: React.FC = () => {
  const [districtScale, setDistrictScale] = useState<number>(100); // 100k citizens standard district

  const stats = [
    {
      id: 'solar',
      title: 'Solar Energy',
      value: '100%',
      metric: 'Connected Solar Architecture',
      detail: 'Perovskite transparent photovoltaic glass embedded on every facade; produces 1.8 GW daily net positive energy.',
      icon: <Sun className="w-5 h-5 text-amber-400" />,
      highlight: '+1.8 GW Daily Positive',
    },
    {
      id: 'water',
      title: 'Water Circularity',
      value: '99.2%',
      metric: 'Closed-Loop Water Recycling',
      detail: 'Subterranean bio-membrane filtering recycles grey and storm water into ultra-pure municipal grade output.',
      icon: <Droplets className="w-5 h-5 text-sky-400" />,
      highlight: 'Zero Aquifer Depletion',
    },
    {
      id: 'transport',
      title: 'Autonomous Mobility',
      value: '0.00',
      metric: 'Direct Tailpipe Carbon Emissions',
      detail: '100% electrified autonomous transit fleet operating via subterranean maglev tubes and quiet surface micro-shuttles.',
      icon: <Car className="w-5 h-5 text-cyan-400" />,
      highlight: '91% Shared Fleet Utilization',
    },
    {
      id: 'waste',
      title: 'Waste Recovery',
      value: '94.7%',
      metric: 'AI-Assisted Optical Recycling',
      detail: 'Pneumatic sorting infrastructure automatically segregates dry recyclables and converts organic biomass into green bio-gas.',
      icon: <Trash2 className="w-5 h-5 text-emerald-400" />,
      highlight: 'Zero Landfill Contribution',
    },
    {
      id: 'grid',
      title: 'Distributed Grid',
      value: '24/7',
      metric: 'Renewable Microgrid Resilience',
      detail: 'Decentralized peer-to-peer energy storage with molten salt vaults ensuring continuous zero-emission power delivery.',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      highlight: 'Self-Healing Islanding Capability',
    },
  ];

  return (
    <section id="sustainability" className="py-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-xs font-mono font-medium">
            <Leaf className="w-3.5 h-3.5" />
            <span>NET-POSITIVE ENVIRONMENTAL EQUATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 uppercase">
            DESIGNED TO GIVE MORE THAN IT TAKES.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
            Nexus City generates surplus clean energy, captures every drop of precipitation, and recycles materials in a continuous closed loop.
          </p>
        </div>

        {/* 5 Prominent Statistic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`rounded-2xl glass-panel p-6 sm:p-7 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 text-left flex flex-col justify-between group hover:-translate-y-1 ${
                idx === 0 ? 'lg:col-span-1 md:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-700/80 group-hover:border-emerald-500/40 transition-colors">
                    {stat.icon}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                    {stat.highlight}
                  </span>
                </div>

                <div className="text-4xl font-extrabold font-mono text-slate-100 dark:text-slate-100 light:text-slate-900 tabular-nums tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-cyan-300 mb-2">
                  {stat.metric}
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                  {stat.detail}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Autonomous Certification</span>
                <span className="text-emerald-400 font-bold">VERIFIED NET-ZERO</span>
              </div>
            </div>
          ))}

          {/* District Net-Positive Balance Box */}
          <div className="rounded-2xl glass-panel p-6 sm:p-7 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-900/60 to-cyan-950/20 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-mono font-bold text-emerald-300 uppercase">
                  Metropolitan Sustainability Ledger
                </h4>
              </div>
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mb-4">
                Dynamic environmental yield per 100,000 residents across the central autonomous quarter:
              </p>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Carbon Abatement</span>
                  <span className="text-emerald-400 font-bold">-48,500 Tons/Yr</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Potable Water Harvested</span>
                  <span className="text-cyan-300 font-bold">+18.2M L / Month</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Clean Grid Export</span>
                  <span className="text-amber-400 font-bold">+420 MWh / Day</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300">
                <span>Continuous Bio-Equilibrium Active</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
