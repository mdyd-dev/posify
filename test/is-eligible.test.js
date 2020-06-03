const isEligible = require("../src/lib/utils/is-eligible");

describe("Eligibility of page urls", () => {
  const domain = 'example.com';

  const truthy = [
    'https://example.com/haxxproxx/',
    'https://example.com/haxxproxx.html',
    'https://example.com/haxxproxx'
  ];

  truthy.forEach((res) => {
    const actual = isEligible(res, domain);

    test(res, () => {
      expect(actual).toBe(true);
    });
  });

  const falsy = [
    'https://example.com/haxxproxx.asp',
    'https://example.com/haxxproxx.php',
    'https://example.com/haxxproxx.cgi',
    'https://falsy.org/haxxproxx.html'
  ];

  falsy.forEach((res) => {
    const actual = isEligible(res, domain);

    test(res, () => {
      expect(actual).toBe(false);
    });
  });
});
