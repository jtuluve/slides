import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presentations & Slides",
  description: "Slidev presentation decks hosted with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#111213",
          color: "#f5f5f2",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
