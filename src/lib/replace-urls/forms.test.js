const cheerio = require('cheerio');
const getFile = require('../utils/getFile');
const fileContent = getFile("./test/fixtures/urls.html");
const $ = cheerio.load(fileContent, { decodeEntities: false });

const els = require("./form")($);

describe("Form action", () => {
  const forms = els.find('form[action]');
  const expected = '__form';

  test('Is replaced with /__form', () => {
    forms.each((i, form) => {
      expect(form.attribs.action).toBe(expected);
    })
  });
});

describe("Form onsubmit", () => {
  const forms = els.find('form[onsubmit]');

  test('Is removed', () => {
    forms.each((i, form) => {
      expect(form.attribs.onsubmit).toBe.falsy;
    })
  });
});
