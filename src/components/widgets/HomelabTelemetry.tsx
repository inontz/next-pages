"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useProgressTick, useFlickerLight } from "@/hooks/useSimulation";

const nodes = [
	{ id: "n1", name: "Proxmox", ip: "192.168.1.10" },
	{ id: "n2", name: "Docker", ip: "192.168.1.20" },
	{ id: "n3", name: "NAS", ip: "192.168.1.30" },
];

function MiniChart({ color, name }: { color: string; name: string }) {
	const sanitizedColor = color.replace("#", "");
	const data = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ t: i, v: 20 + Math.random() * 60 })), []);
	return (
		<div className="h-12 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data}>
					<defs>
						<linearGradient id={`grad-${name}-${sanitizedColor}`} x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor={color} stopOpacity={0.4} />
							<stop offset="95%" stopColor={color} stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis hide dataKey="t" />
					<YAxis hide domain={[0, 100]} />
					<Tooltip
						contentStyle={{
							backgroundColor: "#0f172a",
							border: "1px solid #1e293b",
							fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
							fontSize: "10px",
							color: "#e2e8f0",
						}}
						labelStyle={{ color: "#94a3b8" }}
					/>
					<Area type="monotone" dataKey="v" stroke={color} fill={`url(#grad-${name}-${sanitizedColor})`} strokeWidth={1.5} />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

export default function HomelabTelemetry() {
	const cpu = useProgressTick(30, 95, 1200);
	const ram = useProgressTick(40, 90, 1200);
	const net = useProgressTick(20, 80, 1200);
	const indicator = useFlickerLight();

	const cpuColor = cpu > 80 ? "#ef4444" : cpu > 50 ? "#f59e0b" : "#34d399";
	const ramColor = ram > 80 ? "#ef4444" : ram > 50 ? "#f59e0b" : "#34d399";
	const netColor = net > 80 ? "#ef4444" : net > 50 ? "#f59e0b" : "#34d399";

	return (
		<section className="rounded border border-slate-800 bg-slate-900/60 p-4">
			<h2 className="font-mono text-sm tracking-widest text-amber-400 mb-4">HOMELAB NODE TELEMETRY</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{nodes.map((n) => (
					<div key={n.id} className="rounded border border-slate-800 bg-slate-950 p-3">
						<div className="flex items-center justify-between mb-2">
							<div>
								<div className="font-mono text-xs text-slate-300">{n.name}</div>
								<div className="font-mono text-[10px] text-slate-600">{n.ip}</div>
							</div>
							<span className={`inline-block h-2 w-2 rounded-full ${indicator ? "bg-emerald-400" : "bg-slate-600"}`} />
						</div>
						<div className="space-y-2">
							<div>
								<div className="flex justify-between font-mono text-[10px] text-slate-500 mb-0.5">
									<span>CPU</span>
									<span>{Math.round(cpu)}%</span>
								</div>
								<MiniChart color={cpuColor} name="cpu" />
							</div>
							<div>
								<div className="flex justify-between font-mono text-[10px] text-slate-500 mb-0.5">
									<span>RAM</span>
									<span>{Math.round(ram)}%</span>
								</div>
								<MiniChart color={ramColor} name="ram" />
							</div>
							<div>
								<div className="flex justify-between font-mono text-[10px] text-slate-500 mb-0.5">
									<span>NET</span>
									<span>{Math.round(net)}%</span>
								</div>
								<MiniChart color={netColor} name="net" />
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
