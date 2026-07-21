"use client";

import { useState } from "react";
import type { Town, Rig, Agent } from "@/types";
import { useFlicker, useProgressTick } from "@/hooks/useSimulation";
import { Cpu, Server, GitBranch, AlertTriangle } from "lucide-react";

const towns: Town[] = [
	{ id: "t1", name: "gastown", status: "active", rigs: [], updatedAt: "2026-07-20T20:00:00Z" },
	{ id: "t2", name: "rigs-queue", status: "active", rigs: [], updatedAt: "2026-07-20T20:00:00Z" },
	{ id: "t3", name: "refinery", status: "maintenance", rigs: [], updatedAt: "2026-07-20T20:00:00Z" },
];

const rigs: Rig[] = [
	{ id: "r1", name: "toast-rig", gitUrl: "toast/gt-toast", defaultBranch: "main", status: "online", agents: [], updatedAt: "2026-07-20T20:00:00Z" },
	{ id: "r2", name: "main-rig", gitUrl: "kilo/core", defaultBranch: "main", status: "idle", agents: [], updatedAt: "2026-07-20T20:00:00Z" },
	{ id: "r3", name: "ci-rig", gitUrl: "kilo/pipeline", defaultBranch: "main", status: "syncing", agents: [], updatedAt: "2026-07-20T20:00:00Z" },
];

const agents: Agent[] = [
	{ id: "a1", role: "mayor", name: "Mayor", status: "thinking", progress: 0, updatedAt: "2026-07-20T20:00:00Z" },
	{ id: "a2", role: "polecat", name: "Polecat-Alpha", status: "thinking", progress: 0, updatedAt: "2026-07-20T20:00:00Z" },
	{ id: "a3", role: "polecat", name: "Polecat-Beta", status: "thinking", progress: 0, updatedAt: "2026-07-20T20:00:00Z" },
	{ id: "a4", role: "refinery", name: "Refinery", status: "testing", progress: 0, updatedAt: "2026-07-20T20:00:00Z" },
	{ id: "a5", role: "triage", name: "Triage", status: "idle", progress: 0, updatedAt: "2026-07-20T20:00:00Z" },
];

const statusColor: Record<string, string> = {
	online: "bg-emerald-400",
	offline: "bg-slate-600",
	syncing: "bg-amber-400",
	active: "bg-emerald-400",
	idle: "bg-slate-500",
	maintenance: "bg-amber-400",
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
				<span className={`inline-flex items-center gap-2 font-mono text-xs ${agent.status === "thinking" || agent.status === "testing" ? "text-amber-400" : "text-slate-400"}`}>
					<span className={`inline-block h-2 w-2 rounded-full ${agent.status === "thinking" || agent.status === "testing" ? "bg-amber-400 animate-pulse" : "bg-slate-500"}`} />
					{agent.status.toUpperCase()}
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
