import { DEFAULT_SETTINGS, SETTING_KEYS, validateSetting, type SettingKey, type Settings } from "./settings";

export interface Stamp {
  counter: number;
  tabId: string;
}

export interface Entry<T> {
  value: T;
  stamp: Stamp;
}

export type SyncState = { [K in SettingKey]: Entry<Settings[K]> };

const ORIGIN_STAMP: Stamp = { counter: 0, tabId: "" };

export function compareStamps(a: Stamp, b: Stamp): number {
  if (a.counter !== b.counter) return a.counter - b.counter;
  if (a.tabId === b.tabId) return 0;
  return a.tabId < b.tabId ? -1 : 1;
}

export function initialState(): SyncState {
  return {
    darkMode: { value: DEFAULT_SETTINGS.darkMode, stamp: ORIGIN_STAMP },
    language: { value: DEFAULT_SETTINGS.language, stamp: ORIGIN_STAMP },
    fontSize: { value: DEFAULT_SETTINGS.fontSize, stamp: ORIGIN_STAMP },
  };
}

function pick<K extends SettingKey>(a: SyncState, b: SyncState, key: K): Entry<Settings[K]> {
  return compareStamps(a[key].stamp, b[key].stamp) >= 0 ? a[key] : b[key];
}

export function mergeState(a: SyncState, b: SyncState): SyncState {
  return {
    darkMode: pick(a, b, "darkMode"),
    language: pick(a, b, "language"),
    fontSize: pick(a, b, "fontSize"),
  };
}

export function stateEquals(a: SyncState, b: SyncState): boolean {
  return SETTING_KEYS.every(
    (key) => a[key].value === b[key].value && compareStamps(a[key].stamp, b[key].stamp) === 0,
  );
}

export function maxCounter(state: SyncState): number {
  return Math.max(...SETTING_KEYS.map((key) => state[key].stamp.counter));
}

export function toSettings(state: SyncState): Settings {
  return {
    darkMode: state.darkMode.value,
    language: state.language.value,
    fontSize: state.fontSize.value,
  };
}

function parseStamp(raw: unknown): Stamp | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const { counter, tabId } = raw as Record<string, unknown>;
  if (typeof counter !== "number" || !Number.isSafeInteger(counter) || counter < 0) return undefined;
  if (typeof tabId !== "string" || tabId.length > 64) return undefined;
  return { counter, tabId };
}

function parseEntry<K extends SettingKey>(key: K, raw: unknown): Entry<Settings[K]> | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const record = raw as Record<string, unknown>;
  const value = validateSetting(key, record.value);
  const stamp = parseStamp(record.stamp);
  if (value === undefined || stamp === undefined) return undefined;
  return { value, stamp };
}

export function parseState(raw: unknown): SyncState | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const record = raw as Record<string, unknown>;
  const fallback = initialState();
  return {
    darkMode: parseEntry("darkMode", record.darkMode) ?? fallback.darkMode,
    language: parseEntry("language", record.language) ?? fallback.language,
    fontSize: parseEntry("fontSize", record.fontSize) ?? fallback.fontSize,
  };
}
