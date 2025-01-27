import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const noto_sans = Noto_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Dahao Blog",
	description: "Dahao's Blog",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${noto_sans.className}`}>
				<div className="flex justify-center text-neutral-900 text-sm">
					<div className="min-w-screen max-w-[812px] w-full min-h-screen flex flex-col bg-white">
						<main className="flex-grow p-10">{children}</main>
						<div className="sticky bottom-0 z-10 h-[42px] pb-3 pt-2 flex items-center justify-center bg-white">
							<a
								className="hover:text-neutral-800 hover:font-bold hover:underline"
								href="https://blog.dahaotang.com/"
								// target="_blank"
								// rel="noopener noreferrer"
							>
								&nbsp;Blog Main Page&nbsp;
							</a>
              | Developed by
							<a
								className="hover:text-rose-300"
								href="https://dahaotang.com/"
								// target="_blank"
								// rel="noopener noreferrer"
							>
								&nbsp;Dahao Tang&nbsp;
							</a>
							| 2025
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
