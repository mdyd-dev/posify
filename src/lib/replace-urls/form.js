const { isEligible } = require('./utils');

module.exports = (document) => {
  const forms = document.querySelectorAll('form[action]');

  forms.forEach(el => {
    if (!isEligible(el.action)) return;

    el.action = '/__form';
  });
};
