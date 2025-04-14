import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
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
      <body className={`${noto_sans.className}`}>
        <div className="min-h-screen flex justify-center">
          <div className="min-w-[400px] max-w-[812px] w-full text-sm text-neutral-900 bg-white">
            <main className="p-5">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
