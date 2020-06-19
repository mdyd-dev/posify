const { isEligible, assetify, isAssetified } = require("./utils");

module.exports = ($) => {
  const img = $('img[src]');

  img.each((i, el) => {
    if (!isEligible(el.attribs.src)) return;

    el.attribs.src = assetify(el.attribs.src);

    if (isAssetified(el.attribs.src)) return;

    el.attribs.src = el.attribs.src.replace(/^http:/, "https:"); // do not request http resources from https
  });
};
