const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const isEligible = require('./is-eligible');

const assetify = url => {
  return `{{ '${url}' | asset_url }}`;
};

module.exports = ({ filePath, html }) => {
  const dom = new JSDOM(html);

  const img = dom.window.document.querySelectorAll('img');
  const css = dom.window.document.querySelectorAll('link[rel="stylesheet"]');
  const js = dom.window.document.querySelectorAll('script[src]');

  img.forEach(el => {
    const url = el.src.split('?').shift();

    if (isEligible(url)) {
      el.src = assetify(url);
    }
  });

  css.forEach(el => {
    const url = el.href.split('?').shift();

    if (isEligible(url)) {
      el.href = assetify(url);
    }
  });

  js.forEach(el => {
    const url = el.src.split('?').shift();

    if (isEligible(url)) {
      el.src = assetify(url);
    }
  });

  return {
    filePath,
    html: dom.serialize()
  };
};
