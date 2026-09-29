import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Car,
  Compass,
  Droplets,
  Trash2,
  Zap,
  ShieldAlert,
  ShieldCheck,
  Wind,
  MessageSquare,
  Bot,
  Settings,
  ClipboardList,
} from 'lucide-react';

export type IcccSidebarCategory =
  | 'overview'
  | 'map'
  | 'traffic'
  | 'roads'
  | 'water'
  | 'waste'
  | 'energy'
  | 'disaster'
  | 'safety'
  | 'environment'
  | 'citizen'
  | 'ai'
  | 'audit'
  | 'settings';

interface IcccLeftSidebarProps {
  activeCategory: IcccSidebarCategory;
  onSelectCategory: (category: IcccSidebarCategory) => void;
  incidentCount: number;
  citizenReportsCount: number;
  onOpenAuditLog: () => void;
}

export const IcccLeftSidebar: React.FC<IcccLeftSidebarProps> = ({
  activeCategory,
  onSelectCategory,
  incidentCount,
  citizenReportsCount,
  onOpenAuditLog,
}) => {
  const menuItems: {
    id: IcccSidebarCategory;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'overview',
      label: 'City Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'map',
      label: 'Live Map',
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      id: 'traffic',
      label: 'Traffic Management',
      icon: <Car className="w-4 h-4" />,
      badge: '86%',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'roads',
      label: 'Road & Infrastructure',
      icon: <Compass className="w-4 h-4" />,
      badge: '6 Active',
    },
    {
      id: 'water',
      label: 'Water Management',
      icon: <Droplets className="w-4 h-4" />,
    },
    {
      id: 'waste',
      label: 'Waste Management',
      icon: <Trash2 className="w-4 h-4" />,
    },
    {
      id: 'energy',
      label: 'Energy & Utilities',
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: 'disaster',
      label: 'Disaster Monitoring',
      icon: <ShieldAlert className="w-4 h-4" />,
      badge: incidentCount > 0 ? `${incidentCount} ALERTS` : undefined,
      badgeColor: 'bg-red-950 text-red-300 border-red-500/50 animate-pulse',
    },
    {
      id: 'safety',
      label: 'Public Safety',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: 'environment',
      label: 'Environment & Air',
      icon: <Wind className="w-4 h-4" />,
      badge: 'AQI 42',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'citizen',
      label: 'Citizen Reports',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: citizenReportsCount,
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-500/40',
    },
    {
      id: 'ai',
      label: 'AI Assistant',
      icon: <Bot className="w-4 h-4" />,
      badge: 'ONLINE',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-500/40',
    },
    {
      id: 'audit',
      label: 'Audit & Activity Log',
      icon: <ClipboardList className="w-4 h-4" />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-56 shrink-0 bg-[#040814]/90 border-r border-slate-800/80 p-2.5 flex flex-col justify-between hidden md:flex">
      <div className="space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          Operations Core
        </div>

        {menuItems.map((item) => {
          const isActive = activeCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'audit') {
                  onOpenAuditLog();
                } else {
                  onSelectCategory(item.id);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/70 border border-cyan-500/60 text-cyan-300 shadow-md shadow-cyan-950/50 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span
                  className={`${
                    isActive
                      ? 'text-cyan-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                    item.badgeColor || 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Control Room Station Status Footer */}
      <div className="pt-3 border-t border-slate-800/80 px-2 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>ICCC Node Status</span>
          <span className="text-emerald-400 font-bold">100% HEALTH</span>
        </div>
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-full animate-pulse" />
        </div>
        <div className="text-[9px] font-mono text-slate-400 text-center">
          Terminal 04 • Sub-sec Telemetry
        </div>
      </div>
    </aside>
  );
};
