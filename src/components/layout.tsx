import Sidebar from "./layout/Sidebar";
import TopHeader from "./layout/TopHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<div className="flex-1 flex flex-col min-h-screen overflow-hidden">
				<TopHeader />
				<main className="flex-1 overflow-y-auto">{children}</main>
			</div>
		</div>
	);
}
