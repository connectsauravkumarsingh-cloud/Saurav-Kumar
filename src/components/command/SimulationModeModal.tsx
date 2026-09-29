import React from 'react';
import {
  Sliders,
  X,
  Play,
  Waves,
  Car,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface SimulationModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulationActive: boolean;
  onInjectScenario: (scenarioType: 'flood' | 'accident' | 'blackout') => void;
  onResetSimulation: () => void;
}

export const SimulationModeModal: React.FC<SimulationModeModalProps> = ({
  isOpen,
  onClose,
  simulationActive,
  onInjectScenario,
  onResetSimulation,
}) => {
  if (!isOpen) return null;

  const scenarios = [
    {
      id: 'flood' as const,
      title: 'Marina Sector 8 Flash Flood Surge',
      category: 'Hydrological Multi-Hazard',
      desc: 'Simulates torrential 94 mm/h cloudburst, causing river crest to exceed 3.2m, flooding lower promenade and triggering automated aquifer diversion.',
      icon: <Waves className="w-5 h-5 text-cyan-400" />,
      severity: 'Critical Drill',
      badgeColor: 'bg-red-950 text-red-300 border-red-500/50',
    },
    {
      id: 'accident' as const,
      title: 'NH-24 Flyover Multi-Vehicle Collision',
      category: 'Arterial Traffic Gridlock',
      desc: 'Simulates peak-hour 3-car pileup in eastbound lanes 1 and 2, triggering dynamic gantry diversions and dispatching Heavy Crane TC-01.',
      icon: <Car className="w-5 h-5 text-amber-400" />,
      severity: 'High Drill',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-500/50',
    },
    {
      id: 'blackout' as const,
      title: 'Sector 12 Substation 03 Transformer Trip',
      category: 'Decentralized Microgrid Balancing',
      desc: 'Simulates 420 MW industrial load surge tripping primary high-voltage breakers, engaging subterranean molten-salt battery islanding mode in 180ms.',
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      severity: 'Medium Drill',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-500/50',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#060c1d] border border-purple-500/50 shadow-2xl p-6 text-slate-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-950 border border-purple-500/50 text-purple-300">
              <Sliders className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  Municipal Simulation &amp; Stress Testing Lab
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-500/50 text-purple-300 font-bold">
                  PROTOTYPE MODE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Inject verified crisis scenarios into the live ICCC digital twin
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice */}
        <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-200">
          💡 <strong>Operator Training Notice:</strong> All metrics, alerts, and vehicle coordinates injected through this panel are simulated for testing control room readiness and role-based approvals.
        </div>

        {/* Scenario List */}
        <div className="space-y-3">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0 mt-1 sm:mt-0">
                  {sc.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-100">
                      {sc.title}
                    </h4>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase ${sc.badgeColor}`}
                    >
                      {sc.severity}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
                    {sc.category}
                  </div>
                  <p className="text-xs text-slate-300 font-normal mt-1 leading-relaxed max-w-md">
                    {sc.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onInjectScenario(sc.id);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity shrink-0 flex items-center gap-1.5 w-full sm:w-auto justify-center"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Inject Drill</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => {
              onResetSimulation();
              onClose();
            }}
            className="text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Standard Nominal State</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
