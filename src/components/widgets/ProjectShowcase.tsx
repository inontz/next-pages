"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

const projects = [
	{ name: "gastown-core", tech: ["Rust", "Go"], url: "github.com/rigs/gastown-core", desc: "Multi-agent orchestration runtime" },
	{ name: "toast-dashboard", tech: ["Next.js", "TypeScript"], url: "github.com/toast/toast-dashboard", desc: "Personal homelab control room" },
	{ name: "pipeline-ci", tech: ["Rust", "Docker"], url: "github.com/rigs/pipeline-ci", desc: "Continuous integration runner" },
	{ name: "llm-gateway", tech: ["Go", "WebAssembly"], url: "github.com/toast/llm-gateway", desc: "Local LLM proxy with auth" },
	{ name: "data-lake", tech: ["Python", "ClickHouse"], url: "github.com/toast/data-lake", desc: "Observability and metrics store" },
	{ name: "mesh-router", tech: ["Rust", "QUIC"], url: "github.com/rigs/mesh-router", desc: "Edge mesh networking" },
];

const techColors: Record<string, string> = {
	Rust: "bg-orange-500/20 text-orange-400 border-orange-500/30",
	Go: "bg-sky-500/20 text-sky-400 border-sky-500/30",
	"Next.js": "bg-white/10 text-white border-white/20",
	TypeScript: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	Docker: "bg-sky-500/20 text-sky-400 border-sky-500/30",
	Python: "bg-amber-500/20 text-amber-400 border-amber-500/30",
	ClickHouse: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
	WebAssembly: "bg-purple-500/20 text-purple-400 border-purple-500/30",
	QUIC: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
};

function ProjectCard({ project }: { project: typeof projects[0] }) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		await navigator.clipboard.writeText(project.url);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className="flex flex-col gap-2 rounded border border-slate-800 bg-slate-950 p-3 hover:border-amber-500/30 transition">
			<div className="flex items-center justify-between">
				<span className="font-mono text-xs text-amber-400">{project.name}</span>
				<span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
			</div>
			<p className="font-mono text-[11px] text-slate-500 leading-relaxed">{project.desc}</p>
			<div className="flex flex-wrap gap-1">
				{project.tech.map((t) => (
					<span key={t} className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${techColors[t] || "bg-slate-800 text-slate-400 border-slate-700"}`}>
						{t}
					</span>
				))}
			</div>
			<div className="flex items-center justify-between mt-1">
				<span className="font-mono text-[10px] text-slate-600 truncate mr-2">{project.url}</span>
				<div className="flex items-center gap-1 shrink-0">
					<button
						onClick={copy}
						className="flex items-center gap-1 rounded border border-slate-800 bg-slate-900 px-2 py-1 font-mono text-[10px] text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition"
					>
						{copied ? <Check size={10} /> : <Copy size={10} />}
						{copied ? "COPIED" : "COPY"}
					</button>
					<a
						href={`https://${project.url}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 rounded border border-slate-800 bg-slate-900 px-2 py-1 font-mono text-[10px] text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition"
					>
						<ExternalLink size={10} />
					</a>
				</div>
			</div>
		</div>
	);
}

export default function ProjectShowcase() {
	return (
		<section className="rounded border border-slate-800 bg-slate-900/60 p-4">
			<h2 className="font-mono text-sm tracking-widest text-amber-400 mb-4">PROJECT SHOWCASE</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
				{projects.map((p) => (
					<ProjectCard key={p.name} project={p} />
				))}
			</div>
		</section>
	);
}
