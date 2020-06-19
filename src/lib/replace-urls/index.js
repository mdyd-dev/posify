const cheerio = require('cheerio');

const updateImg = require('./img');
const updateCSS = require('./css');
const updateJS = require('./js');
const updateA = require('./a');
const updateForm = require('./form');
const updateFavicon = require('./favicon');

module.exports = ({ filePath, fileContent }) => {
  const $ = cheerio.load(fileContent, { decodeEntities: false });

  updateImg($);
  updateCSS($);
  updateJS($);
  updateA($);
  updateForm($);
  updateFavicon($);

  return {
    filePath,
    fileContent: $.html(),
  };
};
