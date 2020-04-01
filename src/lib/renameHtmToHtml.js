const fs = require("fs");
const glob = require("globby");

module.exports = async domain => {
  const htmFiles = await glob(`${domain}/**/*.htm`);

  if (htmFiles.length > 0) {
    htmFiles.map(filePath => {
      fs.renameSync(filePath, `${filePath}l`);
    });
  }
}
