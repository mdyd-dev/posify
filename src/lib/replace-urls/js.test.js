const cheerio = require("cheerio");
const getFile = require("../utils/getFile");
const fileContent = getFile("./test/fixtures/urls.html");
const $ = cheerio.load(fileContent, { decodeEntities: false });
const els = require("./js")($);

describe("Do not touch already assetified", () => {
  const expected = [
    "{{ 'scripts/app.js' | asset_url }}",
    "{{ '../scripts/app.js' | asset_url }}",
  ];

  expected.map((exp) => {
    const len = els.filter((i, el) => el.attribs.src === exp).length;

    test(exp, () => {
      expect(len).toBe(1);
    });
  });
});

describe("Assetify absolute URLs", () => {
  const expected = [
    "http://example.com/assets/scripts/app.js",
    "https://example.com/assets/scripts/app.js",
    "//example.com/assets/scripts/app.js",
  ];

  expected.map((exp) => {
    const len = els.filter((i, el) => el.attribs.src === exp).length;

    test(exp, () => {
      expect(len).toBe(1);
    });
  });
});
