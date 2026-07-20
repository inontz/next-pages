import Sidebar from "@/components/layout/Sidebar";
import TopHeader from "@/components/layout/TopHeader";
import AgentMeshMonitor from "@/components/widgets/AgentMeshMonitor";
import BeadConvoyLog from "@/components/widgets/BeadConvoyLog";
import HomelabTelemetry from "@/components/widgets/HomelabTelemetry";
import ProjectShowcase from "@/components/widgets/ProjectShowcase";

export default function Home() {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<div className="flex-1 flex flex-col min-h-screen">
				<TopHeader />
				<main className="flex-1 p-6 space-y-6">
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
						<AgentMeshMonitor />
						<BeadConvoyLog />
					</div>
					<HomelabTelemetry />
					<ProjectShowcase />
				</main>
			</div>
		</div>
	);
}
