import type { Language } from "./settings";

export interface Strings {
  title: string;
  subtitle: string;
  darkMode: string;
  language: string;
  fontSize: string;
  preview: string;
  thisTab: string;
  lastSync: string;
  noSyncYet: string;
  hint: string;
  settings: string;
  close: string;
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
    preview: "The quick brown fox jumps over the lazy dog.",
    thisTab: "This tab",
    lastSync: "Last update from another tab",
    noSyncYet: "none yet",
    hint: "Open this page in another tab and change a setting.",
    settings: "Settings",
    close: "Close",
  },
  es: {
    title: "Preferencias",
    subtitle: "Los cambios se sincronizan al instante en todas las pestañas abiertas.",
    darkMode: "Modo oscuro",
    language: "Idioma",
    fontSize: "Tamaño de letra",
    preview: "El veloz murciélago hindú comía feliz cardillo y kiwi.",
    thisTab: "Esta pestaña",
    lastSync: "Última actualización de otra pestaña",
    noSyncYet: "ninguna aún",
    hint: "Abre esta página en otra pestaña y cambia un ajuste.",
    settings: "Ajustes",
    close: "Cerrar",
  },
  fr: {
    title: "Préférences",
    subtitle: "Les modifications se synchronisent instantanément dans tous les onglets ouverts.",
    darkMode: "Mode sombre",
    language: "Langue",
    fontSize: "Taille du texte",
    preview: "Portez ce vieux whisky au juge blond qui fume.",
    thisTab: "Cet onglet",
    lastSync: "Dernière mise à jour d'un autre onglet",
    noSyncYet: "aucune pour l'instant",
    hint: "Ouvrez cette page dans un autre onglet et modifiez un réglage.",
    settings: "Paramètres",
    close: "Fermer",
  },
  de: {
    title: "Einstellungen",
    subtitle: "Änderungen werden sofort in allen geöffneten Tabs synchronisiert.",
    darkMode: "Dunkelmodus",
    language: "Sprache",
    fontSize: "Schriftgröße",
    preview: "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.",
    thisTab: "Dieser Tab",
    lastSync: "Letzte Änderung aus einem anderen Tab",
    noSyncYet: "noch keine",
    hint: "Öffne diese Seite in einem anderen Tab und ändere eine Einstellung.",
    settings: "Einstellungen",
    close: "Schließen",
  },
  hi: {
    title: "पसंद",
    subtitle: "बदलाव सभी खुले टैब में तुरंत सिंक होते हैं।",
    darkMode: "डार्क मोड",
    language: "भाषा",
    fontSize: "फ़ॉन्ट आकार",
    preview: "यह पूर्वावलोकन पाठ फ़ॉन्ट आकार दिखाता है।",
    thisTab: "यह टैब",
    lastSync: "दूसरे टैब से आख़िरी बदलाव",
    noSyncYet: "अभी कोई नहीं",
    hint: "इस पेज को दूसरे टैब में खोलें और कोई सेटिंग बदलें।",
    settings: "सेटिंग्स",
    close: "बंद करें",
  },
};
