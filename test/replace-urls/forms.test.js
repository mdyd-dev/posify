const fs = require("fs");
const input = fs.readFileSync("./test/fixtures/urls.html").toString();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(input);
const doc = dom.window.document;

const updateForms = require("../../src/lib/replace-urls/form");
const updatedDoc = updateForms(doc);

describe("Form action", () => {
  const forms = updatedDoc.querySelectorAll('form[action]');
  test('Is replaced with /__form', () => {
    [...forms].map(form => {
      expect(form.action).toBe('/__form');
    })
  });
});

describe("Form onsubmit", () => {
  const forms = updatedDoc.querySelectorAll('form[onsubmit]');

  test('Is removed', () => {
    [...forms].map(form => {
      expect(form.onsubmit).toBe.falsy;
    })
  });
});

describe("Form that should not be touched", () => {
  const forms = updatedDoc.querySelectorAll('form:not([action])');

  test('Is untouched', () => {
    expect(forms.length).toBe(1);
  })
});
