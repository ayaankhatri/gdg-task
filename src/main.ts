import "./style.css";
import logoUrl from "./assets/gdg-logo.svg";
import { LANGUAGE_NAMES, STRINGS } from "./i18n";
import { FONT_SIZE_MAX, FONT_SIZE_MIN, LANGUAGES, isLanguage, type Settings } from "./settings";
import { CHANNEL_NAME, STORAGE_KEY, SettingsStore, type ChangeInfo, type Transport } from "./store";

function createTransport(): Transport {
  if (typeof BroadcastChannel === "undefined") {
    return { send: () => {}, subscribe: () => () => {} };
  }
  const channel = new BroadcastChannel(CHANNEL_NAME);
  return {
    send: (message) => channel.postMessage(message),
    subscribe: (handler) => {
      const listener = (event: MessageEvent) => handler(event.data);
      channel.addEventListener("message", listener);
      return () => channel.removeEventListener("message", listener);
    },
  };
}

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> = {},
  children: Node[] = [],
): HTMLElementTagNameMap[K] {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

function svg(tag: string, attrs: Record<string, string>, children: SVGElement[] = []): SVGElement {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

function settingsIcon(): SVGElement {
  return svg("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true" }, [
    svg("g", { fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }, [
      svg("path", { d: "M4 6h16M4 12h16M4 18h16" }),
      svg("circle", { cx: "9", cy: "6", r: "2.2", fill: "var(--surface)" }),
      svg("circle", { cx: "15", cy: "12", r: "2.2", fill: "var(--surface)" }),
      svg("circle", { cx: "7", cy: "18", r: "2.2", fill: "var(--surface)" }),
    ]),
  ]);
}

function applyToDocument(settings: Settings): void {
  const root = document.documentElement;
  root.dataset.theme = settings.darkMode ? "dark" : "light";
  root.lang = settings.language;
  root.style.setProperty("--font-size", `${settings.fontSize}px`);
}

const store = new SettingsStore({
  tabId: crypto.randomUUID(),
  storage: window.localStorage,
  transport: createTransport(),
  now: () => performance.timeOrigin + performance.now(),
});

const APP_TITLE = "GDG-VIT Frontend Task 1";

const settingsButton = element("button", { type: "button", className: "settings-button" });
const settingsButtonLabel = element("span");
settingsButton.append(settingsIcon(), settingsButtonLabel);

const title = element("h2", { id: "settings-title" });
const closeButton = element("button", { type: "button", className: "close-button", textContent: "×" });
const subtitle = element("p", { className: "subtitle" });

const darkMode = element("input", { type: "checkbox", id: "dark-mode", className: "switch" });
darkMode.setAttribute("role", "switch");
const darkLabel = element("label", { htmlFor: "dark-mode" });

const language = element(
  "select",
  { id: "language" },
  LANGUAGES.map((code) => element("option", { value: code, textContent: LANGUAGE_NAMES[code] })),
);
const languageLabel = element("label", { htmlFor: "language" });

const fontSize = element("input", {
  type: "range",
  id: "font-size",
  min: String(FONT_SIZE_MIN),
  max: String(FONT_SIZE_MAX),
  step: "1",
});
const fontSizeValue = element(
  "select",
  { id: "font-size-value", className: "size-picker" },
  Array.from({ length: FONT_SIZE_MAX - FONT_SIZE_MIN + 1 }, (_, i) => {
    const size = String(FONT_SIZE_MIN + i);
    return element("option", { value: size, textContent: size });
  }),
);
const fontSizeLabel = element("label", { htmlFor: "font-size" });

const preview = element("p", { className: "preview" });
const tabInfo = element("span");
const syncInfo = element("span");
const hint = element("span");

const settingsDialog = element("dialog", { className: "settings" }, [
  element("div", { className: "settings-header" }, [title, closeButton]),
  subtitle,
  element("section", { className: "card" }, [
    element("div", { className: "row" }, [darkLabel, darkMode]),
    element("div", { className: "row" }, [languageLabel, language]),
    element("div", { className: "row" }, [
      fontSizeLabel,
      element("div", { className: "slider" }, [fontSize, fontSizeValue]),
    ]),
  ]),
  element("div", { className: "status" }, [tabInfo, syncInfo, hint]),
]);
settingsDialog.setAttribute("aria-labelledby", "settings-title");

document.getElementById("app")!.replaceWith(
  element("header", { className: "site-header" }, [
    element("div", { className: "brand" }, [
      element("img", { src: logoUrl, alt: "GDG logo", className: "brand-logo" }),
      element("h1", { textContent: APP_TITLE }),
    ]),
    settingsButton,
  ]),
  element("main", {}, [preview]),
  settingsDialog,
);

let lastSync: ChangeInfo | undefined;

function render(settings: Settings): void {
  const strings = STRINGS[settings.language];
  applyToDocument(settings);
  document.title = APP_TITLE;
  settingsButtonLabel.textContent = strings.settings;
  closeButton.setAttribute("aria-label", strings.close);
  title.textContent = strings.title;
  subtitle.textContent = strings.subtitle;
  darkLabel.textContent = strings.darkMode;
  languageLabel.textContent = strings.language;
  fontSizeLabel.textContent = strings.fontSize;
  preview.textContent = strings.preview;
  hint.textContent = strings.hint;
  darkMode.checked = settings.darkMode;
  darkMode.setAttribute("aria-checked", String(settings.darkMode));
  language.value = settings.language;
  if (document.activeElement !== fontSize) fontSize.value = String(settings.fontSize);
  fontSizeValue.value = String(settings.fontSize);
  fontSizeValue.setAttribute("aria-label", strings.fontSize);
  tabInfo.replaceChildren(`${strings.thisTab}: `, element("code", { textContent: store.tabId.slice(0, 8) }));
  const syncText =
    lastSync?.latencyMs !== undefined ? `${lastSync.latencyMs.toFixed(1)} ms` : lastSync ? "storage" : strings.noSyncYet;
  syncInfo.textContent = `${strings.lastSync}: ${syncText}`;
}

settingsButton.addEventListener("click", () => settingsDialog.showModal());
closeButton.addEventListener("click", () => settingsDialog.close());
settingsDialog.addEventListener("click", (event) => {
  if (event.target === settingsDialog) settingsDialog.close();
});

darkMode.addEventListener("change", () => store.update("darkMode", darkMode.checked));
language.addEventListener("change", () => {
  if (isLanguage(language.value)) store.update("language", language.value);
});
fontSize.addEventListener("input", () => {
  fontSizeValue.value = fontSize.value;
});
fontSize.addEventListener("change", () => {
  store.update("fontSize", Number(fontSize.value));
  render(store.settings);
});
fontSizeValue.addEventListener("change", () => store.update("fontSize", Number(fontSizeValue.value)));

window.addEventListener("storage", (event) => {
  if (event.storageArea === window.localStorage && event.key === STORAGE_KEY) {
    store.handleStorageChange(event.newValue);
  }
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) store.reload();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") store.reload();
});

store.subscribe((settings, info) => {
  if (info.source !== "local") lastSync = info;
  render(settings);
});
store.start();
render(store.settings);
