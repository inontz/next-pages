'use client';

import { useState, useEffect } from 'react';
import type { Town, Rig, Agent, Bead, Convoy } from '@/types/gastown';

export const mockTowns: Town[] = [
  {
    id: 'town-1',
    name: 'Gastown',
    status: 'active',
    rigs: [],
  },
  {
    id: 'town-2',
    name: 'Hastings',
    status: 'active',
    rigs: [],
  },
  {
    id: 'town-3',
    name: 'Coal Harbour',
    status: 'idle',
    rigs: [],
  },
];

export const mockRigs: Rig[] = [
  {
    id: 'rig-1',
    name: 'rig-maple',
    gitUrl: 'https://github.com/convoy/personal-dashboard-control-room',
    defaultBranch: 'main',
    status: 'online',
    agents: [],
  },
  {
    id: 'rig-2',
    name: 'rig-cedar',
    gitUrl: 'https://github.com/convoy/api-gateway',
    defaultBranch: 'main',
    status: 'building',
    agents: [],
  },
  {
    id: 'rig-3',
    name: 'rig-birch',
    gitUrl: 'https://github.com/convoy/auth-service',
    defaultBranch: 'develop',
    status: 'syncing',
    agents: [],
  },
  {
    id: 'rig-4',
    name: 'rig-willow',
    gitUrl: 'https://github.com/convoy/data-pipeline',
    defaultBranch: 'main',
    status: 'online',
    agents: [],
  },
];

export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Mayor',
    role: 'mayor',
    status: 'thinking',
    progress: 72,
    currentTask: 'Coordinating convoy dispatch',
  },
  {
    id: 'agent-2',
    name: 'Maple',
    role: 'polecat',
    status: 'dispatched',
    progress: 45,
    currentTask: 'Building mock data hooks',
  },
  {
    id: 'agent-3',
    name: 'Cedar',
    role: 'polecat',
    status: 'committed',
    progress: 100,
    currentTask: 'Layout shell complete',
  },
  {
    id: 'agent-4',
    name: 'Refinery',
    role: 'refinery',
    status: 'testing',
    progress: 88,
    currentTask: 'Running CI checks',
  },
  {
    id: 'agent-5',
    name: 'Triage',
    role: 'triage',
    status: 'idle',
    progress: 0,
    currentTask: 'Awaiting dispatch',
  },
  {
    id: 'agent-6',
    name: 'Willow',
    role: 'polecat',
    status: 'thinking',
    progress: 60,
    currentTask: 'Writing component tests',
  },
];

export const mockBeads: Bead[] = [
  {
    id: 'bead-1',
    title: 'Install dashboard dependencies',
    description: 'Install lucide-react, recharts, date-fns',
    status: 'committed',
    assignee: 'Cedar',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:00Z',
  },
  {
    id: 'bead-2',
    title: 'Create mock data and simulation hooks',
    description: 'Create src/lib/mock-data.ts and src/hooks/useSimulation.ts',
    status: 'active',
    assignee: 'Maple',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:10Z',
  },
  {
    id: 'bead-3',
    title: 'Build core dashboard layout',
    description: 'Create layout shell with sidebar and metric header',
    status: 'pending',
    assignee: 'Birch',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:20Z',
  },
  {
    id: 'bead-4',
    title: 'Build Agent Mesh Monitor widget',
    description: 'Create AgentMeshMonitor.tsx component',
    status: 'dispatched',
    assignee: 'Maple',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:30Z',
  },
  {
    id: 'bead-5',
    title: 'Build Homelab Telemetry widget',
    description: 'Create HomelabTelemetry.tsx with recharts',
    status: 'pending',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:40Z',
  },
  {
    id: 'bead-6',
    title: 'Build Bead & Convoy Log widget',
    description: 'Create BeadConvoyLog.tsx with streaming terminal',
    status: 'pending',
    assignee: 'Willow',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:50Z',
  },
  {
    id: 'bead-7',
    title: 'Wire dashboard page',
    description: 'Assemble all widgets in src/app/page.tsx',
    status: 'failed',
    assignee: 'Birch',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:02:00Z',
  },
  {
    id: 'bead-8',
    title: 'Run quality gates',
    description: 'Typecheck, lint, and build verification',
    status: 'active',
    assignee: 'Refinery',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:02:10Z',
  },
];

export const mockConvoys: Convoy[] = [
  {
    id: 'convoy-1',
    title: 'Personal Dashboard Control Room',
    mergeMode: 'squash',
    status: 'in_progress',
    beads: mockBeads,
    progress: 38,
  },
  {
    id: 'convoy-2',
    title: 'Auth Service Refactor',
    mergeMode: 'auto',
    status: 'open',
    beads: [],
    progress: 0,
  },
];
