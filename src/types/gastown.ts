export type TownStatus = 'active' | 'idle' | 'maintenance';

export interface Town {
  id: string;
  name: string;
  status: TownStatus;
  rigs: Rig[];
}

export type RigStatus = string;

export interface Rig {
  id: string;
  name: string;
  gitUrl: string;
  defaultBranch: string;
  status: RigStatus;
  agents: Agent[];
}

export type AgentRole = 'mayor' | 'polecat' | 'refinery' | 'triage';

export type AgentStatus = 'idle' | 'thinking' | 'testing' | 'merging' | 'dispatched' | 'committed';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  status: AgentStatus;
  progress: number;
  currentTask?: string;
}

export type BeadStatus = 'pending' | 'active' | 'dispatched' | 'committed' | 'closed' | 'failed';

export interface Bead {
  id: string;
  title: string;
  description: string;
  status: BeadStatus;
  assignee?: string;
  convoyId?: string;
  createdAt: string;
}

export type ConvoyStatus = string;

export type MergeMode = string;

export interface Convoy {
  id: string;
  title: string;
  mergeMode: MergeMode;
  status: ConvoyStatus;
  beads: Bead[];
  progress: number;
}
