const fs = require("fs");

module.exports = ({ filePath, fileContent }) => {
  try {
    fs.writeFileSync(filePath, fileContent);
  } catch(e) {
    throw e;
  }

  return true;
};
