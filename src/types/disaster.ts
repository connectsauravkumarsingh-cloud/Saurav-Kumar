export type DisasterCategory =
  | 'flood'
  | 'earthquake'
  | 'cyclone'
  | 'fire'
  | 'heatwave'
  | 'grid'
  | 'landslide';

export type AlertSeverity = 'safe' | 'advisory' | 'warning' | 'critical';

export interface SensorMeasurement {
  label: string;
  value: string | number;
  unit: string;
  status: 'normal' | 'elevated' | 'critical';
  threshold: string;
}

export interface DisasterCardData {
  id: DisasterCategory;
  name: string;
  iconName: string;
  alertLevel: AlertSeverity;
  headline: string;
  location: string;
  affectedDistricts: string[];
  measurements: SensorMeasurement[];
  lastUpdated: string;
  aiRiskAnalysis: string;
  recommendedPrecautions: string[];
  confidenceScore: number;
  scientificNote?: string;
  isSimulated: boolean;
}

export interface RiskZone {
  id: string;
  name: string;
  district: string;
  riskLevel: AlertSeverity;
  activeHazards: DisasterCategory[];
  population: string;
  evacuationStatus: 'clear' | 'monitoring' | 'advisory_prepare' | 'mandatory_evacuate';
  evacuationRoute: string;
  nearestShelterId: string;
  nearestHospitalId: string;
  coordinates: { x: number; y: number }; // Percentage on tactical map
  description: string;
}

export interface EmergencyFacility {
  id: string;
  name: string;
  type: 'shelter' | 'hospital' | 'fire_station' | 'dispatch_hub';
  district: string;
  capacity: string;
  occupancy: string;
  status: 'operational' | 'standby' | 'surging' | 'full';
  contact: string;
  coordinates: { x: number; y: number }; // Map percentage
  features: string[];
}

export interface SimulationStage {
  stageIndex: number;
  phaseName: string;
  title: string;
  sensorTelemetry: string;
  aiAssessment: string;
  decisionAction: string;
  activeSeverity: AlertSeverity;
  affectedZoneIds: string[];
  statusLog: string;
  durationSec: number;
}

export interface SimulationScenario {
  id: 'urban_flood' | 'earthquake' | 'cyclone' | 'fire_emergency';
  title: string;
  subtitle: string;
  category: DisasterCategory;
  icon: string;
  stages: SimulationStage[];
  summary: string;
}

export interface EmergencyContact {
  agency: string;
  agencyHindi: string;
  number: string;
  role: string;
  roleHindi: string;
  availableHours: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  lang: 'en' | 'hi';
  actionLinks?: { label: string; actionType: string; payload?: string }[];
}

export interface CityNotification {
  id: string;
  category: DisasterCategory;
  title: string;
  message: string;
  severity: AlertSeverity;
  timestamp: string;
  timeIso: string;
  location: string;
  affectedZones: string[];
  precautions: string[];
  isRead: boolean;
  sourceType: 'verified_official' | 'ai_early_warning' | 'drill_simulation';
  sourceName: string;
  targetTab?: 'hazards' | 'map' | 'simulation' | 'analytics' | 'ai';
  metrics?: { label: string; value: string }[];
}
