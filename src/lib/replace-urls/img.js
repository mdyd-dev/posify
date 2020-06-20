const assetify = require('../utils/assetify');
const isEligible = require('../utils/isEligible');

module.exports = ($) => {
  const img = $('img[src]');

  img.each((i, el) => {
    if (!isEligible(el.attribs.src)) return;

    el.attribs.src = assetify(el.attribs.src);

    el.attribs.src = el.attribs.src.replace(/^http:/, "https:"); // do not request http resources from https
  });

  return img;
};
