import {
  ChatMessage,
  AIMode,
  DataAwarenessTag,
  CityData,
  DisasterTelemetry,
  WeatherData,
  SystemStatus,
  PipelineStep,
} from '../types/chat';
import { PageId } from '../types';

/**
 * Service providing real-time telemetry, urban analytics, and cognitive
 * dialogue generation for NEXUS AI.
 */
class NexusAiService {
  /**
   * Retrieves active municipal operational parameters.
   */
  getCityData(): CityData {
    return {
      cityId: 'NEXUS-METRO-01',
      cityName: 'NEXUS CITY Autonomous Core',
      populationActive: 1420000,
      totalSensors: 14200,
      sensorUptime: 99.84,
      gridFrequency: 50.0,
      solarGenerationKw: 1840000,
      waterRetentionPct: 78.4,
      transitHeadwaySec: 42,
      isSimulated: true,
    };
  }

  /**
   * Retrieves current multi-hazard early warning telemetry.
   */
  getDisasterData(): DisasterTelemetry {
    return {
      activeSeverity: 'warning',
      floodingPrecipitationMmH: 68.4,
      riverCrestM: 4.62,
      seismicMagnitudeLast: 3.1,
      seismicDepthKm: 18.4,
      windSpeedKmh: 92,
      fireThermalNodes: 0,
      isLive: false, // Explicitly simulated in showcase environment
    };
  }

  /**
   * Retrieves localized meteorological telemetry.
   */
  getWeatherData(): WeatherData {
    return {
      temperatureC: 28.4,
      wetBulbIndex: 23.1,
      barometricPressureHpa: 988,
      windKmh: 42,
      relativeHumidityPct: 82,
      condition: 'Precipitation Squall Front',
      isLive: false,
    };
  }

  /**
   * Retrieves autonomous system operational status.
   */
  getSystemStatus(): SystemStatus {
    return {
      online: true,
      activeNodes: 14200,
      latencyMs: 4.2,
      cloudPodsRunning: 120,
      subterraneanActuatorsReady: true,
      mode: 'connected',
    };
  }

  /**
   * Detects the user's intent to route to the appropriate AI mode.
   */
  private detectMode(prompt: string): AIMode {
    const p = prompt.toLowerCase();

    // Mode 5: Simulation
    if (
      p.includes('simulate') ||
      p.includes('drill') ||
      p.includes('hypothetical') ||
      p.includes('what if') ||
      p.includes('scenario test')
    ) {
      return 'simulation';
    }

    // Mode 2: Problem Solving
    if (
      p.includes('problem') ||
      p.includes('drainage') ||
      p.includes('almost full') ||
      p.includes('overflowing') ||
      p.includes('traffic jam') ||
      p.includes('gridlock') ||
      p.includes('blackout') ||
      p.includes('leak') ||
      p.includes('failing') ||
      p.includes('what should the city do') ||
      p.includes('how to solve') ||
      p.includes('help me solve') ||
      p.includes('bottleneck') ||
      p.includes('power outage')
    ) {
      return 'problem_solving';
    }

    // Mode 3: Disaster
    if (
      p.includes('flood') ||
      p.includes('rainfall') ||
      p.includes('rain') ||
      p.includes('earthquake') ||
      p.includes('seismic') ||
      p.includes('tremor') ||
      p.includes('cyclone') ||
      p.includes('storm') ||
      p.includes('gale') ||
      p.includes('fire') ||
      p.includes('blaze') ||
      p.includes('heatwave') ||
      p.includes('extreme heat') ||
      p.includes('landslide') ||
      p.includes('evacuation') ||
      p.includes('warning') ||
      p.includes('emergency')
    ) {
      return 'disaster';
    }

    // Mode 4: System Analysis
    if (
      p.includes('architecture') ||
      p.includes('pipeline') ||
      p.includes('cloud') ||
      p.includes('serverless') ||
      p.includes('scale') ||
      p.includes('scalability') ||
      p.includes('devops') ||
      p.includes('event-driven') ||
      p.includes('how do components interact') ||
      p.includes('subterranean') ||
      p.includes('how does ai work') ||
      p.includes('decision engine') ||
      p.includes('latency')
    ) {
      return 'system_analysis';
    }

    // Mode 1: Information
    return 'information';
  }

  /**
   * Main cognitive message evaluation and synthesis method.
   */
  async sendMessage(prompt: string, history: ChatMessage[] = []): Promise<ChatMessage> {
    // Artificial slight processing pause for high-fidelity cognitive feel (350ms)
    await new Promise((resolve) => setTimeout(resolve, 380));

    const mode = this.detectMode(prompt);
    const p = prompt.toLowerCase();
    const city = this.getCityData();
    const disaster = this.getDisasterData();

    // 1. SIMULATION MODE
    if (mode === 'simulation') {
      return this.handleSimulationMode(p, disaster);
    }

    // 2. PROBLEM SOLVING MODE
    if (mode === 'problem_solving') {
      return this.handleProblemSolvingMode(p);
    }

    // 3. DISASTER MODE
    if (mode === 'disaster') {
      return this.handleDisasterMode(p, disaster);
    }

    // 4. SYSTEM ANALYSIS MODE
    if (mode === 'system_analysis') {
      return this.handleSystemAnalysisMode(p);
    }

    // 5. INFORMATION MODE (Default)
    return this.handleInformationMode(p, city);
  }

  /**
   * Mode 5: Simulation Generator
   */
  private handleSimulationMode(p: string, disaster: DisasterTelemetry): ChatMessage {
    const isQuake = p.includes('earthquake') || p.includes('tremor');
    const isFire = p.includes('fire');
    const isGrid = p.includes('grid') || p.includes('blackout') || p.includes('energy');

    let title = 'SIMULATION EXERCISE: Convective Urban Flash Flood in North Sector';
    let pipeline: PipelineStep[] = [
      {
        phase: '1. EVENT DETECTED',
        title: 'Doppler Radar Precipitation Spike',
        description:
          'Automated meteorological Doppler array registers intense 82 mm/h localized cloudburst front over Sector 4.',
        badge: 'T+0.0s',
        iconType: 'event',
      },
      {
        phase: '2. SENSOR DATA',
        title: 'Edge Ingestion & Crest Readings',
        description:
          '14,200 stormwater sensors transmit live flow telemetry. Retention basin crest reaches 4.82m (85% threshold capacity).',
        badge: 'T+1.2s',
        iconType: 'sensor',
      },
      {
        phase: '3. AI RISK ANALYSIS',
        title: 'Neural Hydrological Model Ingestion',
        description:
          'Generative drainage model predicts potential surface concourse flooding within 14 minutes if gates remain passive.',
        badge: 'T+2.4s',
        iconType: 'ai',
      },
      {
        phase: '4. SAFETY POLICY',
        title: 'Municipal Protocol Actuation',
        description:
          'Priority Tier 1: Divert 35,000 L/s to Subterranean Aquifer Vaults 04 & 09. Dispatch automated arterial detour signals.',
        badge: 'T+3.0s',
        iconType: 'decision',
      },
      {
        phase: '5. RESPONSE ACTION',
        title: 'Pneumatic Actuators Engaged',
        description:
          'Deep subterranean solenoid gates open in 180ms. Pedestrian flood barriers deploy on lower boulevard concourse.',
        badge: 'T+4.2s',
        iconType: 'action',
      },
      {
        phase: '6. CITY STATUS',
        title: 'Surge Neutralized & Containment Nominal',
        description:
          'Zero surface water ingress registered in pedestrian zones. Aquifer headroom absorbs 1.2M liters clean runoff.',
        badge: 'COMPLETED',
        iconType: 'status',
      },
    ];

    if (isQuake) {
      title = 'SIMULATION EXERCISE: Seismic P-Wave Shaking Event along Fault Alpha';
      pipeline = [
        {
          phase: '1. EVENT DETECTED',
          title: 'Sub-lithospheric P-Wave Trigger',
          description:
            'Deep borehole seismographs detect non-destructive primary seismic compression wave at 18.4km focal depth.',
          badge: 'T+0.0s',
          iconType: 'event',
        },
        {
          phase: '2. SENSOR DATA',
          title: 'PGA Velocity Ingestion',
          description:
            'Regional seismograph array computes focal location and estimates shear S-wave surface arrival time within 11.4 seconds.',
          badge: 'T+0.8s',
          iconType: 'sensor',
        },
        {
          phase: '3. AI RISK ANALYSIS',
          title: 'Structural Resonance Computation',
          description:
            'Structural health mesh computes building harmonics across 40 bioclimatic towers and identifies high-risk elevator shafts.',
          badge: 'T+1.5s',
          iconType: 'ai',
        },
        {
          phase: '4. SAFETY POLICY',
          title: 'Autonomous Early Warning Rule-base',
          description:
            'Mandate immediate elevator soft-lock at nearest landings; engage high-rise tuned mass dampers; throttle maglev transit.',
          badge: 'T+2.1s',
          iconType: 'decision',
        },
        {
          phase: '5. RESPONSE ACTION',
          title: 'Active Structural Damping & Transit Berth',
          description:
            '100% of high-rise mass dampers locked into opposing resonance mode. Maglev pods safely decelerated to station berths.',
          badge: 'T+3.4s',
          iconType: 'action',
        },
        {
          phase: '6. CITY STATUS',
          title: 'Structural Integrity Verified Nominal',
          description:
            'All structural accelerometers verify zero structural deformation. Post-event acoustic drone sweep activated.',
          badge: 'COMPLETED',
          iconType: 'status',
        },
      ];
    }

    return {
      id: `ai-msg-${Date.now()}`,
      sender: 'assistant',
      text: `### ⚠️ SIMULATION MODE ACTIVE\n\n**${title}**\n\nI have executed a hypothetical multi-tier drill through the NEXUS CITY autonomous event arbiter. Below is the step-by-step cognitive and physical actuation timeline:`,
      timestamp: 'Just now',
      mode: 'simulation',
      dataTag: 'SIMULATED DATA',
      pipeline,
      systemsInvolved: [
        'IoT Edge Sensors',
        'Cloud-Native Event Arbiter',
        'Generative Hazard Models',
        'Subterranean Pneumatic Actuators',
        'Municipal Emergency Broadcast',
      ],
      quickActions: [
        { label: 'Launch Disaster Lab', page: 'disaster', tab: 'simulation' },
        { label: 'Inspect Digital Twin', page: 'infrastructure' },
      ],
      warningDisclaimer:
        'DISASTER DRILL NOTICE: All metrics and responses displayed in this simulation represent synthetic exercise data for demonstration and planning purposes.',
    };
  }

  /**
   * Mode 2: Problem Solving Mode
   */
  private handleProblemSolvingMode(p: string): ChatMessage {
    let problemTitle = 'Urban Drainage Overload & Runoff Saturation';
    let identifiedSystem = 'Hydrological Stormwater Management & Subterranean Vaults';
    let analysis =
      'Heavy precipitation front is exceeding surface culvert gravity capacity (currently at 88% capacity). Runoff velocity threatens subterranean transit concourses if peak inflow persists.';
    let rootCauses = [
      'Convective localized storm cell delivering >70 mm/h burst.',
      'Surface impervious coverage concentrating runoff into central boulevard drainage conduits.',
      'Tide surge creating backpressure at estuary outflow gates.',
    ];
    let recommendedActions = [
      'Actuate pneumatic diversion valves at Subterranean Aquifer Vaults 04 & 09 to bypass surface culverts.',
      'Engage perimeter storm retention reservoirs to absorb 35,000 L/s surplus.',
      'Issue automated lane diversion signals to keep arterial vehicular traffic on high-elevation viaducts.',
      'Pre-stage emergency suction pumps at SkyHub underground logistics docks.',
    ];
    let components = [
      'Doppler Rain Radar & Inclinometers',
      'Cloud Serverless Hydrology Workers',
      'AI Cognitive Flow Arbiter',
      'Subterranean Solenoid Diversion Gates',
      'Municipal Emergency Broadcast Ticker',
    ];
    let assumptions = [
      'Subterranean Aquifer Vaults have minimum 40% unutilized storage capacity.',
      'Auxiliary backup generators are online for all pneumatic gate actuators.',
    ];
    let expectedOutcome =
      'Drainage head-pressure normalized below 60% within 180 seconds. Zero surface standing water on arterial lanes; 1.2M liters captured for municipal cooling recycling.';

    if (p.includes('traffic') || p.includes('gridlock') || p.includes('bottleneck')) {
      problemTitle = 'Arterial Stadium Surge & Multi-Corridor Traffic Gridlock';
      identifiedSystem = 'Autonomous Maglev Transit & Adaptive Green-Wave Corridors';
      analysis =
        'Simultaneous conclusion of harbor stadium event released 24,000 pedestrians, creating severe queue bottlenecks at Terminal East and arterial boulevard intersections.';
      rootCauses = [
        'Uncoordinated departure surge saturating ground-level transit plazas.',
        'Fixed traffic light cycles causing vehicle gridlock spanning 1.4 kilometers.',
      ];
      recommendedActions = [
        'Deploy dynamic green-wave priority signals on East-West outbound corridors.',
        'Inject 45 high-capacity autonomous maglev passenger shuttles at 45-second headway intervals.',
        'Broadcast digital wayfinding updates directing crowds to secondary elevated skywalks.',
      ];
      components = [
        'Pedestrian LiDAR Beacons',
        'Transit Fleet Dispatcher AI',
        'Connected Signal Controller',
      ];
      assumptions = ['Autonomous shuttle battery charge exceeds 80%.'];
      expectedOutcome =
        'Average passenger evacuation clearance reduced from 35 minutes to 8.2 minutes with zero pedestrian crush.';
    } else if (p.includes('energy') || p.includes('blackout') || p.includes('power')) {
      problemTitle = 'Grid Frequency Instability from Severe Thermal Cooling Peak';
      identifiedSystem = 'Decentralized Microgrid Balancing & Molten Salt Battery Buffers';
      analysis =
        'Synchronous activation of high-capacity HVAC systems across 40 bioclimatic towers caused an unexpected 420 MW load deficit, stressing the primary substation.';
      rootCauses = [
        'Rapid ambient temperature spike above 41°C trigger point.',
        'Lagging response in regional grid high-voltage transmission lines.',
      ];
      recommendedActions = [
        'Dispatch decentralized battery storage in 180ms to inject +280 MW buffer.',
        'Activate peer-to-peer building microgrid trading to shave peak non-essential loads.',
        'Engage subterranean flywheel energy kinetic reserves.',
      ];
      components = [
        'High-speed Phasor Measurement Units (PMU)',
        'Autonomous Grid Arbiter AI',
        'Subterranean Battery Banks',
      ];
      assumptions = ['Battery state of charge is above 72% across all 6 sectors.'];
      expectedOutcome =
        'Grid frequency held solidly at 50.00 Hz; zero residential brownouts; load peak fully neutralized within 3 minutes.';
    }

    const pipeline: PipelineStep[] = [
      {
        phase: 'PROBLEM IDENTIFIED',
        title: problemTitle,
        description: analysis,
        iconType: 'problem',
      },
      {
        phase: 'ROOT CAUSE ANALYSIS',
        title: 'Contributing Factors & Inflow',
        description: rootCauses.join(' • '),
        iconType: 'ai',
      },
      {
        phase: 'RECOMMENDED ACTION',
        title: 'Multi-Step Mitigation Procedure',
        description: recommendedActions.map((a, i) => `${i + 1}. ${a}`).join(' \n'),
        iconType: 'action',
      },
      {
        phase: 'SYSTEMS INVOLVED',
        title: 'NEXUS Autonomous Modules',
        description: components.join(' → '),
        iconType: 'decision',
      },
      {
        phase: 'EXPECTED OUTCOME',
        title: 'Target Operational State',
        description: expectedOutcome,
        iconType: 'outcome',
      },
    ];

    return {
      id: `ai-msg-${Date.now()}`,
      sender: 'assistant',
      text: `### ⚙️ PROBLEM-SOLVING ANALYSIS\n\n**Identified Subsystem:** ${identifiedSystem}\n\nI have evaluated the described urban disturbance against NEXUS CITY's operational telemetry. Here is the structured resolution architecture:`,
      timestamp: 'Just now',
      mode: 'problem_solving',
      dataTag: 'SIMULATED DATA',
      pipeline,
      systemsInvolved: components,
      assumptions,
      quickActions: [
        { label: 'View Command Center', page: 'command-center' },
        { label: 'Inspect Architecture Pipeline', page: 'architecture' },
      ],
    };
  }

  /**
   * Mode 3: Disaster Management & Safety
   */
  private handleDisasterMode(p: string, disaster: DisasterTelemetry): ChatMessage {
    const isQuake = p.includes('earthquake') || p.includes('seismic') || p.includes('tremor');
    const isFlood = p.includes('flood') || p.includes('rainfall') || p.includes('rain');
    const isCyclone = p.includes('cyclone') || p.includes('storm') || p.includes('wind');
    const isFire = p.includes('fire');
    const isHeat = p.includes('heat') || p.includes('heatwave');

    if (isQuake) {
      return {
        id: `ai-msg-${Date.now()}`,
        sender: 'assistant',
        text: `### 🌍 Seismic Early Warning & Structural Protocol

**CRITICAL SCIENTIFIC PRINCIPLE:**
*Earthquakes cannot be reliably predicted in advance by any science or AI. NEXUS CITY alerts represent instant real-time detection of seismic P-waves (compressional primary waves), providing crucial seconds of early warning before destructive S-waves arrive.*

**Seismic Sensor Telemetry (Current Active Station):**
- **Last Event Magnitude:** M ${disaster.seismicMagnitudeLast} (Micro-Tremor)
- **Focal Depth:** ${disaster.seismicDepthKm} km
- **Early Warning Lead Time:** 8 to 18 seconds (depending on distance from epicenter)

**Immediate Life-Safety Instructions:**
1. **DROP, COVER, AND HOLD ON:** Drop to hands and knees, cover head/neck under a sturdy table, hold on until shaking stops.
2. **STAY INDOORS:** Do not run outside during shaking; high-rise kinetic facades are engineered to flex, but exterior glass falls outward.
3. **DO NOT USE ELEVATORS:** Autonomous elevator controllers will automatically lock cabs at the nearest floor with doors open.

**NEXUS CITY Autonomous Safeguards:**
- High-rise tuned mass dampers automatically engage opposing inertia damping.
- Sub-surface gas pipelines and fuel valves auto-isolate via solenoid shutoffs in 12ms.
- Autonomous maglev passenger transit safely berths at designated emergency decelerator zones.`,
        timestamp: 'Just now',
        mode: 'disaster',
        dataTag: 'SIMULATED DATA',
        systemsInvolved: [
          'Sub-lithospheric Seismograph Mesh',
          'High-Rise Tuned Mass Dampers',
          'Solenoid Fuel Isolation Valves',
          'Autonomous Maglev Braking Controller',
        ],
        quickActions: [
          { label: 'Inspect Seismic Monitor', page: 'disaster', tab: 'hazards' },
          { label: 'Tactical Evacuation Map', page: 'disaster', tab: 'map' },
        ],
        warningDisclaimer:
          'OFFICIAL NOTICE: This is an automated smart-city advisory. In an actual seismic emergency, follow instructions from National Disaster Response Authorities (NDRF: 1070 / National Helpline: 112).',
      };
    }

    if (isFlood) {
      return {
        id: `ai-msg-${Date.now()}`,
        sender: 'assistant',
        text: `### 🌊 Flood Risk Analysis & Hydrological Early Warning

**Hydrological Sensor Status:**
- **Rainfall Intensity:** ${disaster.floodingPrecipitationMmH} mm/h (Heavy Convective Cloudburst)
- **River Crest:** ${disaster.riverCrestM} m (Surging in Lower Marina Estuary)
- **Alert Status:** **WARNING** (Zone: Sector 4 Marina Estuary & Coastal Basin)

**Emergency Actions & Safety Precautions:**
1. **Evacuate Low-Lying Concourses:** Clear underground basements, parking decks, and subterranean shopping concourses immediately.
2. **Move to Higher Elevation:** Head towards **Elevated Storm Shelter 01 (SkyHub)** via elevated skybridges.
3. **Never Drive Through Floodwaters:** Avoid blue-zone flood corridors; follow pulsing LED roadway guidance signs.

**NEXUS CITY Automated Infrastructure Response:**
- Subterranean Aquifer Vaults 04 & 09 active, diverting 35,000 L/s away from arterial lanes.
- Motorized floodgates along Marina Boardwalk deployed in 4.2 seconds.
- Wastewater treatment plant bypasses non-potable surplus to groundwater recharge basins.`,
        timestamp: 'Just now',
        mode: 'disaster',
        dataTag: 'SIMULATED DATA',
        systemsInvolved: [
          'Doppler Meteorological Array',
          'Subterranean Aquifer Vaults 04 & 09',
          'Pneumatic Floodgate Solenoids',
          'Elevated Storm Shelter Network',
        ],
        quickActions: [
          { label: 'View Flood Card & Sensors', page: 'disaster', tab: 'hazards' },
          { label: 'Explore Tactical Risk Map', page: 'disaster', tab: 'map' },
        ],
        warningDisclaimer:
          'EMERGENCY ADVISORY: For real-life flood assistance, contact Emergency Helpline 112 or Municipal Flood Control 1070.',
      };
    }

    if (isCyclone) {
      return {
        id: `ai-msg-${Date.now()}`,
        sender: 'assistant',
        text: `### 🌪️ Cyclone & Severe Storm Advisory

**Wind & Atmospheric Telemetry:**
- **Sustained Wind Speed:** ${disaster.windSpeedKmh} km/h
- **Peak Gusts:** 118 km/h
- **Barometric Pressure:** 984 hPa (Dropping rapidly)

**Safety Guidance:**
1. **Secure Outdoor Assets:** Retract solar awnings and move all balcony objects indoors.
2. **Stay Away from Exterior Glass:** Move to interior rooms or designated shelter corridors.
3. **Transit Advisory:** Harbor ferry and elevated skyway gliders are temporarily paused until gusts subside below 80 km/h.

**NEXUS CITY Response:**
- Bioclimatic kinetic louvers locked in aerodynamic deflection stance.
- Emergency power microgrid operating on decoupled molten-salt reserves.`,
        timestamp: 'Just now',
        mode: 'disaster',
        dataTag: 'SIMULATED DATA',
        systemsInvolved: ['Bioclimatic Kinetic Facades', 'Microgrid Salt Buffers', 'Doppler Weather Array'],
        quickActions: [{ label: 'Open Disaster Room', page: 'disaster' }],
      };
    }

    if (isFire) {
      return {
        id: `ai-msg-${Date.now()}`,
        sender: 'assistant',
        text: `### 🔥 Urban Fire Emergency Protocol

**Immediate Civilian Safety Action:**
1. **Evacuate Calmly via Pressurized Stairwells:** Do not attempt to use elevators.
2. **Close Doors Behind You:** Isolating chambers starves localized fires of oxygen.
3. **Follow Green Laser Arrows:** Floor-recessed directional lighting will guide you to smoke-free exterior refuge balconies.

**NEXUS Automated Containment:**
- Autonomous thermal sensors detect localized heat signatures within 1.2s.
- Nitrogen/dry-mist suppression nozzles engage in enclosed utility shafts.
- Autonomous firefighting drones dispatched with thermal imaging payloads.

*Note: In any real-world fire incident, evacuate immediately and dial official emergency fire services (101 or 112).*`,
        timestamp: 'Just now',
        mode: 'disaster',
        dataTag: 'SIMULATED DATA',
        systemsInvolved: ['Thermal Drone Fleet', 'Dry-Mist Extinguishers', 'Positive-Pressure Stairwells'],
        quickActions: [{ label: 'Fire Safety Facilities', page: 'disaster', tab: 'map' }],
      };
    }

    // Default general disaster summary
    return {
      id: `ai-msg-${Date.now()}`,
      sender: 'assistant',
      text: `### 🛡️ Multi-Hazard Disaster Intelligence Overview

NEXUS CITY monitors **7 distinct hazards** concurrently via 14,200 edge sensors:
1. 🌊 **Flooding & Cloudbursts** — Real-time hydrology & subterranean aquifer diversion.
2. 🌍 **Earthquakes & Seismic Activity** — P-wave early warning triggers (seconds before S-waves; never speculative prediction).
3. 🌪️ **Cyclones & Gale Winds** — Automated building aerodynamic shutter lockdowns.
4. 🔥 **Urban Fires** — Autonomous thermal detection and pressurized stairwell containment.
5. 🌡️ **Extreme Heatwaves** — Bioclimatic misting arches and public cooling pavilions.
6. ⚡ **Grid Blackout Protection** — 180ms sub-second microgrid battery dispatch.
7. 🏔️ **Landslides & Ridge Creep** — Geotechnical borehole inclinometers.`,
      timestamp: 'Just now',
      mode: 'disaster',
      dataTag: 'SIMULATED DATA',
      quickActions: [
        { label: 'Open Disaster Intelligence Room', page: 'disaster' },
        { label: 'Launch Simulation Lab', page: 'disaster', tab: 'simulation' },
      ],
    };
  }

  /**
   * Mode 4: System Analysis & Architecture
   */
  private handleSystemAnalysisMode(p: string): ChatMessage {
    return {
      id: `ai-msg-${Date.now()}`,
      sender: 'assistant',
      text: `### 🌐 NEXUS CITY Architecture & Component Interactivity

NEXUS CITY is built on a **7-Tier Cloud-Native Autonomous Pipeline**:

\`\`\`
[1. City Devices] → [2. IoT / Sensors] → [3. Cloud Run / Compute] 
   → [4. Generative AI & Digital Twin] → [5. Decision Engine Arbiter] 
   → [6. Subterranean Actuators] → [7. People & Resilient Communities]
\`\`\`

**Key Architectural Innovations:**
- **Serverless Dynamic Scalability:** Computing capacity scales from 18 standby nodes during late-night hours up to 850+ pods (680 TFLOPS) during severe storms or transit peaks in under 40 milliseconds.
- **Event-Driven Sub-Second Loop:** Sensor trigger ingested in 1.2ms $\\to$ AI cognitive hazard model evaluated in 2.4ms $\\to$ Pneumatic actuators deployed in 180ms.
- **Subterranean Infrastructure Spine:** Water, energy, high-speed maglev transit, and pneumatic parcel freight are housed underground, preserving surface parks, trees, and clean air.
- **Digital Twin Synchronization:** Real-time bi-directional telemetry synchronizes every physical street, building damper, and aquifer valve with the central AI Command Center.`,
      timestamp: 'Just now',
      mode: 'system_analysis',
      dataTag: 'SIMULATED DATA',
      systemsInvolved: [
        'Cloud Run Edge Containers',
        'Serverless Pod Autoscaler',
        'Event-Driven Rule Arbiter',
        'Subterranean Multi-Conduit Spine',
        'Digital Twin Telemetry Bridge',
      ],
      quickActions: [
        { label: 'Inspect Architecture Flow', page: 'architecture' },
        { label: 'Explore Serverless Scalability', page: 'architecture' },
        { label: 'View Digital Twin', page: 'infrastructure' },
      ],
    };
  }

  /**
   * Mode 1: Information Mode (General Q&A, Website Guidance)
   */
  private handleInformationMode(p: string, city: CityData): ChatMessage {
    if (p.includes('what is nexus city') || p.includes('explain nexus city') || p.includes('what problem')) {
      return {
        id: `ai-msg-${Date.now()}`,
        sender: 'assistant',
        text: `### 🏙️ Welcome to NEXUS CITY

> *"The city is no longer static. It thinks. It adapts. It evolves."*

**NEXUS CITY** is a futuristic, cloud-native intelligent metropolis model where generative AI, autonomous subterranean infrastructure, renewable microgrids, and multi-hazard early warning systems operate together in real time.

**What Problem Does NEXUS CITY Solve?**
- **Legacy Urban Brittleness:** Modern cities struggle with slow 15–30 minute emergency dispatch latency, grid brownouts during heatwaves, and surface traffic gridlock.
- **The NEXUS Solution:** 
  1. Reduces hazard response latency from minutes to **4.2 seconds** through autonomous AI edge detection.
  2. Runs on a **net-positive ecological ledger** generating 18% surplus clean energy with zero surface vehicle emissions.
  3. Houses noisy freight, power conduits, and stormwater reservoirs underground, freeing surface land for bioclimatic community living.`,
        timestamp: 'Just now',
        mode: 'information',
        dataTag: 'SIMULATED DATA',
        systemsInvolved: ['Entire NEXUS Platform Core'],
        quickActions: [
          { label: 'Launch Disaster Room', page: 'disaster' },
          { label: 'Explore Digital Twin', page: 'infrastructure' },
          { label: 'Open Command Center', page: 'command-center' },
        ],
      };
    }

    if (p.includes('digital twin')) {
      return {
        id: `ai-msg-${Date.now()}`,
        sender: 'assistant',
        text: `### 💎 The NEXUS CITY Digital Twin

The Digital Twin is a **real-time virtual mirror** of the entire physical city.

**Key Capabilities:**
- **14,200 Active Sensor Telemetry:** Tracks stormwater levels, structural harmonics in 40 towers, microgrid voltage, and air purity in real time.
- **Interactive Hotspot Exploration:** Inspect SkyHub terminal, bioclimatic residential pods, solar facade arrays, and subterranean aquifer vaults.
- **Bi-Directional Command:** Not just a visualization—decisions approved in the Digital Twin trigger physical actuators (valves, louvers, dampers) within milliseconds.`,
        timestamp: 'Just now',
        mode: 'information',
        dataTag: 'SIMULATED DATA',
        quickActions: [
          { label: 'Open Interactive Digital Twin', page: 'infrastructure' },
          { label: 'Open Diagnostics Twin Modal', page: 'home' },
        ],
      };
    }

    if (p.includes('sustainability') || p.includes('green') || p.includes('solar') || p.includes('carbon')) {
      return {
        id: `ai-msg-${Date.now()}`,
        sender: 'assistant',
        text: `### 🌿 Net-Positive Ecological Architecture

NEXUS CITY is designed to **give more than it takes**:
- **+1.84 GW Peak Solar Canopy:** Perovskite kinetic building skins and skybridge photovoltaic canopies.
- **+18% Net Clean Energy Surplus:** Exported to regional agriculture and water desalination plants.
- **94.2% Wastewater Recovery:** Stormwater and greywater filtered through sub-surface bio-retention beds.
- **Zero Surface Carbon Emissions:** 100% of vehicular freight and transit operates on subterranean electromagnetic maglev tracks.`,
        timestamp: 'Just now',
        mode: 'information',
        dataTag: 'SIMULATED DATA',
        quickActions: [{ label: 'View Sustainability Ledger', page: 'sustainability' }],
      };
    }

    // Default general assistant overview
    return {
      id: `ai-msg-${Date.now()}`,
      sender: 'assistant',
      text: `Hello! I am **NEXUS AI**, the Urban Intelligence Assistant for NEXUS CITY.

I am connected to all 6 city operational layers:
- 🛡️ **Disaster Intelligence & Early Warnings** (Floods, Earthquakes, Cyclones, Fires, Heatwaves)
- ⚡ **Cloud Architecture & Serverless Scalability** (Event-driven workflows, 680 TFLOPS peak)
- 🏢 **Autonomous Infrastructure & Subterranean Twin** (Maglev tunnels, modular morphing buildings)
- 📊 **AI Command Center & Live Telemetry** (Real-time sparklines, microgrid balance)
- 🌿 **Net-Positive Sustainability Ledger** (Zero runoff, 1.84 GW solar)

You can ask me to **solve an urban disturbance**, **simulate a disaster drill**, or **explain any city technology**!`,
      timestamp: 'Just now',
      mode: 'information',
      dataTag: 'SIMULATED DATA',
      quickActions: [
        { label: 'Disaster Control', page: 'disaster' },
        { label: 'Architecture', page: 'architecture' },
        { label: 'Infrastructure', page: 'infrastructure' },
        { label: 'Command Center', page: 'command-center' },
      ],
    };
  }
}

export const nexusAiService = new NexusAiService();
