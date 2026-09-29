import React, { useState, useEffect, useRef } from 'react';
import {
  SIMULATION_SCENARIOS,
} from '../../data/disasterData';
import { SimulationScenario, SimulationStage } from '../../types/disaster';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  FastForward,
  Waves,
  Activity,
  Wind,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

interface DisasterSimulationEngineProps {
  onStageChange?: (scenario: SimulationScenario, currentStage: SimulationStage) => void;
}

export const DisasterSimulationEngine: React.FC<DisasterSimulationEngineProps> = ({
  onStageChange,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('urban_flood');
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scenario =
    SIMULATION_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    SIMULATION_SCENARIOS[0];

  const currentStage = scenario.stages[currentStageIndex];

  const onStageChangeRef = useRef(onStageChange);
  useEffect(() => {
    onStageChangeRef.current = onStageChange;
  }, [onStageChange]);

  // Track last notified scenario/stage so we only notify once per change and avoid infinite loops
  const lastNotifiedKeyRef = useRef<string>('');

  useEffect(() => {
    const notifyKey = `${scenario.id}-${currentStageIndex}`;
    if (lastNotifiedKeyRef.current !== notifyKey) {
      lastNotifiedKeyRef.current = notifyKey;
      onStageChangeRef.current?.(scenario, currentStage);
    }
  }, [scenario, currentStage, currentStageIndex]);

  // Handle Playback Loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const duration = (currentStage.durationSec * 1000) / speedMultiplier;

    timerRef.current = setTimeout(() => {
      if (currentStageIndex < scenario.stages.length - 1) {
        setCurrentStageIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false); // Finished scenario
      }
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStageIndex, scenario, currentStage.durationSec, speedMultiplier]);

  const handleSelectScenario = (id: string) => {
    setIsPlaying(false);
    setSelectedScenarioId(id);
    setCurrentStageIndex(0);
  };

  const handlePlayPause = () => {
    if (currentStageIndex >= scenario.stages.length - 1) {
      setCurrentStageIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStageIndex(0);
  };

  const handleNextStage = () => {
    if (currentStageIndex < scenario.stages.length - 1) {
      setCurrentStageIndex((prev) => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex((prev) => prev - 1);
    }
  };

  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-amber-400" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-sky-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-red-400" />;
      default:
        return <Waves className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Simulation Lab Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>JUDGES &amp; DEMONSTRATION WORKBENCH</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Disaster Simulation Lab
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Step-by-Step Multi-Stage Exercise Engine with Live Telemetry Actuation
          </p>
        </div>

        {/* Speed & Quick Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSpeedMultiplier((s) => (s === 1 ? 2 : 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Speed: {speedMultiplier}x
          </button>
        </div>
      </div>

      {/* 4 Scenario Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SIMULATION_SCENARIOS.map((scen) => {
          const isSelected = scen.id === selectedScenarioId;
          return (
            <button
              key={scen.id}
              onClick={() => handleSelectScenario(scen.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-400 bg-slate-900/90 glow-cyan shadow-lg scale-[1.02]'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {getScenarioIcon(scen.icon)}
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                      ACTIVE
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-100 mb-1">{scen.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{scen.summary}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Simulation Console Frame */}
      <div className="rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-8 space-y-6 bg-[#060c1d] shadow-2xl relative overflow-hidden">
        {/* Console Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-700">
              {getScenarioIcon(scenario.icon)}
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-100">{scenario.title}</h4>
              <p className="text-xs font-mono text-cyan-400">{scenario.subtitle}</p>
            </div>
          </div>

          {/* Playback Transport Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStage}
              disabled={currentStageIndex === 0}
              className="p-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
              title="Previous Stage"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handlePlayPause}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-md hover:opacity-95 transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Sim' : 'Play Scenario'}</span>
            </button>

            <button
              onClick={handleNextStage}
              disabled={currentStageIndex === scenario.stages.length - 1}
              className="p-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
              title="Next Stage"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-colors"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Phase Visual Pipeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {scenario.stages.map((stg, idx) => {
            const isPassed = currentStageIndex >= idx;
            const isCurrent = currentStageIndex === idx;

            return (
              <button
                key={stg.stageIndex}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStageIndex(idx);
                }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isCurrent
                    ? 'border-cyan-400 bg-slate-900/90 glow-cyan ring-2 ring-cyan-400/40'
                    : isPassed
                    ? 'border-slate-700 bg-slate-950/70'
                    : 'border-slate-800/60 bg-slate-950/30 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">
                    STEP 0{idx + 1}
                  </span>
                  {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-xs font-bold text-slate-100 truncate">{stg.phaseName}</div>
              </button>
            );
          })}
        </div>

        {/* Stage Content Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-left">
          {/* Card 1: Sensor Trigger & Ingestion */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>1. Sensor Trigger Ingestion</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              {currentStage.sensorTelemetry}
            </p>
          </div>

          {/* Card 2: AI Neural Assessment */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>2. AI Cognitive Hazard Model</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              {currentStage.aiAssessment}
            </p>
          </div>

          {/* Card 3: Autonomous Decision & Evacuation */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>3. Autonomous Action &amp; Routing</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              {currentStage.decisionAction}
            </p>
          </div>
        </div>

        {/* Simulated Telemetry Log Terminal */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold">&gt;</span>
            <span className="text-slate-300">{currentStage.statusLog}</span>
          </div>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            Status: {currentStage.activeSeverity.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};
