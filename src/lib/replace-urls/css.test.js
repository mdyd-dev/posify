const cheerio = require("cheerio");
const getFile = require("../utils/getFile");
const fileContent = getFile("./test/fixtures/urls.html");
const $ = cheerio.load(fileContent, { decodeEntities: false });
const els = require("./css")($);

describe("Do not touch already assetified", () => {
  const expected = [
    "{{ 'styles/style.css' | asset_url }}",
    "{{ '../styles/style.css' | asset_url }}",
  ];

  expected.map((exp) => {
    const len = els.filter((i, el) => el.attribs.href === exp).length;

    test(exp, () => {
      expect(len).toBe(1);
    });
  });
});

describe("Assetify absolute URLs", () => {
  const expected = [
    "http://example.com/assets/styles/style.css",
    "https://example.com/assets/styles/style.css",
    "//example.com/assets/styles/style.css",
  ];

  expected.map((exp) => {
    const len = els.filter((i, el) => el.attribs.href === exp).length;

    test(exp, () => {
      expect(len).toBe(1);
    });
  });
});

describe("Edge cases", () => {
  const expected = ["javascript:alert(this);"];

  expected.map((exp) => {
    const len = els.filter((i, el) => el.attribs.href === exp).length;

    test("Edge cases", () => {
      expect(len).toBe(1);
    });
  });
});
