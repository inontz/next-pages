'use client';

import { useEffect, useRef, useState } from 'react';
import { Workflow, Clock, Terminal } from 'lucide-react';
import { sampleConvoys, sampleBeads } from '@/lib/mockData';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-400',
  active: 'bg-blue-400',
  dispatched: 'bg-purple-400',
  committed: 'bg-green-400',
  failed: 'bg-red-400',
  closed: 'bg-slate-400',
};

const MOCK_LOG_LINES = [
  '> gt_sling dispatched to rig-abc...',
  '> bead #8c2ec733 status: in_progress',
  '> refinery: running quality gates...',
  '> rig-cedar: pulling latest main...',
  '> polecat Maple: processing bead #2...',
  '> convoy-1 progress: 38% complete',
  '> gt_watch: sync checkpoint written',
  '> bead #a3f12c status: committed',
  '> mayor: reviewing PR #42...',
  '> rig-birch: status syncing',
  '> gt_prime: agent mesh refreshed',
  '> triage: awaiting new dispatch...',
  '> bead #77d4e1 status: pending',
  '> rig-maple: build passed',
  '> refinery: merging feature branch',
  '> gt_sling: delivery confirmed',
  '> polecat Cedar: committed to main',
  '> convoy-1: bead 3/8 committed',
  '> gt_checkpoint: state saved',
  '> system: all rigs nominal',
];

export default function BeadConvoyLog() {
  const convoy = sampleConvoys[0];
  const beads = sampleBeads;
  const [logLines, setLogLines] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);
  const lineIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogLines((prev) => {
        const next = [...prev, MOCK_LOG_LINES[lineIndexRef.current % MOCK_LOG_LINES.length]];
        lineIndexRef.current += 1;
        if (next.length > 20) {
          return next.slice(next.length - 20);
        }
        return next;
      });
    }, Math.floor(Math.random() * 2000) + 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logLines]);

  const committedCount = beads.filter((b) => b.status === 'committed').length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-6">
      <div className="flex items-center gap-2 text-slate-200">
        <Workflow className="w-5 h-5 text-amber-400" />
        <h2 className="text-lg font-semibold tracking-tight">Convoy Progress</h2>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-300">{convoy.title}</span>
          <span className="text-slate-400">
            {committedCount}/{beads.length} committed
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${convoy.progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-200">
          <Clock className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-medium tracking-tight">Bead Timeline</h3>
        </div>
        <div className="space-y-2">
          {beads.map((bead) => (
            <div
              key={bead.id}
              className="flex items-start gap-3 bg-slate-800/50 rounded px-3 py-2"
            >
              <div className="flex flex-col items-center gap-1 pt-0.5">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${STATUS_COLORS[bead.status] || 'bg-slate-400'}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-200 truncate">{bead.title}</p>
                <p className="text-xs text-slate-500">{bead.status}</p>
              </div>
              <span className="text-xs text-slate-600 whitespace-nowrap">
                {new Date(bead.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-slate-200">
          <Terminal className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-medium tracking-tight">Streaming Log</h3>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 h-64 overflow-y-auto font-mono text-xs text-green-400 space-y-0.5">
          {logLines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}
