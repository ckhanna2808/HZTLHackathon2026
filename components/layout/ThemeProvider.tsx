"use client";

import { createContext, useContext, useEffect, useState } from "react";

// ─── Theme ────────────────────────────────────────────────────────────────────
type Theme = "dark" | "light";

// ─── Timezone ─────────────────────────────────────────────────────────────────
// Only used for the display clock in the header.
// All API routes, cron jobs, and server-side code always operate in UTC;
// this preference is purely cosmetic / client-side.

export type DisplayTimezone = "UTC" | "IST" | "GST" | "EST";

/** Maps our display label → IANA timezone string used by Intl.DateTimeFormat */
export const TZ_IANA: Record<DisplayTimezone, string> = {
  UTC: "UTC",
  IST: "Asia/Kolkata",     // UTC +5:30 - India Standard Time
  GST: "Asia/Dubai",       // UTC +4:00 - Gulf Standard Time
  EST: "America/New_York", // UTC -5:00 (winter) / -4:00 EDT (summer)
};

/** All available timezones (used for the dropdown) */
export const TZ_CYCLE: DisplayTimezone[] = ["UTC", "IST", "GST", "EST"];

/** Human-readable labels for the dropdown */
export const TZ_LABELS: Record<DisplayTimezone, string> = {
  UTC: "UTC - Coordinated Universal Time",
  IST: "IST - India Standard Time (+5:30)",
  GST: "GST - Gulf Standard Time (+4:00)",
  EST: "EST - Eastern Time (−5:00 / −4:00)",
};

// ─── Context ──────────────────────────────────────────────────────────────────
interface AppPrefsContextValue {
  // Theme
  theme: Theme;
  toggleTheme: () => void;

  // Timezone (display only)
  displayTz: DisplayTimezone;
  setTimezone: (tz: DisplayTimezone) => void;
  cycleTimezone: () => void;

  // Whether client has mounted (avoids SSR mismatch for persisted prefs)
  mounted: boolean;
}

const AppPrefsContext = createContext<AppPrefsContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  displayTz: "UTC",
  setTimezone: () => {},
  cycleTimezone: () => {},
  mounted: false,
});

// ─── Hooks ────────────────────────────────────────────────────────────────────
export function useTheme() {
  const { theme, toggleTheme, mounted } = useContext(AppPrefsContext);
  return { theme, toggleTheme, mounted };
}

export function useDisplayTimezone() {
  const { displayTz, setTimezone, cycleTimezone, mounted } = useContext(AppPrefsContext);
  return { displayTz, setTimezone, cycleTimezone, mounted };
}

/** Convenience: format a Date in the user's chosen display timezone */
export function useFormatTime() {
  const { displayTz, mounted } = useContext(AppPrefsContext);
  return (date: Date, opts?: Intl.DateTimeFormatOptions) => {
    if (!mounted) return "--:--:--";
    return date.toLocaleTimeString("en-GB", {
      timeZone: TZ_IANA[displayTz],
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      ...opts,
    });
  };
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [displayTz, setDisplayTz] = useState<DisplayTimezone>("UTC");
  const [mounted, setMounted] = useState(false);

  // Read persisted preferences once on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("hz-livewatch-theme") as Theme | null;
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      } else {
        setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      }

      const storedTz = localStorage.getItem("hz-livewatch-tz") as DisplayTimezone | null;
      if (storedTz && TZ_CYCLE.includes(storedTz)) {
        setDisplayTz(storedTz);
      }
      // If nothing stored, default stays "UTC" - safest default for a monitoring tool
    } catch {
      // localStorage unavailable (SSR / private mode edge case) - use defaults
    }
    setMounted(true);
  }, []);

  // Persist theme to DOM + localStorage
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("hz-livewatch-theme", theme); } catch { /* noop */ }
  }, [theme, mounted]);

  // Persist timezone to localStorage
  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem("hz-livewatch-tz", displayTz); } catch { /* noop */ }
  }, [displayTz, mounted]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const setTimezone = (tz: DisplayTimezone) => setDisplayTz(tz);

  const cycleTimezone = () =>
    setDisplayTz((tz) => {
      const idx = TZ_CYCLE.indexOf(tz);
      return TZ_CYCLE[(idx + 1) % TZ_CYCLE.length];
    });

  return (
    <AppPrefsContext.Provider value={{ theme, toggleTheme, displayTz, setTimezone, cycleTimezone, mounted }}>
      {children}
    </AppPrefsContext.Provider>
  );
}
