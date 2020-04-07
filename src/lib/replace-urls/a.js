const { isEligible } = require('./utils');

module.exports = (document) => {
  const a = document.querySelectorAll('a[href]');

  a.forEach(el => {
    if (!isEligible(el.href)) return;

    el.href = el.href.replace(/\.html?$/, '');
  });
};
