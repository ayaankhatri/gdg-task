export const LANGUAGES = ["en", "es", "fr", "de", "hi"] as const;
export type Language = (typeof LANGUAGES)[number];

export const FONT_SIZE_MIN = 12;
export const FONT_SIZE_MAX = 24;

export interface Settings {
  darkMode: boolean;
  language: Language;
  fontSize: number;
}

export type SettingKey = keyof Settings;
export const SETTING_KEYS: readonly SettingKey[] = ["darkMode", "language", "fontSize"];

export const DEFAULT_SETTINGS: Settings = {
  darkMode: false,
  language: "en",
  fontSize: 16,
};

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
}

export function validateSetting<K extends SettingKey>(key: K, value: unknown): Settings[K] | undefined {
  switch (key) {
    case "darkMode":
      return (typeof value === "boolean" ? value : undefined) as Settings[K] | undefined;
    case "language":
      return (isLanguage(value) ? value : undefined) as Settings[K] | undefined;
    case "fontSize":
      if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
      return Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, Math.round(value))) as Settings[K];
  }
  return undefined;
}
