"use client";

import { Server, Cpu, HardDrive, Wifi } from "lucide-react";
import { useProgressTick } from "@/hooks/useSimulation";

const nodes = [
	{ id: "proxmox", name: "Proxmox", Icon: Server },
	{ id: "docker", name: "Docker", Icon: HardDrive },
	{ id: "nas", name: "NAS", Icon: HardDrive },
	{ id: "pihole", name: "Pi-hole", Icon: Wifi },
];

interface MetricBarProps {
	label: string;
	value: number;
	colorClass: string;
	icon: React.ReactNode;
}

function MetricBar({ label, value, colorClass, icon }: MetricBarProps) {
	return (
		<div>
			<div className="flex items-center justify-between mb-1">
				<div className="flex items-center gap-1.5 text-slate-500">
					{icon}
					<span className="font-mono text-[11px]">{label}</span>
				</div>
				<span className="font-mono text-[11px] text-slate-400">{value}%</span>
			</div>
			<div className="h-1.5 w-full rounded-full bg-slate-800">
				<div
					className={`h-full rounded-full ${colorClass} transition-all duration-1000`}
					style={{ width: `${value}%` }}
				/>
			</div>
		</div>
	);
}

export default function HomelabTelemetry() {
	const cpu = useProgressTick(30, 8, 80);
	const ram = useProgressTick(50, 6, 90);
	const net = useProgressTick(15, 7, 60);

	return (
		<section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
			<h2 className="font-mono text-sm tracking-widest text-amber-400 mb-4">
				HOMELAB NODE TELEMETRY
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
				{nodes.map((node) => (
					<div
						key={node.id}
						className="border border-slate-800 rounded-lg p-4 bg-slate-900"
					>
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								<node.Icon className="h-4 w-4 text-slate-500" />
								<span className="font-mono text-sm text-slate-300">
									{node.name}
								</span>
							</div>
							<span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
						</div>
						<div className="space-y-3">
							<MetricBar
								label="CPU"
								value={cpu}
								colorClass="bg-amber-500"
								icon={<Cpu className="h-3 w-3" />}
							/>
							<MetricBar
								label="RAM"
								value={ram}
								colorClass="bg-blue-500"
								icon={<HardDrive className="h-3 w-3" />}
							/>
							<MetricBar
								label="Network I/O"
								value={net}
								colorClass="bg-emerald-500"
								icon={<Wifi className="h-3 w-3" />}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
