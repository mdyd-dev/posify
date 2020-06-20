const cheerio = require('cheerio');

const getFile = require("../utils/getFile");
const saveFile = require("../utils/saveFile");

module.exports = ({ filePath, outputPath }) => {
  const fileContent = getFile(filePath);
  const $ = cheerio.load(fileContent, { decodeEntities: false });

  // Those functions take $ object, manipulate it, but
  // return only the elements that they are interested in.
  // Beware: Those are not pure functions!
  require('./css')($);
  require('./img')($);
  require('./js')($);
  require('./a')($);
  require('./form')($);
  require('./favicon')($);

  return saveFile({
    filePath: outputPath || filePath,
    fileContent: $.html(),
  });
};
