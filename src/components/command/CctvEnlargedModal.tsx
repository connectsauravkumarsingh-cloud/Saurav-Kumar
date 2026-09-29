import React, { useState } from 'react';
import { CctvFeed } from '../../data/commandCenterData';
import {
  Video,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Camera,
  Moon,
  Sun,
  Shield,
  Radio,
  Sliders,
  Compass,
} from 'lucide-react';

interface CctvEnlargedModalProps {
  cctv: CctvFeed | null;
  onClose: () => void;
}

export const CctvEnlargedModal: React.FC<CctvEnlargedModalProps> = ({
  cctv,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [nightVision, setNightVision] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  if (!cctv) return null;

  const handlePan = (dx: number, dy: number) => {
    setPanOffset((prev) => ({
      x: Math.max(-50, Math.min(50, prev.x + dx)),
      y: Math.max(-30, Math.min(30, prev.y + dy)),
    }));
  };

  const handleSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#04091a] border border-cyan-500/50 shadow-2xl p-5 text-slate-100 flex flex-col gap-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-500/50 text-cyan-300">
              <Video className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-100">
                  {cctv.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 border border-red-500 text-red-200 font-extrabold animate-pulse">
                  ● LIVE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                  {cctv.code}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                📍 {cctv.location} • Angle: {cctv.viewAngle} • Status: {cctv.health}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Simulated Video Monitor Canvas */}
        <div
          className={`relative w-full h-[400px] rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center transition-all ${
            nightVision
              ? 'bg-[#031408] [filter:grayscale(80%)_sepia(90%)_hue-rotate(85deg)]'
              : 'bg-gradient-to-br from-slate-950 via-[#07132e] to-[#040817]'
          }`}
        >
          {/* Scanlines Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-60 pointer-events-none z-10" />

          {/* Optical Reticle / Crosshair HUD */}
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            <div className="w-32 h-32 border border-cyan-500/30 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border border-cyan-400" />
            </div>
          </div>

          {/* Simulated Moving Traffic Feed Graphic */}
          <div
            className="relative w-full h-full flex flex-col justify-center items-center transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            }}
          >
            {/* Roadway simulation */}
            <div className="w-[85%] h-32 bg-slate-900/90 rounded-2xl border-y-2 border-dashed border-amber-400/40 relative flex items-center justify-around overflow-hidden shadow-2xl">
              {/* Passing vehicle lights */}
              <div className="w-16 h-8 rounded-lg bg-cyan-500/80 shadow-lg shadow-cyan-400/60 animate-pulse" />
              <div className="w-20 h-10 rounded-lg bg-blue-600/80 shadow-lg shadow-blue-400/60" />
              <div className="w-14 h-7 rounded-lg bg-emerald-500/80 shadow-lg shadow-emerald-400/60 animate-pulse" />
              <div className="w-24 h-11 rounded-lg bg-amber-500/80 shadow-lg shadow-amber-400/60" />
            </div>

            <div className="text-xs font-mono text-slate-400 mt-4 tracking-wider">
              [SIMULATED REAL-TIME HIGH-RESOLUTION VIDEO STREAM]
            </div>
          </div>

          {/* Snapshot Notification */}
          {snapshotTaken && (
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-400 text-emerald-300 text-xs font-mono shadow-xl animate-in fade-in">
              📸 Snapshot Captured &amp; Stored to Incident Vault #SN-8821
            </div>
          )}

          {/* Top-Right HUD OSD Data */}
          <div className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1">
            <div className="text-cyan-400 font-bold">OPTICAL HUD TELEMETRY</div>
            <div>VEHICLES: {cctv.vehicleCountPerMin} / MIN</div>
            <div>FPS: {cctv.fps} FPS (HEVC 4K)</div>
            <div>DENSITY: {cctv.trafficDensity}</div>
            <div>ZOOM: {zoomLevel.toFixed(1)}X</div>
          </div>

          {/* Bottom-Left Live Timestamp OSD */}
          <div className="absolute bottom-4 left-4 z-20 font-mono text-xs text-emerald-400 font-bold bg-black/60 px-2.5 py-1 rounded-md">
            REC ● {new Date().toISOString().replace('T', ' ').slice(0, 19)}
          </div>
        </div>

        {/* PTZ and Video Controls Bar */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          {/* Pan / Tilt controls */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">PTZ Gantry:</span>
            <button
              onClick={() => handlePan(-15, 0)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:text-white"
            >
              ◀ Pan Left
            </button>
            <button
              onClick={() => handlePan(15, 0)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:text-white"
            >
              Pan Right ▶
            </button>
            <button
              onClick={() => handlePan(0, -10)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:text-white"
            >
              ▲ Tilt Up
            </button>
            <button
              onClick={() => handlePan(0, 10)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:text-white"
            >
              ▼ Tilt Down
            </button>
          </div>

          {/* Zoom and Mode toggles */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border-r border-slate-800 pr-3">
              <button
                onClick={() => setZoomLevel((z) => Math.min(3, z + 0.5))}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:text-cyan-400"
                title="Optical Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(1, z - 0.5))}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:text-cyan-400"
                title="Optical Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* Night Vision Toggle */}
            <button
              onClick={() => setNightVision(!nightVision)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors ${
                nightVision
                  ? 'border-emerald-500 bg-emerald-950 text-emerald-300 font-bold'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{nightVision ? 'IR Night Vision Active' : 'IR Sensor'}</span>
            </button>

            {/* Snapshot */}
            <button
              onClick={handleSnapshot}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold flex items-center gap-1.5 hover:bg-cyan-400 transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-slate-950" />
              <span>Snapshot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
