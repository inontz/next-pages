"use client";

import { useState } from "react";
import type { Town, Rig, Agent } from "@/types";
import { useFlicker, useProgressTick } from "@/hooks/useSimulation";
import { Cpu, Server, GitBranch, AlertTriangle } from "lucide-react";

const towns: Town[] = [
	{ id: "t1", name: "gastown", status: "online" },
	{ id: "t2", name: "rigs-queue", status: "online" },
	{ id: "t3", name: "refinery", status: "degraded" },
];

const rigs: Rig[] = [
	{ id: "r1", name: "toast-rig", repo: "toast/gt-toast", status: "active" },
	{ id: "r2", name: "main-rig", repo: "kilo/core", status: "idle" },
	{ id: "r3", name: "ci-rig", repo: "kilo/pipeline", status: "error" },
];

const agents: Agent[] = [
	{ id: "a1", type: "mayor", name: "Mayor", status: "THINKING" },
	{ id: "a2", type: "polecat", name: "Polecat-Alpha", status: "WORKING", progress: 0 },
	{ id: "a3", type: "polecat", name: "Polecat-Beta", status: "WORKING", progress: 0 },
	{ id: "a4", type: "refinery", name: "Refinery", status: "TESTING" },
	{ id: "a5", type: "triage", name: "Triage", status: "IDLE" },
];

const statusColor: Record<string, string> = {
	online: "bg-emerald-400",
	offline: "bg-slate-600",
	degraded: "bg-amber-400",
	active: "bg-emerald-400",
	idle: "bg-slate-500",
	error: "bg-red-500",
};

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
					{agents.map((a) => {
						const progress = a.type === "polecat" ? useProgressTick(0, 5 + Math.floor(Math.random() * 10), 100) : undefined;
						return (
							<div key={a.id} className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 px-3 py-2">
								<div className="flex items-center gap-2">
									{a.type === "mayor" && <Cpu size={14} className="text-slate-500" />}
									{a.type === "polecat" && <Server size={14} className="text-slate-500" />}
									{a.type === "refinery" && <AlertTriangle size={14} className="text-slate-500" />}
									<span className="font-mono text-xs text-slate-300">{a.name}</span>
								</div>
								<div className="flex items-center gap-3">
									{a.type === "polecat" && progress !== undefined && (
										<div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
											<div className="h-full bg-amber-400 transition-all duration-700" style={{ width: `${progress}%` }} />
										</div>
									)}
									<span className={`inline-flex items-center gap-2 font-mono text-xs ${a.status === "WORKING" ? "text-amber-400" : "text-slate-400"}`}>
										<span className={`inline-block h-2 w-2 rounded-full ${a.status === "WORKING" ? "bg-amber-400 animate-pulse" : "bg-slate-500"}`} />
										{a.status}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
