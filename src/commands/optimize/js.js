const { Command, flags } = require("@oclif/command");
const glob = require("globby");
const Terser = require("terser");

const getFile = require("../../lib/utils/get-file");
const saveFile = require("../../lib/utils/save-file");

const minify = ({ filePath, fileContent }) => {
  return {
    filePath,
    fileContent: Terser.minify(fileContent).code,
  };
};

class JSCommand extends Command {
  async run() {
    const { flags } = this.parse(JSCommand);
    const files = await glob([`${flags.input}/**/*.js`, `!${flags.input}/**/*.min.js`]);

    if (files.length === 0) {
      return console.log("No JS to minify.");
    }

    files.map(getFile).map(minify).map(saveFile);

    console.log(`Minified ${files.length} JS files.`);
  }
}

JSCommand.description = `Minify JS code
Makes your JS files smaller and production ready
Ignores files that end with .min.js
`;

JSCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: ".",
  }),
};

module.exports = JSCommand;
