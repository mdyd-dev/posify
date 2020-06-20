const cheerio = require("cheerio");
const getFile = require("../utils/getFile");

const replaceUrls = require(".");
const { fileContent } = replaceUrls({ filePath: "./test/fixtures/urls.html", outputPath: "./test/tmp/index.html" });

describe.skip("Do not touch already assetified", () => {
  expected.map((exp) => {
    // const len = els.filter((i, el) => el.attribs.src === exp).length;

    test(exp, () => {
      expect(len).toBe(1);
    });
  });
});
