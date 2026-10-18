import { describe, expect, it } from "vitest";
import { STORAGE_KEY, SettingsStore, type KeyValueStorage, type SyncMessage, type Transport } from "./store";

class FakeStorage implements KeyValueStorage {
  data = new Map<string, string>();
  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}

class FakeBus {
  private handlers = new Set<(message: unknown) => void>();
  queue: SyncMessage[] = [];
  autoDeliver = true;

  transport(): Transport {
    return {
      send: (message) => {
        const copy = JSON.parse(JSON.stringify(message)) as SyncMessage;
        if (this.autoDeliver) this.deliver(copy);
        else this.queue.push(copy);
      },
      subscribe: (handler) => {
        this.handlers.add(handler);
        return () => this.handlers.delete(handler);
      },
    };
  }

  deliver(message: SyncMessage): void {
    for (const handler of this.handlers) handler(message);
  }

  flush(): void {
    const pending = this.queue;
    this.queue = [];
    for (const message of pending) this.deliver(message);
  }
}

function makeTab(tabId: string, storage: FakeStorage, bus: FakeBus): SettingsStore {
  const store = new SettingsStore({ tabId, storage, transport: bus.transport(), now: () => 0 });
  store.start();
  return store;
}

describe("SettingsStore", () => {
  it("propagates a change to other tabs", () => {
    const storage = new FakeStorage();
    const bus = new FakeBus();
    const a = makeTab("a", storage, bus);
    const b = makeTab("b", storage, bus);
    const seen: string[] = [];
    b.subscribe((_, info) => seen.push(info.source));

    a.update("darkMode", true);

    expect(b.settings.darkMode).toBe(true);
    expect(seen).toEqual(["remote"]);
  });

  it("persists and restores the latest settings in a new tab", () => {
    const storage = new FakeStorage();
    const bus = new FakeBus();
    const a = makeTab("a", storage, bus);
    a.update("language", "hi");
    a.update("fontSize", 20);
    a.stop();

    const c = makeTab("c", storage, bus);
    expect(c.settings).toEqual({ darkMode: false, language: "hi", fontSize: 20 });
  });

  it("converges after simultaneous edits", () => {
    const storage = new FakeStorage();
    const bus = new FakeBus();
    const a = makeTab("a", storage, bus);
    const b = makeTab("b", storage, bus);
    bus.autoDeliver = false;

    a.update("fontSize", 18);
    b.update("fontSize", 22);
    a.update("language", "es");
    bus.flush();

    expect(a.settings).toEqual(b.settings);
    expect(a.settings.fontSize).toBe(22);
    expect(a.settings.language).toBe("es");
    expect(makeTab("c", storage, bus).settings).toEqual(a.settings);
  });

  it("repairs storage that is missing a newer local edit", () => {
    const storage = new FakeStorage();
    const bus = new FakeBus();
    const a = makeTab("a", storage, bus);
    a.update("darkMode", true);
    const snapshot = storage.getItem(STORAGE_KEY);
    a.update("fontSize", 21);
    storage.setItem(STORAGE_KEY, snapshot!);

    a.handleStorageChange(snapshot);

    expect(makeTab("c", storage, bus).settings.fontSize).toBe(21);
  });

  it("ignores malformed messages and storage values", () => {
    const storage = new FakeStorage();
    const bus = new FakeBus();
    const a = makeTab("a", storage, bus);
    bus.deliver({ type: "state", from: "x", sentAt: 0, state: "bad" } as unknown as SyncMessage);
    a.handleStorageChange("{not json");
    expect(a.settings).toEqual({ darkMode: false, language: "en", fontSize: 16 });
  });

  it("re-validates every field of each incoming message", () => {
    const storage = new FakeStorage();
    const bus = new FakeBus();
    const a = makeTab("a", storage, bus);
    bus.deliver({
      type: "state",
      from: "x",
      sentAt: 0,
      state: {
        darkMode: { value: "true", stamp: { counter: 5, tabId: "x" } },
        language: { value: "fr", stamp: { counter: 5, tabId: "x" } },
        fontSize: { value: 500, stamp: { counter: 5, tabId: "x" } },
        injected: { value: 1, stamp: { counter: 5, tabId: "x" } },
      },
    } as unknown as SyncMessage);
    expect(a.settings).toEqual({ darkMode: false, language: "fr", fontSize: 24 });
  });

  it("rejects invalid local values", () => {
    const storage = new FakeStorage();
    const a = makeTab("a", storage, new FakeBus());
    a.update("language", "xx" as never);
    expect(a.settings.language).toBe("en");
    expect(storage.getItem(STORAGE_KEY)).toBeNull();
  });
});
