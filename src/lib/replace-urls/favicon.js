const assetify = require('../utils/assetify');
const isEligible = require('../utils/isEligible');

module.exports = ($) => {
  const favicon = $('link[rel*="icon"]');

  favicon.each((i, el) => {
    if (!isEligible(el.attribs.href)) return;

    el.attribs.href = assetify(el.attribs.href);

    el.attribs.href = el.attribs.href.replace(/^http:/, 'https:');
  });
};
