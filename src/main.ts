import "./style.css";
import heroUrl from "./assets/gdg-vit-hero.svg";
import logoUrl from "./assets/gdg-logo.svg";
import letrasetUrl from "./assets/letraset-lorem-ipsum.jpg";
import {
  ABOUT,
  ARTICLE,
  ARTICLE_LICENSE_URL,
  ARTICLE_SOURCE_URL,
  LETRASET_IMAGE,
  SAMPLE_PASSAGE,
  type ArticleSection,
  type Segment,
} from "./content";
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

function menuIcon(): SVGElement {
  return svg("svg", { viewBox: "0 0 24 24", width: "20", height: "20", "aria-hidden": "true" }, [
    svg("path", { d: "M4 7h16M4 12h16M4 17h16", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }),
  ]);
}

function renderSegment(segment: Segment): Node {
  return typeof segment === "string" ? document.createTextNode(segment) : element("em", { textContent: segment.em });
}

function renderSection(section: ArticleSection): HTMLElement {
  return element("section", {}, [
    element("h2", { textContent: section.heading }),
    ...section.paragraphs.map((paragraph) => element("p", {}, paragraph.map(renderSegment))),
  ]);
}

function homePage(): HTMLElement[] {
  return [
    element("figure", { className: "hero" }, [
      element("img", {
        src: heroUrl,
        alt: "GDG VIT banner with the Google Developer Groups brackets logo",
        width: 960,
        height: 420,
      }),
    ]),
    element("article", { className: "article", lang: "en" }, ARTICLE.map(renderSection)),
  ];
}

function aboutPage(): HTMLElement[] {
  const sections = ABOUT.map(renderSection);
  sections[1].append(element("blockquote", { className: "sample", lang: "la", textContent: SAMPLE_PASSAGE }));
  const figure = element("figure", { className: "about-figure" }, [
    element("img", { src: letrasetUrl, alt: LETRASET_IMAGE.alt, width: 292, height: 459 }),
    element("figcaption", {}, [
      document.createTextNode(LETRASET_IMAGE.caption),
      element("br"),
      element("a", {
        href: LETRASET_IMAGE.creditUrl,
        textContent: LETRASET_IMAGE.credit,
        target: "_blank",
        rel: "noopener noreferrer",
      }),
    ]),
  ]);
  return [element("article", { className: "article", lang: "en" }, [figure, ...sections])];
}

type Route = "home" | "about";

const ROUTES: Record<Route, string> = { home: "#/", about: "#/about" };

function currentRoute(): Route {
  return location.hash === ROUTES.about ? "about" : "home";
}

function applyToDocument(settings: Settings, animate: boolean): void {
  const root = document.documentElement;
  if (!animate) root.classList.add("instant");
  root.dataset.theme = settings.darkMode ? "dark" : "light";
  root.lang = settings.language;
  root.style.setProperty("--font-size", `${settings.fontSize}px`);
  if (!animate) {
    void document.body.offsetWidth;
    root.classList.remove("instant");
  }
}

const store = new SettingsStore({
  tabId: crypto.randomUUID(),
  storage: window.localStorage,
  transport: createTransport(),
  now: () => performance.timeOrigin + performance.now(),
});

const APP_TITLE = "GDG-VIT Frontend Task 1";
const GITHUB_URL = "https://github.com/ayaankhatri";

function externalLink(href: string, text: string): HTMLAnchorElement {
  return element("a", { href, textContent: text, target: "_blank", rel: "noopener noreferrer" });
}

const madeBy = element("p");
const textSource = element("p", { className: "footer-note" });

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

const navLinks: Record<Route, HTMLAnchorElement> = {
  home: element("a", { href: ROUTES.home }),
  about: element("a", { href: ROUTES.about }),
};
const newTabButton = element("button", { type: "button", className: "new-tab" });
const newTabLabel = element("span");
newTabButton.append(
  newTabLabel,
  svg("svg", { viewBox: "0 0 24 24", width: "14", height: "14", "aria-hidden": "true" }, [
    svg("path", {
      d: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    }),
  ]),
);
const nav = element("nav", { className: "site-nav" }, [navLinks.home, navLinks.about, newTabButton]);
nav.setAttribute("aria-label", "Main");
const menu = element("div", { id: "site-menu", className: "menu" }, [nav, settingsButton]);
const menuButton = element("button", { type: "button", className: "menu-button" }, [menuIcon()]);
menuButton.setAttribute("aria-controls", menu.id);
menuButton.setAttribute("aria-expanded", "false");
const header = element("header", { className: "site-header" }, [
  element("a", { className: "brand", href: ROUTES.home }, [
    element("img", { src: logoUrl, alt: "GDG logo", className: "brand-logo" }),
    element("h1", { textContent: APP_TITLE }),
  ]),
  menuButton,
  menu,
]);
const content = element("main");

function setMenuOpen(open: boolean): void {
  header.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
}

function fitHeader(): void {
  const overflows = () => header.scrollWidth > header.clientWidth;
  header.classList.remove("compact", "tiny");
  if (overflows()) header.classList.add("compact");
  if (overflows()) header.classList.add("tiny");
  if (!header.classList.contains("compact")) setMenuOpen(false);
}

function showRoute(): void {
  const route = currentRoute();
  content.replaceChildren(...(route === "about" ? aboutPage() : homePage()));
  for (const [name, link] of Object.entries(navLinks)) {
    if (name === route) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}

document.getElementById("app")!.replaceWith(
  header,
  content,
  element("footer", { className: "site-footer" }, [madeBy, textSource]),
  settingsDialog,
);

let lastSync: ChangeInfo | undefined;

function render(settings: Settings, animate = false): void {
  const strings = STRINGS[settings.language];
  applyToDocument(settings, animate);
  document.title = APP_TITLE;
  settingsButtonLabel.textContent = strings.settings;
  navLinks.home.textContent = strings.navHome;
  navLinks.about.textContent = strings.navAbout;
  newTabLabel.textContent = strings.newTab;
  menuButton.setAttribute("aria-label", strings.menu);
  madeBy.replaceChildren(`${strings.madeBy} `, externalLink(GITHUB_URL, "ayaankhatri"));
  textSource.replaceChildren(
    `${strings.textSource} `,
    externalLink(ARTICLE_SOURCE_URL, "Wikipedia"),
    " · ",
    externalLink(ARTICLE_LICENSE_URL, "CC BY-SA 4.0"),
  );
  closeButton.setAttribute("aria-label", strings.close);
  title.textContent = strings.title;
  subtitle.textContent = strings.subtitle;
  darkLabel.textContent = strings.darkMode;
  languageLabel.textContent = strings.language;
  fontSizeLabel.textContent = strings.fontSize;
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
  fitHeader();
}

newTabButton.addEventListener("click", () => window.open(location.href, "_blank", "noopener"));
settingsButton.addEventListener("click", () => {
  setMenuOpen(false);
  settingsDialog.showModal();
});
menuButton.addEventListener("click", () => setMenuOpen(!header.classList.contains("menu-open")));
nav.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("a, button")) setMenuOpen(false);
});
document.addEventListener("click", (event) => {
  if (event.target instanceof Node && !header.contains(event.target)) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header.classList.contains("menu-open")) {
    setMenuOpen(false);
    menuButton.focus();
  }
});
new ResizeObserver(fitHeader).observe(document.documentElement);
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
  render(settings, info.source === "local");
});
window.addEventListener("hashchange", () => {
  showRoute();
  window.scrollTo(0, 0);
});

store.start();
showRoute();
render(store.settings);
