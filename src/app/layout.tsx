import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
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
				className={`${geistMono.variable} font-mono antialiased bg-slate-950 text-slate-300 min-h-screen`}
			>
				{children}
			</body>
		</html>
	);
}
