import React, { useState } from 'react';
import { Cloud, Cpu, Radio, Zap, Building2, Users, ArrowRight, RotateCw } from 'lucide-react';

export const EcosystemDiagram: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);

  const nodes = [
    {
      id: 'cloud',
      name: 'Cloud',
      role: 'Elastic Foundation',
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      description: 'Distributed Kubernetes and serverless compute clusters host metropolitan services with zero single point of failure.',
      next: 'AI',
      transfer: 'Scalable data pipelines feed raw telemetry into neural models',
    },
    {
      id: 'ai',
      name: 'AI',
      role: 'Cognitive Engine',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      description: 'Generative models predict weather patterns, traffic shifts, and energy surges 6 hours ahead of physical occurrence.',
      next: 'IoT',
      transfer: 'Optimized parameter set-points broadcast to physical edge sensors',
    },
    {
      id: 'iot',
      name: 'IoT',
      role: 'Sensing Grid',
      icon: <Radio className="w-5 h-5 text-amber-400" />,
      description: '42+ million edge sensors continuously measure water flow, air particulates, structural acoustics, and solar flux.',
      next: 'Automation',
      transfer: 'High-frequency event messages trigger complex event processing',
    },
    {
      id: 'automation',
      name: 'Automation',
      role: 'Actuation Mesh',
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      description: 'Autonomous micro-actuators pivot solar facades, modulate stormwater floodgates, and dispatch electric maglev pods.',
      next: 'Infrastructure',
      transfer: 'Physical municipal systems reconfigure to match dynamic demand',
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      role: 'Physical City',
      icon: <Building2 className="w-5 h-5 text-blue-400" />,
      description: 'Living architecture, sub-surface logistics tubes, and circular water vaults create a net-positive urban habitat.',
      next: 'People',
      transfer: 'Provides clean air, abundant renewable energy, and zero-congestion mobility',
    },
    {
      id: 'people',
      name: 'People',
      role: 'Urban Community',
      icon: <Users className="w-5 h-5 text-sky-400" />,
      description: 'Citizens experience friction-free transit, healthy green spaces, and adaptive modular buildings calibrated to their daily lives.',
      next: 'Cloud',
      transfer: 'Human interaction and civic demand patterns feed back into cloud telemetry',
    },
  ];

  const currentNode = nodes[activeNodeIndex];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
            <span>CLOSED-LOOP SYMBIOTIC ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 uppercase">
            TECHNOLOGY RELATIONSHIP MODEL
          </h2>
          <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
            A continuous circular feedback loop connecting computing power to human flourishing.
          </p>
        </div>

        {/* Circular Orbital Visual & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Circular Rotating Ecosystem Orbit Canvas */}
          <div className="lg:col-span-7 flex justify-center relative">
            <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] flex items-center justify-center">
              {/* Outer Orbit Rings */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-spin" style={{ animationDuration: '60s' }} />
              <div className="absolute inset-8 rounded-full border border-blue-500/20" />
              <div className="absolute inset-16 rounded-full border border-slate-700/40 border-dashed" />

              {/* Center Focal Quantum AI Core */}
              <div className="relative z-20 flex flex-col items-center justify-center w-36 h-36 rounded-full glass-panel border border-cyan-400/60 shadow-xl glow-cyan text-center p-3 bg-slate-950/90">
                <RotateCw className="w-5 h-5 text-amber-400 animate-spin mb-1" style={{ animationDuration: '12s' }} />
                <span className="text-xs font-mono font-extrabold tracking-wider bg-gradient-to-r from-cyan-300 to-amber-300 bg-clip-text text-transparent uppercase leading-tight">
                  CONNECTED INTELLIGENCE
                </span>
                <span className="text-[9px] font-mono text-slate-400 mt-1">Autonomous Loop</span>
              </div>

              {/* 6 Circular Nodes Positioned Around Orbit */}
              {nodes.map((node, idx) => {
                const angle = (idx * 60 - 90) * (Math.PI / 180);
                const radius = 160; // radius in px for 400px container
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isSelected = activeNodeIndex === idx;

                return (
                  <div
                    key={node.id}
                    onClick={() => setActiveNodeIndex(idx)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className="absolute z-30 cursor-pointer group"
                  >
                    <div
                      className={`relative flex items-center justify-center w-12 h-12 rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 scale-125 glow-cyan shadow-xl ring-4 ring-cyan-400/30'
                          : 'bg-slate-950/90 border-slate-700 hover:border-cyan-400 hover:scale-110'
                      }`}
                    >
                      {node.icon}
                    </div>

                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap transition-opacity ${
                        isSelected ? 'bg-cyan-950 border border-cyan-500/40 text-cyan-300 opacity-100' : 'text-slate-400 opacity-80'
                      }`}
                    >
                      {node.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Node Transition Detail */}
          <div className="lg:col-span-5 rounded-3xl glass-panel border border-cyan-500/30 p-7 text-left space-y-6 shadow-2xl bg-[#081023]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 uppercase">
                Step 0{activeNodeIndex + 1} of 06
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                <span>Passes to: </span>
                <span className="text-amber-400 font-bold">{currentNode.next}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-slate-950 border border-slate-700">
                  {currentNode.icon}
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {currentNode.name}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">{currentNode.role}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              {currentNode.description}
            </p>

            {/* Loop Transition Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                Ecosystem Feedback Conduit:
              </div>
              <p className="text-xs font-mono text-cyan-300 leading-relaxed">
                {currentNode.transfer}
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => setActiveNodeIndex((prev) => (prev + 1) % nodes.length)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-md hover:opacity-95 transition-opacity"
              >
                Progress Loop to {nodes[(activeNodeIndex + 1) % nodes.length].name} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
