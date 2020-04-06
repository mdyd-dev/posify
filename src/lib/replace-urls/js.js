const { isEligible, assetify } = require('./utils');

module.exports = (document) => {
  const js = document.querySelectorAll("script[src]");

  js.forEach((el) => {
    if (!isEligible(el.src)) return;

    el.src = assetify(el.src);
  });
};
