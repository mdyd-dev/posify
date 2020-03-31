const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = ({ filePath, html }) => {
  const dom = new JSDOM(html);

  const forms = dom.window.document.querySelectorAll('form[action]');

  form.forEach(el => {
    const action = el.action;
    action = '/__form';
  });

  return {
    filePath,
    html: dom.serialize()
  };
};
