'use client';

import { Globe, GitBranch, User, Wrench, FlaskConical, AlertTriangle } from 'lucide-react';
import { mockTowns, mockRigs, mockAgents } from '@/lib/mock-data';
import { useFlicker, useProgressTick } from '@/hooks/useSimulation';

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  idle: 'bg-yellow-500',
  error: 'bg-red-500',
  online: 'bg-green-500',
  building: 'bg-yellow-500',
  syncing: 'bg-blue-500',
  offline: 'bg-red-500',
};

function truncateGitUrl(url: string): string {
  const withoutProtocol = url.replace(/^https?:\/\//, '');
  const parts = withoutProtocol.split('/');
  if (parts.length <= 2) return url;
  return parts.slice(0, 2).join('/') + '/...';
}

function formatLastSync(status: string): string {
  const now = new Date();
  const offsets: Record<string, number> = {
    online: 2,
    building: 30,
    syncing: 15,
    offline: 300,
  };
  const mins = offsets[status] ?? 60;
  const d = new Date(now.getTime() - mins * 60 * 1000);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function AgentMeshMonitor() {
  const flickerOn = useFlicker();
  const polecatProgress = useProgressTick(0, 100, 1500);

  const towns = mockTowns;
  const rigs = mockRigs;
  const agents = mockAgents;

  const mayor = agents.find((a) => a.role === 'mayor');
  const polecats = agents.filter((a) => a.role === 'polecat');
  const refinery = agents.find((a) => a.role === 'refinery');
  const triageAgents = agents.filter((a) => a.role === 'triage');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-6">
      <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
        <Globe className="w-5 h-5 text-amber-500" />
        Gas Town Agent Mesh Monitor
      </h2>

      <section>
        <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">Towns</h3>
        <div className="space-y-2">
          {towns.map((town) => {
            const townRigs = rigs.filter((r) => r.name.startsWith(town.name.toLowerCase().replace(' ', '-')) || rigs.length > 0);
            const agentCount = agents.filter((a) => {
              if (town.name === 'Gastown') return true;
              if (town.name === 'Hastings') return a.name === 'Cedar';
              if (town.name === 'Coal Harbour') return a.name === 'Willow';
              return false;
            }).length;
            return (
              <div key={town.id} className="flex items-center justify-between bg-slate-800/50 rounded px-3 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${statusColors[town.status] ?? 'bg-gray-500'}`} />
                  <span className="text-slate-200">{town.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{agentCount} agents</span>
                  <span>{townRigs.length} rigs</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">Rigs</h3>
        <div className="space-y-2">
          {rigs.map((rig) => (
            <div key={rig.id} className="flex items-center justify-between bg-slate-800/50 rounded px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-slate-500" />
                <span className="text-slate-200">{rig.name}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="truncate max-w-[180px]">{truncateGitUrl(rig.gitUrl)}</span>
                <span className="capitalize">{rig.status}</span>
                <span>{formatLastSync(rig.status)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Agents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mayor && (
            <div className="bg-slate-800/50 rounded p-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">{mayor.name}</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                {flickerOn && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
                <span className="text-xs font-medium uppercase tracking-wider text-amber-400">
                  {mayor.status === 'thinking' ? 'THINKING' : 'IDLE'}
                </span>
              </div>
            </div>
          )}

          {polecats.map((agent, idx) => {
            const prog = polecatProgress + idx * 10;
            const clamped = Math.min(Math.max(prog % 100, 0), 100);
            return (
              <div key={agent.id} className="bg-slate-800/50 rounded p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">{agent.name}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${clamped}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 truncate">{agent.currentTask}</p>
              </div>
            );
          })}

          {refinery && (
            <div className="bg-slate-800/50 rounded p-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">{refinery.name}</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="relative w-4 h-4">
                  <FlaskConical className="w-4 h-4 text-amber-500 animate-spin" />
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-amber-400">
                  {refinery.status === 'testing' ? 'TESTING' : 'MERGING'}
                </span>
              </div>
            </div>
          )}

          {triageAgents.map((agent) => (
            <div key={agent.id} className="bg-slate-800/50 rounded p-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-sm text-slate-300">{agent.name}</span>
                <p className="text-xs text-slate-500">{agent.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
