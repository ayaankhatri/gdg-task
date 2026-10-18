import type { Language } from "./settings";

export interface Strings {
  title: string;
  subtitle: string;
  darkMode: string;
  language: string;
  fontSize: string;
  thisTab: string;
  lastSync: string;
  noSyncYet: string;
  hint: string;
  settings: string;
  close: string;
  madeBy: string;
  textSource: string;
  navHome: string;
  navAbout: string;
  newTab: string;
}

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  hi: "हिन्दी",
};

export const STRINGS: Record<Language, Strings> = {
  en: {
    title: "Preferences",
    subtitle: "Changes sync instantly across every open tab.",
    darkMode: "Dark mode",
    language: "Language",
    fontSize: "Font size",
    thisTab: "This tab",
    lastSync: "Last update from another tab",
    noSyncYet: "none yet",
    hint: "Open this page in another tab and change a setting.",
    settings: "Settings",
    close: "Close",
    madeBy: "Made by",
    textSource: "Text adapted from",
    navHome: "Home",
    navAbout: "About Lorem ipsum",
    newTab: "Open in new tab",
  },
  es: {
    title: "Preferencias",
    subtitle: "Los cambios se sincronizan al instante en todas las pestañas abiertas.",
    darkMode: "Modo oscuro",
    language: "Idioma",
    fontSize: "Tamaño de letra",
    thisTab: "Esta pestaña",
    lastSync: "Última actualización de otra pestaña",
    noSyncYet: "ninguna aún",
    hint: "Abre esta página en otra pestaña y cambia un ajuste.",
    settings: "Ajustes",
    close: "Cerrar",
    madeBy: "Hecho por",
    textSource: "Texto adaptado de",
    navHome: "Inicio",
    navAbout: "Sobre Lorem ipsum",
    newTab: "Abrir en una pestaña nueva",
  },
  fr: {
    title: "Préférences",
    subtitle: "Les modifications se synchronisent instantanément dans tous les onglets ouverts.",
    darkMode: "Mode sombre",
    language: "Langue",
    fontSize: "Taille du texte",
    thisTab: "Cet onglet",
    lastSync: "Dernière mise à jour d'un autre onglet",
    noSyncYet: "aucune pour l'instant",
    hint: "Ouvrez cette page dans un autre onglet et modifiez un réglage.",
    settings: "Paramètres",
    close: "Fermer",
    madeBy: "Réalisé par",
    textSource: "Texte adapté de",
    navHome: "Accueil",
    navAbout: "À propos de Lorem ipsum",
    newTab: "Ouvrir dans un nouvel onglet",
  },
  de: {
    title: "Einstellungen",
    subtitle: "Änderungen werden sofort in allen geöffneten Tabs synchronisiert.",
    darkMode: "Dunkelmodus",
    language: "Sprache",
    fontSize: "Schriftgröße",
    thisTab: "Dieser Tab",
    lastSync: "Letzte Änderung aus einem anderen Tab",
    noSyncYet: "noch keine",
    hint: "Öffne diese Seite in einem anderen Tab und ändere eine Einstellung.",
    settings: "Einstellungen",
    close: "Schließen",
    madeBy: "Erstellt von",
    textSource: "Text übernommen aus",
    navHome: "Startseite",
    navAbout: "Über Lorem ipsum",
    newTab: "In neuem Tab öffnen",
  },
  hi: {
    title: "पसंद",
    subtitle: "बदलाव सभी खुले टैब में तुरंत सिंक होते हैं।",
    darkMode: "डार्क मोड",
    language: "भाषा",
    fontSize: "फ़ॉन्ट आकार",
    thisTab: "यह टैब",
    lastSync: "दूसरे टैब से आख़िरी बदलाव",
    noSyncYet: "अभी कोई नहीं",
    hint: "इस पेज को दूसरे टैब में खोलें और कोई सेटिंग बदलें।",
    settings: "सेटिंग्स",
    close: "बंद करें",
    madeBy: "निर्माता",
    textSource: "पाठ का स्रोत",
    navHome: "होम",
    navAbout: "Lorem ipsum के बारे में",
    newTab: "नए टैब में खोलें",
  },
};
