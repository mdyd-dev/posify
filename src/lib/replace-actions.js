const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = ({ filePath, fileContent }) => {
  const dom = new JSDOM(fileContent);

  const forms = dom.window.document.querySelectorAll('form[action]');

  forms.forEach(el => {
    el.action = '/__form';
  });

  return {
    filePath,
    fileContent: dom.serialize()
  };
};
