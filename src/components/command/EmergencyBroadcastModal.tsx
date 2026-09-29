import React, { useState } from 'react';
import {
  Send,
  X,
  AlertTriangle,
  Radio,
  Bell,
  Monitor,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface EmergencyBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBroadcast: (broadcastData: {
    targetArea: string;
    alertType: string;
    message: string;
    channels: string[];
    severity: string;
    validity: string;
  }) => void;
}

export const EmergencyBroadcastModal: React.FC<EmergencyBroadcastModalProps> = ({
  isOpen,
  onClose,
  onBroadcast,
}) => {
  const [targetArea, setTargetArea] = useState('Sector 8 (Marina Estuary) & Coastal Lowlands');
  const [alertType, setAlertType] = useState('Flood Warning & Waterlogging');
  const [message, setMessage] = useState(
    'SURGE WARNING: Estuary water levels rising rapidly. Avoid lower boardwalk and underpasses. Elevated shelter open at SkyHub.'
  );
  const [channels, setChannels] = useState<string[]>([
    'City Website Banner',
    'Mobile Notification Push',
    'Public Display Boards',
    'Transport Displays',
  ]);
  const [severity, setSeverity] = useState('Critical');
  const [validity, setValidity] = useState('Next 4 Hours');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleChannel = (ch: string) => {
    setChannels((prev) =>
      prev.includes(ch) ? prev.filter((x) => x !== ch) : [...prev, ch]
    );
  };

  const handleSend = () => {
    setIsSuccess(true);
    onBroadcast({
      targetArea,
      alertType,
      message,
      channels,
      severity,
      validity,
    });
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#060c1d] border border-purple-500/50 shadow-2xl p-6 text-slate-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-950 border border-purple-500/50 text-purple-300">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-slate-100">
                City-Wide Emergency Broadcast Gateway
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Multi-channel municipal alert deployment across digital and physical infrastructure
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce-slow" />
            <h4 className="text-lg font-bold text-slate-100">
              Emergency Broadcast Dispatched
            </h4>
            <p className="text-xs font-mono text-slate-400">
              Active across {channels.length} channels • 14,200 recipients notified
            </p>
          </div>
        ) : (
          <div className="space-y-3 text-xs font-mono">
            {/* Target Area */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase font-bold">
                Target Geographic Area
              </label>
              <input
                type="text"
                value={targetArea}
                onChange={(e) => setTargetArea(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Alert Type & Severity */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold">
                  Alert Category
                </label>
                <select
                  value={alertType}
                  onChange={(e) => setAlertType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="Flood Warning & Waterlogging">Flood Warning &amp; Waterlogging</option>
                  <option value="Severe Weather & Windstorm">Severe Weather &amp; Windstorm</option>
                  <option value="Road Closure & Traffic Gridlock">Road Closure &amp; Traffic Gridlock</option>
                  <option value="Evacuation Order">Evacuation Order</option>
                  <option value="Power Grid Disruption">Power Grid Disruption</option>
                  <option value="Public Safety Advisory">Public Safety Advisory</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold">
                  Severity Tier
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="Critical">Critical (Immediate Action)</option>
                  <option value="High">High (Advisory Precaution)</option>
                  <option value="Medium">Medium (Informational)</option>
                </select>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase font-bold">
                Broadcast Copy (Multi-Lingual Synchronized)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Channels Checklist */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-bold">
                Dissemination Channels ({channels.length} Selected)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'City Website Banner',
                  'Mobile Notification Push',
                  'Public Display Boards',
                  'Emergency Sirens',
                  'Transport Displays',
                  'Social Broadcast Matrix',
                ].map((ch) => {
                  const checked = channels.includes(ch);
                  return (
                    <label
                      key={ch}
                      className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        checked
                          ? 'border-purple-500 bg-purple-950/60 text-purple-200 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span className="truncate">{ch}</span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleChannel(ch)}
                        className="accent-purple-500"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSend}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-red-500 text-slate-950 font-bold uppercase tracking-wider shadow-lg shadow-purple-950/50 hover:opacity-95"
              >
                Confirm &amp; Broadcast Alert
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
