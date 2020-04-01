const fs = require('fs');

module.exports = ({ filePath, fileContent, input, output }) => {
  let outputPath = filePath;
  if (input && output) {
    outputPath = filePath.replace(input, output);
  }
  fs.writeFileSync(outputPath, fileContent);
  return { filePath, fileContent }
};
