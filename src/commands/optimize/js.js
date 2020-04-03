const { Command, flags } = require("@oclif/command");
const glob = require("globby");
const Terser = require('terser');

const ora = require('ora');

const getFile = require("../../lib/get-file");
const saveFile = require("../../lib/save-file");

const minify = ({ filePath, fileContent }) => {
  return {
    filePath,
    fileContent: Terser.minify(fileContent).code
  }
}

class JSCommand extends Command {
  async run() {
    const { flags } = this.parse(JSCommand);
    const files = await glob(`${flags.input}/**/*.js`);

    if (files.length === 0) {
      return console.log('No JS to minify.');
    }

    const spinner = ora(`Minifying ${files.length} JS files.`);

    files.map(getFile).map(minify).map(saveFile);

    spinner.succeed('JS minified.');
  }
}

JSCommand.description = `Minify JS using Terser
Makes your JS files smaller and production ready.
`;

JSCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: "."
  })
};

module.exports = JSCommand;
