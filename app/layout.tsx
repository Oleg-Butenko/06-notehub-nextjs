import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanstackProvider/TanStackProvider";

export const metadata: Metadata = {
	title: "Notehub",
	description: "Notehub homework GoIT",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<TanStackProvider>
					<Header />
					{children}
					<Footer />
				</TanStackProvider>
			</body>
		</html>
	);
}
