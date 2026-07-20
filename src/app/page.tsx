import TopHeader from "@/components/layout/TopHeader";
import AgentMeshMonitor from "@/components/widgets/AgentMeshMonitor";
import BeadConvoyLog from "@/components/widgets/BeadConvoyLog";
import HomelabTelemetry from "@/components/widgets/HomelabTelemetry";

export default function Home() {
	return (
		<div className="p-4 space-y-4">
			<TopHeader />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="lg:col-span-2">
					<AgentMeshMonitor />
				</div>
				<BeadConvoyLog />
				<HomelabTelemetry />
			</div>
		</div>
	);
}
