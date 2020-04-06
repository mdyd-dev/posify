const { isEligible, assetify } = require('./utils');

module.exports = (document) => {
  const img = document.querySelectorAll("img");

  img.forEach((el) => {
    if (!isEligible(el.src)) return;

    el.src = assetify(el.src);
  });
};
