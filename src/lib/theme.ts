export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "fca-theme";
export const THEME_CHANGE_EVENT = "fca-theme-change";
export const THEME_MODES: readonly ThemeMode[] = ["light", "dark", "system"];

export function parseThemeMode(value: string | null | undefined): ThemeMode {
  return value === "light" || value === "dark" ? value : "system";
}

export function resolveTheme(mode: ThemeMode, systemPrefersDark: boolean): ResolvedTheme {
  if (mode === "system") return systemPrefersDark ? "dark" : "light";
  return mode;
}

/**
 * Inline, render-blocking script placed in <head>. It runs before first paint so
 * the correct theme is applied without a flash. It mirrors parseThemeMode and
 * resolveTheme (kept dependency-free because it is serialised as a string).
 * It also adds the `js` class used by the motion guards in globals.css.
 */
export const themeInitScript = `(function(){var r=document.documentElement;r.classList.add('js');var m=null;try{m=localStorage.getItem('${THEME_STORAGE_KEY}');}catch(e){}if(m!=='light'&&m!=='dark')m='system';try{var d=m==='dark'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);r.dataset.theme=d?'dark':'light';r.dataset.themeMode=m;}catch(e){}})();`;
