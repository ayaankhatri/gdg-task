# Multi-Tab Settings Synchronization

GDG Tech Wildcard Entry, Frontend Task 1. A TypeScript web app that keeps user preferences (dark mode, language, font size) in sync across every open browser tab in real time, persists them across sessions, and resolves simultaneous edits deterministically.

## Features

- A GDG-VIT themed page (beige light theme with a warm dark variant) with a header, a GDG-VIT banner, an article, and a footer.
- A **Settings** button in the header opens a preferences dialog with a dark-mode toggle, a language selector (English, Español, Français, Deutsch, हिन्दी), and a font-size slider plus dropdown (12–24 px). The slider applies the new size when released.
- The whole page, including the banner image, scales proportionally with the chosen font size.
- Real-time sync between tabs without reloading. Measured latency is shown in the settings dialog (typically under 1 ms on the same machine; the target is 100 ms).
- Preferences persist after all tabs are closed and are restored on reopen.
- New tabs render with the correct theme, language and font size on the first paint, with no flash of the wrong theme.
- Simultaneous edits from different tabs converge to the same values in every tab and in storage.

## Prerequisites

- Node.js 22.12 or newer and npm
- Python 3 (optional, only for `build/driver.py`)

## Install and run

```bash
npm install
npm run dev
```

Open http://localhost:5173 in two or more tabs, click **Settings** in any of them and change a setting.

Production build and preview:

```bash
npm run build
npm run preview
```

## Tests

```bash
npm test
```

`python3 build/driver.py` and `python3 build/driver.py test` are equivalent wrappers for `npm run build` and `npm test`.

## Project layout

| File | Purpose |
| --- | --- |
| `index.html` | Page shell with a tiny inline script that applies saved settings before first paint |
| `src/settings.ts` | Settings schema, defaults and validation |
| `src/state.ts` | Versioned per-field state and the merge function |
| `src/store.ts` | `SettingsStore`: local edits, persistence, cross-tab messaging |
| `src/main.ts` | DOM UI, browser transport (BroadcastChannel), storage and visibility events |
| `src/i18n.ts` | UI strings for each language |
| `src/content.ts` | Article text (Meaning and Origins) |
| `src/assets/` | GDG-VIT logo and banner (SVG) |
| `src/*.test.ts` | Vitest unit tests for merge properties and multi-tab behaviour |

## External libraries

The app has no runtime dependencies. Everything it ships uses browser APIs only (`BroadcastChannel`, `localStorage`, `crypto.randomUUID`, `performance`). Development tools:

| Library | Use |
| --- | --- |
| [TypeScript](https://www.typescriptlang.org/) | Language and type checking (`tsc --noEmit`) |
| [Vite](https://vite.dev/) | Dev server and production bundler |
| [Vitest](https://vitest.dev/) | Unit test runner |

No external fonts, icons or other assets are used. The GDG-VIT logo and banner in `src/assets/` are SVGs made for this project in the style of the GDG brackets logo.

The article text is adapted from the Wikipedia article [Lorem ipsum](https://en.wikipedia.org/wiki/Lorem_ipsum), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). It is shown in English in every UI language.

## Technical explanation

### Synchronization

Each tab owns a `SettingsStore`. When the user changes a setting the store:

1. Stamps the new value with a version (see below).
2. Broadcasts the full versioned state on a `BroadcastChannel`. This is the fast path: other tabs receive it within a millisecond or two and re-render.
3. Persists the state to `localStorage` using read–merge–write: it reads what is stored, merges its own state into it and writes the result, so it never overwrites a newer value written by another tab.

Writing to `localStorage` also fires a `storage` event in every other tab. That acts as a second delivery channel, so sync still works in browsers without `BroadcastChannel`. Messages may arrive twice or out of order; merging is idempotent and order-independent, so that is harmless.

A tab also reloads from storage when it becomes visible again or is restored from the back/forward cache, in case it missed messages while suspended.

### Conflict resolution

Every setting is an independent last-writer-wins register carrying a stamp `(counter, tabId)`:

- `counter` is a Lamport clock. Each tab tracks the highest counter it has seen, and a local edit uses that value plus one. Any edit made after a tab has seen another edit is therefore ordered after it, independent of wall-clock time.
- `tabId` is a random UUID per tab. When two tabs edit the same field concurrently with the same counter, the larger `tabId` wins. Every tab applies the same rule, so the choice is deterministic.

Merging two states takes, for each field, the entry with the larger stamp. This merge is commutative, associative and idempotent (covered by unit tests), so every tab and the stored copy converge to the same values regardless of the order in which they see updates. Because fields are merged separately, concurrent edits to different settings (for example, one tab changes the language while another changes the font size) are both kept.

If a tab notices through a `storage` event that the stored copy is missing an edit it knows about, it writes the merged state back, so storage converges too.

### Persistence and initialization

The merged state is stored in `localStorage` under `settings-sync:v1`. A small synchronous script in `<head>` reads it and sets `data-theme`, `lang` and the font-size CSS variable on `<html>` before the body is parsed. An inline background colour for each theme lives in the same `<head>`, so the first frame already has the correct theme before the main bundle loads.

### Input validation

Data from `localStorage` and from other tabs is treated as untrusted. It is parsed defensively, each field is validated (booleans, allowed language codes, font size clamped to 12–24, non-negative integer counters), and invalid entries fall back to defaults. The UI only writes text through `textContent`, never `innerHTML`.

## Limitations

- Sync covers tabs of the same browser profile and origin. It is not cross-device.
- With `localStorage` unavailable (for example, blocked storage), tabs still sync live through `BroadcastChannel`, but settings are not persisted.
