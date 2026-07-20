"use client";

import { useEffect, useRef, useState } from "react";

export function useFlicker(speed = 800) {
	const [on, setOn] = useState(true);
	useEffect(() => {
		const id = setInterval(() => setOn((v) => !v), speed);
		return () => clearInterval(id);
	}, [speed]);
	return on;
}

export function useProgressTick(initial = 0, step = 5, max = 100) {
	const [value, setValue] = useState(initial);
	useEffect(() => {
		const id = setInterval(() => {
			setValue((v) => (v >= max ? initial : v + step));
		}, 1200);
		return () => clearInterval(id);
	}, [initial, step, max]);
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
