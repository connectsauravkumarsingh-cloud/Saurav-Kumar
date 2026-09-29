import React, { useState, useMemo } from 'react';
import { OperationalAuditEntry } from '../../data/commandCenterData';
import {
  ClipboardList,
  X,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Shield,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface AuditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditEntries: OperationalAuditEntry[];
}

export const AuditLogModal: React.FC<AuditLogModalProps> = ({
  isOpen,
  onClose,
  auditEntries,
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filteredEntries = useMemo(() => {
    return auditEntries.filter((item) => {
      if (severityFilter !== 'all' && item.severity !== severityFilter) {
        return false;
      }
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          item.operator.toLowerCase().includes(q) ||
          item.action.toLowerCase().includes(q) ||
          item.targetAsset.toLowerCase().includes(q) ||
          item.reason.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [auditEntries, searchFilter, severityFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[85vh] max-h-[720px] rounded-3xl bg-[#050b1a] border border-cyan-500/50 shadow-2xl p-6 text-slate-100 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-500/50 text-cyan-300">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-slate-100">
                  Municipal Operator Audit &amp; Activity Log
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
                  IMMUTABLE TIMELINE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Cryptographically synchronized operational record across all ICCC control nodes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 shrink-0 text-xs font-mono">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by operator, asset, or action..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 text-[10px]">SEVERITY:</span>
            {['all', 'Normal', 'Sensitive', 'Emergency', 'Critical'].map((s) => (
              <button
                key={s}
                onClick={() => setSeverityFilter(s)}
                className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold transition-colors ${
                  severityFilter === s
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Audit Log Entries */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin my-2">
          {filteredEntries.map((entry) => {
            const isEmergency =
              entry.severity === 'Emergency' || entry.severity === 'Critical';
            const isSensitive = entry.severity === 'Sensitive';

            return (
              <div
                key={entry.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors text-xs font-mono space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{entry.timestamp}</span>
                    </span>

                    <span className="text-slate-600">/</span>

                    <span className="text-slate-200 font-bold">
                      {entry.operator}
                    </span>

                    <span className="text-[10px] px-2 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {entry.role.replace('_', ' ')}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                      isEmergency
                        ? 'bg-red-950 text-red-200 border-red-500/60 animate-pulse'
                        : isSensitive
                        ? 'bg-amber-950 text-amber-200 border-amber-500/60'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    {entry.severity}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">
                      Action Executed:
                    </div>
                    <div className="font-bold text-slate-100 text-sm mt-0.5">
                      {entry.action}
                    </div>
                    <div className="text-cyan-300 text-[11px] mt-0.5">
                      Asset: {entry.targetAsset}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">
                      State Transition:
                    </div>
                    <div className="flex items-center gap-2 text-[11px] mt-0.5 text-slate-300">
                      <span className="line-through text-slate-500">
                        {entry.previousValue}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-emerald-300 font-bold">
                        {entry.newValue}
                      </span>
                    </div>
                    {entry.approvedBy && (
                      <div className="text-[10px] text-slate-400 mt-1">
                        Verified by: <strong className="text-slate-300">{entry.approvedBy}</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-300">
                  <span className="text-slate-500">Reason / Justification: </span>
                  {entry.reason}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <div>Showing {filteredEntries.length} operational records</div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white"
          >
            Close Audit Log
          </button>
        </div>
      </div>
    </div>
  );
};
