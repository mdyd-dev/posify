const { Command, flags } = require("@oclif/command");
const glob = require("globby");
const Terser = require("terser");

const getFile = require("../../lib/utils/getFile");
const saveFile = require("../../lib/utils/saveFile");

const minify = (filePath) => {
  const fileContent = getFile(filePath);
  const processed = Terser.minify(fileContent);

  return {
    filePath,
    fileContent: processed.code,
  };
};

class JSCommand extends Command {
  async run() {
    const { flags } = this.parse(JSCommand);
    const files = await glob([`**/*.js`, `!**/*.min.js`]);

    if (files.length === 0) {
      return console.log("No JS to minify.");
    }

    files.map(minify);

    console.log(`Minified ${files.length} JS files.`);
  }
}

JSCommand.description = `Minify JS code
Makes your JS files smaller and production ready
Ignores files that end with .min.js
`;

module.exports = JSCommand;
