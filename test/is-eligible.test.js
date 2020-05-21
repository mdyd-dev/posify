const {isEligible} = require('../src/lib/replace-urls/utils');

describe('Rejects urls we do not want to process', () => {
  const absolute = [
    'http://example.com/test.png',
    'https://example.com/test.png',
    'file:///c/file/test.png'
  ];

  absolute.forEach(url => {
    test(url, () => {
      expect(isEligible(url)).toBe(false);
    });
  });

  test('Rejects already assetified urls', () => {
    const url = "{{ 'img/test.png' | asset_url }}";
    expect(isEligible(url)).toBe(false);
  });
});

describe('Accepts urls we do want to process', () => {
  const relative = ['images/test.png', '../css/my file (2).css', './js/app.css'];

  test('Accepts relative urls', () => {
    relative.forEach(url => {
      expect(isEligible(url)).toBe(true);
    });
  });
});
