const { isEligible, assetify } = require('./utils');

module.exports = (document) => {
  const favicon = document.querySelectorAll('link[rel*="icon"]');

  favicon.forEach((el) => {
    if (!isEligible(el.href)) return;

    el.href = assetify(el.href);
  });
};
