const cheerio = require('cheerio');
const fs = require("fs");
const input = fs.readFileSync("./test/fixtures/urls.html").toString();

const $ = cheerio.load(input, { decodeEntities: false });

const updateForms = require("../../src/lib/replace-urls/form");
const updatedDoc = updateForms($);

describe("Form action", () => {
  const forms = updatedDoc.find('form[action]');

  test('Is replaced with /__form', () => {
    forms.each((i, form) => {
      expect(form.attribs.action).toBe('/__form');
    })
  });
});

describe("Form onsubmit", () => {
  const forms = updatedDoc.find('form[onsubmit]');

  test('Is removed', () => {
    forms.each((i, form) => {
      expect(form.attribs.onsubmit).toBe.falsy;
    })
  });
});
