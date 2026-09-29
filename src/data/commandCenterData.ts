export type OperatorRole =
  | 'VIEWER'
  | 'OPERATOR'
  | 'SUPERVISOR'
  | 'CITY_ADMIN'
  | 'EMERGENCY_COMMANDER';

export interface RoadAsset {
  id: string;
  name: string;
  code: string;
  category: 'Arterial Expressway' | 'Metropolitan Corridor' | 'Flyover / Bridge' | 'Transit Concourse';
  sector: string;
  coordinates: { x: number; y: number; lat: string; lng: string };
  lanes: number;
  speedLimitKmh: number;
  currentSpeedKmh: number;
  trafficLoadPct: number;
  status: 'Open' | 'Partial Closure' | 'Full Closure' | 'Under Construction' | 'Diversion';
  condition: 'Optimal' | 'Satisfactory' | 'Degraded' | 'Waterlogged';
  lastInspection: string;
  associatedCctv: string[];
  nearbyEmergencyPost: string;
  surfaceMaterial: string;
  activeWorkOrder?: string;
  divertRoute?: string;
}

export interface IncidentRecord {
  id: string;
  type:
    | 'Flood Warning'
    | 'Road Accident'
    | 'Power Outage'
    | 'Water Leakage'
    | 'Fire'
    | 'Traffic Congestion'
    | 'Medical Emergency';
  title: string;
  location: string;
  sector: string;
  coordinates: { x: number; y: number };
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'New' | 'Verified' | 'Dispatched' | 'In Progress' | 'Contained' | 'Resolved';
  timeDetected: string;
  timeAgo: string;
  source: 'AI Hydrological Radar' | 'LiDAR Traffic Sensor' | 'Smart Meter Grid' | 'Citizen Report #CR-2941' | 'Thermal Camera';
  assignedTeam?: string;
  assignedResource?: string;
  etaMinutes?: number;
  aiAnalysis: {
    whatHappened: string;
    whyItHappened: string;
    currentImpact: string;
    affectedZones: string[];
    nearbyResources: string[];
    recommendedResponse: string[];
    secondaryRisks: string[];
  };
}

export interface CctvFeed {
  id: string;
  code: string;
  name: string;
  location: string;
  sector: string;
  status: 'LIVE' | 'STANDBY' | 'MAINTENANCE';
  health: '100% Signal' | 'Degraded Bandwidth' | 'Offline';
  fps: number;
  trafficDensity: 'Smooth' | 'Moderate' | 'Heavy Congestion' | 'Stationary';
  vehicleCountPerMin: number;
  viewAngle: string;
  coordinates: { x: number; y: number };
  thumbnailGradient: string;
  sceneType: 'junction' | 'station' | 'bridge' | 'park' | 'industrial' | 'gate';
}

export interface CitizenReport {
  id: string;
  code: string;
  category: 'Waterlogging' | 'Pothole / Damage' | 'Broken Streetlight' | 'Traffic Signal Failure' | 'Garbage Overflow';
  title: string;
  location: string;
  sector: string;
  timeSubmitted: string;
  description: string;
  status: 'Pending Verification' | 'Verified' | 'Assigned' | 'Rejected';
  upvotes: number;
  duplicateClusterDetected: boolean;
  relatedIncidentId?: string;
}

export interface OperationalAuditEntry {
  id: string;
  timestamp: string;
  operator: string;
  role: OperatorRole;
  action: string;
  targetAsset: string;
  previousValue: string;
  newValue: string;
  reason: string;
  severity: 'Normal' | 'Sensitive' | 'Emergency' | 'Critical';
  approvedBy?: string;
}

export interface EmergencyResource {
  id: string;
  code: string;
  name: string;
  type: 'Drainage Pump' | 'Ambulance' | 'Fire Truck' | 'Police Cruiser' | 'Electrical Maintenance' | 'Rescue Boat';
  baseStation: string;
  status: 'Available' | 'Dispatched' | 'On Scene' | 'Refueling';
  crewSize: number;
  currentEtaMinutes?: number;
}

export const INITIAL_ROAD_ASSETS: RoadAsset[] = [
  {
    id: 'road-nh24',
    name: 'NH-24 Elevated Expressway & Flyover',
    code: 'RD-EXP-024',
    category: 'Arterial Expressway',
    sector: 'Sector 8 (Flyover Junction)',
    coordinates: { x: 62, y: 58, lat: '28.6139° N', lng: '77.2090° E' },
    lanes: 6,
    speedLimitKmh: 90,
    currentSpeedKmh: 24,
    trafficLoadPct: 88,
    status: 'Partial Closure',
    condition: 'Satisfactory',
    lastInspection: '2026-09-24',
    associatedCctv: ['CAM-001', 'CAM-003'],
    nearbyEmergencyPost: 'Emergency Station East #04',
    surfaceMaterial: 'Stone Matrix Asphalt w/ Piezo Energy Capture',
    activeWorkOrder: 'WO-8821: Multi-vehicle fender collision clearance in lane 1-2',
    divertRoute: 'Lower Boulevard Service Ring B',
  },
  {
    id: 'road-mg',
    name: 'MG Road Central Transit Boulevard',
    code: 'RD-MET-101',
    category: 'Metropolitan Corridor',
    sector: 'Sector 3 (Commercial Spine)',
    coordinates: { x: 44, y: 46, lat: '28.6212° N', lng: '77.2144° E' },
    lanes: 8,
    speedLimitKmh: 60,
    currentSpeedKmh: 52,
    trafficLoadPct: 45,
    status: 'Open',
    condition: 'Optimal',
    lastInspection: '2026-09-27',
    associatedCctv: ['CAM-001', 'CAM-006'],
    nearbyEmergencyPost: 'Central Metro Post',
    surfaceMaterial: 'Photocatalytic Smog-Eating Porous Concrete',
  },
  {
    id: 'road-river',
    name: 'Marina River Bridge & Estuary Viaduct',
    code: 'RD-BRG-004',
    category: 'Flyover / Bridge',
    sector: 'Sector 8 (Riverside Area)',
    coordinates: { x: 74, y: 52, lat: '28.6080° N', lng: '77.2210° E' },
    lanes: 6,
    speedLimitKmh: 70,
    currentSpeedKmh: 18,
    trafficLoadPct: 92,
    status: 'Diversion',
    condition: 'Waterlogged',
    lastInspection: '2026-09-28 08:00',
    associatedCctv: ['CAM-003'],
    nearbyEmergencyPost: 'River Harbor Police Station',
    surfaceMaterial: 'Anti-Corrosive Polymer Composite Deck',
    activeWorkOrder: 'WO-8840: Estuary water level surge (3.2m). Outflow flap valve active.',
    divertRoute: 'Upper Skyway Bypass Viaduct',
  },
  {
    id: 'road-ind',
    name: 'Industrial Sector Ring Expressway 09',
    code: 'RD-EXP-009',
    category: 'Arterial Expressway',
    sector: 'Sector 12 (Industrial Belt)',
    coordinates: { x: 26, y: 72, lat: '28.5910° N', lng: '77.1950° E' },
    lanes: 4,
    speedLimitKmh: 80,
    currentSpeedKmh: 68,
    trafficLoadPct: 35,
    status: 'Open',
    condition: 'Optimal',
    lastInspection: '2026-09-22',
    associatedCctv: ['CAM-005'],
    nearbyEmergencyPost: 'Industrial Fire Brigade 02',
    surfaceMaterial: 'Recycled Rubber Heavy-Load Bitumen',
  },
  {
    id: 'road-park',
    name: 'Eco-Park Perimeter Boulevard',
    code: 'RD-MET-205',
    category: 'Metropolitan Corridor',
    sector: 'Sector 1 (Sanctuary Axis)',
    coordinates: { x: 30, y: 32, lat: '28.6340° N', lng: '77.2020° E' },
    lanes: 4,
    speedLimitKmh: 40,
    currentSpeedKmh: 38,
    trafficLoadPct: 28,
    status: 'Open',
    condition: 'Optimal',
    lastInspection: '2026-09-26',
    associatedCctv: ['CAM-004'],
    nearbyEmergencyPost: 'North Community Aid Center',
    surfaceMaterial: 'High-Albedo Permeable Pavers',
  },
  {
    id: 'road-metro',
    name: 'Central Station Terminal Concourse',
    code: 'RD-TRN-002',
    category: 'Transit Concourse',
    sector: 'Sector 4 (Metro Hub)',
    coordinates: { x: 42, y: 28, lat: '28.6295° N', lng: '77.2185° E' },
    lanes: 4,
    speedLimitKmh: 30,
    currentSpeedKmh: 28,
    trafficLoadPct: 62,
    status: 'Under Construction',
    condition: 'Satisfactory',
    lastInspection: '2026-09-28',
    associatedCctv: ['CAM-002', 'CAM-006'],
    nearbyEmergencyPost: 'Metro Transit Police HQ',
    surfaceMaterial: 'Porous Rapid Drainage Concrete',
    activeWorkOrder: 'WO-8809: Autonomous Maglev feeder pod boarding deck expansion',
    divertRoute: 'North Boulevard Terminal Lane 3',
  },
];

export const INITIAL_INCIDENTS: IncidentRecord[] = [
  {
    id: 'INC-2026-0928-0142',
    type: 'Flood Warning',
    title: 'River Basin Crest Exceeded — Marina Estuary Sector 8',
    location: 'Riverside Area - Sector 8',
    sector: 'Sector 8',
    coordinates: { x: 73, y: 52 },
    severity: 'Critical',
    status: 'Verified',
    timeDetected: '17:00:42',
    timeAgo: '12 min ago',
    source: 'AI Hydrological Radar',
    assignedTeam: 'Drainage Rapid Response Team 04',
    assignedResource: 'High-Volume Mobile Pump P-17',
    etaMinutes: 6,
    aiAnalysis: {
      whatHappened:
        'Localized cloudburst delivering 78.5 mm/h precipitation coupled with downstream tidal backpressure caused Marina River Basin to breach 3.2m warning threshold.',
      whyItHappened:
        'Convective micro-storm stalled over eastern escarpment; gravity runoff saturated lower boulevard culverts at 94% intake volume.',
      currentImpact:
        'Lower pedestrian boardwalk submerged under 25cm standing water. River Bridge lower lane impassable. Marina Metro station entrance protected by flood-barriers.',
      affectedZones: ['Marina Estuary Concourse', 'Sector 8 Riverside', 'East Bridge Approach'],
      nearbyResources: [
        'Drainage Pump Station 04 (Subterranean)',
        'Emergency Response Squad East (0.8km)',
        'Aquifer Vault 09 Gate Solenoids',
      ],
      recommendedResponse: [
        'Actuate pneumatic gates on Subterranean Aquifer Vaults 04 & 09 to bypass 35,000 L/s.',
        'Enforce vehicular diversion from River Bridge lower lane to Upper Skyway Bypass.',
        'Deploy Mobile Pump Unit P-17 to clear lower transit underpass.',
        'Issue targeted SMS alert to 14,200 residents in Sector 8 lowlands.',
      ],
      secondaryRisks: [
        'Electrical transformer substations in basement levels if floodwall overtopped by +40cm.',
        'Traffic spillover onto MG Road if River Bridge full closure is mandated.',
      ],
    },
  },
  {
    id: 'INC-2026-0928-0143',
    type: 'Road Accident',
    title: 'Multi-Vehicle Collision on NH-24 Flyover (Lane 1-2 Blocked)',
    location: 'NH-24 Flyover, Eastbound Kilometre 4.2',
    sector: 'Sector 8',
    coordinates: { x: 62, y: 58 },
    severity: 'High',
    status: 'Dispatched',
    timeDetected: '16:44:18',
    timeAgo: '28 min ago',
    source: 'LiDAR Traffic Sensor',
    assignedTeam: 'Traffic Police Unit 09 & Ambulance MED-02',
    assignedResource: 'Heavy Recovery Crane TC-01',
    etaMinutes: 4,
    aiAnalysis: {
      whatHappened:
        'Sudden deceleration by automated freight trailer led to secondary impact with two passenger EV sedans in lane 1 and 2.',
      whyItHappened:
        'Hydroplaning due to wet asphalt surface during sudden squall front; sensor blindness from heavy surface spray.',
      currentImpact:
        'Eastbound speed degraded from 80 km/h to 18 km/h. Queue backlog stretching 1.8km towards Central Hub.',
      affectedZones: ['NH-24 Eastbound Flyover', 'Sector 8 On-ramp'],
      nearbyResources: ['Ambulance MED-02 (En route)', 'Traffic Unit 09 (On scene)', 'CCTV CAM-001 & CAM-003'],
      recommendedResponse: [
        'Maintain dynamic lane closure on lanes 1 & 2; keep lane 3 & 4 flowing at 30 km/h advisory.',
        'Switch electronic overhead gantry signs at Km 2.0 to Divert to Lower Boulevard.',
        'Dispatch Heavy Crane TC-01 to haul immobile freight chassis.',
      ],
      secondaryRisks: ['Secondary rear-end collisions in queue tail; emergency ambulance delay.'],
    },
  },
  {
    id: 'INC-2026-0928-0144',
    type: 'Power Outage',
    title: 'Substation Transformer 03 Trip & Microgrid Decoupling',
    location: 'Sector 12, 14, 15 Interconnect',
    sector: 'Sector 12',
    coordinates: { x: 28, y: 70 },
    severity: 'Medium',
    status: 'In Progress',
    timeDetected: '16:12:00',
    timeAgo: '1 hour ago',
    source: 'Smart Meter Grid',
    assignedTeam: 'Power Grid Specialist Crew G-02',
    assignedResource: 'Decentralized Battery Bank 03',
    etaMinutes: 0,
    aiAnalysis: {
      whatHappened:
        'High-temperature thermal sensor tripped protective circuit breaker on 132kV primary transformer 03.',
      whyItHappened:
        'Unexpected cooling pump valve failure causing dielectric oil temperature to exceed 92°C.',
      currentImpact:
        'Local industrial microgrid operating autonomously on Molten-Salt Battery Reserve. Zero residential blackout, but reserve endurance is 4.5 hours.',
      affectedZones: ['Industrial Zone West', 'Logistics Park Sector 14'],
      nearbyResources: ['Subterranean Battery Bank 03', 'Grid Control Crew G-02'],
      recommendedResponse: [
        'Throttle non-essential industrial smelting loads by 25% via smart contract shedding.',
        'Replace mechanical cooling valve actuator on Transformer 03.',
        'Re-synchronize with regional HVDC grid once thermal readings fall below 65°C.',
      ],
      secondaryRisks: ['Battery depletion if repair exceeds 4.5 hours during evening peak.'],
    },
  },
  {
    id: 'INC-2026-0928-0145',
    type: 'Water Leakage',
    title: 'High-Pressure Aqueduct Rupture — Main Pipeline Sector 6',
    location: 'Main Pipeline Corridor - Sector 6',
    sector: 'Sector 6',
    coordinates: { x: 50, y: 64 },
    severity: 'Medium',
    status: 'Dispatched',
    timeDetected: '15:12:30',
    timeAgo: '2 hours ago',
    source: 'Thermal Camera',
    assignedTeam: 'Municipal Hydro-Maintenance Squad 01',
    assignedResource: 'Pneumatic Isolation Gate Valve V-42',
    etaMinutes: 8,
    aiAnalysis: {
      whatHappened:
        'Acoustic leak hydrophones registered 4.2 bar pressure drop in 800mm ductile iron freshwater trunk.',
      whyItHappened:
        'Ground subsidence following deep tunneling excavation for subterranean maglev expansion.',
      currentImpact:
        'Loss of approx 420 L/min potable water. Automated pressure sensors diverted flow to loop B.',
      affectedZones: ['Sector 6 Commercial District', 'Central Boulevard Sub-grade'],
      nearbyResources: ['Hydro-Maintenance Squad 01', 'Valve V-42 Actuator'],
      recommendedResponse: [
        'Close upstream motorized gate valve V-42 to isolate 400m ruptured section.',
        'Backfeed Sector 6 commercial towers via South Ring 600mm manifold.',
        'Excavate repair trench using trenchless robotic pipe liner.',
      ],
      secondaryRisks: ['Sub-grade soil wash-out if isolation takes longer than 20 minutes.'],
    },
  },
];

export const CCTV_FEEDS: CctvFeed[] = [
  {
    id: 'cam-01',
    code: 'CAM-001',
    name: 'MG Road Junction',
    location: 'Sector 3 / MG Road Crossing',
    sector: 'Sector 3',
    status: 'LIVE',
    health: '100% Signal',
    fps: 30,
    trafficDensity: 'Smooth',
    vehicleCountPerMin: 48,
    viewAngle: 'North-West Gantry 14m',
    coordinates: { x: 44, y: 46 },
    thumbnailGradient: 'from-blue-900 via-slate-900 to-cyan-950',
    sceneType: 'junction',
  },
  {
    id: 'cam-02',
    code: 'CAM-002',
    name: 'Central Station Terminal',
    location: 'Sector 4 North Hub Plaza',
    sector: 'Sector 4',
    status: 'LIVE',
    health: '100% Signal',
    fps: 30,
    trafficDensity: 'Moderate',
    vehicleCountPerMin: 72,
    viewAngle: 'Terminal Canopy 22m',
    coordinates: { x: 42, y: 28 },
    thumbnailGradient: 'from-cyan-900 via-slate-900 to-slate-950',
    sceneType: 'station',
  },
  {
    id: 'cam-03',
    code: 'CAM-003',
    name: 'River Bridge Corridor',
    location: 'Sector 8 Marina Viaduct',
    sector: 'Sector 8',
    status: 'LIVE',
    health: '100% Signal',
    fps: 28,
    trafficDensity: 'Heavy Congestion',
    vehicleCountPerMin: 18,
    viewAngle: 'Suspension Pier East 35m',
    coordinates: { x: 74, y: 52 },
    thumbnailGradient: 'from-red-950 via-slate-900 to-amber-950',
    sceneType: 'bridge',
  },
  {
    id: 'cam-04',
    code: 'CAM-004',
    name: 'City Eco-Park Boulevard',
    location: 'Sector 1 Sanctuary Way',
    sector: 'Sector 1',
    status: 'LIVE',
    health: '100% Signal',
    fps: 30,
    trafficDensity: 'Smooth',
    vehicleCountPerMin: 22,
    viewAngle: 'Solar Mast #08 12m',
    coordinates: { x: 30, y: 32 },
    thumbnailGradient: 'from-emerald-950 via-slate-900 to-cyan-950',
    sceneType: 'park',
  },
  {
    id: 'cam-05',
    code: 'CAM-005',
    name: 'Industrial Logistics Ring',
    location: 'Sector 12 Gate 4',
    sector: 'Sector 12',
    status: 'LIVE',
    health: '100% Signal',
    fps: 25,
    trafficDensity: 'Moderate',
    vehicleCountPerMin: 34,
    viewAngle: 'Freight Weigh-bridge Tower',
    coordinates: { x: 26, y: 72 },
    thumbnailGradient: 'from-amber-950 via-slate-900 to-slate-950',
    sceneType: 'industrial',
  },
  {
    id: 'cam-06',
    code: 'CAM-006',
    name: 'Metro Gate 2 Interchange',
    location: 'Sector 4 Pedestrian Plaza',
    sector: 'Sector 4',
    status: 'LIVE',
    health: '100% Signal',
    fps: 30,
    trafficDensity: 'Moderate',
    vehicleCountPerMin: 54,
    viewAngle: 'Skywalk Pillar 18m',
    coordinates: { x: 46, y: 34 },
    thumbnailGradient: 'from-purple-950 via-slate-900 to-blue-950',
    sceneType: 'gate',
  },
  {
    id: 'cam-07',
    code: 'CAM-007',
    name: 'Sector 8 Estuary Flap Gate',
    location: 'Estuary Retention Outflow',
    sector: 'Sector 8',
    status: 'LIVE',
    health: '100% Signal',
    fps: 30,
    trafficDensity: 'Heavy Congestion',
    vehicleCountPerMin: 12,
    viewAngle: 'Outflow Weir Sensor Mast',
    coordinates: { x: 72, y: 56 },
    thumbnailGradient: 'from-sky-950 via-slate-900 to-blue-950',
    sceneType: 'bridge',
  },
  {
    id: 'cam-08',
    code: 'CAM-008',
    name: 'Tech Hub Intersect 4',
    location: 'Sector 3 Innovation Quad',
    sector: 'Sector 3',
    status: 'LIVE',
    health: '100% Signal',
    fps: 30,
    trafficDensity: 'Smooth',
    vehicleCountPerMin: 38,
    viewAngle: 'Smart Signal Gantry 16m',
    coordinates: { x: 52, y: 42 },
    thumbnailGradient: 'from-cyan-950 via-slate-900 to-emerald-950',
    sceneType: 'junction',
  },
  {
    id: 'cam-09',
    code: 'CAM-009',
    name: 'Subterranean Vault 04 Access',
    location: 'Sector 4 Aquifer Vault Deck',
    sector: 'Sector 4',
    status: 'LIVE',
    health: '100% Signal',
    fps: 25,
    trafficDensity: 'Smooth',
    vehicleCountPerMin: 8,
    viewAngle: 'Vault Intake Solenoid Array',
    coordinates: { x: 38, y: 36 },
    thumbnailGradient: 'from-slate-950 via-blue-950 to-slate-900',
    sceneType: 'industrial',
  },
  {
    id: 'cam-10',
    code: 'CAM-010',
    name: 'Marina East Marina SkyHub',
    location: 'Elevated Viaduct Ramp East',
    sector: 'Sector 8',
    status: 'LIVE',
    health: '100% Signal',
    fps: 30,
    trafficDensity: 'Moderate',
    vehicleCountPerMin: 42,
    viewAngle: 'SkyHub Tower Mast 28m',
    coordinates: { x: 80, y: 48 },
    thumbnailGradient: 'from-red-950 via-slate-900 to-slate-950',
    sceneType: 'station',
  },
  {
    id: 'cam-11',
    code: 'CAM-011',
    name: 'Western Solar Canopy Mast',
    location: 'Sector 1 Solar Farm Perimeter',
    sector: 'Sector 1',
    status: 'LIVE',
    health: '100% Signal',
    fps: 30,
    trafficDensity: 'Smooth',
    vehicleCountPerMin: 16,
    viewAngle: 'Photovoltaic Array Mast #02',
    coordinates: { x: 22, y: 24 },
    thumbnailGradient: 'from-amber-950 via-slate-900 to-yellow-950',
    sceneType: 'park',
  },
  {
    id: 'cam-12',
    code: 'CAM-012',
    name: 'Substation 03 Perimeter Gate',
    location: 'Sector 12 Power Hub Ring',
    sector: 'Sector 12',
    status: 'LIVE',
    health: '100% Signal',
    fps: 30,
    trafficDensity: 'Smooth',
    vehicleCountPerMin: 20,
    viewAngle: 'HV Transformer Enclosure Yard',
    coordinates: { x: 32, y: 68 },
    thumbnailGradient: 'from-purple-950 via-slate-900 to-indigo-950',
    sceneType: 'industrial',
  },
];

export const INITIAL_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'cr-2941',
    code: '#CR-2941',
    category: 'Waterlogging',
    title: 'Waterlogging near Central Avenue underpass',
    location: 'Central Avenue & 8th Cross underpass',
    sector: 'Sector 8',
    timeSubmitted: '17:02:10 (10 min ago)',
    description:
      'Stormwater collecting rapidly in left lane near the bridge abutment. Water depth approx 15cm. Smaller cars are reversing.',
    status: 'Verified',
    upvotes: 28,
    duplicateClusterDetected: true,
    relatedIncidentId: 'INC-2026-0928-0142',
  },
  {
    id: 'cr-2942',
    code: '#CR-2942',
    category: 'Waterlogging',
    title: 'Drainage grate blocked with storm debris',
    location: 'Marina Walkway #14',
    sector: 'Sector 8',
    timeSubmitted: '17:04:45 (8 min ago)',
    description:
      'Tree branches and plastic packaging have choked the surface storm drain right outside the cafe kiosk.',
    status: 'Verified',
    upvotes: 14,
    duplicateClusterDetected: true,
    relatedIncidentId: 'INC-2026-0928-0142',
  },
  {
    id: 'cr-2938',
    code: '#CR-2938',
    category: 'Traffic Signal Failure',
    title: 'Traffic light flashing yellow continuously',
    location: 'Tech Hub Intersect 4',
    sector: 'Sector 3',
    timeSubmitted: '16:32:00 (40 min ago)',
    description:
      'Smart signal lost network sync; cars entering from all four sides simultaneously causing minor gridlock.',
    status: 'Assigned',
    upvotes: 19,
    duplicateClusterDetected: false,
  },
  {
    id: 'cr-2935',
    code: '#CR-2935',
    category: 'Pothole / Damage',
    title: 'Deep road depression near freight lane',
    location: 'Industrial Ring Km 1.8',
    sector: 'Sector 12',
    timeSubmitted: '14:20:00 (3 hours ago)',
    description:
      'Heavy freight trucks created approx 10cm dip in asphalt lane. Dangerous for two-wheelers.',
    status: 'Pending Verification',
    upvotes: 7,
    duplicateClusterDetected: false,
  },
];

export const INITIAL_AUDIT_LOG: OperationalAuditEntry[] = [
  {
    id: 'aud-01',
    timestamp: '17:10:04',
    operator: 'Saurav',
    role: 'CITY_ADMIN',
    action: 'Dispatched Emergency Resource',
    targetAsset: 'INC-2026-0928-0142 (Flood Warning)',
    previousValue: 'Status: Verified',
    newValue: 'Status: Dispatched (Pump Unit P-17)',
    reason: 'Water level breach in Sector 8 required immediate pumping intervention',
    severity: 'Emergency',
    approvedBy: 'Saurav (City Admin)',
  },
  {
    id: 'aud-02',
    timestamp: '17:06:12',
    operator: 'Ananya Sharma',
    role: 'SUPERVISOR',
    action: 'Approved Road Diversion',
    targetAsset: 'RD-BRG-004 (Marina River Bridge)',
    previousValue: 'Status: Open',
    newValue: 'Status: Diversion',
    reason: 'High waterlogging risk on lower deck; traffic redirected to Upper Skyway',
    severity: 'Sensitive',
    approvedBy: 'Ananya Sharma (Supervisor)',
  },
  {
    id: 'aud-03',
    timestamp: '16:50:28',
    operator: 'Vikram Mehta',
    role: 'OPERATOR',
    action: 'Updated Road Status',
    targetAsset: 'RD-EXP-024 (NH-24 Flyover)',
    previousValue: 'Status: Open',
    newValue: 'Status: Partial Closure (Lanes 1-2)',
    reason: 'Multi-vehicle collision clearance initiated by Police Unit 09',
    severity: 'Normal',
    approvedBy: 'Auto-authorized under traffic standard protocol',
  },
  {
    id: 'aud-04',
    timestamp: '16:15:42',
    operator: 'Karan Patel',
    role: 'OPERATOR',
    action: 'Decoupled Industrial Microgrid',
    targetAsset: 'Sector 12 Substation Transformer 03',
    previousValue: 'Grid Mode: Synchronized High-Voltage',
    newValue: 'Grid Mode: Islanded Molten-Salt Battery Reserve',
    reason: 'Transformer high-temperature trip alert',
    severity: 'Sensitive',
    approvedBy: 'Utility Admin Node 02',
  },
];

export const EMERGENCY_RESOURCES: EmergencyResource[] = [
  {
    id: 'res-p17',
    code: 'PUMP-P17',
    name: 'High-Volume Mobile Pump P-17 (35,000 L/s)',
    type: 'Drainage Pump',
    baseStation: 'Hydro-Depot East #04',
    status: 'Dispatched',
    crewSize: 4,
    currentEtaMinutes: 6,
  },
  {
    id: 'res-med02',
    code: 'AMB-MED02',
    name: 'Critical Care Ambulance Unit MED-02',
    type: 'Ambulance',
    baseStation: 'Central Metropolitan Hospital',
    status: 'Dispatched',
    crewSize: 3,
    currentEtaMinutes: 4,
  },
  {
    id: 'res-pol09',
    code: 'POL-CR09',
    name: 'Autonomous Highway Patrol Interceptor 09',
    type: 'Police Cruiser',
    baseStation: 'Sector 8 Police Station',
    status: 'On Scene',
    crewSize: 2,
    currentEtaMinutes: 0,
  },
  {
    id: 'res-fire01',
    code: 'FIRE-H01',
    name: 'Aerial Snorkel Foam Engine #01',
    type: 'Fire Truck',
    baseStation: 'Commercial District Fire Station',
    status: 'Available',
    crewSize: 6,
  },
  {
    id: 'res-elec02',
    code: 'GRID-CR02',
    name: 'High-Voltage Substation Specialist Squad G-02',
    type: 'Electrical Maintenance',
    baseStation: 'Power Substation Central',
    status: 'On Scene',
    crewSize: 4,
    currentEtaMinutes: 0,
  },
  {
    id: 'res-boat01',
    code: 'RESCUE-B01',
    name: 'All-Terrain Shallow Water Rescue Craft B-01',
    type: 'Rescue Boat',
    baseStation: 'Marina Marine Station',
    status: 'Available',
    crewSize: 4,
  },
];
