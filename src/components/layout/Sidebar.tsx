"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Terminal, Workflow, Cpu, Server, Settings } from "lucide-react";

const nav = [
	{ href: "/", label: "Dashboard", Icon: Terminal },
	{ href: "#", label: "Gas Towns", Icon: Workflow },
	{ href: "#", label: "Homelab Nodes", Icon: Server },
	{ href: "#", label: "Showcase", Icon: Cpu },
	{ href: "#", label: "Settings", Icon: Settings },
];

export default function Sidebar() {
	return (
		<aside className="sticky top-0 h-screen w-60 shrink-0 border-r border-slate-800 bg-slate-950/80 backdrop-blur flex flex-col">
			<div className="p-4 border-b border-slate-800">
				<span className="font-mono text-sm tracking-widest text-amber-400">GASTOWN</span>
			</div>
			<nav className="flex-1 p-3 space-y-1">
				{nav.map(({ href, label, Icon }) => (
					<Link
						key={label}
						href={href}
						className={cn(
							"flex items-center gap-3 rounded px-3 py-2 text-sm font-mono text-slate-400 transition hover:text-amber-400 hover:bg-slate-900",
							href === "/" && "text-amber-400 bg-slate-900"
						)}
					>
						<Icon size={16} />
						{label}
					</Link>
				))}
			</nav>
			<div className="p-4 border-t border-slate-800 text-xs font-mono text-slate-600">
				Polecat • Toast
			</div>
		</aside>
	);
}
