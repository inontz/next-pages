"use client";

import { useMemo } from "react";
import type { Town, Rig, Agent } from "@/types/gastown";
import { sampleTowns, sampleRigs, sampleAgents } from "@/lib/mockData";
import { useFlicker, useProgressTick } from "@/hooks/useSimulation";
import { Server, GitBranch, AlertTriangle, Cpu } from "lucide-react";

const roleIcons: Record<string, React.ReactNode> = {
  mayor: <Cpu size={14} className="text-slate-500" />,
  polecat: <Server size={14} className="text-slate-500" />,
  refinery: <AlertTriangle size={14} className="text-slate-500" />,
  triage: <AlertTriangle size={14} className="text-slate-500" />,
};

const townSlugMap: Record<string, string> = {
  gastown: "rig-maple",
  hastings: "rig-cedar",
  "coal-harbour": "rig-birch",
  yaletown: "rig-maple",
};

const townAgentMap: Record<string, string[]> = {
  gastown: ["Mayor", "Maple"],
  hastings: ["Cedar"],
  "coal-harbour": ["Refinery"],
  yaletown: ["Triage"],
};

const statusColor: Record<string, string> = {
  online: "bg-emerald-400",
  offline: "bg-slate-600",
  degraded: "bg-amber-400",
  active: "bg-emerald-400",
  idle: "bg-slate-500",
  error: "bg-red-500",
  syncing: "bg-amber-400",
  building: "bg-blue-400",
};

function AgentRow({ agent }: { agent: Agent }) {
  const progress = agent.role === "polecat" ? useProgressTick(0, 5, 100) : undefined;

  return (
    <div className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 px-3 py-2">
      <div className="flex items-center gap-2">
        {roleIcons[agent.role]}
        <span className="font-mono text-xs text-slate-300">{agent.name}</span>
      </div>
      <div className="flex items-center gap-3">
        {agent.role === "polecat" && progress !== undefined && (
          <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-amber-400 transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        )}
        <span className={`inline-flex items-center gap-2 font-mono text-xs ${agent.status === "dispatched" || agent.status === "thinking" || agent.status === "testing" ? "text-amber-400" : "text-slate-400"}`}>
          <span className={`inline-block h-2 w-2 rounded-full ${agent.status === "dispatched" || agent.status === "thinking" || agent.status === "testing" ? "bg-amber-400 animate-pulse" : "bg-slate-500"}`} />
          {agent.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

export default function AgentMeshMonitor() {
  const indicator = useFlicker(700);

  const towns = useMemo(() => sampleTowns, []);
  const allRigs = useMemo(() => sampleRigs, []);
  const allAgents = useMemo(() => sampleAgents, []);

  return (
    <section className="rounded border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="font-mono text-sm tracking-widest text-amber-400 mb-4">AGENT MESH MONITOR</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="font-mono text-xs text-slate-500 mb-2">TOWNS</div>
          <div className="space-y-2">
            {towns.map((t) => {
              const slug = t.name.toLowerCase().replace(/\s+/g, "-");
              const townRigs = allRigs.filter((r) => r.name.startsWith(slug));
              const agentNames = townAgentMap[slug] || [];
              const townAgents = allAgents.filter((a) => agentNames.includes(a.name));

              return (
                <div key={t.id} className="rounded border border-slate-800 bg-slate-950 px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-slate-300">{t.name}</span>
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-slate-400">
                      <span className={`inline-block h-2 w-2 rounded-full ${statusColor[t.status]} ${indicator ? "opacity-100" : "opacity-30"}`} />
                      {t.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <GitBranch size={12} className="text-slate-600" />
                    <span className="font-mono text-[10px] text-slate-500">
                      {townRigs.length > 0 ? townRigs.map((r) => r.name).join(", ") : "no rigs"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server size={12} className="text-slate-600" />
                    <span className="font-mono text-[10px] text-slate-500">
                      {townAgents.length} agent{townAgents.length !== 1 ? "s" : ""}: {townAgents.map((a) => a.name).join(", ") || "none"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="font-mono text-xs text-slate-500 mb-2">RIGS</div>
          <div className="space-y-2">
            {allRigs.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 px-3 py-2">
                <div className="flex items-center gap-2">
                  <GitBranch size={14} className="text-slate-500" />
                  <div className="font-mono text-xs text-slate-300">{r.name}</div>
                </div>
                <span className={`inline-flex items-center gap-2 font-mono text-xs text-slate-400`}>
                  <span className={`inline-block h-2 w-2 rounded-full ${statusColor[r.status]} ${indicator ? "opacity-100" : "opacity-30"}`} />
                  {r.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="font-mono text-xs text-slate-500 mb-2">AGENTS</div>
        <div className="space-y-2">
          {allAgents.map((a) => (
            <AgentRow key={a.id} agent={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
