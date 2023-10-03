import { describe, expect, it } from "vitest";
import {
  analyze,
  generate,
  identifyLang,
  list,
  listPairs,
  translate,
} from "../src";

const deprecatedCodes = [
  {
    sourceLanguage: "af",
    targetLanguage: "nl",
  },
  {
    sourceLanguage: "ar",
    targetLanguage: "mt",
  },
  {
    sourceLanguage: "ar",
    targetLanguage: "mt_translit",
  },
  {
    sourceLanguage: "an",
    targetLanguage: "ca",
  },
  {
    sourceLanguage: "an",
    targetLanguage: "ca_pre2017",
  },
  {
    sourceLanguage: "an",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "be",
    targetLanguage: "ru",
  },
  {
    sourceLanguage: "br",
    targetLanguage: "fr",
  },
  {
    sourceLanguage: "bg",
    targetLanguage: "mk",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "eo",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "oc",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "oc_aran",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "an",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "en",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "en_US",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "fr",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "it",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "pt",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "pt_BR",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "pt_PTpre1990",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "ro",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "ca",
    targetLanguage: "sc",
  },
  {
    sourceLanguage: "crh",
    targetLanguage: "tr",
  },
  {
    sourceLanguage: "cy",
    targetLanguage: "en",
  },
  {
    sourceLanguage: "da",
    targetLanguage: "nn",
  },
  {
    sourceLanguage: "da",
    targetLanguage: "nb",
  },
  {
    sourceLanguage: "da",
    targetLanguage: "sv",
  },
  {
    sourceLanguage: "en",
    targetLanguage: "eo",
  },
  {
    sourceLanguage: "en",
    targetLanguage: "gl",
  },
  {
    sourceLanguage: "en",
    targetLanguage: "ca",
  },
  {
    sourceLanguage: "en",
    targetLanguage: "ca_iec2017",
  },
  {
    sourceLanguage: "en",
    targetLanguage: "ca_valencia",
  },
  {
    sourceLanguage: "en",
    targetLanguage: "sh",
  },
  {
    sourceLanguage: "en",
    targetLanguage: "sh_BS",
  },
  {
    sourceLanguage: "en",
    targetLanguage: "sh_HR",
  },
  {
    sourceLanguage: "en",
    targetLanguage: "sh_SR",
  },
  {
    sourceLanguage: "en",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "eo",
    targetLanguage: "en",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "eo",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "fr",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "gl",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "oc",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "oc_aran",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "pt",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "pt_BR",
  },
  {
    sourceLanguage: "eu",
    targetLanguage: "en",
  },
  {
    sourceLanguage: "eu",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "fr",
    targetLanguage: "eo",
  },
  {
    sourceLanguage: "fr",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "fr",
    targetLanguage: "ca",
  },
  {
    sourceLanguage: "fr",
    targetLanguage: "ca_pre2017",
  },
  {
    sourceLanguage: "fr",
    targetLanguage: "frp",
  },
  {
    sourceLanguage: "fr",
    targetLanguage: "oc",
  },
  {
    sourceLanguage: "fr",
    targetLanguage: "oc_gascon",
  },
  {
    sourceLanguage: "frp",
    targetLanguage: "fr",
  },
  {
    sourceLanguage: "gl",
    targetLanguage: "en",
  },
  {
    sourceLanguage: "gl",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "gl",
    targetLanguage: "pt",
  },
  {
    sourceLanguage: "sh",
    targetLanguage: "en",
  },
  {
    sourceLanguage: "sh",
    targetLanguage: "mk",
  },
  {
    sourceLanguage: "sh",
    targetLanguage: "sl",
  },
  {
    sourceLanguage: "hi",
    targetLanguage: "ur",
  },
  {
    sourceLanguage: "id",
    targetLanguage: "zlm",
  },
  {
    sourceLanguage: "is",
    targetLanguage: "en",
  },
  {
    sourceLanguage: "is",
    targetLanguage: "sv",
  },
  {
    sourceLanguage: "it",
    targetLanguage: "ca",
  },
  {
    sourceLanguage: "it",
    targetLanguage: "ca_pre2017",
  },
  {
    sourceLanguage: "it",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "it",
    targetLanguage: "sc",
  },
  {
    sourceLanguage: "kk",
    targetLanguage: "tt",
  },
  {
    sourceLanguage: "mk",
    targetLanguage: "bg",
  },
  {
    sourceLanguage: "mk",
    targetLanguage: "en",
  },
  {
    sourceLanguage: "mk",
    targetLanguage: "sh_BS",
  },
  {
    sourceLanguage: "mk",
    targetLanguage: "sh_HR",
  },
  {
    sourceLanguage: "mk",
    targetLanguage: "sh_SR",
  },
  {
    sourceLanguage: "mt",
    targetLanguage: "ar",
  },
  {
    sourceLanguage: "nl",
    targetLanguage: "af",
  },
  {
    sourceLanguage: "nn",
    targetLanguage: "da",
  },
  {
    sourceLanguage: "nn",
    targetLanguage: "nn_e",
  },
  {
    sourceLanguage: "nn",
    targetLanguage: "nb",
  },
  {
    sourceLanguage: "nn",
    targetLanguage: "sv",
  },
  {
    sourceLanguage: "nn_e",
    targetLanguage: "nn",
  },
  {
    sourceLanguage: "nb",
    targetLanguage: "da",
  },
  {
    sourceLanguage: "nb",
    targetLanguage: "nn",
  },
  {
    sourceLanguage: "nb",
    targetLanguage: "nn_e",
  },
  {
    sourceLanguage: "nb",
    targetLanguage: "sv",
  },
  {
    sourceLanguage: "oc",
    targetLanguage: "ca",
  },
  {
    sourceLanguage: "oc",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "oc_aran",
    targetLanguage: "ca",
  },
  {
    sourceLanguage: "oc_aran",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "oc",
    targetLanguage: "fr",
  },
  {
    sourceLanguage: "oc_gascon",
    targetLanguage: "fr",
  },
  {
    sourceLanguage: "pl",
    targetLanguage: "szl",
  },
  {
    sourceLanguage: "pt",
    targetLanguage: "ca",
  },
  {
    sourceLanguage: "pt",
    targetLanguage: "ca_pre2017",
  },
  {
    sourceLanguage: "pt",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "pt",
    targetLanguage: "gl",
  },
  {
    sourceLanguage: "ro",
    targetLanguage: "es",
  },
  {
    sourceLanguage: "ro",
    targetLanguage: "ca",
  },
  {
    sourceLanguage: "ro",
    targetLanguage: "ca_iec2017",
  },
  {
    sourceLanguage: "ru",
    targetLanguage: "be",
  },
  {
    sourceLanguage: "ru",
    targetLanguage: "uk",
  },
  {
    sourceLanguage: "sl",
    targetLanguage: "sh",
  },
  {
    sourceLanguage: "sl",
    targetLanguage: "sh_BS",
  },
  {
    sourceLanguage: "sl",
    targetLanguage: "sh_HR",
  },
  {
    sourceLanguage: "sl",
    targetLanguage: "sh_SR",
  },
  {
    sourceLanguage: "se",
    targetLanguage: "nb",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "an",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "ast",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "ca",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "ca_iec2017",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "ca_valencia",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "en",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "en_US",
  },
  {
    sourceLanguage: "es",
    targetLanguage: "it",
  },
  {
    sourceLanguage: "sv",
    targetLanguage: "da",
  },
  {
    sourceLanguage: "sv",
    targetLanguage: "is",
  },
  {
    sourceLanguage: "sv",
    targetLanguage: "nn",
  },
  {
    sourceLanguage: "sv",
    targetLanguage: "nb",
  },
  {
    sourceLanguage: "szl",
    targetLanguage: "pl",
  },
  {
    sourceLanguage: "tt",
    targetLanguage: "kk",
  },
  {
    sourceLanguage: "tr",
    targetLanguage: "crh",
  },
  {
    sourceLanguage: "uk",
    targetLanguage: "ru",
  },
  {
    sourceLanguage: "ur",
    targetLanguage: "hi",
  },
  {
    sourceLanguage: "zlm",
    targetLanguage: "id",
  },
];

describe("/listPairs", () => {
  it("excluding deprecated codes", async () => {
    const { responseData } = await listPairs();

    for (const code of deprecatedCodes) {
      expect(
        responseData.find(
          (c) =>
            c.sourceLanguage === code.sourceLanguage &&
            c.targetLanguage === code.targetLanguage
        )
      ).toBeUndefined();
    }
  });

  it("explicitly excluding deprecated codes", async () => {
    const { responseData } = await listPairs({
      params: { include_deprecated_codes: false },
    });

    for (const code of deprecatedCodes) {
      expect(
        responseData.find(
          (c) =>
            c.sourceLanguage === code.sourceLanguage &&
            c.targetLanguage === code.targetLanguage
        )
      ).toBeUndefined();
    }
  });

  it("including deprecated codes", async () => {
    const { responseData } = await listPairs({
      params: { include_deprecated_codes: true },
    });

    for (const code of deprecatedCodes) {
      expect(
        responseData.find(
          (c) =>
            c.sourceLanguage === code.sourceLanguage &&
            c.targetLanguage === code.targetLanguage
        )
      ).not.toBeUndefined();
    }
  });
});

describe("/list", () => {
  it("analyzers", async () => {
    const res = await list({ params: { q: "analysers" } });

    expect(Object.keys(res).length).toBeGreaterThan(0);
  });

  it("analysers", async () => {
    const res = await list({ params: { q: "analysers" } });

    expect(Object.keys(res).length).toBeGreaterThan(0);
  });

  it("generators", async () => {
    const res = await list({ params: { q: "generators" } });

    expect(Object.keys(res).length).toBeGreaterThan(0);
  });

  it("taggers", async () => {
    const res = await list({ params: { q: "taggers" } });

    expect(Object.keys(res).length).toBeGreaterThan(0);
  });

  it("disambiguators", async () => {
    const res = await list({ params: { q: "disambiguators" } });

    expect(Object.keys(res).length).toBeGreaterThan(0);
  });
});

describe("/translate", () => {
  it("Hello -> Hola (english to spanish)", async () => {
    const res = await translate({
      params: { langpair: "en|es", q: "Hello!" },
    });

    expect(res.responseData.translatedText).toEqual("Hola!");
  });
});

describe("/analyze", () => {
  it("analyze 'Hello!'", async () => {
    const res = await analyze({
      params: { lang: "en", q: "Hello!" },
    });

    expect(res[0][0]).toEqual("Hello/hello<ij>/hello<n><sg>");
    expect(res[0][1]).toEqual("Hello");
    expect(res[1][0]).toEqual("!./!.<sent>");
    expect(res[1][1]).toEqual("!.");
  });
});

describe("/analyse", () => {
  it("analyse 'Hello!'", async () => {
    const res = await analyze({
      params: { lang: "en", q: "Hello!" },
    });

    expect(res[0][0]).toEqual("Hello/hello<ij>/hello<n><sg>");
    expect(res[0][1]).toEqual("Hello");
    expect(res[1][0]).toEqual("!./!.<sent>");
    expect(res[1][1]).toEqual("!.");
  });
});

describe("/generate", () => {
  it("generate 'Hey, how are you? I'm good thanks!'", async () => {
    const res = await generate({
      params: { lang: "en", q: "Hey, how are you? I'm good thanks!" },
    });

    expect(res).toEqual([
      [
        "#Hey, how are you? I'm good thanks!",
        "^Hey, how are you? I'm good thanks!$",
      ],
    ]);
  });
});

describe("/identifyLang", () => {
  it("identify 'How is the weather?'", async () => {
    const res = await identifyLang({
      params: {
        q: "How is the weather?",
      },
    });

    expect(res.eng).toBeGreaterThan(0.8);
  });
});
