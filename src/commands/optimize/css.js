const { Command, flags } = require("@oclif/command");
const glob = require("globby");
const CleanCSS = require('clean-css');
const ora = require('ora');

const getFile = require("../../lib/get-file");
const saveFile = require("../../lib/save-file");

const minify = ({ filePath, fileContent }) => {
  return {
    filePath,
    fileContent: new CleanCSS().minify(fileContent).styles
  }
}

class CSSCommand extends Command {
  async run() {
    const { flags } = this.parse(CSSCommand);
    const files = await glob(`${flags.input}/**/*.css`);

    if (files.length === 0) {
      return console.log('No CSS to minify.');
    }

    const spinner = ora(`Minifying ${files.length} CSS files.`);

    files.map(getFile).map(minify).map(saveFile);

    spinner.succeed('CSS minified.');
  }
}

CSSCommand.description = `Minify CSS using css-clean
Makes your CSS files smaller and production ready.
`;

CSSCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: "."
  })
};

module.exports = CSSCommand;
