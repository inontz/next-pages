'use client';

import { useState, useEffect, useRef } from 'react';
import type { Agent } from '@/types/gastown';

const STATUS_CYCLE: Agent['status'][] = ['idle', 'thinking', 'testing', 'merging', 'dispatched', 'committed'];

export function useFlickerLight(): boolean {
  const [isOn, setIsOn] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function scheduleNext() {
      const delay = Math.floor(Math.random() * 1200) + 800;
      timeoutRef.current = setTimeout(() => {
        setIsOn((prev) => !prev);
        scheduleNext();
      }, delay);
    }

    scheduleNext();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return isOn;
}

export function useProgressTick(initial: number, max: number, intervalMs: number): number {
  const [progress, setProgress] = useState(initial);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 5) + 1;
        return Math.min(prev + increment, max);
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [max, intervalMs]);

  return progress;
}

export function useAgentCycle(agents: Agent[], intervalMs: number): Agent[] {
  const [cycledAgents, setCycledAgents] = useState<Agent[]>(agents);
  const indexRef = useRef(0);
  const statusIndexRef = useRef<number[]>(agents.map(() => 0));

  useEffect(() => {
    setCycledAgents(agents);
    indexRef.current = 0;
    statusIndexRef.current = agents.map(() => 0);
  }, [agents]);

  useEffect(() => {
    if (agents.length === 0) return;

    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % agents.length;
      const targetIndex = indexRef.current;
      statusIndexRef.current[targetIndex] = (statusIndexRef.current[targetIndex] + 1) % STATUS_CYCLE.length;
      const newStatus = STATUS_CYCLE[statusIndexRef.current[targetIndex]];
      setCycledAgents((prev) =>
        prev.map((agent, idx) =>
          idx === targetIndex
            ? {
                ...agent,
                status: newStatus,
                progress: Math.min(Math.max(agent.progress + Math.floor(Math.random() * 20) - 5, 0), 100),
              }
            : agent
        )
      );
    }, intervalMs);

    return () => clearInterval(interval);
  }, [agents, intervalMs]);

  return cycledAgents;
}
