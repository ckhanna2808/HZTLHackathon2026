import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: "HZTL LiveWatch - Always Watching. Always Alert.",
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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Inline script to apply theme before first paint - prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('hz-livewatch-theme');
                if (stored === 'light' || stored === 'dark') {
                  document.documentElement.setAttribute('data-theme', stored);
                } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch(e) {}
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;1,14..32,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <div className="hero-glow" />
          <div className="bg-grid" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
