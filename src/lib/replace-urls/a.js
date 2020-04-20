const { isEligible, assetify } = require('./utils');

module.exports = (document) => {
  const a = document.querySelectorAll('a[href]');

  a.forEach(el => {
    if (!isEligible(el.href)) return;

    if (/html$/.test(el.href)) {
      el.href = el.href.replace(/\/index.html$/, '/');  // case 1: /testimonials/index.html => /testimonials/
      el.href = el.href.replace(/^index\.html$/, '/');     // case 2 (edge): index.html => /
    }

    if (/\/assets\//.test(el.href)) {
      el.href = assetify(el.href);
    }
  });
};
