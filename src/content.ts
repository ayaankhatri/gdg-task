export type Segment = string | { em: string };

export interface ArticleSection {
  heading: string;
  paragraphs: Segment[][];
}

export const ARTICLE_SOURCE_URL = "https://en.wikipedia.org/wiki/Lorem_ipsum";
export const ARTICLE_LICENSE_URL = "https://creativecommons.org/licenses/by-sa/4.0/";

export const ARTICLE: ArticleSection[] = [
  {
    heading: "Meaning",
    paragraphs: [
      [
        "Despite originating in ",
        { em: "De finibus" },
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
        { em: "Lorem ipsum" },
        " text is derived from sections 1.10.32 and 1.10.33 of Cicero's ",
        { em: "De finibus bonorum et malorum" },
        ". The physical source may have been the 1914 Loeb Classical Library edition of ",
        { em: "De finibus" },
        ', where the Latin text, presented on the left-hand (even) pages, breaks off on page 34 with "',
        { em: "Neque porro quisquam est qui do-" },
        '" and continues on page 36 with "',
        { em: "lorem ipsum ..." },
        '". The ',
        { em: "Lorem ipsum" },
        " text continues with excerpts that appear to generally match the layouts of pages 56, 70, and 118, suggesting that the layout of the Loeb book was the source of the dummy text seen today.",
      ],
      [
        "The first published explanation of the text's origin is attributed to Richard McClintock, a Latin scholar at Hampden–Sydney College. McClintock connected ",
        { em: "Lorem ipsum" },
        " to Cicero's writing sometime before 1982 by searching for recorded uses of the Latin word ",
        { em: "consectetur" },
        ", which was rarely used in classical literature. McClintock first published his discovery in a 1994 letter to John McWade, the editor of the ",
        { em: "Before & After" },
        " magazine, contesting McWade's earlier claim that ",
        { em: "Lorem ipsum" },
        " had no meaning. That letter claimed that the placeholder text had been used since the 1500s, but McClintock admitted in a 2026 interview that that date had been a guess with no evidence to back it up.",
      ],
      [
        "The version in use today is derived from Letraset transfer sheets first published in 1966. According to Letraset designer Dave Farey, the text was supplied by British librarian James Mosley as an alternative to the ",
        { em: "Quousque tandem abutere" },
        ' text from elsewhere in Cicero\'s writings that had been used in typography manuals since the 1730s. Monotype typographer Dan Rhatigan theorized that the Letraset version deliberately "garbled" the original Latin text to better match the letter frequency of the English language.',
      ],
      [
        "The sections of ",
        { em: "De finibus bonorum et malorum" },
        " from which ",
        { em: "Lorem ipsum" },
        " ultimately derives is one in which Cicero proposes that pleasure be obtained rationally rather than impulsively.",
      ],
    ],
  },
];
