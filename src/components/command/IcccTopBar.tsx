import React, { useState, useEffect } from 'react';
import { PageId } from '../../types';
import { OperatorRole } from '../../data/commandCenterData';
import { NexusLogo } from '../NexusLogo';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Shield,
  UserCheck,
  ChevronDown,
  Clock,
  Radio,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface IcccTopBarProps {
  onNavigate: (page: PageId) => void;
  activeRole: OperatorRole;
  onRoleChange: (role: OperatorRole) => void;
  unreadAlertCount: number;
  onOpenAlerts: () => void;
  onOpenAuditLog: () => void;
  simulationModeActive: boolean;
  onToggleSimulationMode: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const IcccTopBar: React.FC<IcccTopBarProps> = ({
  onNavigate,
  activeRole,
  onRoleChange,
  unreadAlertCount,
  onOpenAlerts,
  onOpenAuditLog,
  simulationModeActive,
  onToggleSimulationMode,
  searchQuery,
  onSearchChange,
  soundEnabled,
  onToggleSound,
}) => {
  const [liveTime, setLiveTime] = useState({
    time: '17:12:42',
    date: 'Mon, Sep 28, 2026',
  });
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      setLiveTime({ time: timeStr, date: dateStr });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const roles: { id: OperatorRole; label: string; desc: string; badgeColor: string }[] = [
    {
      id: 'CITY_ADMIN',
      label: 'Saurav (City Admin)',
      desc: 'Full operational & approval authority',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    },
    {
      id: 'EMERGENCY_COMMANDER',
      label: 'Emergency Commander',
      desc: 'Disaster protocol & evacuation authority',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    },
    {
      id: 'SUPERVISOR',
      label: 'Ananya Sharma (Supervisor)',
      desc: 'Approves road closures & diversions',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    },
    {
      id: 'OPERATOR',
      label: 'Vikram Mehta (Operator)',
      desc: 'Standard operations & incident dispatch',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    },
    {
      id: 'VIEWER',
      label: 'Public / Municipal Auditor',
      desc: 'Read-only monitoring mode',
      badgeColor: 'bg-slate-700/40 text-slate-300 border-slate-600',
    },
  ];

  const currentRoleConfig = roles.find((r) => r.id === activeRole) || roles[0];

  return (
    <header className="sticky top-0 z-40 bg-[#040814]/95 border-b border-cyan-500/20 backdrop-blur-xl px-4 py-2.5 shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-[1920px] mx-auto">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <NexusLogo size={34} showText={false} />
            <div>
              <div className="text-sm font-extrabold tracking-wider text-slate-100 flex items-center gap-1.5 font-mono">
                <span className="text-cyan-400">NEXUS</span>
                <span>CITY</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  ICCC
                </span>
              </div>
              <div className="text-[9px] font-mono text-slate-400 tracking-wider uppercase">
                Intelligent Smart City Operations
              </div>
            </div>
          </button>
        </div>

        {/* Center-Left: Main Navigation Tabs (as shown in reference screenshot) */}
        <nav className="hidden xl:flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono font-semibold">
          <button
            onClick={() => onNavigate('home')}
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider"
          >
            Dashboard
          </button>

          <button
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider shadow-md shadow-cyan-500/30 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
            <span>Command Center</span>
          </button>

          <button
            onClick={() => onNavigate('infrastructure')}
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider"
          >
            Live Map
          </button>

          <button
            onClick={() => onNavigate('disaster')}
            className="px-3 py-1.5 rounded-lg text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            <span>Disaster Control</span>
          </button>

          <button
            onClick={() => onNavigate('architecture')}
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider"
          >
            Architecture
          </button>

          <button
            onClick={() => onNavigate('sustainability')}
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider"
          >
            Sustainability
          </button>
        </nav>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 relative hidden md:block">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search location, asset, incident (e.g. NH-24, Sector 8, CAM-003)..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 font-mono transition-colors"
          />
        </div>

        {/* Right Section: Time, Role Switcher, Simulation Mode, Alerts & Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Simulation Mode Toggle Button */}
          <button
            onClick={onToggleSimulationMode}
            className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all ${
              simulationModeActive
                ? 'bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/60'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            title="Inject simulated urban disturbances to test operator workflows"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">SIMULATION</span>
            <span
              className={`w-2 h-2 rounded-full ${
                simulationModeActive ? 'bg-purple-400 animate-pulse' : 'bg-slate-600'
              }`}
            />
          </button>

          {/* Sound audio chime toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 transition-colors"
            title={soundEnabled ? 'Mute Alert Audio' : 'Unmute Alert Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Alert Bell Button */}
          <button
            onClick={onOpenAlerts}
            className="relative p-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
            title={`${unreadAlertCount} Active System Alerts`}
          >
            <Bell className="w-4 h-4" />
            {unreadAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-mono font-extrabold flex items-center justify-center animate-pulse">
                {unreadAlertCount}
              </span>
            )}
          </button>

          {/* Live UTC / Clock Ticker with Live Beacon */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800/90 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <div className="text-right">
              <div className="text-xs font-extrabold text-slate-100 tracking-wider">
                {liveTime.time}
              </div>
              <div className="text-[9px] text-slate-400">{liveTime.date}</div>
            </div>
            <div className="flex items-center gap-1 pl-1 border-l border-slate-800 ml-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                LIVE
              </span>
            </div>
          </div>

          {/* Role-Based Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
                {activeRole === 'CITY_ADMIN' ? 'S' : activeRole === 'SUPERVISOR' ? 'AS' : activeRole === 'OPERATOR' ? 'VM' : activeRole === 'EMERGENCY_COMMANDER' ? 'EC' : 'VB'}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-slate-200 truncate max-w-[110px]">
                  {activeRole === 'CITY_ADMIN' ? 'Saurav' : currentRoleConfig.label.split(' ')[0]}
                </div>
                <div className="text-[9px] font-mono text-cyan-400 uppercase truncate">
                  {activeRole.replace('_', ' ')}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Role Switcher Menu */}
            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#060e22] border border-cyan-500/40 shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center justify-between">
                  <span>Switch Operator Role</span>
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                </div>

                <div className="space-y-1 py-1">
                  {roles.map((r) => {
                    const isSelected = activeRole === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          onRoleChange(r.id);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-200'
                            : 'hover:bg-slate-900 text-slate-300'
                        }`}
                      >
                        <UserCheck
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isSelected ? 'text-cyan-400' : 'text-slate-600'
                          }`}
                        />
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span>{r.label}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                            {r.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setRoleMenuOpen(false);
                      onOpenAuditLog();
                    }}
                    className="w-full text-center py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-cyan-300 transition-colors"
                  >
                    View Operator Audit Log →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
