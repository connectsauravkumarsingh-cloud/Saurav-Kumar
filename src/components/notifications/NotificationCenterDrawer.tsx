import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  CityNotification,
  DisasterCategory,
  AlertSeverity,
} from '../../types/disaster';
import { PageId } from '../../types';
import {
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  X,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Waves,
  Activity,
  Wind,
  Flame,
  SunMedium,
  Zap,
  Mountain,
  MapPin,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Filter,
  Check,
  Radio,
  Share2,
  PhoneCall,
  Search,
  RotateCcw,
} from 'lucide-react';

interface NotificationCenterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: CityNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onSimulateNewAlert: () => void;
  onResetNotifications: () => void;
  onNavigatePage: (page: PageId, tab?: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const NotificationCenterDrawer: React.FC<NotificationCenterDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onSimulateNewAlert,
  onResetNotifications,
  onNavigatePage,
  soundEnabled,
  onToggleSound,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [browserPermission, setBrowserPermission] = useState<
    'default' | 'granted' | 'denied'
  >(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission as 'default' | 'granted' | 'denied';
    }
    return 'default';
  });

  // Handle ESC key to close
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

  const requestBrowserNotifications = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setBrowserPermission(permission);
        if (permission === 'granted') {
          new Notification('NEXUS CITY Emergency Alert System', {
            body: 'Browser push notifications successfully enabled for flood, earthquake, and citywide disaster updates.',
            icon: '/favicon.ico',
          });
        }
      } catch (err) {
        console.debug('Notification request failed', err);
      }
    }
  };

  const getCategoryIcon = (category: DisasterCategory, className = 'w-4 h-4') => {
    switch (category) {
      case 'flood':
        return <Waves className={`${className} text-cyan-400`} />;
      case 'earthquake':
        return <Activity className={`${className} text-amber-400`} />;
      case 'cyclone':
        return <Wind className={`${className} text-sky-400`} />;
      case 'fire':
        return <Flame className={`${className} text-red-400`} />;
      case 'heatwave':
        return <SunMedium className={`${className} text-orange-400`} />;
      case 'grid':
        return <Zap className={`${className} text-amber-300`} />;
      case 'landslide':
        return <Mountain className={`${className} text-emerald-400`} />;
      default:
        return <AlertTriangle className={`${className} text-cyan-400`} />;
    }
  };

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return {
          label: 'CRITICAL',
          classes: 'bg-red-950/80 border-red-500 text-red-200 shadow-sm shadow-red-900/50',
          dot: 'bg-red-500 animate-ping',
        };
      case 'warning':
        return {
          label: 'WARNING',
          classes: 'bg-amber-950/80 border-amber-500 text-amber-200',
          dot: 'bg-amber-400 animate-pulse',
        };
      case 'advisory':
        return {
          label: 'ADVISORY',
          classes: 'bg-cyan-950/80 border-cyan-500/80 text-cyan-200',
          dot: 'bg-cyan-400',
        };
      case 'safe':
      default:
        return {
          label: 'STABILIZED',
          classes: 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200',
          dot: 'bg-emerald-400',
        };
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      // Category filter
      if (selectedCategory !== 'all' && notif.category !== selectedCategory) {
        return false;
      }
      // Severity filter
      if (selectedSeverity !== 'all' && notif.severity !== selectedSeverity) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = notif.title.toLowerCase().includes(q);
        const matchesMsg = notif.message.toLowerCase().includes(q);
        const matchesLoc = notif.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesMsg && !matchesLoc) {
          return false;
        }
      }
      return true;
    });
  }, [notifications, selectedCategory, selectedSeverity, searchQuery]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Dark overlay backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-2xl bg-[#050914] border-l border-cyan-500/30 shadow-2xl h-full flex flex-col justify-between overflow-hidden text-slate-100 z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-[#060c1d] relative z-10 shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 relative">
                <BellRing className="w-5 h-5 text-cyan-400 animate-pulse" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-mono font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-tight">
                    City Notification Centre
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold">
                    LIVE FEED
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Autonomous Multi-Hazard Early Warnings &amp; Disaster Advisories
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
              title="Close Drawer (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Toolbar: Sound, Browser Push, Simulate, Mark All as Read */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
            <div className="flex items-center gap-2">
              {/* Sound Audio Toggle */}
              <button
                onClick={onToggleSound}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors ${
                  soundEnabled
                    ? 'border-cyan-500/50 bg-cyan-950/60 text-cyan-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
                title={soundEnabled ? 'Siren & Audio Chime On' : 'Muted'}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Audio Alert On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Muted</span>
                  </>
                )}
              </button>

              {/* Browser Push Permission Button */}
              {browserPermission !== 'granted' ? (
                <button
                  onClick={requestBrowserNotifications}
                  className="px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-950/50 text-amber-300 hover:bg-amber-900/40 transition-colors flex items-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enable Push</span>
                </button>
              ) : (
                <span className="px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Push Active</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Simulate New Alert Trigger */}
              <button
                onClick={onSimulateNewAlert}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-slate-950 font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-md shadow-red-950/40"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Simulate Live Alert</span>
              </button>

              {/* Mark All Read */}
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white transition-colors"
                >
                  Mark All Read
                </button>
              )}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alerts by hazard, location, or keyword..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Hazard Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-mono">
            {[
              { id: 'all', label: 'All Hazards' },
              { id: 'flood', label: '🌊 Floods' },
              { id: 'earthquake', label: '🌍 Earthquakes' },
              { id: 'cyclone', label: '🌪️ Cyclones' },
              { id: 'fire', label: '🔥 Fires' },
              { id: 'heatwave', label: '🌡️ Heatwaves' },
              { id: 'grid', label: '⚡ Grid' },
              { id: 'landslide', label: '🏔️ Landslides' },
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Severity Filter Tabs */}
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[10px]">SEVERITY:</span>
              {(['all', 'critical', 'warning', 'advisory', 'safe'] as const).map((sev) => {
                const isActive = selectedSeverity === sev;
                return (
                  <button
                    key={sev}
                    onClick={() => setSelectedSeverity(sev)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] uppercase font-bold transition-colors ${
                      isActive
                        ? 'bg-slate-200 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sev}
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-400">
              Showing {filteredNotifications.length} of {notifications.length}
            </div>
          </div>
        </div>

        {/* Scrollable Notifications Feed List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400/80" />
              <div>
                <h4 className="text-sm font-bold text-slate-200">
                  No active alerts matching filter
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-1 max-w-xs">
                  All metropolitan hazard sensors reporting nominal or filter parameters exclude current feeds.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSeverity('all');
                    setSearchQuery('');
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-mono text-cyan-300 hover:text-white"
                >
                  Reset Filters
                </button>
                <button
                  onClick={onSimulateNewAlert}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-mono font-bold hover:bg-cyan-400"
                >
                  Generate Simulated Alert
                </button>
              </div>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const badge = getSeverityBadge(notif.severity);
              const isExpanded = expandedId === notif.id;

              return (
                <div
                  key={notif.id}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all duration-200 relative overflow-hidden group ${
                    notif.isRead
                      ? 'border-slate-800/80 bg-slate-950/60 opacity-85'
                      : notif.severity === 'critical'
                      ? 'border-red-500/70 bg-gradient-to-br from-red-950/40 via-slate-950/90 to-[#080d1e] shadow-lg shadow-red-950/30'
                      : notif.severity === 'warning'
                      ? 'border-amber-500/60 bg-gradient-to-br from-amber-950/30 via-slate-950/90 to-[#080d1e]'
                      : 'border-cyan-500/40 bg-gradient-to-br from-cyan-950/20 via-slate-950/90 to-[#080d1e]'
                  }`}
                >
                  {/* Unread Accent Bar on the Left */}
                  {!notif.isRead && (
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        notif.severity === 'critical'
                          ? 'bg-red-500'
                          : notif.severity === 'warning'
                          ? 'bg-amber-400'
                          : 'bg-cyan-400'
                      }`}
                    />
                  )}

                  {/* Card Header Row */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                        {getCategoryIcon(notif.category)}
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${badge.classes}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                      </span>

                      {/* Source tag */}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {notif.sourceType === 'verified_official' && '🛡️ VERIFIED'}
                        {notif.sourceType === 'ai_early_warning' && '⚡ AI PREDICTION'}
                        {notif.sourceType === 'drill_simulation' && '⚠️ SIMULATED DRILL'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{notif.timestamp}</span>
                      </span>

                      <button
                        onClick={() => onDeleteNotification(notif.id)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors ml-1"
                        title="Dismiss notification"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Message */}
                  <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-1">
                    {notif.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal mb-3">
                    {notif.message}
                  </p>

                  {/* Affected Location Strip */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-3 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-cyan-300 font-medium truncate">{notif.location}</span>
                  </div>

                  {/* Telemetry Sensor Metrics (if present) */}
                  {notif.metrics && notif.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-3 font-mono text-xs">
                      {notif.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-center"
                        >
                          <div className="text-[10px] text-slate-500 uppercase truncate">
                            {m.label}
                          </div>
                          <div className="text-xs font-bold text-slate-200 mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Expandable Safety Precautions */}
                  {notif.precautions && notif.precautions.length > 0 && (
                    <div className="mb-3">
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : notif.id)
                        }
                        className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide' : 'View'} Emergency Safety Precautions ({notif.precautions.length})</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <ul className="mt-2.5 space-y-1.5 pl-3 border-l-2 border-cyan-500/40 text-xs text-slate-300 font-normal">
                          {notif.precautions.map((prec, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-cyan-400 font-mono font-bold">•</span>
                              <span>{prec}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-800/80 text-xs font-mono">
                    <button
                      onClick={() => onMarkAsRead(notif.id)}
                      className="text-slate-400 hover:text-slate-200 text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{notif.isRead ? 'Mark as Unread' : 'Mark as Read'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onNavigatePage('disaster', notif.targetTab || 'hazards');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold hover:bg-cyan-900/60 transition-colors shadow-sm"
                    >
                      <span>Open in Disaster Room</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Bottom Sticky Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#060c1d] relative z-10 shrink-0 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span>National Disaster Helpline:</span>
              <a
                href="tel:112"
                className="text-slate-200 font-bold hover:text-cyan-300 underline"
              >
                112
              </a>
              <span>· NDRF:</span>
              <a
                href="tel:1070"
                className="text-slate-200 font-bold hover:text-cyan-300 underline"
              >
                1070
              </a>
            </div>

            <button
              onClick={onResetNotifications}
              className="text-[11px] font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
              title="Reset alerts to default live stream"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Default Feed</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigatePage('disaster');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 via-amber-500 to-cyan-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-black/50 hover:opacity-95 transition-opacity"
            >
              <ShieldAlert className="w-4 h-4 text-slate-950" />
              <span>Go to Disaster Intelligence Control Room</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
