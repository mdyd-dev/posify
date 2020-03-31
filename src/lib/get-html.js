const fs = require('fs');

module.exports = filePath => {
  return {
    filePath,
    html: fs.readFileSync(filePath).toString()
  };
};
