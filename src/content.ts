import type { Language } from "./settings";

export type Segment = string | { em: string };

export interface ArticleSection {
  heading: string;
  paragraphs: Segment[][];
}

export interface PageContent {
  heroAlt: string;
  article: ArticleSection[];
  about: ArticleSection[];
  letraset: { alt: string; caption: string; credit: string };
}

export const ARTICLE_SOURCE_URL = "https://en.wikipedia.org/wiki/Lorem_ipsum";
export const ARTICLE_LICENSE_URL = "https://creativecommons.org/licenses/by-sa/4.0/";
export const LETRASET_CREDIT_URL = "https://commons.wikimedia.org/wiki/File:Letraset_Lorem_Ipsum.jpg";

export const SAMPLE_PASSAGE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LOREM = { em: "Lorem ipsum" };
const DE_FINIBUS = { em: "De finibus" };
const DE_FINIBUS_FULL = { em: "De finibus bonorum et malorum" };
const BREAK_OFF = { em: "Neque porro quisquam est qui do-" };
const CONTINUE = { em: "lorem ipsum ..." };
const CONSECTETUR = { em: "consectetur" };
const BEFORE_AFTER = { em: "Before & After" };
const QUOUSQUE = { em: "Quousque tandem abutere" };

export const CONTENT: Record<Language, PageContent> = {
  en: {
    heroAlt: "GDG VIT banner with the Google Developer Groups brackets logo",
    article: [
      {
        heading: "Meaning",
        paragraphs: [
          [
            "Despite originating in ",
            DE_FINIBUS,
            ", the text has undergone slight changes, notably the cutting off of the ",
            { em: "do-" },
            " in ",
            { em: "dolorem" },
            " and replacing of the suffix in ",
            { em: "adipiscing" },
            " and more. As a result of this, the text has no significant meaning in Latin.",
          ],
        ],
      },
      {
        heading: "Origins",
        paragraphs: [
          [
            "The ",
            LOREM,
            " text is derived from sections 1.10.32 and 1.10.33 of Cicero's ",
            DE_FINIBUS_FULL,
            ". The physical source may have been the 1914 Loeb Classical Library edition of ",
            DE_FINIBUS,
            ', where the Latin text, presented on the left-hand (even) pages, breaks off on page 34 with "',
            BREAK_OFF,
            '" and continues on page 36 with "',
            CONTINUE,
            '". The ',
            LOREM,
            " text continues with excerpts that appear to generally match the layouts of pages 56, 70, and 118, suggesting that the layout of the Loeb book was the source of the dummy text seen today.",
          ],
          [
            "The first published explanation of the text's origin is attributed to Richard McClintock, a Latin scholar at Hampden–Sydney College. McClintock connected ",
            LOREM,
            " to Cicero's writing sometime before 1982 by searching for recorded uses of the Latin word ",
            CONSECTETUR,
            ", which was rarely used in classical literature. McClintock first published his discovery in a 1994 letter to John McWade, the editor of the ",
            BEFORE_AFTER,
            " magazine, contesting McWade's earlier claim that ",
            LOREM,
            " had no meaning. That letter claimed that the placeholder text had been used since the 1500s, but McClintock admitted in a 2026 interview that that date had been a guess with no evidence to back it up.",
          ],
          [
            "The version in use today is derived from Letraset transfer sheets first published in 1966. According to Letraset designer Dave Farey, the text was supplied by British librarian James Mosley as an alternative to the ",
            QUOUSQUE,
            ' text from elsewhere in Cicero\'s writings that had been used in typography manuals since the 1730s. Monotype typographer Dan Rhatigan theorized that the Letraset version deliberately "garbled" the original Latin text to better match the letter frequency of the English language.',
          ],
          [
            "The sections of ",
            DE_FINIBUS_FULL,
            " from which ",
            LOREM,
            " ultimately derives is one in which Cicero proposes that pleasure be obtained rationally rather than impulsively.",
          ],
        ],
      },
    ],
    about: [
      {
        heading: "What it is",
        paragraphs: [
          [
            LOREM,
            " is dummy text that designers and typesetters drop into a layout before the real copy is ready. It looks like ordinary prose but carries no meaning, so readers notice the typeface, spacing and structure of the page instead of what the words say.",
          ],
        ],
      },
      {
        heading: "The standard passage",
        paragraphs: [
          [
            "The most common version opens with the paragraph below. It is scrambled Latin taken from Cicero's ",
            DE_FINIBUS_FULL,
            ", written in 45 BC, with words cut, changed and added along the way.",
          ],
        ],
      },
      {
        heading: "Where you will find it",
        paragraphs: [
          [
            "Letraset dry-transfer sheets spread the text through the print industry from the late 1960s. Today it ships with word processors such as Apple Pages and Microsoft Word, appears in many LaTeX packages, and is used by content management systems like WordPress and Joomla! and by front-end libraries such as Semantic UI.",
          ],
        ],
      },
    ],
    letraset: {
      alt: "Letraset sample sheet printed with Lorem ipsum placeholder text",
      caption: "A Letraset sample sheet set in Lorem ipsum, probably from the 1970s.",
      credit: "Letraset, public domain, via Wikimedia Commons",
    },
  },
  es: {
    heroAlt: "Banner de GDG VIT con el logotipo de corchetes de Google Developer Groups",
    article: [
      {
        heading: "Significado",
        paragraphs: [
          [
            "A pesar de proceder de ",
            DE_FINIBUS,
            ", el texto ha sufrido ligeros cambios, en particular la supresión de ",
            { em: "do-" },
            " en ",
            { em: "dolorem" },
            " y la sustitución del sufijo en ",
            { em: "adipiscing" },
            ", entre otros. Como consecuencia, el texto no tiene un significado relevante en latín.",
          ],
        ],
      },
      {
        heading: "Orígenes",
        paragraphs: [
          [
            "El texto ",
            LOREM,
            " procede de las secciones 1.10.32 y 1.10.33 de ",
            DE_FINIBUS_FULL,
            ", de Cicerón. La fuente física pudo ser la edición de 1914 de ",
            DE_FINIBUS,
            " de la Loeb Classical Library, en la que el texto latino, impreso en las páginas pares de la izquierda, se interrumpe en la página 34 con «",
            BREAK_OFF,
            "» y continúa en la página 36 con «",
            CONTINUE,
            "». El texto ",
            LOREM,
            " continúa con fragmentos que parecen coincidir en general con la maquetación de las páginas 56, 70 y 118, lo que sugiere que la composición del libro de Loeb fue el origen del texto de relleno que se ve hoy.",
          ],
          [
            "La primera explicación publicada sobre el origen del texto se atribuye a Richard McClintock, latinista del Hampden–Sydney College. McClintock relacionó ",
            LOREM,
            " con la obra de Cicerón en algún momento antes de 1982 buscando usos documentados de la palabra latina ",
            CONSECTETUR,
            ", muy poco frecuente en la literatura clásica. McClintock publicó su hallazgo por primera vez en una carta de 1994 a John McWade, editor de la revista ",
            BEFORE_AFTER,
            ", en la que rebatía la afirmación anterior de McWade de que ",
            LOREM,
            " no tenía significado. Esa carta afirmaba que el texto de relleno se usaba desde el siglo XVI, pero McClintock admitió en una entrevista de 2026 que esa fecha había sido una suposición sin pruebas que la respaldaran.",
          ],
          [
            "La versión que se usa hoy procede de las hojas de transferencia Letraset publicadas por primera vez en 1966. Según el diseñador de Letraset Dave Farey, el texto lo proporcionó el bibliotecario británico James Mosley como alternativa al texto ",
            QUOUSQUE,
            ", tomado de otra parte de la obra de Cicerón, que se usaba en los manuales de tipografía desde la década de 1730. El tipógrafo de Monotype Dan Rhatigan planteó que la versión de Letraset «desordenó» a propósito el texto latino original para ajustarse mejor a la frecuencia de letras del inglés.",
          ],
          [
            "Las secciones de ",
            DE_FINIBUS_FULL,
            " de las que procede en última instancia ",
            LOREM,
            " son aquellas en las que Cicerón propone obtener el placer de forma racional y no impulsiva.",
          ],
        ],
      },
    ],
    about: [
      {
        heading: "Qué es",
        paragraphs: [
          [
            LOREM,
            " es un texto de relleno que diseñadores y tipógrafos colocan en una maqueta antes de tener el texto definitivo. Parece prosa normal pero no tiene significado, así que el lector se fija en la tipografía, el espaciado y la estructura de la página en lugar de en lo que dicen las palabras.",
          ],
        ],
      },
      {
        heading: "El pasaje estándar",
        paragraphs: [
          [
            "La versión más común empieza con el párrafo siguiente. Es latín desordenado tomado de ",
            DE_FINIBUS_FULL,
            ", de Cicerón, escrito en el 45 a. C., con palabras recortadas, cambiadas y añadidas por el camino.",
          ],
        ],
      },
      {
        heading: "Dónde encontrarlo",
        paragraphs: [
          [
            "Las hojas de transferencia en seco de Letraset difundieron el texto por la industria gráfica desde finales de los años sesenta. Hoy viene incluido en procesadores de texto como Apple Pages y Microsoft Word, aparece en muchos paquetes de LaTeX y lo usan gestores de contenidos como WordPress y Joomla! y bibliotecas front-end como Semantic UI.",
          ],
        ],
      },
    ],
    letraset: {
      alt: "Hoja de muestra de Letraset impresa con el texto de relleno Lorem ipsum",
      caption: "Una hoja de muestra de Letraset compuesta en Lorem ipsum, probablemente de los años setenta.",
      credit: "Letraset, dominio público, vía Wikimedia Commons",
    },
  },
  fr: {
    heroAlt: "Bannière GDG VIT avec le logo en crochets des Google Developer Groups",
    article: [
      {
        heading: "Sens",
        paragraphs: [
          [
            "Bien qu'il provienne du ",
            DE_FINIBUS,
            ", le texte a subi de légères modifications, notamment la suppression de ",
            { em: "do-" },
            " dans ",
            { em: "dolorem" },
            " et le remplacement du suffixe de ",
            { em: "adipiscing" },
            ", entre autres. De ce fait, le texte n'a pas de sens véritable en latin.",
          ],
        ],
      },
      {
        heading: "Origines",
        paragraphs: [
          [
            "Le texte ",
            LOREM,
            " est tiré des sections 1.10.32 et 1.10.33 du ",
            DE_FINIBUS_FULL,
            " de Cicéron. La source matérielle pourrait être l'édition de 1914 du ",
            DE_FINIBUS,
            " dans la Loeb Classical Library, où le texte latin, imprimé sur les pages paires de gauche, s'interrompt page 34 sur « ",
            BREAK_OFF,
            " » et reprend page 36 avec « ",
            CONTINUE,
            " ». Le texte ",
            LOREM,
            " se poursuit avec des extraits qui semblent correspondre globalement à la mise en page des pages 56, 70 et 118, ce qui laisse penser que la mise en page du livre de Loeb est à l'origine du faux texte que l'on voit aujourd'hui.",
          ],
          [
            "La première explication publiée de l'origine du texte est attribuée à Richard McClintock, latiniste au Hampden–Sydney College. McClintock a rattaché ",
            LOREM,
            " aux écrits de Cicéron avant 1982 en cherchant les occurrences connues du mot latin ",
            CONSECTETUR,
            ", rarement employé dans la littérature classique. McClintock a publié sa découverte pour la première fois en 1994 dans une lettre à John McWade, rédacteur en chef du magazine ",
            BEFORE_AFTER,
            ", contestant l'affirmation antérieure de McWade selon laquelle ",
            LOREM,
            " n'avait aucun sens. Cette lettre affirmait que le faux texte était utilisé depuis le XVIe siècle, mais McClintock a reconnu lors d'un entretien en 2026 que cette date n'était qu'une supposition sans aucune preuve.",
          ],
          [
            "La version utilisée aujourd'hui provient des feuilles de transfert Letraset publiées pour la première fois en 1966. Selon le designer de Letraset Dave Farey, le texte a été fourni par le bibliothécaire britannique James Mosley pour remplacer le texte ",
            QUOUSQUE,
            ", tiré d'un autre passage de Cicéron et utilisé dans les manuels de typographie depuis les années 1730. Le typographe de Monotype Dan Rhatigan a avancé que la version de Letraset avait volontairement « brouillé » le texte latin original pour mieux correspondre à la fréquence des lettres en anglais.",
          ],
          [
            "Les sections du ",
            DE_FINIBUS_FULL,
            " dont dérive finalement ",
            LOREM,
            " sont celles où Cicéron propose de rechercher le plaisir de manière rationnelle plutôt qu'impulsive.",
          ],
        ],
      },
    ],
    about: [
      {
        heading: "Ce que c'est",
        paragraphs: [
          [
            LOREM,
            " est un faux texte que les graphistes et les typographes placent dans une mise en page avant que le vrai texte soit prêt. Il ressemble à de la prose ordinaire mais n'a aucun sens, si bien que le lecteur remarque la police, l'espacement et la structure de la page plutôt que ce que disent les mots.",
          ],
        ],
      },
      {
        heading: "Le passage standard",
        paragraphs: [
          [
            "La version la plus courante commence par le paragraphe ci-dessous. C'est du latin brouillé tiré du ",
            DE_FINIBUS_FULL,
            " de Cicéron, écrit en 45 av. J.-C., avec des mots coupés, modifiés et ajoutés au fil du temps.",
          ],
        ],
      },
      {
        heading: "Où le trouver",
        paragraphs: [
          [
            "Les feuilles de transfert à sec Letraset ont répandu le texte dans l'imprimerie à partir de la fin des années 1960. Aujourd'hui, il est fourni avec des traitements de texte comme Apple Pages et Microsoft Word, figure dans de nombreux paquets LaTeX et sert dans des systèmes de gestion de contenu comme WordPress et Joomla! ainsi que dans des bibliothèques front-end comme Semantic UI.",
          ],
        ],
      },
    ],
    letraset: {
      alt: "Feuille d'échantillon Letraset imprimée avec le faux texte Lorem ipsum",
      caption: "Une feuille d'échantillon Letraset composée en Lorem ipsum, probablement des années 1970.",
      credit: "Letraset, domaine public, via Wikimedia Commons",
    },
  },
  de: {
    heroAlt: "GDG-VIT-Banner mit dem Klammer-Logo der Google Developer Groups",
    article: [
      {
        heading: "Bedeutung",
        paragraphs: [
          [
            "Obwohl der Text aus ",
            DE_FINIBUS,
            " stammt, wurde er leicht verändert, insbesondere durch das Abtrennen von ",
            { em: "do-" },
            " in ",
            { em: "dolorem" },
            " und das Ersetzen der Endung in ",
            { em: "adipiscing" },
            " sowie weitere Eingriffe. Deshalb hat der Text im Lateinischen keine nennenswerte Bedeutung.",
          ],
        ],
      },
      {
        heading: "Herkunft",
        paragraphs: [
          [
            "Der ",
            LOREM,
            "-Text stammt aus den Abschnitten 1.10.32 und 1.10.33 von Ciceros ",
            DE_FINIBUS_FULL,
            ". Als physische Vorlage diente möglicherweise die Ausgabe von ",
            DE_FINIBUS,
            " der Loeb Classical Library aus dem Jahr 1914, in der der lateinische Text auf den linken (geraden) Seiten auf Seite 34 mit „",
            BREAK_OFF,
            "“ abbricht und auf Seite 36 mit „",
            CONTINUE,
            "“ fortgesetzt wird. Der ",
            LOREM,
            "-Text setzt sich mit Auszügen fort, die im Großen und Ganzen dem Layout der Seiten 56, 70 und 118 entsprechen, was darauf hindeutet, dass das Layout des Loeb-Bandes die Quelle des heute bekannten Blindtexts war.",
          ],
          [
            "Die erste veröffentlichte Erklärung zur Herkunft des Textes wird Richard McClintock zugeschrieben, einem Latinisten am Hampden–Sydney College. McClintock brachte ",
            LOREM,
            " irgendwann vor 1982 mit Ciceros Schriften in Verbindung, indem er nach belegten Verwendungen des lateinischen Wortes ",
            CONSECTETUR,
            " suchte, das in der klassischen Literatur selten vorkommt. Seine Entdeckung veröffentlichte McClintock erstmals 1994 in einem Brief an John McWade, den Herausgeber des Magazins ",
            BEFORE_AFTER,
            ", und widersprach damit McWades früherer Behauptung, ",
            LOREM,
            " habe keine Bedeutung. In diesem Brief hieß es, der Platzhaltertext werde seit dem 16. Jahrhundert verwendet, doch McClintock räumte 2026 in einem Interview ein, dass diese Jahreszahl nur eine Vermutung ohne Belege gewesen sei.",
          ],
          [
            "Die heute verwendete Fassung geht auf Letraset-Abreibebögen zurück, die erstmals 1966 erschienen. Laut Letraset-Designer Dave Farey lieferte der britische Bibliothekar James Mosley den Text als Alternative zum ",
            QUOUSQUE,
            "-Text aus einer anderen Stelle in Ciceros Werk, der seit den 1730er-Jahren in Typografie-Handbüchern verwendet wurde. Der Monotype-Typograf Dan Rhatigan vermutete, dass die Letraset-Fassung den lateinischen Originaltext absichtlich „verstümmelte“, um der Buchstabenhäufigkeit des Englischen näherzukommen.",
          ],
          [
            "Die Abschnitte von ",
            DE_FINIBUS_FULL,
            ", auf die ",
            LOREM,
            " letztlich zurückgeht, sind jene, in denen Cicero vorschlägt, Lust vernünftig statt impulsiv zu suchen.",
          ],
        ],
      },
    ],
    about: [
      {
        heading: "Was es ist",
        paragraphs: [
          [
            LOREM,
            " ist ein Blindtext, den Designer und Setzer in ein Layout einfügen, bevor der richtige Text fertig ist. Er sieht aus wie gewöhnliche Prosa, hat aber keine Bedeutung, sodass Leser auf Schrift, Abstände und Aufbau der Seite achten statt auf den Inhalt der Wörter.",
          ],
        ],
      },
      {
        heading: "Die Standardpassage",
        paragraphs: [
          [
            "Die häufigste Fassung beginnt mit dem folgenden Absatz. Es ist verfremdetes Latein aus Ciceros ",
            DE_FINIBUS_FULL,
            ", geschrieben 45 v. Chr., wobei Wörter gekürzt, verändert und hinzugefügt wurden.",
          ],
        ],
      },
      {
        heading: "Wo man ihn findet",
        paragraphs: [
          [
            "Letraset-Abreibebögen verbreiteten den Text ab Ende der 1960er-Jahre in der Druckbranche. Heute wird er mit Textverarbeitungen wie Apple Pages und Microsoft Word ausgeliefert, steckt in vielen LaTeX-Paketen und wird von Content-Management-Systemen wie WordPress und Joomla! sowie von Frontend-Bibliotheken wie Semantic UI genutzt.",
          ],
        ],
      },
    ],
    letraset: {
      alt: "Letraset-Musterbogen mit dem Platzhaltertext Lorem ipsum",
      caption: "Ein Letraset-Musterbogen in Lorem ipsum, vermutlich aus den 1970er-Jahren.",
      credit: "Letraset, gemeinfrei, über Wikimedia Commons",
    },
  },
  hi: {
    heroAlt: "Google Developer Groups के ब्रैकेट लोगो वाला GDG VIT बैनर",
    article: [
      {
        heading: "अर्थ",
        paragraphs: [
          [
            DE_FINIBUS,
            " से उत्पन्न होने के बावजूद इस पाठ में हल्के बदलाव हुए हैं, ख़ासकर ",
            { em: "dolorem" },
            " में से ",
            { em: "do-" },
            " का कटना और ",
            { em: "adipiscing" },
            " के प्रत्यय का बदलना, आदि। इसी कारण लैटिन में इस पाठ का कोई ठोस अर्थ नहीं है।",
          ],
        ],
      },
      {
        heading: "उत्पत्ति",
        paragraphs: [
          [
            LOREM,
            " पाठ सिसरो की रचना ",
            DE_FINIBUS_FULL,
            " के खंड 1.10.32 और 1.10.33 से लिया गया है। इसका भौतिक स्रोत शायद ",
            DE_FINIBUS,
            ' का 1914 का लोब क्लासिकल लाइब्रेरी संस्करण था, जिसमें बाईं ओर के (सम) पृष्ठों पर छपा लैटिन पाठ पृष्ठ 34 पर "',
            BREAK_OFF,
            '" पर टूटता है और पृष्ठ 36 पर "',
            CONTINUE,
            '" से आगे बढ़ता है। ',
            LOREM,
            " पाठ आगे ऐसे अंशों के साथ चलता है जो मोटे तौर पर पृष्ठ 56, 70 और 118 के लेआउट से मेल खाते हैं, जिससे लगता है कि आज दिखने वाले डमी पाठ का स्रोत लोब पुस्तक का लेआउट ही था।",
          ],
          [
            "पाठ की उत्पत्ति की पहली प्रकाशित व्याख्या का श्रेय हैम्पडन–सिडनी कॉलेज के लैटिन विद्वान रिचर्ड मैकक्लिंटॉक को दिया जाता है। मैकक्लिंटॉक ने 1982 से कुछ समय पहले लैटिन शब्द ",
            CONSECTETUR,
            " के दर्ज प्रयोग खोजकर ",
            LOREM,
            " को सिसरो के लेखन से जोड़ा; यह शब्द शास्त्रीय साहित्य में बहुत कम मिलता है। मैकक्लिंटॉक ने अपनी खोज पहली बार 1994 में ",
            BEFORE_AFTER,
            " पत्रिका के संपादक जॉन मैकवेड को लिखे एक पत्र में प्रकाशित की, जिसमें उन्होंने मैकवेड के इस पुराने दावे का खंडन किया कि ",
            LOREM,
            " का कोई अर्थ नहीं है। उस पत्र में कहा गया था कि यह प्लेसहोल्डर पाठ 1500 के दशक से इस्तेमाल हो रहा है, लेकिन मैकक्लिंटॉक ने 2026 के एक साक्षात्कार में माना कि वह तारीख़ बिना किसी सबूत का अनुमान थी।",
          ],
          [
            "आज इस्तेमाल होने वाला संस्करण 1966 में पहली बार प्रकाशित लेट्रासेट ट्रांसफ़र शीटों से आया है। लेट्रासेट डिज़ाइनर डेव फ़ेरी के अनुसार, यह पाठ ब्रिटिश पुस्तकालयाध्यक्ष जेम्स मोस्ली ने ",
            QUOUSQUE,
            ' पाठ के विकल्प के रूप में दिया था, जो सिसरो के लेखन के किसी अन्य हिस्से से लिया गया था और 1730 के दशक से टाइपोग्राफ़ी पुस्तिकाओं में इस्तेमाल होता था। मोनोटाइप टाइपोग्राफ़र डैन रैटिगन का मानना था कि लेट्रासेट संस्करण ने अंग्रेज़ी भाषा में अक्षरों की आवृत्ति से बेहतर मेल के लिए मूल लैटिन पाठ को जानबूझकर "गड़बड़" किया था।',
          ],
          [
            DE_FINIBUS_FULL,
            " के जिन खंडों से ",
            LOREM,
            " अंततः निकला है, उनमें सिसरो प्रस्ताव रखते हैं कि सुख को आवेग से नहीं, बल्कि विवेक से प्राप्त किया जाना चाहिए।",
          ],
        ],
      },
    ],
    about: [
      {
        heading: "यह क्या है",
        paragraphs: [
          [
            LOREM,
            " एक डमी पाठ है जिसे डिज़ाइनर और टाइपसेटर असली सामग्री तैयार होने से पहले लेआउट में भर देते हैं। यह सामान्य गद्य जैसा दिखता है पर इसका कोई अर्थ नहीं होता, इसलिए पाठक शब्दों के अर्थ के बजाय पृष्ठ के टाइपफ़ेस, अंतराल और संरचना पर ध्यान देते हैं।",
          ],
        ],
      },
      {
        heading: "मानक अंश",
        paragraphs: [
          [
            "सबसे प्रचलित संस्करण नीचे दिए गए अनुच्छेद से शुरू होता है। यह सिसरो की 45 ई.पू. में लिखी रचना ",
            DE_FINIBUS_FULL,
            " से लिया गया उलझा हुआ लैटिन है, जिसमें समय के साथ शब्द काटे, बदले और जोड़े गए।",
          ],
        ],
      },
      {
        heading: "यह कहाँ मिलता है",
        paragraphs: [
          [
            "1960 के दशक के अंत से लेट्रासेट ड्राई-ट्रांसफ़र शीटों ने इस पाठ को मुद्रण उद्योग में फैलाया। आज यह Apple Pages और Microsoft Word जैसे वर्ड प्रोसेसरों के साथ आता है, कई LaTeX पैकेजों में मिलता है, और WordPress व Joomla! जैसे कंटेंट मैनेजमेंट सिस्टम तथा Semantic UI जैसी फ़्रंट-एंड लाइब्रेरियों में इस्तेमाल होता है।",
          ],
        ],
      },
    ],
    letraset: {
      alt: "Lorem ipsum प्लेसहोल्डर पाठ से छपी लेट्रासेट नमूना शीट",
      caption: "Lorem ipsum में छपी एक लेट्रासेट नमूना शीट, संभवतः 1970 के दशक की।",
      credit: "Letraset, सार्वजनिक डोमेन, Wikimedia Commons के माध्यम से",
    },
  },
};
