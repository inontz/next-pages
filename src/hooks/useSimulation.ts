"use client";

import { useEffect, useRef, useState } from "react";
import type { Agent } from "@/types";

export function useFlickerLight() {
	const [on, setOn] = useState(true);
	useEffect(() => {
		const interval = 800 + Math.floor(Math.random() * 1200);
		const id = setInterval(() => setOn((v) => !v), interval);
		return () => clearInterval(id);
	}, []);
	return on;
}

export function useProgressTick(initial = 0, max = 100, intervalMs = 1200) {
	const [value, setValue] = useState(initial);
	useEffect(() => {
		const id = setInterval(() => {
			setValue((v) => {
				const step = Math.floor(Math.random() * 5) + 1;
				return v >= max ? initial : Math.min(v + step, max);
			});
		}, intervalMs);
		return () => clearInterval(id);
	}, [initial, max, intervalMs]);
	return value;
}

export function useCycle<T>(items: T[], interval = 3000) {
	const [idx, setIdx] = useState(0);
	useEffect(() => {
		const id = setInterval(() => setIdx((i) => (i + 1) % items.length), interval);
		return () => clearInterval(id);
	}, [items, interval]);
	return items[idx];
}

export function useAgentCycle(agents: Agent[], intervalMs = 3000) {
	const [idx, setIdx] = useState(0);
	useEffect(() => {
		const id = setInterval(() => setIdx((i) => (i + 1) % agents.length), intervalMs);
		return () => clearInterval(id);
	}, [agents, intervalMs]);
	return agents[idx];
}

export function useBangkokTime() {
	const [time, setTime] = useState(() => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok" }));
	useEffect(() => {
		const id = setInterval(() => {
			setTime(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Bangkok" }));
		}, 1000);
		return () => clearInterval(id);
	}, []);
	return time;
}
