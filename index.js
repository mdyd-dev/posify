const fs = require('fs');
const glob = require('tiny-glob');
const assetify = require('./lib/assetify');

const getHtml = filePath => {
  return {
    filePath,
    html: fs.readFileSync(filePath).toString()
  };
};

const backup = ({ filePath, html }) => {
    fs.renameSync(filePath, `${filePath}.bak`);
    return {
        filePath, html
    }
}

const save = ({ filePath, html }) => {
    fs.writeFileSync(`${filePath}`, html);
    return { filePath, html }
};

(async function() {
  let files = await glob('app/**/{partials,pages,layouts}/**/*.{html,liquid}');

  files
    .map(getHtml)
    .map(assetify)
    .map(backup) // Make backup, just in case something goes wrong
    .map(save);  // Save assetified version in original path
})();
