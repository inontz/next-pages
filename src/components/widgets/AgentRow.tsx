"use client";

import { useProgressTick } from "@/hooks/useSimulation";
import type { Agent } from "@/types";
import { Cpu, Server, AlertTriangle } from "lucide-react";

export function AgentRow({ agent }: { agent: Agent }) {
	const max = agent.id.charCodeAt(1) % 10 + 5;
	const progress = useProgressTick(0, max, 1200);

	return (
		<div className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 px-3 py-2">
			<div className="flex items-center gap-2">
				{agent.type === "mayor" && <Cpu size={14} className="text-slate-500" />}
				{agent.type === "polecat" && <Server size={14} className="text-slate-500" />}
				{agent.type === "refinery" && <AlertTriangle size={14} className="text-slate-500" />}
				<span className="font-mono text-xs text-slate-300">{agent.name}</span>
			</div>
			<div className="flex items-center gap-3">
				{agent.type === "polecat" && (
					<div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
						<div className="h-full bg-amber-400 transition-all duration-700" style={{ width: `${Math.min(progress, max)}%` }} />
					</div>
				)}
				<span className={`inline-flex items-center gap-2 font-mono text-xs ${agent.status === "WORKING" ? "text-amber-400" : "text-slate-400"}`}>
					<span className={`inline-block h-2 w-2 rounded-full ${agent.status === "WORKING" ? "bg-amber-400 animate-pulse" : "bg-slate-500"}`} />
					{agent.status}
				</span>
			</div>
		</div>
	);
}
