import { describe, expect, it } from "vitest";
import { compareStamps, initialState, mergeState, parseState, stateEquals, type SyncState } from "./state";

function withEdit(state: SyncState, patch: Partial<SyncState>): SyncState {
  return { ...state, ...patch };
}

describe("compareStamps", () => {
  it("orders by counter first", () => {
    expect(compareStamps({ counter: 2, tabId: "a" }, { counter: 1, tabId: "z" })).toBeGreaterThan(0);
  });

  it("breaks counter ties by tab id", () => {
    expect(compareStamps({ counter: 3, tabId: "b" }, { counter: 3, tabId: "a" })).toBeGreaterThan(0);
    expect(compareStamps({ counter: 3, tabId: "a" }, { counter: 3, tabId: "a" })).toBe(0);
  });
});

describe("mergeState", () => {
  const base = initialState();
  const a = withEdit(base, {
    darkMode: { value: true, stamp: { counter: 5, tabId: "tab-a" } },
    fontSize: { value: 20, stamp: { counter: 4, tabId: "tab-a" } },
  });
  const b = withEdit(base, {
    darkMode: { value: false, stamp: { counter: 5, tabId: "tab-b" } },
    language: { value: "fr", stamp: { counter: 2, tabId: "tab-b" } },
  });

  it("is commutative", () => {
    expect(stateEquals(mergeState(a, b), mergeState(b, a))).toBe(true);
  });

  it("is idempotent", () => {
    expect(stateEquals(mergeState(a, a), a)).toBe(true);
  });

  it("is associative", () => {
    const c = withEdit(base, { fontSize: { value: 13, stamp: { counter: 9, tabId: "tab-c" } } });
    expect(stateEquals(mergeState(mergeState(a, b), c), mergeState(a, mergeState(b, c)))).toBe(true);
  });

  it("keeps concurrent edits to different fields and resolves same-field ties deterministically", () => {
    const merged = mergeState(a, b);
    expect(merged.darkMode.value).toBe(false);
    expect(merged.language.value).toBe("fr");
    expect(merged.fontSize.value).toBe(20);
  });
});

describe("parseState", () => {
  it("rejects non-objects", () => {
    expect(parseState(null)).toBeUndefined();
    expect(parseState("x")).toBeUndefined();
  });

  it("falls back to defaults for invalid entries", () => {
    const parsed = parseState({
      darkMode: { value: "yes", stamp: { counter: 1, tabId: "t" } },
      language: { value: "xx", stamp: { counter: 1, tabId: "t" } },
      fontSize: { value: 99, stamp: { counter: 1, tabId: "t" } },
    });
    expect(parsed?.darkMode.value).toBe(false);
    expect(parsed?.language.value).toBe("en");
    expect(parsed?.fontSize.value).toBe(24);
  });

  it("rejects malformed stamps", () => {
    const parsed = parseState({ darkMode: { value: true, stamp: { counter: -1, tabId: "t" } } });
    expect(parsed?.darkMode.value).toBe(false);
  });
});
