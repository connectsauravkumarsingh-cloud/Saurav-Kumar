import React, { useState, useMemo, useCallback } from 'react';
import { PageId } from '../types';
import {
  OperatorRole,
  RoadAsset,
  IncidentRecord,
  CctvFeed,
  CitizenReport,
  OperationalAuditEntry,
  EmergencyResource,
  INITIAL_ROAD_ASSETS,
  INITIAL_INCIDENTS,
  CCTV_FEEDS,
  INITIAL_CITIZEN_REPORTS,
  INITIAL_AUDIT_LOG,
  EMERGENCY_RESOURCES,
} from '../data/commandCenterData';
import { IcccTopBar } from '../components/command/IcccTopBar';
import { IcccKpiStrip } from '../components/command/IcccKpiStrip';
import { IcccLeftSidebar, IcccSidebarCategory } from '../components/command/IcccLeftSidebar';
import { IcccDigitalTwinMap } from '../components/command/IcccDigitalTwinMap';
import { IcccRightPanel } from '../components/command/IcccRightPanel';
import { IcccBottomDock } from '../components/command/IcccBottomDock';
import { ReviewRoadChangeModal } from '../components/command/ReviewRoadChangeModal';
import { CctvEnlargedModal } from '../components/command/CctvEnlargedModal';
import { AuditLogModal } from '../components/command/AuditLogModal';
import { SimulationModeModal } from '../components/command/SimulationModeModal';
import { EmergencyBroadcastModal } from '../components/command/EmergencyBroadcastModal';
import { ReportIncidentModal } from '../components/command/ReportIncidentModal';
import { playNotificationChime, playEmergencySiren } from '../utils/audioAlert';

interface CommandCenterPageProps {
  onNavigate: (page: PageId) => void;
  onExploreSystem: () => void;
}

export const CommandCenterPage: React.FC<CommandCenterPageProps> = ({
  onNavigate,
  onExploreSystem,
}) => {
  // Role State (default: City Admin "Saurav" for full command room power)
  const [activeRole, setActiveRole] = useState<OperatorRole>('CITY_ADMIN');

  // Real Core Data State
  const [roads, setRoads] = useState<RoadAsset[]>(INITIAL_ROAD_ASSETS);
  const [incidents, setIncidents] = useState<IncidentRecord[]>(INITIAL_INCIDENTS);
  const [cctvFeeds, setCctvFeeds] = useState<CctvFeed[]>(CCTV_FEEDS);
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>(INITIAL_CITIZEN_REPORTS);
  const [auditLog, setAuditLog] = useState<OperationalAuditEntry[]>(INITIAL_AUDIT_LOG);
  const [emergencyResources, setEmergencyResources] = useState<EmergencyResource[]>(EMERGENCY_RESOURCES);

  // Active Selections
  const [selectedRoad, setSelectedRoad] = useState<RoadAsset | null>(INITIAL_ROAD_ASSETS[0]);
  const [selectedIncident, setSelectedIncident] = useState<IncidentRecord | null>(null);
  const [selectedCctv, setSelectedCctv] = useState<CctvFeed | null>(null);

  // UI Navigation State
  const [activeSidebarCategory, setActiveSidebarCategory] = useState<IcccSidebarCategory>('overview');
  const [rightPanelTab, setRightPanelTab] = useState<'actions' | 'alerts' | 'citizen'>('actions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [simulationActive, setSimulationActive] = useState<boolean>(false);

  // Modals Open State
  const [reviewRoadModalOpen, setReviewRoadModalOpen] = useState(false);
  const [pendingRoadStatus, setPendingRoadStatus] = useState<RoadAsset['status']>('Partial Closure');
  const [pendingRoadReason, setPendingRoadReason] = useState<string>('');

  const [auditLogModalOpen, setAuditLogModalOpen] = useState(false);
  const [simulationModalOpen, setSimulationModalOpen] = useState(false);
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [reportIncidentModalOpen, setReportIncidentModalOpen] = useState(false);

  // Helper for role operator names (City Admin = "Saurav")
  const getOperatorName = useCallback((role: OperatorRole) => {
    switch (role) {
      case 'CITY_ADMIN':
        return 'Saurav';
      case 'SUPERVISOR':
        return 'Ananya Sharma';
      case 'OPERATOR':
        return 'Vikram Mehta';
      case 'EMERGENCY_COMMANDER':
        return 'Commander Rajesh Rao';
      case 'VIEWER':
        return 'Municipal Auditor';
      default:
        return 'Saurav';
    }
  }, []);

  const getApproverName = useCallback((role: OperatorRole) => {
    switch (role) {
      case 'CITY_ADMIN':
        return 'Saurav (City Admin)';
      case 'SUPERVISOR':
        return 'Ananya Sharma (Supervisor)';
      case 'EMERGENCY_COMMANDER':
        return 'Commander Rajesh Rao (Emergency Commander)';
      default:
        return 'Auto-authorized (Operator standard protocol)';
    }
  }, []);

  // Filter roads and incidents based on global search
  const filteredRoads = useMemo(() => {
    if (!searchQuery.trim()) return roads;
    const q = searchQuery.toLowerCase();
    return roads.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.sector.toLowerCase().includes(q)
    );
  }, [roads, searchQuery]);

  const filteredIncidents = useMemo(() => {
    if (!searchQuery.trim()) return incidents;
    const q = searchQuery.toLowerCase();
    return incidents.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q)
    );
  }, [incidents, searchQuery]);

  // Request road operational update -> Opens review confirmation
  const handleRequestRoadUpdate = (
    road: RoadAsset,
    newStatus: RoadAsset['status'],
    reason: string
  ) => {
    setSelectedRoad(road);
    setPendingRoadStatus(newStatus);
    setPendingRoadReason(reason);
    setReviewRoadModalOpen(true);
  };

  // Confirm road update after review
  const handleConfirmRoadChange = (
    roadId: string,
    newStatus: RoadAsset['status'],
    reason: string,
    approvedBy: string
  ) => {
    const prevRoad = roads.find((r) => r.id === roadId);
    const prevStatus = prevRoad ? prevRoad.status : 'Open';

    setRoads((prev) =>
      prev.map((r) =>
        r.id === roadId
          ? {
              ...r,
              status: newStatus,
              trafficLoadPct:
                newStatus === 'Full Closure'
                  ? 0
                  : newStatus === 'Open'
                  ? 45
                  : 85,
            }
          : r
      )
    );

    // Record immutable audit entry
    const newAuditEntry: OperationalAuditEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toTimeString().slice(0, 8),
      operator: getOperatorName(activeRole),
      role: activeRole,
      action: `Modified Infrastructure Status to ${newStatus}`,
      targetAsset: `${prevRoad?.name || 'Road Asset'} (${prevRoad?.code || roadId})`,
      previousValue: `Status: ${prevStatus}`,
      newValue: `Status: ${newStatus}`,
      reason,
      severity:
        newStatus === 'Full Closure' || newStatus === 'Diversion'
          ? 'Sensitive'
          : 'Normal',
      approvedBy,
    };

    setAuditLog((prev) => [newAuditEntry, ...prev]);

    if (soundEnabled) {
      playNotificationChime();
    }
  };

  // Citizen report actions
  const handleVerifyCitizenReport = (reportId: string) => {
    setCitizenReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'Verified' } : r))
    );

    const report = citizenReports.find((r) => r.id === reportId);
    if (report) {
      const newAudit: OperationalAuditEntry = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toTimeString().slice(0, 8),
        operator: getOperatorName(activeRole),
        role: activeRole,
        action: 'Verified Citizen Field Report',
        targetAsset: `${report.code} (${report.title})`,
        previousValue: 'Status: Pending Verification',
        newValue: 'Status: Verified',
        reason: 'Visual verification confirmed through regional CCTV network',
        severity: 'Normal',
        approvedBy: getApproverName(activeRole),
      };
      setAuditLog((prev) => [newAudit, ...prev]);
    }

    if (soundEnabled) {
      playNotificationChime();
    }
  };

  const handleRejectCitizenReport = (reportId: string) => {
    setCitizenReports((prev) => prev.filter((r) => r.id !== reportId));
  };

  // Emergency resource dispatch
  const handleDeployResource = (incidentId: string, resource: EmergencyResource) => {
    const inc = incidents.find((i) => i.id === incidentId);

    setIncidents((prev) =>
      prev.map((i) =>
        i.id === incidentId
          ? {
              ...i,
              status: 'Dispatched',
              assignedResource: resource.name,
              etaMinutes: 6,
            }
          : i
      )
    );

    setEmergencyResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, status: 'Dispatched' } : r))
    );

    const newAudit: OperationalAuditEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toTimeString().slice(0, 8),
      operator: getOperatorName(activeRole),
      role: activeRole,
      action: 'Dispatched Emergency Fleet',
      targetAsset: `${incidentId} (${inc?.title || 'Incident'})`,
      previousValue: `Resource: None`,
      newValue: `Resource: ${resource.name} (ETA: 6 min)`,
      reason: `Immediate deployment authorized under standard municipal protocol`,
      severity: 'Emergency',
      approvedBy: getApproverName(activeRole),
    };

    setAuditLog((prev) => [newAudit, ...prev]);

    if (soundEnabled) {
      playEmergencySiren();
    }
  };

  // Log new manual incident
  const handleAddManualIncident = (newInc: IncidentRecord) => {
    setIncidents((prev) => [newInc, ...prev]);
    setSelectedIncident(newInc);
    setRightPanelTab('alerts');

    const newAudit: OperationalAuditEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toTimeString().slice(0, 8),
      operator: getOperatorName(activeRole),
      role: activeRole,
      action: 'Logged New Operational Incident',
      targetAsset: `${newInc.id} (${newInc.title})`,
      previousValue: 'None',
      newValue: `Severity: ${newInc.severity}`,
      reason: `Automated sensory verification via ${newInc.source}`,
      severity: newInc.severity === 'Critical' ? 'Critical' : 'Sensitive',
      approvedBy: getApproverName(activeRole),
    };

    setAuditLog((prev) => [newAudit, ...prev]);

    if (soundEnabled) {
      if (newInc.severity === 'Critical') {
        playEmergencySiren();
      } else {
        playNotificationChime();
      }
    }
  };

  // Inject simulation scenario
  const handleInjectScenario = (scenarioType: 'flood' | 'accident' | 'blackout') => {
    setSimulationActive(true);
    setRightPanelTab('alerts');

    if (scenarioType === 'flood') {
      const floodInc = incidents.find((x) => x.type === 'Flood Warning');
      if (floodInc) setSelectedIncident(floodInc);
      const bridge = roads.find((x) => x.id === 'road-river');
      if (bridge) setSelectedRoad(bridge);
    } else if (scenarioType === 'accident') {
      const accInc = incidents.find((x) => x.type === 'Road Accident');
      if (accInc) setSelectedIncident(accInc);
      const nh24 = roads.find((x) => x.id === 'road-nh24');
      if (nh24) setSelectedRoad(nh24);
    } else {
      const pwrInc = incidents.find((x) => x.type === 'Power Outage');
      if (pwrInc) setSelectedIncident(pwrInc);
    }

    if (soundEnabled) {
      playEmergencySiren();
    }
  };

  const handleResetSimulation = () => {
    setSimulationActive(false);
    setRoads(INITIAL_ROAD_ASSETS);
    setIncidents(INITIAL_INCIDENTS);
    setSelectedIncident(null);
  };

  const handleBroadcastAlert = (data: {
    targetArea: string;
    alertType: string;
    message: string;
    channels: string[];
    severity: string;
  }) => {
    const newAudit: OperationalAuditEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toTimeString().slice(0, 8),
      operator: getOperatorName(activeRole),
      role: activeRole,
      action: 'Disseminated City-Wide Emergency Broadcast',
      targetAsset: data.targetArea,
      previousValue: 'None',
      newValue: `Active on ${data.channels.join(', ')}`,
      reason: data.message,
      severity: 'Critical',
      approvedBy: getApproverName(activeRole),
    };
    setAuditLog((prev) => [newAudit, ...prev]);

    if (soundEnabled) {
      playEmergencySiren();
    }
  };

  return (
    <div className="min-h-screen bg-[#030611] text-slate-100 flex flex-col justify-between select-none">
      {/* 1. ICCC Top Bar (Matches user screenshot) */}
      <IcccTopBar
        onNavigate={onNavigate}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        unreadAlertCount={incidents.length}
        onOpenAlerts={() => {
          setRightPanelTab('alerts');
          const crit = incidents.find((i) => i.severity === 'Critical') || incidents[0];
          if (crit) setSelectedIncident(crit);
        }}
        onOpenAuditLog={() => setAuditLogModalOpen(true)}
        simulationModeActive={simulationActive}
        onToggleSimulationMode={() => setSimulationModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((v) => !v)}
      />

      {/* 2. Top KPI Metrics Strip (7 Cards) */}
      <IcccKpiStrip
        activeIncidentsCount={incidents.length}
        criticalIncidentsCount={incidents.filter((i) => i.severity === 'Critical').length}
        trafficFlowPct={86}
        gridPowerGw={1.84}
        waterSupplyMl={48.2}
        airQualityAqi={42}
        cityHealthPct={99.8}
        onFilterIncidents={() => {
          setRightPanelTab('alerts');
          const flood = incidents.find((i) => i.severity === 'Critical');
          if (flood) setSelectedIncident(flood);
        }}
        onFilterTraffic={() => {
          setRightPanelTab('actions');
          const r = roads.find((x) => x.id === 'road-nh24');
          if (r) setSelectedRoad(r);
        }}
      />

      {/* 3. Main 3-Column Command Center Workspace */}
      <main className="flex-1 flex max-w-[1920px] w-full mx-auto px-4 py-2 gap-3 min-h-[560px]">
        {/* Left: Operations Navigation Sidebar */}
        <IcccLeftSidebar
          activeCategory={activeSidebarCategory}
          onSelectCategory={(cat) => {
            setActiveSidebarCategory(cat);
            if (cat === 'roads') {
              setRightPanelTab('actions');
              setSelectedIncident(null);
              if (!selectedRoad) setSelectedRoad(roads[0]);
            } else if (cat === 'disaster') {
              setRightPanelTab('alerts');
              const crit = incidents.find((i) => i.severity === 'Critical') || incidents[0];
              if (crit) setSelectedIncident(crit);
            } else if (cat === 'citizen') {
              setRightPanelTab('citizen');
            } else if (cat === 'ai') {
              setRightPanelTab('alerts');
              const crit = incidents.find((i) => i.severity === 'Critical') || incidents[0];
              if (crit) setSelectedIncident(crit);
            } else if (cat === 'traffic') {
              setRightPanelTab('actions');
              const r = roads.find((x) => x.id === 'road-nh24');
              if (r) setSelectedRoad(r);
            } else if (cat === 'overview' || cat === 'map') {
              setRightPanelTab('actions');
            }
          }}
          incidentCount={incidents.length}
          citizenReportsCount={citizenReports.length}
          onOpenAuditLog={() => setAuditLogModalOpen(true)}
        />

        {/* Center: Live City Digital Twin Map */}
        <div className="flex-1 flex flex-col min-w-0">
          <IcccDigitalTwinMap
            roads={filteredRoads}
            incidents={filteredIncidents}
            cctvFeeds={cctvFeeds}
            selectedRoadId={selectedRoad ? selectedRoad.id : null}
            onSelectRoad={(road) => {
              setSelectedRoad(road);
              setSelectedIncident(null);
              setRightPanelTab('actions');
            }}
            selectedIncidentId={selectedIncident ? selectedIncident.id : null}
            onSelectIncident={(inc) => {
              setSelectedIncident(inc);
              if (inc) {
                setRightPanelTab('alerts');
              }
            }}
            onSelectCctv={(cam) => {
              setSelectedCctv(cam);
            }}
          />
        </div>

        {/* Right: Context-Sensitive Operations Panel */}
        <IcccRightPanel
          roads={roads}
          selectedRoad={selectedRoad}
          onSelectRoad={setSelectedRoad}
          incidents={incidents}
          selectedIncident={selectedIncident}
          onSelectIncident={setSelectedIncident}
          citizenReports={citizenReports}
          onVerifyCitizenReport={handleVerifyCitizenReport}
          onRejectCitizenReport={handleRejectCitizenReport}
          activeRole={activeRole}
          onRequestRoadUpdate={handleRequestRoadUpdate}
          onDeployResource={handleDeployResource}
          emergencyResources={emergencyResources}
          onOpenBroadcastModal={() => setBroadcastModalOpen(true)}
          onOpenReportIncidentModal={() => setReportIncidentModalOpen(true)}
          activeTopTab={rightPanelTab}
          onTopTabChange={setRightPanelTab}
        />
      </main>

      {/* 4. Bottom Control Room Dock (CCTV Feeds + Active Incidents + Live City Analytics) */}
      <footer className="px-4 pb-4 max-w-[1920px] w-full mx-auto">
        <IcccBottomDock
          cctvFeeds={cctvFeeds}
          onSelectCctv={setSelectedCctv}
          onViewAllCctv={() => {
            if (cctvFeeds.length > 0) setSelectedCctv(cctvFeeds[0]);
          }}
          incidents={incidents}
          onSelectIncident={(inc) => {
            setSelectedIncident(inc);
            setRightPanelTab('alerts');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onViewAllIncidents={() => {
            setRightPanelTab('alerts');
            setSelectedIncident(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </footer>

      {/* 5. Modals for Sensitive Workflows & Control Room Tools */}

      {/* Review Road Change Modal */}
      <ReviewRoadChangeModal
        isOpen={reviewRoadModalOpen}
        onClose={() => setReviewRoadModalOpen(false)}
        road={selectedRoad}
        proposedStatus={pendingRoadStatus}
        reason={pendingRoadReason}
        activeRole={activeRole}
        onConfirmChange={handleConfirmRoadChange}
      />

      {/* Enlarged CCTV Surveillance Monitor */}
      <CctvEnlargedModal
        cctv={selectedCctv}
        onClose={() => setSelectedCctv(null)}
      />

      {/* Immutable Operational Audit Log Modal */}
      <AuditLogModal
        isOpen={auditLogModalOpen}
        onClose={() => setAuditLogModalOpen(false)}
        auditEntries={auditLog}
      />

      {/* Crisis Simulation Lab Modal */}
      <SimulationModeModal
        isOpen={simulationModalOpen}
        onClose={() => setSimulationModalOpen(false)}
        simulationActive={simulationActive}
        onInjectScenario={handleInjectScenario}
        onResetSimulation={handleResetSimulation}
      />

      {/* Emergency Broadcast Gateway Modal */}
      <EmergencyBroadcastModal
        isOpen={broadcastModalOpen}
        onClose={() => setBroadcastModalOpen(false)}
        onBroadcast={handleBroadcastAlert}
      />

      {/* Manual Incident Reporting Modal */}
      <ReportIncidentModal
        isOpen={reportIncidentModalOpen}
        onClose={() => setReportIncidentModalOpen(false)}
        onSubmitIncident={handleAddManualIncident}
      />
    </div>
  );
};
