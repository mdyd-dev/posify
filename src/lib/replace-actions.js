const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = ({ filePath, html }) => {
  const dom = new JSDOM(html);

  const forms = dom.window.document.querySelectorAll('form[action]');

  forms.forEach(el => {
    el.action = '/__form';
  });

  return {
    filePath,
    html: dom.serialize()
  };
};
