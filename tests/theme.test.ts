import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { parseThemeMode, resolveTheme, themeInitScript } from "@/lib/theme";

/** Runs the inline <head> script against a minimal fake browser. */
function runInitScript({ stored, systemDark, storageThrows = false }: { stored: string | null; systemDark: boolean; storageThrows?: boolean }) {
  const classes = new Set<string>();
  const documentElement = {
    dataset: {} as Record<string, string>,
    classList: { add: (c: string) => classes.add(c) },
  };
  const localStorage = {
    getItem: () => {
      if (storageThrows) throw new Error("blocked");
      return stored;
    },
  };
  const window = { matchMedia: () => ({ matches: systemDark }) };
  runInNewContext(themeInitScript, { document: { documentElement }, localStorage, window });
  return { dataset: documentElement.dataset, classes };
}

describe("theme helpers", () => {
  it("falls back to system for unknown stored values", () => {
    expect(parseThemeMode("dark")).toBe("dark");
    expect(parseThemeMode("light")).toBe("light");
    expect(parseThemeMode("purple")).toBe("system");
    expect(parseThemeMode(null)).toBe("system");
  });

  it("resolves system mode from the OS preference", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
    expect(resolveTheme("light", true)).toBe("light");
  });
});

describe("theme init script", () => {
  it("applies an explicit stored choice regardless of the OS", () => {
    const { dataset } = runInitScript({ stored: "light", systemDark: true });
    expect(dataset).toEqual({ theme: "light", themeMode: "light" });
  });

  it("follows the OS when no choice is stored", () => {
    const { dataset } = runInitScript({ stored: null, systemDark: true });
    expect(dataset).toEqual({ theme: "dark", themeMode: "system" });
  });

  it("follows the OS when storage is blocked (private browsing)", () => {
    const { dataset, classes } = runInitScript({ stored: null, systemDark: true, storageThrows: true });
    expect(classes.has("js")).toBe(true);
    expect(dataset).toEqual({ theme: "dark", themeMode: "system" });
  });
});
