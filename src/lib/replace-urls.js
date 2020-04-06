const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const isEligible = require("./is-eligible");

const getAssetPath = (url) => {
  return url
    .split(/(\?|%3F)/) // get rid off query params
    .shift() // take first element
    .replace(/(\.\.\/|\.\/)/g, "") // remove ../ and ./
    .replace("assets/", ""); // remove assets/
};

const assetify = (url) => {
  const assetPath = getAssetPath(url);
  return `{{ '${assetPath}' | asset_url }}`;
};

const updateImages = (document) => {
  const img = document.querySelectorAll("img");

  img.forEach((el) => {
    if (!isEligible(el.src)) return;
    el.src = assetify(el.src);
  });
};

const updateLinks = (document) => {
  const css = document.querySelectorAll('link[rel="stylesheet"]');

  css.forEach((el) => {
    if (!isEligible(el.href)) return;
    el.href = assetify(el.href);
  });
};

const updateScripts = (document) => {
  const js = document.querySelectorAll("script[src]");

  js.forEach((el) => {
    if (!isEligible(el.src)) return;
    el.src = assetify(el.src);
  });
};

module.exports = ({ filePath, fileContent }) => {
  const dom = new JSDOM(fileContent);

  // Prime example of anti-pure functions :)
  updateImages(dom.window.document);
  updateLinks(dom.window.document);
  updateScripts(dom.window.document);

  return {
    filePath,
    fileContent: dom.serialize(),
  };
};
