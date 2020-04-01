const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const isEligible = require("./is-eligible");

const getUrl = url => {
  return url
    .split(/(\?|%3F)/)              // get rid off query params
    .shift()                        // take first element
    .replace(/(\.\.\/|\.\/)/g, "")  // cut out ../ and ./
};

const assetify = url => {
  const assetPath = getUrl(url);
  return `{{ '${assetPath}' | asset_url }}`;
};

module.exports = ({ filePath, fileContent }) => {
  const dom = new JSDOM(fileContent);

  const img = dom.window.document.querySelectorAll("img");
  const css = dom.window.document.querySelectorAll('link[rel="stylesheet"]');
  const js = dom.window.document.querySelectorAll("script[src]");

  img.forEach(el => {
    if (!isEligible(el.src)) {
      return;
    }
    el.src = assetify(el.src);
  });

  css.forEach(el => {
    if (!isEligible(el.href)) {
      return;
    }
    el.href = assetify(el.href);
  });

  js.forEach(el => {
    if (!isEligible(el.src)) {
      return;
    }
    el.src = assetify(el.src);
  });

  return {
    filePath,
    fileContent: dom.serialize()
  };
};
