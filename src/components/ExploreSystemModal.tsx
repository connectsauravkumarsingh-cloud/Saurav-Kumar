import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, RefreshCw, Terminal, Activity, ShieldCheck, Zap, Cloud, Cpu } from 'lucide-react';
import { NexusLogo } from './NexusLogo';

interface ExploreSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExploreSystemModal: React.FC<ExploreSystemModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [diagnosticProgress, setDiagnosticProgress] = useState<number>(100);
  const [isRunningScan, setIsRunningScan] = useState<boolean>(false);
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('ai');

  const subsystems = [
    {
      id: 'ai',
      name: 'Generative AI Dispatcher',
      status: 'Optimal',
      latency: '11.8 ms',
      load: '38%',
      logs: [
        'Ingesting 42.8M continuous telemetry vectors from North, East, and Subterranean sectors',
        'Generative spatial model synthesized next-hour microgrid equilibrium schedule',
        '0 conflicting actuation constraints detected across water, energy, and traffic services',
      ],
    },
    {
      id: 'cloud',
      name: 'Serverless Edge Mesh',
      status: 'Auto-Balanced',
      latency: '3.4 ms',
      load: '45%',
      logs: [
        '120 active worker pods distributed across 6 metropolitan availability zones',
        'Scale-to-zero hibernate active on low-demand residential sensor nodes',
        'P99 cold start latency measured at 36ms; within SLA targets',
      ],
    },
    {
      id: 'transit',
      name: 'Sub-surface Maglev Controller',
      status: 'Synchronized',
      latency: '2.1 ms',
      load: '62%',
      logs: [
        '1,240 autonomous passenger pods active; average headway: 42 seconds',
        'Zero surface vehicle congestion registered across all 14 urban boulevards',
        'Logistics tunnel pneumatic parcel delivery operational at 99.8% capacity',
      ],
    },
    {
      id: 'energy',
      name: 'Photovoltaic & Storage Grid',
      status: 'Net Surplus',
      latency: '4.8 ms',
      load: '78%',
      logs: [
        'Perovskite facade canopy delivering +1.84 GW peak solar generation',
        'Subterranean molten salt and flywheel storage charging at 420 MW rate',
        'Peer-to-peer microgrid bidding clearing at 0.00 zero-curtailment loss',
      ],
    },
  ];

  const runDiagnostic = () => {
    setIsRunningScan(true);
    setDiagnosticProgress(15);
    setTimeout(() => setDiagnosticProgress(48), 350);
    setTimeout(() => setDiagnosticProgress(82), 700);
    setTimeout(() => {
      setDiagnosticProgress(100);
      setIsRunningScan(false);
    }, 1100);
  };

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSys = subsystems.find((s) => s.id === selectedSubsystem) || subsystems[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl glass-panel border border-cyan-400/50 p-6 sm:p-8 bg-[#060c1c] text-left shadow-2xl flex flex-col justify-between overflow-y-auto">
        {/* Modal Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <NexusLogo size={36} showText={true} subtitle={false} />
              <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300">
                SYSTEM DIAGNOSTIC TWIN
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runDiagnostic}
                disabled={isRunningScan}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/50 text-xs font-mono text-cyan-300 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRunningScan ? 'animate-spin' : ''}`} />
                <span>{isRunningScan ? 'Scanning Mesh...' : 'Run Diagnostics'}</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Diagnostic Health Meter */}
          <div className="py-4 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">SYSTEM HEALTH: 100% OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <span>SCAN PROGRESS: {diagnosticProgress}%</span>
            </div>
          </div>

          {/* Subsystems Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 mb-6">
            {subsystems.map((sys) => {
              const isSelected = selectedSubsystem === sys.id;
              return (
                <button
                  key={sys.id}
                  onClick={() => setSelectedSubsystem(sys.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-cyan-400 bg-slate-900/90 glow-cyan shadow-md'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-slate-200 truncate">{sys.name}</div>
                  <div className="flex items-center justify-between mt-1 text-[11px] font-mono">
                    <span className="text-cyan-400">{sys.status}</span>
                    <span className="text-slate-400">{sys.latency}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Subsystem Detail Window */}
          <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-5 space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>{currentSys.name} Telemetry Log</span>
              </h4>
              <span className="text-xs font-mono text-emerald-400">ACTIVE INFERENCE CHANNEL</span>
            </div>

            <div className="space-y-2 font-mono text-xs text-slate-300">
              {currentSys.logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">CLUSTER LATENCY</span>
                <span className="text-cyan-300 font-bold">{currentSys.latency}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">COMPUTE ALLOCATION</span>
                <span className="text-amber-300 font-bold">{currentSys.load}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">ENCRYPTION LAYER</span>
                <span className="text-emerald-400 font-bold">mTLS Quantum 256</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-400">
            Powered by Cloud-Native & Autonomous Generative AI
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Return to Metropolis Interface
          </button>
        </div>
      </div>
    </div>
  );
};
