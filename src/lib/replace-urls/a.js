const assetify = require('../utils/assetify');
const isEligible = require('../utils/isEligible');

module.exports = ($) => {
  const a = $("a[href]");

  a.each((i, el) => {
    if (!isEligible(el.attribs.href)) return;

    if (/\/assets\//.test(el.attribs.href)) {
      el.attribs.href = assetify(el.attribs.href);
    }

    el.attribs.href = el.attribs.href.replace(/^http:/, "https:");
  });
};
