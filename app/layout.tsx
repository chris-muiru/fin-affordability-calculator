import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"
import ParentProvider from "@/app/provider/parent-provider"

export const metadata: Metadata = {
	title: "Affordability Calculator - Fin Africa",
	description:
		"Calculate your loan eligibility with Fin Africa's affordability calculator",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
				<ParentProvider>
					<Suspense fallback={null}>{children}</Suspense>
				</ParentProvider>
			</body>
		</html>
	)
}
