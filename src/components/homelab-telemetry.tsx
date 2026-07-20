'use client';

import { Server, Cpu, HardDrive, Wifi } from 'lucide-react';
import { useProgressTick } from '@/hooks/useSimulation';

interface MetricBarProps {
  label: string;
  min: number;
  step: number;
  max: number;
  color: string;
}

function MetricBar({ label, min, step, max, color }: MetricBarProps) {
  const progress = useProgressTick(min, step, max);

  return (
    <div>
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-1000`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

interface NodeCardProps {
  name: string;
  icon: React.ReactNode;
  cpuMin: number;
  cpuStep: number;
  cpuMax: number;
  ramMin: number;
  ramStep: number;
  ramMax: number;
  netMin: number;
  netStep: number;
  netMax: number;
}

function NodeCard({
  name,
  icon,
  cpuMin,
  cpuStep,
  cpuMax,
  ramMin,
  ramStep,
  ramMax,
  netMin,
  netStep,
  netMax,
}: NodeCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-slate-400">{icon}</span>
        <h3 className="text-slate-200 font-medium text-sm">{name}</h3>
        <span className="ml-auto w-2 h-2 rounded-full bg-green-500" title="online" />
      </div>
      <div className="space-y-3">
        <MetricBar label="CPU" min={cpuMin} step={cpuStep} max={cpuMax} color="bg-amber-500" />
        <MetricBar label="RAM" min={ramMin} step={ramStep} max={ramMax} color="bg-blue-500" />
        <MetricBar label="Network I/O" min={netMin} step={netStep} max={netMax} color="bg-green-500" />
      </div>
    </div>
  );
}

const mockNodes: Omit<NodeCardProps, 'key'>[] = [
  { name: 'Proxmox', icon: <Server className="w-4 h-4" />, cpuMin: 20, cpuStep: 8, cpuMax: 80, ramMin: 40, ramStep: 5, ramMax: 90, netMin: 5, netStep: 10, netMax: 60 },
  { name: 'Docker', icon: <Cpu className="w-4 h-4" />, cpuMin: 20, cpuStep: 8, cpuMax: 80, ramMin: 40, ramStep: 5, ramMax: 90, netMin: 5, netStep: 10, netMax: 60 },
  { name: 'NAS', icon: <HardDrive className="w-4 h-4" />, cpuMin: 20, cpuStep: 8, cpuMax: 80, ramMin: 40, ramStep: 5, ramMax: 90, netMin: 5, netStep: 10, netMax: 60 },
  { name: 'Pi-hole', icon: <Wifi className="w-4 h-4" />, cpuMin: 20, cpuStep: 8, cpuMax: 80, ramMin: 40, ramStep: 5, ramMax: 90, netMin: 5, netStep: 10, netMax: 60 },
];

export default function HomelabNodeGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {mockNodes.map((node) => (
        <NodeCard key={node.name} {...node} />
      ))}
    </div>
  );
}