import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custom Mermaid",
  description: "拡大・縮小・移動が可能なMermaidコンポーネント",
  metadataBase: new URL("https://custom-mermaid.vercel.app"),
  openGraph: {
    title: "Custom Mermaid",
    description: "拡大・縮小・移動が可能なMermaidコンポーネント",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
