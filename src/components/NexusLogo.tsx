import React from 'react';

interface NexusLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  subtitle?: boolean;
}

export const NexusLogo: React.FC<NexusLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
  subtitle = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        className="relative flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ width: size, height: size }}
      >
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-60 bg-gradient-to-tr from-cyan-500/40 via-blue-600/30 to-amber-400/30 animate-pulse"
          style={{ transform: 'scale(1.2)' }}
        />

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-md"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="cloudGrad" x1="15" y1="25" x2="85" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <linearGradient id="goldGrad" x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <linearGradient id="devopsLoop" x1="10" y1="50" x2="90" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>

            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background subtle hexagon grid */}
          <polygon
            points="50,6 88,28 88,72 50,94 12,72 12,28"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            fill="rgba(8, 15, 30, 0.4)"
          />

          {/* DevOps Infinity Loop Pathway (Continuous CI/CD Flow) */}
          <path
            d="M32 50 C20 38 16 62 28 62 C40 62 46 38 58 38 C70 38 78 50 68 62 C58 72 52 38 40 38 C28 38 22 50 32 50 Z"
            stroke="url(#devopsLoop)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />

          {/* Stylized Cloud Body Silhouette (Cloud-Native Infrastructure) */}
          <path
            d="M35 56 C31 56 27 52 27 47 C27 42.5 30 38.5 34 38 C36 32 42 27 49 27 C57 27 63 32 65 39 C69 39.5 73 43 73 47.5 C73 52 69 56 65 56 Z"
            stroke="url(#cloudGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="rgba(6, 182, 212, 0.08)"
          />

          {/* Neural Network Interconnected Mesh Lines */}
          <line x1="36" y1="46" x2="50" y2="38" stroke="#38bdf8" strokeWidth="1.2" opacity="0.75" />
          <line x1="50" y1="38" x2="64" y2="46" stroke="#38bdf8" strokeWidth="1.2" opacity="0.75" />
          <line x1="36" y1="46" x2="50" y2="58" stroke="#38bdf8" strokeWidth="1.2" opacity="0.75" />
          <line x1="64" y1="46" x2="50" y2="58" stroke="#38bdf8" strokeWidth="1.2" opacity="0.75" />
          <line x1="50" y1="38" x2="50" y2="58" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.9" />

          {/* Neural Nodes with Gold and Cyan accents */}
          <circle cx="50" cy="38" r="3.5" fill="url(#goldGrad)" filter="url(#logoGlow)" />
          <circle cx="36" cy="46" r="2.8" fill="#06b6d4" />
          <circle cx="64" cy="46" r="2.8" fill="#06b6d4" />
          <circle cx="50" cy="58" r="3.2" fill="#38bdf8" />

          {/* Center Quantum AI Core Pulse */}
          <circle cx="50" cy="48" r="4.5" fill="#f59e0b" opacity="0.9" filter="url(#logoGlow)" />
          <circle cx="50" cy="48" r="2" fill="#ffffff" />

          {/* Satellite Data Sparkles */}
          <circle cx="50" cy="18" r="1.5" fill="#38bdf8" opacity="0.8" />
          <circle cx="78" cy="34" r="1.5" fill="#fbbf24" opacity="0.8" />
          <circle cx="22" cy="66" r="1.5" fill="#06b6d4" opacity="0.8" />
          <circle cx="78" cy="66" r="1.5" fill="#38bdf8" opacity="0.8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-wider text-base md:text-lg bg-gradient-to-r from-slate-100 via-cyan-100 to-amber-300 bg-clip-text text-transparent group-hover:to-cyan-300 transition-all font-mono">
              NEXUS CITY
            </span>
          </div>
          {subtitle && (
            <span className="text-[10px] md:text-[11px] font-medium tracking-wide text-cyan-400/80 dark:text-cyan-400/80 light:text-cyan-700 whitespace-nowrap">
              Intelligent Infrastructure • Powered by Cloud & AI
            </span>
          )}
        </div>
      )}
    </div>
  );
};
