import { useState, useEffect, useRef } from 'react';

export function useIndicatorLight() {
  const [isOn, setIsOn] = useState(true);
  const [isFlickering, setIsFlickering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function scheduleNextFlicker() {
      const delay = Math.floor(Math.random() * 600) + 200;
      intervalRef.current = setTimeout(() => {
        setIsFlickering(true);
        setTimeout(() => {
          setIsFlickering(false);
          scheduleNextFlicker();
        }, 80 + Math.random() * 120);
      }, delay);
    }

    scheduleNextFlicker();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return { isOn, isFlickering };
}

export function useProgressTicker(initial: number, max: number, intervalMs: number = 1000) {
  const [progress, setProgress] = useState(initial);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= max) return prev;
        const increment = Math.floor(Math.random() * 5) + 1;
        return Math.min(prev + increment, max);
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [max, intervalMs]);

  return progress;
}

export function useAgentSubTaskCycle(subTasks: string[], intervalMs: number = 2000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (subTasks.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % subTasks.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [subTasks, intervalMs]);

  return subTasks[index] ?? '';
}
