const fs = require("fs");

const replaceUrls = require("../../src/lib/replace-urls");

const input = fs.readFileSync("./test/fixtures/urls.html").toString();
const { fileContent } = replaceUrls({ filePath: "", fileContent: input });

/* TODO
  Split into its own files
  Dont use .indexOf - use JSDOM and check concrete values
*/

describe("Link CSS", () => {
  const expected = [
    "{{ 'styles/test123/assets/style.css' | asset_url }}",
    "https://example.com/assets/test123/assets/styles/style.css",
    "//example.com/assets/styles/test123/assets/style.css",
    "javascript:alert(this);",
  ];

  expected.forEach((res) => {
    const actual = fileContent.indexOf(res) > 0;

    test(res, () => {
      expect(actual).toBe(true);
    });
  });
});

describe("External JS", () => {
  const expected = [
    "{{ 'scripts/test123/assets/app.js' | asset_url }}",
    "https://example.com/assets/scripts/test123/assets/app.js",
    "//example.com/assets/scripts/test123/assets/app.js",
  ];

  expected.forEach((res) => {
    const actual = fileContent.indexOf(res) > 0;

    test(res, () => {
      expect(actual).toBe(true);
    });
  });
});

describe("Images", () => {
  const expected = [
    "{{ 'images/test123/assets/my_image+2.png' | asset_url }}",
    "https://example.com/assets/images/test123/assets/my_image+2.png",
    "data:image/jpeg;base64,/",
  ];

  expected.forEach((res) => {
    const actual = fileContent.indexOf(res) > 0;

    test(res, () => {
      expect(actual).toBe(true);
    });
  });
});

// TODO
describe.skip("Links", () => {});
describe.skip("Favicon", () => {});
