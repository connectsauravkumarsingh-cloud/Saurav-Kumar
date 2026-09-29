import React, { useState } from 'react';
import {
  AlertTriangle,
  X,
  MapPin,
  ShieldAlert,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { IncidentRecord } from '../../data/commandCenterData';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitIncident: (newInc: IncidentRecord) => void;
}

export const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({
  isOpen,
  onClose,
  onSubmitIncident,
}) => {
  const [type, setType] = useState<IncidentRecord['type']>('Road Accident');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('NH-24 Flyover Sector 8');
  const [sector, setSector] = useState('Sector 8');
  const [severity, setSeverity] = useState<IncidentRecord['severity']>('High');
  const [source, setSource] = useState<IncidentRecord['source']>('LiDAR Traffic Sensor');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const incId = `INC-2026-0928-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord: IncidentRecord = {
      id: incId,
      type,
      title: title.trim() || `${type} detected in ${location}`,
      location,
      sector,
      coordinates: { x: 55, y: 50 },
      severity,
      status: 'Verified',
      timeDetected: new Date().toTimeString().slice(0, 8),
      timeAgo: 'Just now',
      source,
      aiAnalysis: {
        whatHappened: `Verified incident ${type} reported at ${location}. Real-time sensory confirmation received via ${source}.`,
        whyItHappened: 'Immediate causal investigation initiated by ICCC sensor grid.',
        currentImpact: 'Localized disruption flagged for nearby transit and municipal assets.',
        affectedZones: [sector],
        nearbyResources: ['Emergency Response Unit East', 'Traffic Dispatch Squad 04'],
        recommendedResponse: [
          'Dispatch primary response crew immediately.',
          'Verify surrounding CCTV feeds for live situational awareness.',
          'Issue automated arterial traffic advisory if transit speeds drop.',
        ],
        secondaryRisks: ['Traffic queueing in adjacent corridors.'],
      },
    };

    onSubmitIncident(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#060c1d] border border-red-500/50 shadow-2xl p-6 text-slate-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-950 border border-red-500/50 text-red-300">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-slate-100">
                Log Operational Incident
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Initiate unified municipal response &amp; automated dispatch
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

        <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase font-bold">
                Incident Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as IncidentRecord['type'])}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-red-400"
              >
                <option value="Road Accident">Road Accident</option>
                <option value="Flood Warning">Flood Warning</option>
                <option value="Power Outage">Power Outage</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Fire">Fire</option>
                <option value="Traffic Congestion">Traffic Congestion</option>
                <option value="Medical Emergency">Medical Emergency</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase font-bold">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) =>
                  setSeverity(e.target.value as IncidentRecord['severity'])
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-red-400"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">
              Incident Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Overturned Tanker on Flyover Ramp..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-red-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase font-bold">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-red-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase font-bold">
                Detection Source
              </label>
              <select
                value={source}
                onChange={(e) =>
                  setSource(e.target.value as IncidentRecord['source'])
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-red-400"
              >
                <option value="LiDAR Traffic Sensor">LiDAR Traffic Sensor</option>
                <option value="AI Hydrological Radar">AI Hydrological Radar</option>
                <option value="Smart Meter Grid">Smart Meter Grid</option>
                <option value="Thermal Camera">Thermal Camera</option>
                <option value="Citizen Report #CR-2941">Citizen Report #CR-2941</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-slate-950 font-bold uppercase tracking-wider shadow-lg shadow-red-950/50 hover:opacity-95"
            >
              Log &amp; Dispatch Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
