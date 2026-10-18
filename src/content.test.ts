import { describe, expect, it } from "vitest";
import { CONTENT } from "./content";
import { LANGUAGES } from "./settings";

const shape = (sections: (typeof CONTENT)["en"]["article"]) => sections.map((section) => section.paragraphs.length);

describe("CONTENT", () => {
  it.each(LANGUAGES)("gives %s the same page structure as English", (language) => {
    const text = CONTENT[language];
    expect(shape(text.article)).toEqual(shape(CONTENT.en.article));
    expect(shape(text.about)).toEqual(shape(CONTENT.en.about));
    for (const value of [text.heroAlt, text.letraset.alt, text.letraset.caption, text.letraset.credit]) {
      expect(value.trim()).not.toBe("");
    }
  });

  it("translates every non-English page", () => {
    for (const language of LANGUAGES.filter((code) => code !== "en")) {
      expect(CONTENT[language].article[0].heading).not.toBe(CONTENT.en.article[0].heading);
      expect(CONTENT[language].about[0].heading).not.toBe(CONTENT.en.about[0].heading);
    }
  });
});
