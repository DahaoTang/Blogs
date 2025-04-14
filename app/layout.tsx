import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jbm = JetBrains_Mono({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dahao's Blogs",
  description: "Dahao Tang's Blog Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${jbm.className}`}>
        <div className="min-h-screen flex justify-center bg-green-500">
          <div className="min-w-[400px] max-w-[812px] w-full text-sm text-neutral-900 bg-white">
            {/* <main className="pt-10 xl:pl-30 lg:pl-25 md:pl-20 pl-15 pr-15"> */}
            <main className="p-5">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
