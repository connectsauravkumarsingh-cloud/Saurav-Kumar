import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Radio,
  Zap,
  Cloud,
  BrainCircuit,
  Sliders,
  Car,
  Droplet,
  Building,
  Trash2,
  Users,
  CheckCircle,
  ArrowDown,
  Layers,
} from 'lucide-react';

export const ArchitectureFlow: React.FC = () => {
  const [activeTier, setActiveTier] = useState<number>(3); // Default to Cloud Infrastructure
  const [pulseIndex, setPulseIndex] = useState<number>(0);

  // Animate data packet traveling down the pipeline every 1.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 7);
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  const pipelineTiers = [
    {
      id: 0,
      title: 'City Devices',
      subtitle: 'Edge Hardware & Terminals',
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      description: 'Smart transit gates, connected solar facades, robotic waste containers, pedestrian beacons, and ambient environmental sensors.',
      throughput: '142M connected points',
      protocol: 'BLE 5.4 / Zigbee / 5G-NR',
    },
    {
      id: 1,
      title: 'IoT / Sensors',
      subtitle: 'Metropolitan Telemetry Telemetry',
      icon: <Radio className="w-5 h-5 text-amber-400" />,
      description: 'High-frequency telemetry capturing acoustic levels, water flow pressure, air particulate density (PM2.5/PM10), and power grid frequency.',
      throughput: '42.8M streams / sec',
      protocol: 'MQTT / gRPC / QUIC',
    },
    {
      id: 2,
      title: 'Event-Driven Layer',
      subtitle: 'Distributed Message Broker',
      icon: <Zap className="w-5 h-5 text-cyan-300" />,
      description: 'Massively scalable distributed streaming fabric decoupling real-time event producers from cognitive consumers with zero data drop.',
      throughput: '12.4M msgs / sec',
      protocol: 'Apache Kafka / Cloud PubSub',
    },
    {
      id: 3,
      title: 'Cloud Infrastructure',
      subtitle: 'Multi-Region Serverless Edge',
      icon: <Cloud className="w-5 h-5 text-blue-400" />,
      description: 'Containerized Kubernetes microservices and serverless functions executing micro-optimizations across distributed metropolitan nodes.',
      throughput: '99.999% SLA Uptime',
      protocol: 'K8s Edge Mesh / Terraform IaC',
    },
    {
      id: 4,
      title: 'Generative Cloud AI',
      subtitle: 'Multimodal Spatial Cognition',
      icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
      description: 'Predictive generative models analyzing spatial-temporal weather grids, pedestrian flow matrices, and renewable generation dynamics.',
      throughput: '12ms Median Inference',
      protocol: 'TensorRT / Gemini Spatial Twin',
    },
    {
      id: 5,
      title: 'Decision Engine',
      subtitle: 'Autonomous Policy Arbiter',
      icon: <Sliders className="w-5 h-5 text-emerald-400" />,
      description: 'Rule-enforced safety governor converting probabilistic AI recommendations into deterministic actuation commands with zero conflicts.',
      throughput: '45,000 policies / sec',
      protocol: 'OPA (Open Policy Agent) / REGO',
    },
  ];

  const cityServices = [
    { name: 'Transportation', icon: <Car className="w-4 h-4 text-cyan-400" />, action: 'Signal priority & pod routing' },
    { name: 'Energy', icon: <Zap className="w-4 h-4 text-amber-400" />, action: 'Battery dispatch & load shedding' },
    { name: 'Water', icon: <Droplet className="w-4 h-4 text-sky-400" />, action: 'Aquifer pressure balancing' },
    { name: 'Buildings', icon: <Building className="w-4 h-4 text-purple-400" />, action: 'Facade angle & HVAC adjustment' },
    { name: 'Waste Management', icon: <Trash2 className="w-4 h-4 text-emerald-400" />, action: 'Pneumatic sorting redirection' },
    { name: 'Public Services', icon: <Users className="w-4 h-4 text-blue-400" />, action: 'Emergency dispatch & notifications' },
  ];

  const selectedTier = pipelineTiers[activeTier];

  return (
    <section id="architecture" className="py-24 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-700/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
            <span>END-TO-END PIPELINE DIAGRAM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 uppercase">
            CLOUD-NATIVE ARCHITECTURE
          </h2>
          <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600">
            A real-time data conduit flowing from physical sensors up through generative cloud AI, resolving into autonomous municipal actions.
          </p>
        </div>

        {/* Interactive Architecture Flow Canvas & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Vertical Pipeline Flow */}
          <div className="lg:col-span-7 space-y-3 relative">
            {pipelineTiers.map((tier, idx) => {
              const isActive = activeTier === tier.id;
              const isPulsing = pulseIndex === idx;

              return (
                <div key={tier.id} className="relative">
                  {/* Tier Card */}
                  <div
                    onClick={() => setActiveTier(tier.id)}
                    className={`relative rounded-2xl glass-panel p-4 sm:p-5 border cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 ${
                      isActive
                        ? 'border-cyan-400 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white shadow-lg glow-cyan scale-[1.01]'
                        : 'border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Glowing packet animation indicator */}
                    {isPulsing && (
                      <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                    )}

                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-700/60">
                        {tier.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-cyan-400">0{tier.id + 1}</span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                            {tier.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
                          {tier.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-mono font-bold text-cyan-300">{tier.throughput}</div>
                      <div className="text-[11px] font-mono text-slate-400">{tier.protocol}</div>
                    </div>
                  </div>

                  {/* Downward Data Flow Connector */}
                  {idx < pipelineTiers.length - 1 && (
                    <div className="flex justify-center my-1">
                      <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 relative">
                        {pulseIndex === idx && (
                          <div className="absolute top-0 -left-1 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-bounce" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Connecting line to City Services */}
            <div className="flex justify-center my-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span>Actuates City Services</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>

            {/* Final Target: City Services Tier */}
            <div className="rounded-2xl glass-panel border border-emerald-500/40 p-5 bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-cyan-950/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold">TIER 07 · DESTINATION</span>
                  <h4 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    City Services Real-Time Actuation
                  </h4>
                </div>
                <span className="text-xs font-mono text-emerald-400">6 Subsystems Engaged</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {cityServices.map((svc) => (
                  <div
                    key={svc.name}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1 text-left"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                      {svc.icon}
                      <span>{svc.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono truncate">{svc.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Layer Inspector & Deep Dive */}
          <div className="lg:col-span-5 rounded-3xl glass-panel border border-cyan-500/30 p-7 space-y-6 text-left shadow-2xl bg-[#081022] dark:bg-[#081022] light:bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Layer Inspector</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Step {selectedTier.id + 1} of 6</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                {selectedTier.title}
              </h3>
              <p className="text-xs font-mono text-cyan-400 mt-1">{selectedTier.subtitle}</p>
            </div>

            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              {selectedTier.description}
            </p>

            {/* Telemetry Snapshot */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">Stream Throughput</span>
                <span className="text-cyan-300 font-mono font-bold">{selectedTier.throughput}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">Standard Protocol</span>
                <span className="text-amber-300 font-mono font-bold">{selectedTier.protocol}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">Failover Strategy</span>
                <span className="text-emerald-300 font-mono font-bold">Autonomous Triple Redundancy</span>
              </div>
            </div>

            {/* Architecture Invariants */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400">Guaranteed Architectural Invariants</h4>
              <div className="flex items-start gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Zero single point of failure (SPOF) with multi-zone geographic replication.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Backpressure mitigation prevents network saturation during emergency floods or outages.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Zero telemetry dropped during live software patches with canary deployments.</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTier((prev) => (prev + 1) % 6)}
              className="w-full py-2.5 px-4 rounded-xl border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Cycle to Next Architecture Layer →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
