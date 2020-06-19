const { isEligible, assetify, isAssetified } = require("./utils");

module.exports = ($) => {
  const a = $("a[href]");

  a.each((i, el) => {
    if (!isEligible(el.attribs.href)) return;

    if (/\/assets\//.test(el.attribs.href)) {
      el.attribs.href = assetify(el.attribs.href);
    }

    if (isAssetified(el.attribs.href)) return;

    el.attribs.href = el.attribs.href.replace(/^http:/, "https:");
  });
};
