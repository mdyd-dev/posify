const assetify = require('../utils/assetify');
const isEligible = require('../utils/isEligible');

module.exports = ($) => {
  const js = $("script[src]");

  js.each((i, el) => {
    if (!isEligible(el.attribs.src)) return;

    el.attribs.src = assetify(el.attribs.src);
    el.attribs.src = el.attribs.src.replace(/^http:/, "https:");
  });

  return js;
};
