const fs = require('fs');

module.exports = ({ filePath, html, input, output }) => {
  const outputPath = filePath.replace(input, output);
  fs.writeFileSync(outputPath, html);
  return { filePath, html }
};
