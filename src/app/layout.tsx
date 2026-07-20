import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Layout from "@/components/layout";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Gastown Dashboard",
	description: "Personal homelab and Gas Town control room",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${jetbrainsMono.variable} ${jetbrainsMono.className} antialiased bg-slate-950 text-slate-300 min-h-screen`}
			>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
