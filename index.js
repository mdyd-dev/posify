const fs = require('fs');
const glob = require('tiny-glob');
const assetify = require('./assetify');

const getHtml = filePath => {
  return {
    filePath,
    html: fs.readFileSync(filePath).toString()
  };
};

const saveAssetified = ({ filePath, html }) => {
  fs.renameSync(filePath, `${filePath}.bak`); // Make backup, just in case something goes wrong
  fs.writeFileSync(`${filePath}`, html); // Save assetified version in original path
};

(async function() {
  let files = await glob('app/**/{partials,pages,layouts}/**/*.{html,liquid}');

  files
    .map(getHtml)
    .map(assetify)
    .map(saveAssetified);
})();
