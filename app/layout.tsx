import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HZTL LiveWatch — Always Watching. Always Alert.",
  description:
    "Real-time incident monitoring dashboard for Vercel, Netlify, GitHub, Cloudflare, npm and the full Sitecore product suite.",
  keywords: ["incident monitoring", "status dashboard", "Sitecore", "Vercel", "DevOps"],
  authors: [{ name: "Horizontal Digital" }],
  openGraph: {
    title: "HZ LiveWatch",
    description: "Real-time platform incident awareness for modern engineering teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="hero-glow" />
        <div className="bg-grid" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
