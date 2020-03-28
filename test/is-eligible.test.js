const isEligible = require('../lib/is-eligible');

describe('Rejects urls we do not want to process', () => {
  const absolute = [
    'http://example.com/test.png',
    'https://example.com/test.png',
    'file:///c/file/test.png'
  ];

  test('Rejects absolute urls', async () => {
    absolute.forEach(url => {
      expect(isEligible(url)).toBe(false);
    });
  });
});

describe('Accepts urls we do want to process', () => {
  const relative = ['images/test.png', '../css/my file (2).css', './js/app.css'];

  test('Accepts relative urls', async () => {
    relative.forEach(url => {
      expect(isEligible(url)).toBe(true);
    });
  });
});
