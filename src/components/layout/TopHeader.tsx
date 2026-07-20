"use client";

import { useBangkokTime } from "@/hooks/useSimulation";

export default function TopHeader() {
	const time = useBangkokTime();
	return (
		<header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
			<div className="flex items-center justify-between px-6 py-3">
				<div className="font-mono text-sm text-slate-400">
					BANGKOK <span className="text-amber-400">{time}</span>
				</div>
				<div className="flex items-center gap-6 font-mono text-xs">
					<div className="text-slate-400">
						LLM TOKENS <span className="text-amber-400">1,284,391</span>
					</div>
					<div className="flex items-center gap-2 text-slate-400">
						<span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
						SYSTEM <span className="text-emerald-400">NOMINAL</span>
					</div>
				</div>
			</div>
		</header>
	);
}
