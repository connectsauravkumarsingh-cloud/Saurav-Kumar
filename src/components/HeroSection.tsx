import React, { useRef, useEffect } from 'react';
import { ArrowRight, Cpu, Layers, Radio, Zap, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onExploreCity: () => void;
  onViewArchitecture: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCity,
  onViewArchitecture,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated neural network & data particle background for the cinematic city frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes representing city sensors & cloud neural connections
    const nodeCount = 38;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }[] = [];

    const colors = ['#06b6d4', '#38bdf8', '#3b82f6', '#fbbf24'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Skyway transit packets
    const gliders: { x: number; y: number; speed: number; laneY: number }[] = [
      { x: 0, y: height * 0.62, speed: 1.6, laneY: height * 0.62 },
      { x: width * 0.4, y: height * 0.48, speed: -1.2, laneY: height * 0.48 },
      { x: width * 0.8, y: height * 0.74, speed: 1.4, laneY: height * 0.74 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint architectural grid wireframe at bottom
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const step = 32;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, height * 0.45);
        ctx.lineTo(x + (x - width / 2) * 0.5, height);
        ctx.stroke();
      }
      for (let y = height * 0.45; y < height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Glider Light Trails
      gliders.forEach((g) => {
        g.x += g.speed;
        if (g.speed > 0 && g.x > width + 50) g.x = -50;
        if (g.speed < 0 && g.x < -50) g.x = width + 50;

        ctx.strokeStyle = g.speed > 0 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(251, 191, 36, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(g.x - g.speed * 18, g.laneY);
        ctx.lineTo(g.x, g.laneY);
        ctx.stroke();

        ctx.fillStyle = g.speed > 0 ? '#00f0ff' : '#fbbf24';
        ctx.beginPath();
        ctx.arc(g.x, g.laneY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & render neural nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.28;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw node with glow
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="vision"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden cyber-grid"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vision & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>NEXT-GEN AUTONOMOUS METROPOLIS OS</span>
            </div>

            {/* Primary Cinematic Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 leading-[1.1] uppercase">
                THE CITY IS NO LONGER STATIC.
              </h1>
              <p className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent leading-[1.1] uppercase">
                IT THINKS. IT ADAPTS. IT EVOLVES.
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-700 font-normal leading-relaxed max-w-xl">
              A cloud-native intelligent city where generative AI, autonomous infrastructure, renewable energy, and connected systems work together in real time.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCity}
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm tracking-wide uppercase font-mono shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore the City</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onViewArchitecture}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-slate-700/80 hover:border-cyan-400/60 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-slate-800/80"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>View Architecture</span>
              </button>
            </div>

            {/* Proof Metrics Strip */}
            <div className="pt-6 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-300/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">42.8M</div>
                <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">Telemetry Nodes</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">12ms</div>
                <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">Edge AI Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">100%</div>
                <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">Renewable Circularity</div>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Smart City Visual Showcase Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 p-2 shadow-2xl shadow-cyan-950/40">
              {/* Outer Glowing Accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/20 blur-2xl pointer-events-none" />

              {/* Cinematic City Viewport Frame */}
              <div className="relative h-[440px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#070e1d] via-[#09152b] to-[#040813]">
                {/* SVG City Skyline & Bio-Architectural Masterpiece */}
                <svg
                  viewBox="0 0 600 500"
                  className="absolute inset-0 w-full h-full object-cover"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#030814" />
                      <stop offset="50%" stopColor="#081733" />
                      <stop offset="100%" stopColor="#0b224d" />
                    </linearGradient>

                    <linearGradient id="towerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0f2b48" />
                      <stop offset="50%" stopColor="#1e4976" />
                      <stop offset="100%" stopColor="#0a1d33" />
                    </linearGradient>

                    <linearGradient id="towerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#123356" />
                      <stop offset="50%" stopColor="#1a5286" />
                      <stop offset="100%" stopColor="#0e233a" />
                    </linearGradient>

                    <linearGradient id="solarGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
                    </linearGradient>

                    <linearGradient id="goldBeacon" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Twilight Sky Backdrop */}
                  <rect width="600" height="500" fill="url(#skyGrad)" />

                  {/* Atmospheric Moon / AI Core Halo */}
                  <circle cx="480" cy="90" r="48" fill="url(#goldBeacon)" opacity="0.6" filter="blur(6px)" />
                  <circle cx="480" cy="90" r="30" fill="#fef3c7" opacity="0.8" />

                  {/* Far Skyline Silhouettes */}
                  <path
                    d="M30,350 L70,300 L90,300 L110,350 L180,260 L210,260 L240,360 L320,220 L350,220 L380,350 L460,280 L490,280 L540,360 L600,340 L600,500 L0,500 L0,360 Z"
                    fill="#071326"
                    opacity="0.85"
                  />

                  {/* Mid-Ground Biophilic Skyscrapers */}
                  {/* Tower 1 (West Arc) */}
                  <path
                    d="M80,480 L80,180 Q120,150 160,180 L160,480 Z"
                    fill="url(#towerGrad1)"
                    stroke="rgba(56, 189, 248, 0.4)"
                    strokeWidth="1.5"
                  />
                  {/* Solar Window Stripes */}
                  <line x1="90" y1="210" x2="150" y2="210" stroke="#38bdf8" strokeWidth="1" opacity="0.7" />
                  <line x1="90" y1="240" x2="150" y2="240" stroke="#38bdf8" strokeWidth="1" opacity="0.7" />
                  <line x1="90" y1="270" x2="150" y2="270" stroke="#fbbf24" strokeWidth="1.2" opacity="0.8" />
                  <line x1="90" y1="300" x2="150" y2="300" stroke="#38bdf8" strokeWidth="1" opacity="0.7" />
                  <line x1="90" y1="330" x2="150" y2="330" stroke="#38bdf8" strokeWidth="1" opacity="0.7" />

                  {/* Central Nexus Monolith (Tower 2 - Quantum Spire) */}
                  <polygon
                    points="260,480 275,110 325,110 340,480"
                    fill="url(#towerGrad2)"
                    stroke="rgba(6, 182, 212, 0.6)"
                    strokeWidth="1.5"
                  />
                  {/* Spire Pinnacle Antenna */}
                  <line x1="300" y1="110" x2="300" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
                  <circle cx="300" cy="40" r="4" fill="#fbbf24" />
                  <circle cx="300" cy="40" r="10" stroke="#38bdf8" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" />

                  {/* Solar Glass Facade */}
                  <rect x="285" y="140" width="30" height="260" fill="url(#solarGlass)" rx="4" />

                  {/* Tower 3 (East Bioclimatic Helix) */}
                  <path
                    d="M400,480 L420,160 Q460,130 490,160 L510,480 Z"
                    fill="url(#towerGrad1)"
                    stroke="rgba(56, 189, 248, 0.4)"
                    strokeWidth="1.5"
                  />
                  {/* Hanging Gardens Green Accents */}
                  <ellipse cx="455" cy="220" rx="35" ry="8" fill="#10b981" opacity="0.6" />
                  <ellipse cx="455" cy="280" rx="40" ry="9" fill="#10b981" opacity="0.6" />
                  <ellipse cx="455" cy="340" rx="45" ry="10" fill="#10b981" opacity="0.6" />

                  {/* Skybridges Connecting Towers */}
                  <path
                    d="M160,250 C210,230 250,220 280,240"
                    stroke="#38bdf8"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <path
                    d="M325,260 C360,240 380,240 415,260"
                    stroke="#38bdf8"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.85"
                  />

                  {/* Hyperloop Skyway Tube */}
                  <path
                    d="M0,380 C150,370 300,390 600,375"
                    stroke="rgba(6, 182, 212, 0.5)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <path
                    d="M0,380 C150,370 300,390 600,375"
                    stroke="#ffffff"
                    strokeWidth="1"
                    strokeDasharray="12 12"
                    fill="none"
                    opacity="0.75"
                  />

                  {/* Ground Level Waterway with Reflection */}
                  <polygon points="0,450 600,450 600,500 0,500" fill="#041224" />
                  <ellipse cx="300" cy="475" rx="200" ry="15" fill="#06b6d4" opacity="0.18" filter="blur(8px)" />
                </svg>

                {/* Neural Canvas Overlay */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />

                {/* Live Floating Telemetry Chips */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-md">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>NEXUS-GRID · ACTIVE</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-amber-500/40 text-xs font-mono text-amber-300 shadow-md">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>1.8 GW SOLAR CANOPY</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-emerald-500/40 text-xs font-mono text-emerald-300 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AUTONOMOUS AGENTS: 100% ONLINE</span>
                </div>

                {/* Bottom Interactive Focal Indicator */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 rounded-xl bg-slate-950/80 backdrop-blur-lg border border-slate-700/60 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-slate-300">CENTRAL DISPATCH: CONTINUOUS OPTIMIZATION</span>
                  </div>
                  <button
                    onClick={onExploreCity}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>Tap to Inspect Hotspots</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
