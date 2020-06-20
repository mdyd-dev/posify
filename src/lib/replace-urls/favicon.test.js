const cheerio = require("cheerio");
const getFile = require("../utils/getFile");
const fileContent = getFile("./test/fixtures/urls.html");
const $ = cheerio.load(fileContent, { decodeEntities: false });
const els = require("./favicon")($);

describe.skip("Do not touch already assetified", () => {
  const expected = [
    's'
  ];

  expected.map((exp) => {
    const len = els.filter((i, el) => el.attribs.src === exp).length;

    test(exp, () => {
      expect(len).toBe(1);
    });
  });
});
