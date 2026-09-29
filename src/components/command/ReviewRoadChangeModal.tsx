import React, { useState } from 'react';
import { RoadAsset, OperatorRole } from '../../data/commandCenterData';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Clock,
  Compass,
  FileCheck,
  UserCheck,
} from 'lucide-react';

interface ReviewRoadChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  road: RoadAsset | null;
  proposedStatus: RoadAsset['status'];
  reason: string;
  activeRole: OperatorRole;
  onConfirmChange: (
    roadId: string,
    newStatus: RoadAsset['status'],
    reason: string,
    approvedBy: string
  ) => void;
}

export const ReviewRoadChangeModal: React.FC<ReviewRoadChangeModalProps> = ({
  isOpen,
  onClose,
  road,
  proposedStatus,
  reason,
  activeRole,
  onConfirmChange,
}) => {
  if (!isOpen || !road) return null;

  const isSensitive =
    proposedStatus === 'Full Closure' || proposedStatus === 'Diversion';

  // Role check:
  // VIEWER: Cannot update
  // OPERATOR: Needs approval if sensitive
  // SUPERVISOR / CITY_ADMIN / EMERGENCY_COMMANDER: Can approve
  const canDirectlyPublish =
    activeRole === 'SUPERVISOR' ||
    activeRole === 'CITY_ADMIN' ||
    activeRole === 'EMERGENCY_COMMANDER' ||
    !isSensitive;

  const isViewer = activeRole === 'VIEWER';

  const handlePublish = () => {
    const approver =
      activeRole === 'CITY_ADMIN'
        ? 'Saurav (City Admin)'
        : activeRole === 'SUPERVISOR'
        ? 'Ananya Sharma (Supervisor)'
        : activeRole === 'EMERGENCY_COMMANDER'
        ? 'Emergency Commander'
        : 'Auto-authorized (Operator standard protocol)';

    onConfirmChange(road.id, proposedStatus, reason, approver);
    onClose();
  };

  const handleSubmitForApproval = () => {
    onConfirmChange(
      road.id,
      proposedStatus,
      `[PENDING SUPERVISOR APPROVAL] ${reason}`,
      'Pending Supervisor Approval'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#060e24] border border-cyan-500/50 shadow-2xl p-6 text-slate-100 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-500/50 text-cyan-300">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-slate-100">
                Review Operational Change
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Municipal Road &amp; Infrastructure Command Gateway
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Status Transition Card */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex-1 text-center p-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">CURRENT STATUS</div>
            <div className="font-bold text-slate-200 text-sm mt-0.5">{road.status}</div>
          </div>

          <ArrowRight className="w-5 h-5 text-cyan-400 shrink-0" />

          <div className="flex-1 text-center p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/60">
            <div className="text-[10px] text-cyan-300 uppercase">PROPOSED STATUS</div>
            <div className="font-bold text-cyan-200 text-sm mt-0.5">{proposedStatus}</div>
          </div>
        </div>

        {/* Change Details */}
        <div className="space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400">Target Asset:</span>
            <span className="text-slate-200 font-bold">
              {road.name} ({road.code})
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400">Location / Sector:</span>
            <span className="text-cyan-300">{road.sector}</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400">Operational Reason:</span>
            <span className="text-slate-200 max-w-[280px] text-right truncate">
              {reason || 'Standard arterial flow optimization'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400">Expected Traffic Impact:</span>
            <span className="text-amber-400 font-bold">
              {isSensitive
                ? 'High (+4.2 km diversion routing via Ring B)'
                : 'Moderate (Lane constriction with 30 km/h advisory)'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-400">Operator Identity:</span>
            <span className="text-slate-200">
              {activeRole.replace('_', ' ')} • ID: OP-8821
            </span>
          </div>
        </div>

        {/* Role Approval Advisory */}
        {!canDirectlyPublish && !isViewer && (
          <div className="p-3 rounded-2xl bg-amber-950/60 border border-amber-500/50 flex items-start gap-2.5 text-xs font-mono text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">Approval Required:</strong> Major road closures and diversions require Supervisor or City Admin authorization. You can submit this update for instantaneous Supervisor review.
            </div>
          </div>
        )}

        {isViewer && (
          <div className="p-3 rounded-2xl bg-red-950/60 border border-red-500/50 flex items-start gap-2.5 text-xs font-mono text-red-200">
            <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong>Viewer Mode:</strong> Read-only monitoring account. Switch to Operator, Supervisor, or City Admin role in the top-right menu to publish updates.
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-3 border-t border-slate-800 font-mono text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
          >
            Cancel
          </button>

          {!isViewer && !canDirectlyPublish && (
            <button
              onClick={handleSubmitForApproval}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold uppercase tracking-wider shadow-lg shadow-amber-950/50 hover:opacity-95"
            >
              Submit for Supervisor Approval
            </button>
          )}

          {!isViewer && canDirectlyPublish && (
            <button
              onClick={handlePublish}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-slate-950 font-bold uppercase tracking-wider shadow-lg shadow-cyan-950/50 hover:opacity-95"
            >
              Publish Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
