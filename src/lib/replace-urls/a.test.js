const cheerio = require('cheerio');
const getFile = require('../utils/getFile');
const fileContent = getFile("./test/fixtures/urls.html");
const $ = cheerio.load(fileContent, { decodeEntities: false });
const links = require("./a")($);

describe.skip("", () => {
  const expected = [
  ]

  alreadyAssetified.map((exp) => {
    const expectedLength = links.filter((i, el) => el.attribs.href === exp).length;

    test(exp, () => {
      expect(expectedLength).toBe(1)
    });
  });
});
