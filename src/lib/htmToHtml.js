const fs = require("fs");
const globby = require("globby");

class HtmToHtml {
  apply(registerAction) {
    let dir;

    registerAction("beforeStart", ({ options }) => {
      dir = options.directory;
    });

    registerAction('afterFinish', async () => {
      const files = await globby(`${dir}/**/*.htm`);
      
      if (!files) {
        return;
      }

      await files.map(filePath => {
        fs.renameSync(filePath, `${filePath}l`);
      });
    });
  }
}

module.exports = HtmToHtml;
