import React, { useState, useCallback } from 'react';
import {
  INITIAL_DISASTER_CARDS,
  MUNICIPAL_RISK_ZONES,
  EMERGENCY_FACILITIES,
} from '../../data/disasterData';
import {
  DisasterCardData,
  RiskZone,
  SimulationScenario,
  SimulationStage,
  AlertSeverity,
} from '../../types/disaster';
import { EmergencyNotificationCenter } from './EmergencyNotificationCenter';
import { HazardMonitoringCards } from './HazardMonitoringCards';
import { InteractiveDisasterMap } from './InteractiveDisasterMap';
import { DisasterSimulationEngine } from './DisasterSimulationEngine';
import { DisasterAnalytics } from './DisasterAnalytics';
import { NexusRescueAI } from './NexusRescueAI';
import {
  ShieldAlert,
  Radio,
  Map,
  PlayCircle,
  BarChart3,
  Bot,
  Sparkles,
  Info,
} from 'lucide-react';

export const DisasterIntelligenceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'hazards' | 'map' | 'simulation' | 'analytics' | 'ai'
  >('hazards');

  // Active Alert State (synchronized with Simulation Engine or Hazard Cards)
  const [activeSeverity, setActiveSeverity] = useState<AlertSeverity>('warning');
  const [activeHeadline, setActiveHeadline] = useState<string>(
    'Stormwater crest surging in Lower Marina Estuary & Boulevard Basin'
  );
  const [activeLocation, setActiveLocation] = useState<string>(
    'Sector 4 (Marina Estuary) & Coastal Lowlands'
  );
  const [activeCategory, setActiveCategory] = useState<string>('Urban Flash Flood');
  const [activeRecommendations, setActiveRecommendations] = useState<string[]>([
    'Evacuate underground parking basements and concourses immediately.',
    'Move to Elevated Storm Shelter 01 (SkyHub) via designated east corridor.',
    'Do not drive through blue-zone flood corridors; heed automated LED signals.',
    'Water retention gates 04 and 09 actively diverting 35,000 L/s.',
  ]);

  // When Simulation Engine advances a stage:
  const handleSimulationStageChange = useCallback(
    (scenario: SimulationScenario, stage: SimulationStage) => {
      setActiveSeverity(stage.activeSeverity);
      setActiveHeadline(stage.title);
      setActiveLocation(
        stage.affectedZoneIds.length > 0
          ? stage.affectedZoneIds.join(', ')
          : 'Citywide Monitoring Normal'
      );
      setActiveCategory(scenario.title);
      setActiveRecommendations([
        stage.aiAssessment,
        stage.decisionAction,
        'Emergency facilities pre-staged for civilian intake.',
      ]);
    },
    []
  );

  // When a user inspects a hazard card:
  const handleSelectHazard = useCallback((card: DisasterCardData) => {
    setActiveSeverity(card.alertLevel);
    setActiveHeadline(card.headline);
    setActiveLocation(card.location);
    setActiveCategory(card.name);
    setActiveRecommendations(card.recommendedPrecautions);
  }, []);

  return (
    <section
      id="disaster-intelligence"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#040814] via-[#050a18] to-[#040813]"
    >
      {/* Background ambient neon glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[500px] bg-red-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] bg-cyan-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/40 bg-red-950/40 text-red-300 text-xs font-mono font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>AI DISASTER INTELLIGENCE &amp; EMERGENCY EARLY WARNING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 uppercase">
            DETECT EARLY. RESPOND FASTER.
            <span className="block bg-gradient-to-r from-red-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
              PROTECT COMMUNITIES.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            An autonomous, multi-hazard early warning platform coupling 14,200 edge sensors, hydrological models, seismic P-wave thresholds, and instant emergency broadcasts.
          </p>
        </div>

        {/* Smart Emergency Alert Banner */}
        <EmergencyNotificationCenter
          activeSeverity={activeSeverity}
          headline={activeHeadline}
          location={activeLocation}
          disasterCategory={activeCategory}
          recommendations={activeRecommendations}
          nearestFacilityName="SkyHub Elevated Storm Shelter Alpha"
          nearestFacilityType="Emergency Shelter"
          onInspectZone={() => setActiveTab('map')}
          isSimulated={true}
        />

        {/* Interactive Sub-Navigation Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 gap-1.5 shadow-xl overflow-x-auto max-w-full">
            {[
              { id: 'hazards', label: 'Hazard Surveillance (7)', icon: <Radio className="w-4 h-4" /> },
              { id: 'map', label: 'Tactical Risk Map', icon: <Map className="w-4 h-4" /> },
              { id: 'simulation', label: 'Disaster Simulation Lab', icon: <PlayCircle className="w-4 h-4" /> },
              { id: 'analytics', label: 'Resiliency Analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'ai', label: 'NEXUS RESCUE AI (EN/HI)', icon: <Bot className="w-4 h-4" /> },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Viewport Content */}
        <div className="transition-all duration-300">
          {activeTab === 'hazards' && (
            <HazardMonitoringCards
              cards={INITIAL_DISASTER_CARDS}
              onSelectHazard={handleSelectHazard}
            />
          )}

          {activeTab === 'map' && (
            <InteractiveDisasterMap
              onSelectZone={(zone) => {
                setActiveLocation(zone.name);
                setActiveSeverity(zone.riskLevel);
              }}
            />
          )}

          {activeTab === 'simulation' && (
            <DisasterSimulationEngine
              onStageChange={handleSimulationStageChange}
            />
          )}

          {activeTab === 'analytics' && <DisasterAnalytics />}

          {activeTab === 'ai' && <NexusRescueAI />}
        </div>
      </div>
    </section>
  );
};
