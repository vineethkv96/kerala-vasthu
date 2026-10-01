import type { SavedCalculation } from "../types";

const SAVED_KEY = "kerala-vasthu:saved";
const PREFS_KEY = "kerala-vasthu:prefs";

export interface Preferences {
  language: "en" | "ml";
  tolerance: string;
}

export const defaultPreferences: Preferences = {
  language: "en",
  tolerance: "practical",
};

export function loadSaved(): SavedCalculation[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistSaved(items: SavedCalculation[]): void {
  localStorage.setItem(SAVED_KEY, JSON.stringify(items));
}

export function addSaved(item: SavedCalculation): SavedCalculation[] {
  const items = loadSaved();
  const next = [item, ...items];
  persistSaved(next);
  return next;
}

export function updateSaved(item: SavedCalculation): SavedCalculation[] {
  const items = loadSaved().map((i) => (i.id === item.id ? item : i));
  persistSaved(items);
  return items;
}

export function deleteSaved(id: string): SavedCalculation[] {
  const items = loadSaved().filter((i) => i.id !== id);
  persistSaved(items);
  return items;
}

export function replaceAllSaved(items: SavedCalculation[]): void {
  persistSaved(items);
}

export function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return { ...defaultPreferences };
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch {
    return { ...defaultPreferences };
  }
}

export function persistPreferences(prefs: Preferences): void {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const SEEDED_KEY = "kerala-vasthu:seeded";

export function seedIfNeeded(): SavedCalculation[] {
  try {
    if (localStorage.getItem(SEEDED_KEY)) return loadSaved();
    localStorage.setItem(SEEDED_KEY, "1");
    const existing = loadSaved();
    if (existing.length > 0) return existing;
    const seed: SavedCalculation[] = [
      {
        id: makeId(),
        type: "room",
        projectName: "Example: Ground-floor bedroom",
        note: "Standard bedroom",
        roomType: "Bedroom",
        length: 10,
        lengthUnit: "feet",
        width: 12,
        widthUnit: "feet",
        savedAt: new Date().toISOString(),
      },
      {
        id: makeId(),
        type: "ayadi",
        projectName: "Example: New house plan",
        note: "Living room Ayadi check",
        length: 12,
        lengthUnit: "feet",
        width: 16,
        widthUnit: "feet",
        basis: "perimeter",
        customBase: 0,
        baseUnit: "viral",
        roundingMode: "nearest",
        savedAt: new Date().toISOString(),
      },
    ];
    persistSaved(seed);
    return seed;
  } catch {
    return [];
  }
}
