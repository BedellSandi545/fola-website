"use client";

import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import {
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  parseThemeMode,
  resolveTheme,
  type ThemeMode,
} from "@/lib/theme";
import { cn } from "@/lib/cn";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const options: { mode: ThemeMode; label: string; Icon: LucideIcon }[] = [
  { mode: "light", label: "Light theme", Icon: Sun },
  { mode: "dark", label: "Dark theme", Icon: Moon },
  { mode: "system", label: "Match system theme", Icon: Monitor },
];

function applyMode(mode: ThemeMode) {
  const root = document.documentElement;
  root.dataset.themeMode = mode;
  root.dataset.theme = resolveTheme(mode, window.matchMedia(DARK_QUERY).matches);
}

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onChange);
}

const getSnapshot = () => parseThemeMode(document.documentElement.dataset.themeMode);
/** The server cannot know the stored choice, so nothing renders as selected until hydration. */
const getServerSnapshot = () => null;

export function ThemeToggle({ className }: { className?: string }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Follow OS changes while in "system" mode; pick up changes made in other tabs.
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const onSystemChange = () => {
      if (getSnapshot() === "system") applyMode("system");
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      applyMode(parseThemeMode(event.newValue));
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    };
    media.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function choose(next: ThemeMode) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode). The choice still applies for this visit.
    }
    applyMode(next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn("inline-flex items-center rounded-full border border-line p-1", className)}
    >
      {options.map(({ mode: option, label, Icon }) => {
        const selected = mode === option;
        return (
          <button
            key={option}
            type="button"
            aria-label={label}
            aria-pressed={mode === null ? undefined : selected}
            title={label}
            onClick={() => choose(option)}
            className={cn(
              "inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200",
              selected ? "bg-fg text-bg" : "text-fg-muted hover:text-fg",
            )}
          >
            <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
}
