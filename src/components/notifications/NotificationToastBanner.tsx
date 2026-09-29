import React, { useEffect, useState } from 'react';
import { CityNotification } from '../../types/disaster';
import {
  BellRing,
  X,
  ArrowRight,
  Waves,
  Activity,
  Wind,
  Flame,
  SunMedium,
  Zap,
  Mountain,
  AlertTriangle,
} from 'lucide-react';

interface NotificationToastBannerProps {
  notification: CityNotification | null;
  onDismiss: () => void;
  onOpenCenter: () => void;
}

export const NotificationToastBanner: React.FC<NotificationToastBannerProps> = ({
  notification,
  onDismiss,
  onOpenCenter,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!notification) return;

    setProgress(100);
    const startTime = Date.now();
    const duration = 6500; // 6.5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onDismiss();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [notification, onDismiss]);

  if (!notification) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'flood':
        return <Waves className="w-4 h-4 text-cyan-400" />;
      case 'earthquake':
        return <Activity className="w-4 h-4 text-amber-400" />;
      case 'cyclone':
        return <Wind className="w-4 h-4 text-sky-400" />;
      case 'fire':
        return <Flame className="w-4 h-4 text-red-400" />;
      case 'heatwave':
        return <SunMedium className="w-4 h-4 text-orange-400" />;
      case 'grid':
        return <Zap className="w-4 h-4 text-amber-300" />;
      case 'landslide':
        return <Mountain className="w-4 h-4 text-emerald-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-cyan-400" />;
    }
  };

  const isCritical = notification.severity === 'critical';
  const isWarning = notification.severity === 'warning';

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-full animate-in slide-in-from-top-4 fade-in duration-300 shadow-2xl">
      <div
        className={`rounded-2xl border p-4 backdrop-blur-xl relative overflow-hidden text-slate-100 ${
          isCritical
            ? 'border-red-500/80 bg-[#0c0408]/95 shadow-red-950/60'
            : isWarning
            ? 'border-amber-500/80 bg-[#0e0a04]/95 shadow-amber-950/60'
            : 'border-cyan-500/80 bg-[#040b16]/95 shadow-cyan-950/60'
        }`}
      >
        {/* Animated Progress Timer Bar */}
        <div
          className={`absolute bottom-0 left-0 h-1 transition-all ease-linear ${
            isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-400' : 'bg-cyan-400'
          }`}
          style={{ width: `${progress}%` }}
        />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
              {getCategoryIcon(notification.category)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${
                    isCritical
                      ? 'border-red-500 bg-red-950 text-red-200 animate-pulse'
                      : isWarning
                      ? 'border-amber-500 bg-amber-950 text-amber-200'
                      : 'border-cyan-500 bg-cyan-950 text-cyan-200'
                  }`}
                >
                  {notification.severity}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {notification.sourceName}
                </span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1 mt-0.5">
                {notification.title}
              </h5>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="p-1 rounded-lg hover:bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 font-normal line-clamp-2 mt-2 mb-3">
          {notification.message}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs font-mono">
          <span className="text-[11px] text-cyan-300 truncate max-w-[200px]">
            📍 {notification.location}
          </span>

          <button
            onClick={() => {
              onDismiss();
              onOpenCenter();
            }}
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold"
          >
            <span>View in Centre</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
