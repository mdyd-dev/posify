const { isEligible, assetify } = require('./utils');

module.exports = (document) => {
  const css = document.querySelectorAll('link[rel="stylesheet"]');

  css.forEach((el) => {
    if (!isEligible(el.href)) return;

    el.href = assetify(el.href);
  });
};
