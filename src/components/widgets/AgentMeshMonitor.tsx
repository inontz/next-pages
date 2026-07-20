"use client";

import { useState } from "react";
import type { Town, Rig, Agent } from "@/types/gastown";
import { useFlicker, useProgressTick } from "@/hooks/useSimulation";
import { Cpu, Server, GitBranch, AlertTriangle } from "lucide-react";

const towns: Town[] = [
	{ id: "t1", name: "gastown", status: "active", rigs: [] },
	{ id: "t2", name: "rigs-queue", status: "active", rigs: [] },
	{ id: "t3", name: "refinery", status: "idle", rigs: [] },
];

const rigs: Rig[] = [
	{ id: "r1", name: "toast-rig", gitUrl: "toast/gt-toast", defaultBranch: "main", status: "online", agents: [] },
	{ id: "r2", name: "main-rig", gitUrl: "kilo/core", defaultBranch: "main", status: "idle", agents: [] },
	{ id: "r3", name: "ci-rig", gitUrl: "kilo/pipeline", defaultBranch: "main", status: "syncing", agents: [] },
];

const agents: Agent[] = [
	{ id: "a1", name: "Mayor", role: "mayor", status: "thinking", progress: 0 },
	{ id: "a2", name: "Polecat-Alpha", role: "polecat", status: "thinking", progress: 0 },
	{ id: "a3", name: "Polecat-Beta", role: "polecat", status: "thinking", progress: 0 },
	{ id: "a4", name: "Refinery", role: "refinery", status: "testing", progress: 0 },
	{ id: "a5", name: "Triage", role: "triage", status: "idle", progress: 0 },
];

const statusColor: Record<string, string> = {
	active: "bg-emerald-400",
	idle: "bg-slate-500",
	maintenance: "bg-amber-400",
	online: "bg-emerald-400",
	offline: "bg-slate-600",
	syncing: "bg-sky-400",
	building: "bg-amber-400",
	thinking: "bg-sky-400",
	testing: "bg-amber-400",
	merging: "bg-emerald-400",
	dispatched: "bg-sky-400",
	committed: "bg-emerald-400",
};

function AgentRow({ agent }: { agent: Agent }) {
	const max = 5 + Math.floor(Math.random() * 10);
	const progress = agent.role === "polecat" ? useProgressTick(0, max, 100) : undefined;

	return (
		<div className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 px-3 py-2">
			<div className="flex items-center gap-2">
				{agent.role === "mayor" && <Cpu size={14} className="text-slate-500" />}
				{agent.role === "polecat" && <Server size={14} className="text-slate-500" />}
				{agent.role === "refinery" && <AlertTriangle size={14} className="text-slate-500" />}
				<span className="font-mono text-xs text-slate-300">{agent.name}</span>
			</div>
			<div className="flex items-center gap-3">
				{agent.role === "polecat" && progress !== undefined && (
					<div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
						<div className="h-full bg-amber-400 transition-all duration-700" style={{ width: `${progress}%` }} />
					</div>
				)}
				<span className={`inline-flex items-center gap-2 font-mono text-xs ${agent.status === "thinking" ? "text-amber-400" : "text-slate-400"}`}>
					<span className={`inline-block h-2 w-2 rounded-full ${agent.status === "thinking" ? "bg-amber-400 animate-pulse" : "bg-slate-500"}`} />
					{agent.status}
				</span>
			</div>
		</div>
	);
}

export default function AgentMeshMonitor() {
	const indicator = useFlicker(700);

	return (
		<section className="rounded border border-slate-800 bg-slate-900/60 p-4">
			<h2 className="font-mono text-sm tracking-widest text-amber-400 mb-4">AGENT MESH MONITOR</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<div className="font-mono text-xs text-slate-500 mb-2">TOWNS</div>
					<div className="space-y-2">
						{towns.map((t) => (
							<div key={t.id} className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 px-3 py-2">
								<span className="font-mono text-xs text-slate-300">{t.name}</span>
								<span className="inline-flex items-center gap-2 font-mono text-xs text-slate-400">
									<span className={`inline-block h-2 w-2 rounded-full ${statusColor[t.status]} ${indicator ? "opacity-100" : "opacity-30"}`} />
									{t.status.toUpperCase()}
								</span>
							</div>
						))}
					</div>
				</div>
				<div>
					<div className="font-mono text-xs text-slate-500 mb-2">RIGS</div>
					<div className="space-y-2">
						{rigs.map((r) => (
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
					{agents.map((a) => (
						<AgentRow key={a.id} agent={a} />
					))}
				</div>
			</div>
		</section>
	);
}
