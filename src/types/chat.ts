import { PageId } from './index';

export type AIMode =
  | 'information'
  | 'problem_solving'
  | 'disaster'
  | 'system_analysis'
  | 'simulation';

export type DataAwarenessTag =
  | 'LIVE DATA'
  | 'SIMULATED DATA'
  | 'NO LIVE DATA AVAILABLE';

export interface PipelineStep {
  phase: string;
  title: string;
  description: string;
  badge?: string;
  iconType?: 'event' | 'sensor' | 'ai' | 'decision' | 'action' | 'status' | 'problem' | 'outcome';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  mode?: AIMode;
  dataTag?: DataAwarenessTag;
  pipeline?: PipelineStep[];
  systemsInvolved?: string[];
  assumptions?: string[];
  quickActions?: {
    label: string;
    page: PageId;
    tab?: string;
  }[];
  warningDisclaimer?: string;
}

export interface CityData {
  cityId: string;
  cityName: string;
  populationActive: number;
  totalSensors: number;
  sensorUptime: number;
  gridFrequency: number;
  solarGenerationKw: number;
  waterRetentionPct: number;
  transitHeadwaySec: number;
  isSimulated: boolean;
}

export interface DisasterTelemetry {
  activeSeverity: string;
  floodingPrecipitationMmH: number;
  riverCrestM: number;
  seismicMagnitudeLast: number;
  seismicDepthKm: number;
  windSpeedKmh: number;
  fireThermalNodes: number;
  isLive: boolean;
}

export interface WeatherData {
  temperatureC: number;
  wetBulbIndex: number;
  barometricPressureHpa: number;
  windKmh: number;
  relativeHumidityPct: number;
  condition: string;
  isLive: boolean;
}

export interface SystemStatus {
  online: boolean;
  activeNodes: number;
  latencyMs: number;
  cloudPodsRunning: number;
  subterraneanActuatorsReady: boolean;
  mode: 'connected' | 'autonomous_failover';
}
