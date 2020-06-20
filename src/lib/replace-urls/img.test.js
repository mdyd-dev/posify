const cheerio = require("cheerio");
const getFile = require("../utils/getFile");
const fileContent = getFile("./test/fixtures/urls.html");
const $ = cheerio.load(fileContent, { decodeEntities: false });
const els = require("./img")($);

describe("Do not touch already assetified", () => {
  const expected = [
    "{{ 'images/my_image+2.png' | asset_url }}",
    "{{ '../images/my_image+2.png' | asset_url }}",
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
    "http://example.com/assets/images/my_image+2.png",
    "https://example.com/assets/images/my_image+2.png",
  ];

  expected.map((exp) => {
    const len = els.filter((i, el) => el.attribs.src === exp).length;

    test(exp, () => {
      expect(len).toBe(1);
    });
  });
});

describe("Edge cases", () => {
  const expected = ["data:image/jpeg;base64,/"];

  expected.map((exp) => {
    const len = els.filter((i, el) => el.attribs.src === exp).length;

    test(exp, () => {
      expect(len).toBe(1);
    });
  });
});
