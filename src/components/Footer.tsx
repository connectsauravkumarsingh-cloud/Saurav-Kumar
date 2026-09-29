import React from 'react';
import { NexusLogo } from './NexusLogo';
import { PageId } from '../types';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-[#03060f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          {/* Left: Brand & Statement */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <NexusLogo size={36} showText={true} subtitle={false} />
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Intelligent infrastructure for the next generation.
            </p>
          </div>

          {/* Navigation Links to Dedicated Pages */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <button
              onClick={() => handleNav('home')}
              className="hover:text-cyan-400 transition-colors"
            >
              Home Overview
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => handleNav('disaster')}
              className="hover:text-red-400 text-red-300 font-bold transition-colors"
            >
              Disaster Control
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => handleNav('architecture')}
              className="hover:text-cyan-400 transition-colors"
            >
              Architecture
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => handleNav('infrastructure')}
              className="hover:text-blue-400 transition-colors"
            >
              Infrastructure
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => handleNav('command-center')}
              className="hover:text-purple-400 transition-colors"
            >
              Command Center
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => handleNav('sustainability')}
              className="hover:text-emerald-400 transition-colors"
            >
              Sustainability
            </button>
          </div>

          {/* Technical Keywords Pillar */}
          <div className="text-xs font-mono text-cyan-400/90 tracking-wide text-center md:text-right">
            Cloud • AI • Automation • Sustainability
          </div>
        </div>

        {/* Bottom copyright and metadata strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} NEXUS CITY. Autonomous Urban Computing Initiative.
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Cloud-Native Architecture</span>
            <span>·</span>
            <span>Serverless Scalability</span>
            <span>·</span>
            <span>Generative Cloud AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
