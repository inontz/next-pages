import type { Town, Rig, Agent, Bead, Convoy } from '@/types';

export const sampleTowns: Town[] = [
  {
    id: 'town-1',
    name: 'Gastown',
    status: 'active',
    rigs: [],
    updatedAt: '2026-07-20T20:00:00Z',
  },
  {
    id: 'town-2',
    name: 'Hastings',
    status: 'active',
    rigs: [],
    updatedAt: '2026-07-20T20:00:00Z',
  },
  {
    id: 'town-3',
    name: 'Coal Harbour',
    status: 'idle',
    rigs: [],
    updatedAt: '2026-07-20T20:00:00Z',
  },
  {
    id: 'town-4',
    name: 'Yaletown',
    status: 'maintenance',
    rigs: [],
    updatedAt: '2026-07-20T20:00:00Z',
  },
];

export const sampleRigs: Rig[] = [
  {
    id: 'rig-1',
    name: 'rig-maple',
    gitUrl: 'https://github.com/convoy/personal-dashboard-control-room',
    defaultBranch: 'main',
    status: 'online',
    agents: [],
    updatedAt: '2026-07-20T20:00:00Z',
  },
  {
    id: 'rig-2',
    name: 'rig-cedar',
    gitUrl: 'https://github.com/convoy/api-gateway',
    defaultBranch: 'main',
    status: 'building',
    agents: [],
    updatedAt: '2026-07-20T20:00:00Z',
  },
  {
    id: 'rig-3',
    name: 'rig-birch',
    gitUrl: 'https://github.com/convoy/auth-service',
    defaultBranch: 'develop',
    status: 'syncing',
    agents: [],
    updatedAt: '2026-07-20T20:00:00Z',
  },
];

export const sampleAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Mayor',
    role: 'mayor',
    status: 'thinking',
    progress: 72,
    currentTask: 'Coordinating convoy dispatch',
    updatedAt: '2026-07-20T20:00:00Z',
  },
  {
    id: 'agent-2',
    name: 'Maple',
    role: 'polecat',
    status: 'dispatched',
    progress: 45,
    currentTask: 'Building mock data hooks',
    updatedAt: '2026-07-20T20:00:00Z',
  },
  {
    id: 'agent-3',
    name: 'Cedar',
    role: 'polecat',
    status: 'committed',
    progress: 100,
    currentTask: 'Layout shell complete',
    updatedAt: '2026-07-20T20:00:00Z',
  },
  {
    id: 'agent-4',
    name: 'Refinery',
    role: 'refinery',
    status: 'testing',
    progress: 88,
    currentTask: 'Running CI checks',
    updatedAt: '2026-07-20T20:00:00Z',
  },
  {
    id: 'agent-5',
    name: 'Triage',
    role: 'triage',
    status: 'idle',
    progress: 0,
    currentTask: 'Awaiting dispatch',
    updatedAt: '2026-07-20T20:00:00Z',
  },
];

export const sampleBeads: Bead[] = [
  {
    id: 'bead-1',
    title: 'Install dashboard dependencies',
    description: 'Install lucide-react, recharts, date-fns',
    status: 'committed',
    assignee: 'Cedar',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:00Z',
    updatedAt: '2026-07-19T20:01:00Z',
  },
  {
    id: 'bead-2',
    title: 'Create mock data and simulation hooks',
    description: 'Create src/lib/mockData.ts and src/hooks/useSimulation.ts',
    status: 'active',
    assignee: 'Maple',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:10Z',
    updatedAt: '2026-07-19T20:01:10Z',
  },
  {
    id: 'bead-3',
    title: 'Build core dashboard layout',
    description: 'Create layout shell with sidebar and metric header',
    status: 'pending',
    assignee: 'Birch',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:20Z',
    updatedAt: '2026-07-19T20:01:20Z',
  },
  {
    id: 'bead-4',
    title: 'Build Agent Mesh Monitor widget',
    description: 'Create AgentMeshMonitor.tsx component',
    status: 'dispatched',
    assignee: 'Maple',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:30Z',
    updatedAt: '2026-07-19T20:01:30Z',
  },
  {
    id: 'bead-5',
    title: 'Build Homelab Telemetry widget',
    description: 'Create HomelabTelemetry.tsx with recharts',
    status: 'pending',
    convoyId: 'convoy-1',
    createdAt: '2026-07-19T20:01:40Z',
    updatedAt: '2026-07-19T20:01:40Z',
  },
];

export const sampleConvoys: Convoy[] = [
  {
    id: 'convoy-1',
    title: 'Personal Dashboard Control Room',
    mergeMode: 'squash',
    status: 'in_progress',
    beads: sampleBeads,
    progress: 38,
    updatedAt: '2026-07-20T20:00:00Z',
  },
  {
    id: 'convoy-2',
    title: 'Auth Service Refactor',
    mergeMode: 'auto',
    status: 'open',
    beads: [],
    progress: 0,
    updatedAt: '2026-07-20T20:00:00Z',
  },
];

export interface HomelabNode {
  id: string;
  name: string;
  type: 'proxmox' | 'docker' | 'nas';
  cpu: number;
  ram: number;
  network: number;
}

export const homelabNodes: HomelabNode[] = [
  { id: 'node-1', name: 'proxmox-main', type: 'proxmox', cpu: 34, ram: 62, network: 45 },
  { id: 'node-2', name: 'docker-worker-1', type: 'docker', cpu: 78, ram: 81, network: 92 },
  { id: 'node-3', name: 'docker-worker-2', type: 'docker', cpu: 12, ram: 44, network: 23 },
  { id: 'node-4', name: 'nas-storage', type: 'nas', cpu: 8, ram: 55, network: 67 },
  { id: 'node-5', name: 'proxmox-dev', type: 'proxmox', cpu: 91, ram: 88, network: 15 },
];

export interface PersonalProject {
  id: string;
  name: string;
  description: string;
  tech: string[];
  repoUrl: string;
  status: 'active' | 'archived' | 'planning';
}

export const personalProjects: PersonalProject[] = [
  {
    id: 'proj-1',
    name: 'gastown',
    description: 'Distributed agent orchestration framework for personal infrastructure',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL'],
    repoUrl: 'https://github.com/convoy/gastown',
    status: 'active',
  },
  {
    id: 'proj-2',
    name: 'dashboard-control-room',
    description: 'Real-time command center for monitoring agent mesh and homelab telemetry',
    tech: ['Next.js', 'Tailwind CSS', 'Recharts'],
    repoUrl: 'https://github.com/convoy/dashboard-control-room',
    status: 'active',
  },
  {
    id: 'proj-3',
    name: 'homelab-automation',
    description: 'Ansible playbooks and Terraform modules for homelab provisioning',
    tech: ['Ansible', 'Terraform', 'Proxmox VE'],
    repoUrl: 'https://github.com/convoy/homelab-automation',
    status: 'active',
  },
  {
    id: 'proj-4',
    name: 'llm-cost-tracker',
    description: 'Track and analyze LLM API spend across providers and projects',
    tech: ['Python', 'FastAPI', 'SQLite'],
    repoUrl: 'https://github.com/convoy/llm-cost-tracker',
    status: 'planning',
  },
  {
    id: 'proj-5',
    name: 'media-pipeline',
    description: 'Automated media server stack with Radarr, Sonarr, and transcoding',
    tech: ['Docker', 'NVIDIA CUDA', 'Plex'],
    repoUrl: 'https://github.com/convoy/media-pipeline',
    status: 'archived',
  },
];
