import "./style.css";
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

const title = element("h1");
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
const fontSizeValue = element("output");
fontSizeValue.setAttribute("for", "font-size");
const fontSizeLabel = element("label", { htmlFor: "font-size" });

const preview = element("p", { className: "preview" });
const tabInfo = element("span");
const syncInfo = element("span");
const hint = element("span");

document.getElementById("app")!.replaceWith(
  element("main", {}, [
    title,
    subtitle,
    element("section", { className: "card" }, [
      element("div", { className: "row" }, [darkLabel, darkMode]),
      element("div", { className: "row" }, [languageLabel, language]),
      element("div", { className: "row" }, [
        fontSizeLabel,
        element("div", { className: "slider" }, [fontSize, fontSizeValue]),
      ]),
    ]),
    preview,
    element("footer", { className: "status" }, [tabInfo, syncInfo, hint]),
  ]),
);

let lastSync: ChangeInfo | undefined;

function render(settings: Settings): void {
  const strings = STRINGS[settings.language];
  applyToDocument(settings);
  document.title = strings.title;
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
  fontSizeValue.textContent = String(settings.fontSize);
  tabInfo.replaceChildren(`${strings.thisTab}: `, element("code", { textContent: store.tabId.slice(0, 8) }));
  const syncText =
    lastSync?.latencyMs !== undefined ? `${lastSync.latencyMs.toFixed(1)} ms` : lastSync ? "storage" : strings.noSyncYet;
  syncInfo.textContent = `${strings.lastSync}: ${syncText}`;
}

darkMode.addEventListener("change", () => store.update("darkMode", darkMode.checked));
language.addEventListener("change", () => {
  if (isLanguage(language.value)) store.update("language", language.value);
});
fontSize.addEventListener("input", () => {
  fontSizeValue.textContent = fontSize.value;
});
fontSize.addEventListener("change", () => {
  store.update("fontSize", Number(fontSize.value));
  render(store.settings);
});

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
