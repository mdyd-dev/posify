const fs = require('fs');

const replaceUrls = require('../src/lib/replace-urls');
const input = fs.readFileSync('./test/fixtures/test.html').toString();
const { fileContent } = replaceUrls({ filePath: '', fileContent: input });

describe('Link CSS', () => {
  const expected = [
    "{{ 'styles/style.css' | asset_url }}",
    "{{ '../styles/style.css' | asset_url }}",
    'http://example.com/assets/styles/style.css',
    'https://example.com/assets/styles/style.css',
    '//example.com/assets/styles/style.css',
    'javascript:alert(this);'
  ];

  expected.forEach(res => {
    const actual = fileContent.indexOf(res) > 0;

    test(res, () => {
      expect(actual).toBe(true);
    });
  });
});

describe('External JS', () => {
  const expected = [
    "{{ 'scripts/app.js' | asset_url }}",
    "{{ '../scripts/app.js' | asset_url }}",
    'http://example.com/assets/scripts/app.js',
    'https://example.com/assets/scripts/app.js',
    '//example.com/assets/scripts/app.js'
  ];

  expected.forEach(res => {
    const actual = fileContent.indexOf(res) > 0;

    test(res, () => {
      expect(actual).toBe(true);
    });
  });
});

describe('Images', () => {
  const expected = [
    "{{ 'images/my_image+2.png' | asset_url }}",
    "{{ '../images/my_image+2.png' | asset_url }}",
    'http://example.com/assets/images/my_image+2.png',
    'https://example.com/assets/images/my_image+2.png',
    'data:image/jpeg;base64,/'
  ];

  expected.forEach(res => {
    const actual = fileContent.indexOf(res) > 0;

    test(res, () => {
      expect(actual).toBe(true);
    });
  });
});
