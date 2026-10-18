import { validateSetting, type SettingKey, type Settings } from "./settings";
import { initialState, maxCounter, mergeState, parseState, stateEquals, toSettings, type SyncState } from "./state";

export const STORAGE_KEY = "settings-sync:v1";
export const CHANNEL_NAME = "settings-sync";

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface SyncMessage {
  type: "state";
  from: string;
  sentAt: number;
  state: SyncState;
}

export interface Transport {
  send(message: SyncMessage): void;
  subscribe(handler: (message: unknown) => void): () => void;
}

export interface StoreDeps {
  tabId: string;
  storage: KeyValueStorage;
  transport: Transport;
  now: () => number;
}

export interface ChangeInfo {
  source: "local" | "remote" | "storage";
  latencyMs?: number;
}

export type Listener = (settings: Settings, info: ChangeInfo) => void;

function parseJson(raw: string | null): unknown {
  if (raw === null) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function parseMessage(raw: unknown): SyncMessage | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const { type, from, sentAt, state } = raw as Record<string, unknown>;
  if (type !== "state" || typeof from !== "string" || typeof sentAt !== "number") return undefined;
  const parsed = parseState(state);
  if (!parsed) return undefined;
  return { type, from, sentAt, state: parsed };
}

export class SettingsStore {
  private state: SyncState = initialState();
  private counter = 0;
  private readonly listeners = new Set<Listener>();
  private unsubscribe: (() => void) | undefined;

  constructor(private readonly deps: StoreDeps) {}

  get tabId(): string {
    return this.deps.tabId;
  }

  get settings(): Settings {
    return toSettings(this.state);
  }

  start(): void {
    this.absorb(this.readStored());
    this.unsubscribe = this.deps.transport.subscribe((raw) => this.receive(raw));
  }

  stop(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  update<K extends SettingKey>(key: K, value: Settings[K]): void {
    const valid = validateSetting(key, value);
    if (valid === undefined || valid === this.state[key].value) return;
    this.counter = Math.max(this.counter, maxCounter(this.state)) + 1;
    this.state = { ...this.state, [key]: { value: valid, stamp: { counter: this.counter, tabId: this.deps.tabId } } };
    this.persist();
    this.deps.transport.send({ type: "state", from: this.deps.tabId, sentAt: this.deps.now(), state: this.state });
    this.emit({ source: "local" });
  }

  handleStorageChange(raw: string | null): void {
    const incoming = parseState(parseJson(raw));
    if (this.absorb(incoming)) this.emit({ source: "storage" });
    if (!incoming || !stateEquals(mergeState(incoming, this.state), incoming)) this.persist();
  }

  reload(): void {
    if (this.absorb(this.readStored())) this.emit({ source: "storage" });
  }

  private receive(raw: unknown): void {
    const message = parseMessage(raw);
    if (!message || message.from === this.deps.tabId) return;
    if (this.absorb(message.state)) {
      this.emit({ source: "remote", latencyMs: Math.max(0, this.deps.now() - message.sentAt) });
    }
  }

  private absorb(incoming: SyncState | undefined): boolean {
    if (!incoming) return false;
    const merged = mergeState(this.state, incoming);
    this.counter = Math.max(this.counter, maxCounter(merged));
    if (stateEquals(merged, this.state)) return false;
    this.state = merged;
    return true;
  }

  private readStored(): SyncState | undefined {
    try {
      return parseState(parseJson(this.deps.storage.getItem(STORAGE_KEY)));
    } catch {
      return undefined;
    }
  }

  private persist(): void {
    const stored = this.readStored();
    const merged = stored ? mergeState(stored, this.state) : this.state;
    if (stored && stateEquals(stored, merged)) return;
    if (this.absorb(merged)) this.emit({ source: "storage" });
    try {
      this.deps.storage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      return;
    }
  }

  private emit(info: ChangeInfo): void {
    const settings = this.settings;
    for (const listener of this.listeners) listener(settings, info);
  }
}
