import React, { useState, useEffect } from 'react';
import {
  RoadAsset,
  IncidentRecord,
  CitizenReport,
  OperatorRole,
  EmergencyResource,
} from '../../data/commandCenterData';
import {
  Compass,
  AlertTriangle,
  Users,
  Radio,
  Flame,
  HardHat,
  Truck,
  Send,
  CloudSun,
  Droplets,
  Wind,
  Eye,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Bot,
  Layers,
  Crosshair,
  Filter,
} from 'lucide-react';

interface IcccRightPanelProps {
  roads: RoadAsset[];
  selectedRoad: RoadAsset | null;
  onSelectRoad: (road: RoadAsset) => void;
  incidents: IncidentRecord[];
  selectedIncident: IncidentRecord | null;
  onSelectIncident: (incident: IncidentRecord | null) => void;
  citizenReports: CitizenReport[];
  onVerifyCitizenReport: (reportId: string) => void;
  onRejectCitizenReport: (reportId: string) => void;
  activeRole: OperatorRole;
  onRequestRoadUpdate: (road: RoadAsset, newStatus: RoadAsset['status'], reason: string) => void;
  onDeployResource: (incidentId: string, resource: EmergencyResource) => void;
  emergencyResources: EmergencyResource[];
  onOpenBroadcastModal: () => void;
  onOpenReportIncidentModal: () => void;
  activeTopTab?: 'actions' | 'alerts' | 'citizen';
  onTopTabChange?: (tab: 'actions' | 'alerts' | 'citizen') => void;
}

export const IcccRightPanel: React.FC<IcccRightPanelProps> = ({
  roads,
  selectedRoad,
  onSelectRoad,
  incidents,
  selectedIncident,
  onSelectIncident,
  citizenReports,
  onVerifyCitizenReport,
  onRejectCitizenReport,
  activeRole,
  onRequestRoadUpdate,
  onDeployResource,
  emergencyResources,
  onOpenBroadcastModal,
  onOpenReportIncidentModal,
  activeTopTab,
  onTopTabChange,
}) => {
  const [internalTab, setInternalTab] = useState<'actions' | 'alerts' | 'citizen'>('actions');
  const [roadTab, setRoadTab] = useState<'status' | 'construction' | 'closure' | 'diversion'>('status');
  const [alertSeverityFilter, setAlertSeverityFilter] = useState<'ALL' | 'Critical' | 'High' | 'Moderate'>('ALL');

  // Road update form state
  const [targetStatus, setTargetStatus] = useState<RoadAsset['status']>('Partial Closure');
  const [roadReason, setRoadReason] = useState<string>('');
  const [durationValue, setDurationValue] = useState<string>('Approx. 2 Hours');

  // Sync with prop if provided
  useEffect(() => {
    if (activeTopTab) {
      setInternalTab(activeTopTab);
    }
  }, [activeTopTab]);

  const currentTab = activeTopTab || internalTab;

  const handleTabClick = (tab: 'actions' | 'alerts' | 'citizen') => {
    setInternalTab(tab);
    if (onTopTabChange) {
      onTopTabChange(tab);
    }
  };

  const currentRoad = selectedRoad || roads[0];

  const handleApplyRoadUpdate = () => {
    if (!currentRoad) return;
    const finalReason =
      roadReason.trim() ||
      `${targetStatus} enacted due to verified municipal operations on ${currentRoad.name}`;
    onRequestRoadUpdate(currentRoad, targetStatus, finalReason);
  };

  // Filtered incidents for Alerts tab
  const filteredAlerts = incidents.filter((inc) => {
    if (alertSeverityFilter === 'ALL') return true;
    return inc.severity === alertSeverityFilter;
  });

  return (
    <div className="w-full xl:w-96 2xl:w-[420px] shrink-0 flex flex-col gap-3 h-full overflow-y-auto scrollbar-thin">
      {/* 1. Top Section: 3 Action Tabs */}
      <div className="p-1 rounded-2xl bg-[#060c1e] border border-slate-800 flex items-center justify-between text-xs font-mono">
        <button
          onClick={() => handleTabClick('actions')}
          className={`flex-1 py-1.5 rounded-xl uppercase font-bold transition-all ${
            currentTab === 'actions'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Quick Actions
        </button>

        <button
          onClick={() => handleTabClick('alerts')}
          className={`flex-1 py-1.5 rounded-xl uppercase font-bold flex items-center justify-center gap-1.5 transition-all ${
            currentTab === 'alerts'
              ? 'bg-red-500 text-slate-950 shadow-md shadow-red-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>ALERTS</span>
          <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-red-950 border border-red-500/40 text-red-300 font-bold">
            {incidents.length}
          </span>
        </button>

        <button
          onClick={() => handleTabClick('citizen')}
          className={`flex-1 py-1.5 rounded-xl uppercase font-bold flex items-center justify-center gap-1 transition-all ${
            currentTab === 'citizen'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Reports</span>
          <span className="text-[10px] font-mono px-1 rounded bg-slate-900 text-amber-300">
            {citizenReports.length}
          </span>
        </button>
      </div>

      {/* 2. Quick Actions 3x3 Grid (When currentTab is 'actions') */}
      {currentTab === 'actions' && (
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setRoadTab('status')}
            className="p-2.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:scale-[1.02] shadow-sm"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono font-bold leading-tight">
              Add / Update Road
            </span>
          </button>

          <button
            onClick={onOpenReportIncidentModal}
            className="p-2.5 rounded-2xl bg-red-950/40 border border-red-500/40 hover:border-red-400 text-red-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:scale-[1.02] shadow-sm"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-[10px] font-mono font-bold leading-tight">
              Report Incident
            </span>
          </button>

          <button
            onClick={() => {
              handleTabClick('alerts');
              if (incidents[0]) onSelectIncident(incidents[0]);
            }}
            className="p-2.5 rounded-2xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-400 text-blue-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:scale-[1.02] shadow-sm"
          >
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-mono font-bold leading-tight">
              Deploy Team
            </span>
          </button>

          <button
            onClick={() => {
              const r = roads.find((x) => x.id === 'road-mg');
              if (r) onSelectRoad(r);
              setRoadTab('status');
            }}
            className="p-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:scale-[1.02] shadow-sm"
          >
            <Radio className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono font-bold leading-tight">
              Traffic Control
            </span>
          </button>

          <button
            onClick={onOpenBroadcastModal}
            className="p-2.5 rounded-2xl bg-purple-950/40 border border-purple-500/40 hover:border-purple-400 text-purple-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:scale-[1.02] shadow-sm"
          >
            <Send className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-mono font-bold leading-tight">
              Send Alert
            </span>
          </button>

          <button
            onClick={() => {
              const flood = incidents.find((x) => x.severity === 'Critical');
              if (flood) {
                onSelectIncident(flood);
                handleTabClick('alerts');
              }
            }}
            className="p-2.5 rounded-2xl bg-red-950/60 border border-red-500 text-red-200 flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:scale-[1.02] shadow-sm animate-pulse"
          >
            <Flame className="w-4 h-4 text-red-400" />
            <span className="text-[10px] font-mono font-bold leading-tight">
              Emergency Mode
            </span>
          </button>

          <button
            onClick={() => setRoadTab('construction')}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:scale-[1.02] shadow-sm"
          >
            <HardHat className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-mono font-bold leading-tight">
              Construction
            </span>
          </button>

          <button
            onClick={() => {
              handleTabClick('alerts');
              if (incidents[0]) onSelectIncident(incidents[0]);
            }}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:scale-[1.02] shadow-sm"
          >
            <Truck className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono font-bold leading-tight">
              Manage Resources
            </span>
          </button>

          <button
            onClick={onOpenBroadcastModal}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-400 text-slate-300 flex flex-col items-center justify-center text-center gap-1.5 transition-all hover:scale-[1.02] shadow-sm"
          >
            <Radio className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-mono font-bold leading-tight">
              Broadcast
            </span>
          </button>
        </div>
      )}

      {/* 3. Primary Context-Sensitive Operations Panel */}

      {/* VIEW A: Citizen Reports Queue */}
      {currentTab === 'citizen' && (
        <div className="rounded-3xl p-4 bg-[#060c1d] border border-amber-500/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                Citizen Feedback &amp; Field Reports
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {citizenReports.length} Submitted
            </span>
          </div>

          {/* AI Duplicate Cluster Detection Notice */}
          <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-start gap-2 text-xs font-mono text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">AI Cluster Alert:</span> 2 duplicate waterlogging reports detected around Marina Sector 8. Auto-grouped with Incident INC-0142.
            </div>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto scrollbar-thin">
            {citizenReports.map((report) => (
              <div
                key={report.id}
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-bold">
                      {report.code}
                    </span>
                    <h5 className="font-bold text-slate-100 text-xs mt-1">
                      {report.title}
                    </h5>
                    <div className="text-[10px] font-mono text-slate-400">
                      📍 {report.location} • {report.timeSubmitted}
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${
                      report.status === 'Verified'
                        ? 'border-emerald-500 bg-emerald-950/80 text-emerald-200'
                        : 'border-amber-500 bg-amber-950/80 text-amber-200'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  {report.description}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-[10px] font-mono">
                  <span className="text-slate-500">
                    ▲ {report.upvotes} Citizen Upvotes
                  </span>
                  <div className="flex items-center gap-1.5">
                    {report.status !== 'Verified' && (
                      <button
                        onClick={() => onVerifyCitizenReport(report.id)}
                        className="px-2 py-1 rounded-md bg-emerald-950 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900 transition-colors"
                      >
                        Verify
                      </button>
                    )}
                    <button
                      onClick={() => onRejectCitizenReport(report.id)}
                      className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW B: ALERTS Tab */}
      {currentTab === 'alerts' && (
        <div className="rounded-3xl p-4 bg-[#080d22] border border-red-500/40 shadow-2xl space-y-3 animate-in fade-in">
          {/* Sub-state 1: An incident is actively selected for deep AI breakdown */}
          {selectedIncident ? (
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800">
                <div>
                  <button
                    onClick={() => onSelectIncident(null)}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mb-1.5 font-bold"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Back to All Incidents</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 border border-red-500 text-red-200 font-extrabold">
                      {selectedIncident.id}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {selectedIncident.status}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100 mt-1">
                    {selectedIncident.title}
                  </h4>
                  <div className="text-[10px] font-mono text-slate-400">
                    📍 {selectedIncident.location} • {selectedIncident.timeAgo}
                  </div>
                </div>

                <button
                  onClick={() => onSelectIncident(null)}
                  className="p-1 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 text-xs font-mono"
                  title="Close incident view"
                >
                  ✕
                </button>
              </div>

              {/* AI Copilot Deep Breakdown */}
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-xs font-mono space-y-2">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px] pb-1 border-b border-slate-800">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI COPILOT SITUATIONAL ANALYSIS</span>
                </div>

                <div>
                  <span className="text-slate-500 uppercase text-[9px] block">
                    What Happened:
                  </span>
                  <p className="text-slate-200 text-[11px] leading-normal font-sans">
                    {selectedIncident.aiAnalysis.whatHappened}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500 uppercase text-[9px] block">
                    Current Impact:
                  </span>
                  <p className="text-red-300 text-[11px] leading-normal font-sans">
                    {selectedIncident.aiAnalysis.currentImpact}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500 uppercase text-[9px] block">
                    Recommended Actions:
                  </span>
                  <ul className="text-slate-300 text-[11px] space-y-1 list-disc pl-4 font-sans mt-0.5">
                    {selectedIncident.aiAnalysis.recommendedResponse.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dispatch Resource Picker */}
              <div className="pt-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1.5">
                  Rapid Resource Dispatch:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {emergencyResources.slice(0, 4).map((res) => (
                    <button
                      key={res.id}
                      onClick={() => onDeployResource(selectedIncident.id, res)}
                      className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 text-left text-[11px] font-mono transition-all group"
                    >
                      <div className="font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                        {res.name.split('(')[0]}
                      </div>
                      <div className="text-[9px] text-slate-500 flex items-center justify-between mt-0.5">
                        <span>{res.status}</span>
                        <span className="text-cyan-400">Deploy →</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Sub-state 2: Browsing all active incidents list with filtering */
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-100 uppercase">
                    Active City Hazards ({incidents.length})
                  </span>
                </div>
                <button
                  onClick={onOpenReportIncidentModal}
                  className="px-2 py-0.5 rounded bg-red-950 border border-red-500/50 text-[10px] font-mono text-red-300 hover:bg-red-900 transition-colors"
                >
                  + Log Incident
                </button>
              </div>

              {/* Severity filter pills */}
              <div className="flex items-center gap-1 text-[10px] font-mono">
                {(['ALL', 'Critical', 'High', 'Moderate'] as const).map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setAlertSeverityFilter(sev)}
                    className={`px-2.5 py-1 rounded-lg uppercase transition-all font-bold ${
                      alertSeverityFilter === sev
                        ? 'bg-cyan-500 text-slate-950 shadow'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>

              {/* Incidents feed list */}
              <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin">
                {filteredAlerts.length === 0 ? (
                  <div className="p-4 text-center text-xs font-mono text-slate-500">
                    No active incidents in this severity band.
                  </div>
                ) : (
                  filteredAlerts.map((inc) => (
                    <div
                      key={inc.id}
                      onClick={() => onSelectIncident(inc)}
                      className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-400/80 cursor-pointer transition-all hover:scale-[1.01] space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 font-bold">
                          {inc.id}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded border uppercase font-bold text-[9px] ${
                            inc.severity === 'Critical'
                              ? 'border-red-500 bg-red-950 text-red-200'
                              : inc.severity === 'High'
                              ? 'border-amber-500 bg-amber-950 text-amber-200'
                              : 'border-blue-500 bg-blue-950 text-blue-200'
                          }`}
                        >
                          {inc.severity}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-100 group-hover:text-cyan-300">
                        {inc.title}
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>📍 {inc.location}</span>
                        <span className="text-cyan-400 font-bold group-hover:underline">
                          Analyze &amp; Dispatch →
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW C: Update Road Information (When currentTab is 'actions') */}
      {currentTab === 'actions' && (
        <div className="rounded-3xl p-4 bg-[#060c1d] border border-cyan-500/30 shadow-2xl space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-100 uppercase tracking-tight">
                Update Road Information
              </h4>
              <p className="text-[10px] font-mono text-slate-400">
                Verified Infrastructure Operations Workflow
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              ASSET PROFILE
            </span>
          </div>

          {/* Road Sub-tabs: Road Status, Construction, Closure, Diversion */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono">
            {[
              { id: 'status', label: 'Road Status' },
              { id: 'construction', label: 'Construction' },
              { id: 'closure', label: 'Closure' },
              { id: 'diversion', label: 'Diversion' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRoadTab(tab.id as typeof roadTab)}
                className={`flex-1 py-1 rounded-lg uppercase font-bold transition-all ${
                  roadTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Select Real Road / Location */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center justify-between">
              <span>Select Road / Location</span>
              <span className="text-cyan-400">Real Asset Verified</span>
            </label>
            <div className="relative">
              <select
                value={currentRoad.id}
                onChange={(e) => {
                  const r = roads.find((x) => x.id === e.target.value);
                  if (r) onSelectRoad(r);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
              >
                {roads.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.code}) — {r.status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Real Asset Snapshot Banner */}
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-300 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Lanes &amp; Speed:</span>
              <span className="text-slate-200">
                {currentRoad.lanes} Lanes • Limit {currentRoad.speedLimitKmh} km/h (Current: {currentRoad.currentSpeedKmh} km/h)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Traffic Load:</span>
              <span
                className={
                  currentRoad.trafficLoadPct > 80
                    ? 'text-red-400 font-bold'
                    : 'text-emerald-400'
                }
              >
                {currentRoad.trafficLoadPct}% Saturation
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Nearby CCTV:</span>
              <span className="text-cyan-400">{currentRoad.associatedCctv.join(', ')}</span>
            </div>
          </div>

          {/* New Status Radio Pills: Open, Blocked, Under Construction, Diversion */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">
              Proposed Operational Status
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
              {[
                { id: 'Open' as RoadAsset['status'], label: 'Open', color: 'border-emerald-500 text-emerald-300' },
                { id: 'Full Closure' as RoadAsset['status'], label: 'Blocked / Closed', color: 'border-red-500 text-red-300' },
                { id: 'Under Construction' as RoadAsset['status'], label: 'Construction', color: 'border-amber-500 text-amber-300' },
                { id: 'Diversion' as RoadAsset['status'], label: 'Diversion', color: 'border-purple-500 text-purple-300' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setTargetStatus(s.id)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    targetStatus === s.id
                      ? `${s.color} bg-slate-900 font-bold shadow-md`
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Operational Description input */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">
              Description / Incident Reference
            </label>
            <textarea
              rows={2}
              value={roadReason}
              onChange={(e) => setRoadReason(e.target.value)}
              placeholder="Add details (e.g. accident clearance, stormwater overflow, emergency lane closure)..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono resize-none"
            />
          </div>

          {/* Duration Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">
              Expected Duration
            </label>
            <select
              value={durationValue}
              onChange={(e) => setDurationValue(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
            >
              <option value="Approx. 45 Minutes">Approx. 45 Minutes</option>
              <option value="Approx. 2 Hours">Approx. 2 Hours</option>
              <option value="Approx. 6 Hours">Approx. 6 Hours</option>
              <option value="Full Day (Until 06:00 Tomorrow)">Full Day (Until 06:00 Tomorrow)</option>
              <option value="Indefinite / Under Active Assessment">Indefinite / Under Active Assessment</option>
            </select>
          </div>

          {/* Update Button */}
          <button
            onClick={handleApplyRoadUpdate}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-cyan-950/50 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Review &amp; Publish Update</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4. Weather & Environment Mini Widget (Bottom of right panel matching reference image) */}
      <div className="rounded-3xl p-4 bg-[#060c1d] border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Weather &amp; Environment
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400">
            Real-time Sensors
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
              28°C
            </div>
            <div>
              <div className="text-xs font-bold text-slate-300">
                Partly Cloudy
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                Precipitation: 78.5 mm/h
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 text-right space-y-0.5">
            <div>💧 Humidity: 48%</div>
            <div>💨 Wind: 12 km/h</div>
            <div>👁️ Visibility: 10 km</div>
            <div className="text-emerald-400 font-bold">AQI 42 (Good)</div>
          </div>
        </div>

        {/* 5-Day Mini Forecast */}
        <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-slate-800/80 text-center font-mono">
          {[
            { day: 'Tue', temp: '30°/24°' },
            { day: 'Wed', temp: '31°/25°' },
            { day: 'Thu', temp: '30°/24°' },
            { day: 'Fri', temp: '29°/23°' },
            { day: 'Sat', temp: '28°/22°' },
          ].map((f) => (
            <div key={f.day} className="p-1.5 rounded-lg bg-slate-950 text-[10px]">
              <div className="text-slate-400 font-bold">{f.day}</div>
              <div className="text-slate-200 mt-0.5 text-[9px]">{f.temp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
