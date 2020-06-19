const { isEligible, assetify, isAssetified } = require('./utils');

module.exports = ($) => {
  const css = $('link[rel="stylesheet"]');

  css.each((i, el) => {
    if (!isEligible(el.attribs.href)) return;

    el.attribs.href = assetify(el.attribs.href);

    if (isAssetified(el.attribs.href)) return;

    el.attribs.href = el.attribs.href.replace(/^http:/, 'https:');
  });
};
