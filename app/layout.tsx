import type { Metadata } from "next";
import { IBM_Plex_Mono, Rethink_Sans } from "next/font/google";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rethink-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Presentations — Manasija",
  description:
    "Talks on market intelligence systems, MCP design, and inspectable agent tools.",
};

export const viewport = {
  themeColor: "#01378F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`antialiased ${rethinkSans.variable} ${ibmPlexMono.variable} ${rethinkSans.className}`}
    >
      <body>{children}</body>
    </html>
  );
}
