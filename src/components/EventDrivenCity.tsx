import React, { useState } from 'react';
import { CloudRain, Car, Zap, ArrowRight, Play, CheckCircle2, ShieldCheck } from 'lucide-react';
import { EventWorkflowScenario } from '../types';

export const EventDrivenCity: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('rain');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(3); // 0: EVENT, 1: AI, 2: DECISION, 3: ACTION

  const scenarios: EventWorkflowScenario[] = [
    {
      id: 'rain',
      title: 'Heavy Rainfall Detected',
      icon: 'rain',
      category: 'Hydrology & Stormwater',
      triggerEvent: 'Meteorological Doppler detects 65mm/hr convective precipitation front entering North District.',
      aiAnalysis: 'Generative hydrological model computes localized retention capacity and soil saturation in 4.2ms.',
      decisionEngine: 'Arbiter initiates Stage-3 storm drain diversion and opens subsurface aquifer valves at Vault 04 & 09.',
      autonomousAction: 'Pneumatic retention gates engage; 1.2M liters captured; arterial roadways remain 100% dry.',
      latencyMs: 14,
      impactMetrics: [
        { label: 'Surface Runoff Prevented', value: '1,240,000 L' },
        { label: 'Aquifer Replenishment', value: '+8.4%' },
        { label: 'Drain System Headroom', value: '62%' },
      ],
    },
    {
      id: 'traffic',
      title: 'Sudden Traffic Spike',
      icon: 'car',
      category: 'Autonomous Mobility',
      triggerEvent: 'Harbor stadium event concludes; 24,000 pedestrians simultaneously request transit shuttles.',
      aiAnalysis: 'Multimodal spatial AI predicts 35-minute arterial gridlock unless immediate flow rerouting occurs.',
      decisionEngine: 'Synchronizes adaptive traffic corridors; dispatches 85 autonomous high-capacity maglev shuttles.',
      autonomousAction: 'Transit headway reduced to 45s; green-wave priority corridors cleared; zero bottlenecks.',
      latencyMs: 9,
      impactMetrics: [
        { label: 'Congestion Delay Avoided', value: '-28.5 min' },
        { label: 'Fleet Utilization', value: '98.2%' },
        { label: 'Carbon Emissions Avoided', value: '4.8 tons' },
      ],
    },
    {
      id: 'energy',
      title: 'Energy Demand Surge',
      icon: 'energy',
      category: 'Microgrid Balancing',
      triggerEvent: 'Ambient heat wave triggers synchronous cooling systems across 40 bioclimatic towers.',
      aiAnalysis: 'Neural load forecaster predicts 420 MW deficit in primary substation within the next 3 minutes.',
      decisionEngine: 'Triggers automated peer-to-peer microgrid bidding; commands battery reserves and solar banks.',
      autonomousAction: 'Substation deficit neutralised in 180ms; zero blackout risk; thermal comfort preserved.',
      latencyMs: 11,
      impactMetrics: [
        { label: 'Peak Load Shaved', value: '412 MW' },
        { label: 'Battery Dispatch Time', value: '180 ms' },
        { label: 'Grid Frequency Stability', value: '50.00 Hz' },
      ],
    },
  ];

  const currentScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const triggerSimulation = (id: string) => {
    setSelectedScenarioId(id);
    setIsSimulating(true);
    setSimulationStep(0);

    setTimeout(() => setSimulationStep(1), 500);
    setTimeout(() => setSimulationStep(2), 1100);
    setTimeout(() => {
      setSimulationStep(3);
      setIsSimulating(false);
    }, 1800);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'rain':
        return <CloudRain className="w-5 h-5 text-sky-400" />;
      case 'car':
        return <Car className="w-5 h-5 text-cyan-400" />;
      case 'energy':
        return <Zap className="w-5 h-5 text-amber-400" />;
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />;
    }
  };

  const workflowSteps = [
    { title: 'EVENT', label: 'Trigger Event', content: currentScenario.triggerEvent, stepIdx: 0, color: '#38bdf8' },
    { title: 'AI', label: 'Cognitive Analysis', content: currentScenario.aiAnalysis, stepIdx: 1, color: '#06b6d4' },
    { title: 'DECISION', label: 'Policy Arbiter', content: currentScenario.decisionEngine, stepIdx: 2, color: '#fbbf24' },
    { title: 'ACTION', label: 'Autonomous Actuation', content: currentScenario.autonomousAction, stepIdx: 3, color: '#10b981' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
            <span>REAL-TIME AUTONOMOUS RESPONSE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 uppercase">
            EVENT-DRIVEN CITY WORKFLOWS
          </h2>
          <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
            Select a live scenario below to observe how the city detects, calculates, arbitrates, and acts autonomously within milliseconds.
          </p>
        </div>

        {/* Scenario Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {scenarios.map((scenario) => {
            const isSelected = selectedScenarioId === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => triggerSimulation(scenario.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start justify-between gap-4 cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white shadow-lg glow-cyan scale-[1.02]'
                    : 'border-slate-800 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 hover:border-cyan-500/40'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                      {getIcon(scenario.icon)}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">{scenario.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 pt-1">
                    {scenario.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-300 pt-1">
                  <Play className={`w-3.5 h-3.5 ${isSimulating && isSelected ? 'animate-spin' : ''}`} />
                  <span>Simulate</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Horizontal Workflow Display: EVENT → AI → DECISION → ACTION */}
        <div className="rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-8 space-y-8 bg-[#070e1e] shadow-2xl">
          {/* Header of Active Workflow */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-slate-950 border border-cyan-500/40">
                {getIcon(currentScenario.icon)}
              </span>
              <div>
                <h4 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                  {currentScenario.title}
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  End-to-End Latency: <strong className="text-amber-400">{currentScenario.latencyMs} ms</strong>
                </span>
              </div>
            </div>

            <button
              onClick={() => triggerSimulation(currentScenario.id)}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-wider font-bold transition-colors disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isSimulating ? 'Executing Workflow...' : 'Replay Event Cycle'}</span>
            </button>
          </div>

          {/* 4-Step Horizontal Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {workflowSteps.map((step, idx) => {
              const isPassed = simulationStep >= step.stepIdx;
              const isCurrent = simulationStep === step.stepIdx;

              return (
                <div key={step.title} className="relative flex flex-col">
                  {/* Step Card */}
                  <div
                    className={`h-full rounded-2xl p-5 border transition-all duration-500 flex flex-col justify-between ${
                      isCurrent
                        ? 'border-cyan-400 bg-slate-900/90 glow-cyan scale-105'
                        : isPassed
                        ? 'border-slate-700 bg-slate-950/80'
                        : 'border-slate-800/60 bg-slate-950/30 opacity-50'
                    }`}
                  >
                    <div>
                      {/* Top Step Pill */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="px-2.5 py-0.5 rounded text-xs font-mono font-bold tracking-wider"
                          style={{
                            backgroundColor: `${step.color}25`,
                            color: step.color,
                            border: `1px solid ${step.color}60`,
                          }}
                        >
                          {step.title}
                        </span>
                        {isPassed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>

                      <h5 className="text-xs font-mono text-slate-400 mb-2">{step.label}</h5>
                      <p className="text-xs text-slate-200 dark:text-slate-200 light:text-slate-700 leading-relaxed">
                        {step.content}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-800/80 text-[10px] font-mono text-cyan-400/80">
                      Phase 0{idx + 1} Complete
                    </div>
                  </div>

                  {/* Flow Arrow Connector between steps */}
                  {idx < 3 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 items-center justify-center rounded-full bg-slate-950 border border-slate-700 text-cyan-400">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Outcome & Impact Metrics Strip */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Simulated Urban Performance Metrics</span>
              </span>
              <span className="text-xs font-mono text-emerald-400">Autonomous Invariants Maintained</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentScenario.impactMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                >
                  <span className="text-xs text-slate-400">{metric.label}</span>
                  <span className="text-lg font-bold font-mono text-cyan-300 tabular-nums">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
