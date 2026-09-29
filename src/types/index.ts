export type ThemeMode = 'dark' | 'light';

export type PageId =
  | 'home'
  | 'disaster'
  | 'architecture'
  | 'infrastructure'
  | 'command-center'
  | 'sustainability';

export interface Hotspot {
  id: string;
  name: string;
  category: string;
  icon: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  telemetryStream: string;
  efficiency: string;
  color: string;
}

export interface TechCardData {
  id: string;
  title: string;
  badge: string;
  icon: string;
  tagline: string;
  description: string;
  urbanImpact: string;
  telemetry: {
    label: string;
    value: string;
    sublabel: string;
  };
  keyFeatures: string[];
}

export interface EventWorkflowScenario {
  id: string;
  title: string;
  icon: string;
  category: string;
  triggerEvent: string;
  aiAnalysis: string;
  decisionEngine: string;
  autonomousAction: string;
  latencyMs: number;
  impactMetrics: {
    label: string;
    value: string;
  }[];
}

export interface ModularConfig {
  id: 'home' | 'office' | 'lab' | 'community';
  name: string;
  icon: string;
  tagline: string;
  description: string;
  reconfigurationTime: string;
  energyProfile: string;
  spatialFeatures: string[];
  zones: {
    name: string;
    area: string;
    type: string;
  }[];
}

export interface CityMetric {
  id: string;
  title: string;
  value: string;
  unit: string;
  trend: string;
  status: 'optimal' | 'syncing' | 'peak';
  details: string;
}
