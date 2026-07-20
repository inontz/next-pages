"use client";

import { useState, useEffect } from "react";
import type { Bead, Convoy } from "@/types";
import { useFlicker, useCycle } from "@/hooks/useSimulation";
import { Workflow } from "lucide-react";

const beadStatusColor: Record<string, string> = {
	pending: "bg-slate-500",
	active: "bg-amber-400",
	dispatched: "bg-sky-400",
	committed: "bg-emerald-400",
};

const beads: Bead[] = [
	{ id: "b1", title: "gt: setup routing", status: "committed", convoys: ["c1"] },
	{ id: "b2", title: "gt: refine types", status: "active", convoys: ["c1"] },
	{ id: "b3", title: "gt: add telemetry", status: "dispatched", convoys: ["c2"] },
	{ id: "b4", title: "gt: deploy preview", status: "pending", convoys: ["c2"] },
];

const convoys: Convoy[] = [
	{ id: "c1", beadIds: ["b1", "b2"], status: "moving" },
	{ id: "c2", beadIds: ["b3", "b4"], status: "stalled" },
];

const logs = [
	"ToolCall: readFile(src/hooks/useSimulation.ts)",
	"ToolCall: writeFile(src/components/layout.tsx)",
	"ToolCall: bash(npm run lint)",
	"ToolCall: git commit -m 'chore: add types'",
];

export default function BeadConvoyLog() {
	const [stream, setStream] = useState<string[]>([]);
	const active = useFlicker(500);
	const currentLog = useCycle(logs, 2500);

	useEffect(() => {
		const id = setInterval(() => {
			setStream((prev) => [currentLog, ...prev].slice(0, 6));
		}, 2500);
		return () => clearInterval(id);
	}, [currentLog]);

	return (
		<section className="rounded border border-slate-800 bg-slate-900/60 p-4">
			<h2 className="font-mono text-sm tracking-widest text-amber-400 mb-4">BEAD & CONVOY LOG</h2>
			<div className="space-y-3">
				{convoys.map((c) => (
					<div key={c.id} className="rounded border border-slate-800 bg-slate-950 p-3">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2 font-mono text-xs text-slate-400">
								<Workflow size={14} className="text-slate-500" />
								CONVOY {c.id.toUpperCase()}
							</div>
							<span className={`inline-block h-2 w-2 rounded-full ${c.status === "moving" ? "bg-emerald-400 animate-pulse" : "bg-amber-400 animate-pulse"}`} />
						</div>
						<div className="space-y-1.5">
							{c.beadIds.map((bid) => {
								const bead = beads.find((b) => b.id === bid);
								if (!bead) return null;
								return (
									<div key={bid} className="flex items-center justify-between">
										<span className="font-mono text-xs text-slate-300 truncate mr-3">{bead.title}</span>
										<span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-slate-400`}>
											<span className={`inline-block h-1.5 w-1.5 rounded-full ${beadStatusColor[bead.status]} ${active ? "opacity-100" : "opacity-30"}`} />
											{bead.status}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				))}
			</div>
			<div className="mt-4 rounded border border-slate-800 bg-slate-950 p-3">
				<div className="font-mono text-[10px] text-slate-600 mb-2">LIVE STREAM</div>
				<div className="space-y-1 font-mono text-[11px] text-slate-400">
					{stream.map((line, i) => (
						<div key={i} className={i === 0 ? "text-amber-400" : "text-slate-500"}>
							{line}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
