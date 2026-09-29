import React, { useState } from 'react';
import {
  AlertTriangle,
  BellRing,
  Volume2,
  VolumeX,
  X,
  ChevronRight,
  ShieldAlert,
  Hospital,
  Compass,
  CheckCircle,
} from 'lucide-react';
import { AlertSeverity } from '../../types/disaster';

interface EmergencyNotificationCenterProps {
  activeSeverity: AlertSeverity;
  headline: string;
  location: string;
  disasterCategory: string;
  recommendations: string[];
  nearestFacilityName: string;
  nearestFacilityType: string;
  onInspectZone?: () => void;
  isSimulated?: boolean;
}

export const EmergencyNotificationCenter: React.FC<EmergencyNotificationCenterProps> = ({
  activeSeverity,
  headline,
  location,
  disasterCategory,
  recommendations,
  nearestFacilityName,
  nearestFacilityType,
  onInspectZone,
  isSimulated = true,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [browserNotificationStatus, setBrowserNotificationStatus] = useState<
    'default' | 'granted' | 'denied'
  >(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission as 'default' | 'granted' | 'denied';
    }
    return 'default';
  });
  const [pushSentToast, setPushSentToast] = useState(false);

  // If severity is safe and user closed it, keep minimal
  if (activeSeverity === 'safe' && isDismissed) {
    return (
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsDismissed(false)}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800"
        >
          <BellRing className="w-3.5 h-3.5 text-cyan-400" />
          <span>Show Emergency Broadcast Bar</span>
        </button>
      </div>
    );
  }

  const handleRequestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setBrowserNotificationStatus(permission as any);
        if (permission === 'granted') {
          // Send a test simulated emergency push
          new Notification('NEXUS CITY — Smart Emergency Alert', {
            body: `[SIMULATED] ${headline} in ${location}. Evacuation corridor open to ${nearestFacilityName}.`,
            icon: '/favicon.ico',
          });
          setPushSentToast(true);
          setTimeout(() => setPushSentToast(false), 4000);
        }
      } catch (err) {
        console.error('Notification permission error', err);
      }
    } else {
      setPushSentToast(true);
      setTimeout(() => setPushSentToast(false), 4000);
    }
  };

  const getSeverityStyles = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return {
          border: 'border-red-500/80',
          bg: 'bg-gradient-to-r from-red-950/80 via-slate-950/90 to-red-950/70',
          badgeBg: 'bg-red-900/60 border-red-500/80 text-red-200',
          iconColor: 'text-red-400',
          glow: 'shadow-[0_0_30px_rgba(239,68,68,0.35)]',
          label: 'CRITICAL EMERGENCY WARNING',
        };
      case 'warning':
        return {
          border: 'border-amber-500/80',
          bg: 'bg-gradient-to-r from-amber-950/70 via-slate-950/90 to-amber-950/60',
          badgeBg: 'bg-amber-900/60 border-amber-500/80 text-amber-200',
          iconColor: 'text-amber-400',
          glow: 'shadow-[0_0_30px_rgba(245,158,11,0.25)]',
          label: 'DISASTER WARNING BROADCAST',
        };
      case 'advisory':
        return {
          border: 'border-cyan-500/60',
          bg: 'bg-gradient-to-r from-cyan-950/60 via-slate-950/90 to-cyan-950/50',
          badgeBg: 'bg-cyan-900/50 border-cyan-500/70 text-cyan-200',
          iconColor: 'text-cyan-400',
          glow: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
          label: 'ENVIRONMENTAL ADVISORY',
        };
      case 'safe':
      default:
        return {
          border: 'border-emerald-500/50',
          bg: 'bg-gradient-to-r from-emerald-950/40 via-slate-950/80 to-slate-950/70',
          badgeBg: 'bg-emerald-900/40 border-emerald-500/60 text-emerald-200',
          iconColor: 'text-emerald-400',
          glow: 'shadow-md',
          label: 'ALL CLEAR // ALL SYSTEMS NORMAL',
        };
    }
  };

  const style = getSeverityStyles(activeSeverity);

  return (
    <div
      className={`relative rounded-2xl border p-4 sm:p-5 mb-8 backdrop-blur-xl transition-all duration-300 ${style.border} ${style.bg} ${style.glow}`}
    >
      {/* Top Banner Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-white/10">
            <ShieldAlert className={`w-5 h-5 ${style.iconColor} ${activeSeverity === 'critical' ? 'animate-bounce' : ''}`} />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider ${style.badgeBg}`}>
              {style.label}
            </span>
            <span className="text-[11px] font-mono text-slate-300">
              DISASTER TYPE: <strong className="text-white uppercase">{disasterCategory}</strong>
            </span>
            {isSimulated && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 border border-blue-400/40 text-blue-300">
                SIMULATED DATASET // READY FOR REAL-TIME FEED
              </span>
            )}
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Browser Notification Permission Button */}
          <button
            onClick={handleRequestPushPermission}
            title="Enable Browser Emergency Pushes"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
              browserNotificationStatus === 'granted'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400'
            }`}
          >
            <BellRing className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {browserNotificationStatus === 'granted' ? 'Push Alerts Active' : 'Enable Emergency Pushes'}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Alert Sound' : 'Enable Alert Tone'}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-400 hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss Alert"
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Alert Content Body */}
      <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Left: Location & Headline */}
        <div className="lg:col-span-7 space-y-2 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>PRIMARY IMPACT ZONE:</span>
            <strong className="text-cyan-300">{location}</strong>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            {headline}
          </h3>
          <div className="space-y-1 pt-1">
            <p className="text-xs font-mono text-slate-400 uppercase">Immediate Safety Protocol:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-200">
              {recommendations.slice(0, 2).map((rec, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Emergency Facility & Quick Routing CTA */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-left flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Hospital className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Nearest Emergency Facility</div>
                <div className="text-xs font-bold font-mono text-slate-100 truncate">{nearestFacilityName}</div>
                <div className="text-[10px] text-emerald-400 font-mono">100% Operational &amp; Staged</div>
              </div>
            </div>
            {onInspectZone && (
              <button
                onClick={onInspectZone}
                className="shrink-0 p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1 transition-colors"
              >
                <span>Map Route</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Push Notification Feedback Toast */}
      {pushSentToast && (
        <div className="absolute top-2 right-2 sm:right-16 z-30 px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-400 text-emerald-200 text-xs font-mono shadow-xl animate-in fade-in">
          ✓ Simulated browser push notification dispatched!
        </div>
      )}
    </div>
  );
};
