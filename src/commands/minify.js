const { Command, flags } = require("@oclif/command");
const { spawn } = require("child_process");
const glob = require("globby");
const fs = require('fs');
const Terser = require('terser');
const CleanCSS = require('clean-css');
const ora = require('ora');

const getFile = require("../lib/get-file");
const saveFile = require("../lib/save-file");

const minifyJS = async inputDirectory => {
  const minify = ({ filePath, fileContent }) => {
    return {
      filePath,
      fileContent: Terser.minify(fileContent).code
    }
  }

  const files = await glob(`${inputDirectory}/**/*.js`);
  if (files.length === 0) {
    return console.log('No JS to minify.');
  }

  const spinner = ora(`Minifying ${files.length} JS files.`);

  files.map(getFile).map(minify).map(saveFile);

  spinner.succeed('JS minified.');
};

const minifyCSS = async inputDirectory => {
  const minify = ({ filePath, fileContent }) => {
    return {
      filePath,
      fileContent: new CleanCSS().minify(fileContent).styles
    }
  }

  const files = await glob(`${inputDirectory}/**/*.css`);
  if (files.length === 0) {
    return console.log('No CSS to minify.');
  }

  const spinner = ora(`Minifying ${files.length} CSS files.`);

  files.map(getFile).map(minify).map(saveFile);

  spinner.succeed('CSS minified.');
};

class MinifyCommand extends Command {
  async run() {
    const { flags } = this.parse(MinifyCommand);

    minifyJS(flags.input);
    minifyCSS(flags.input);
  }
}

MinifyCommand.description = `Minify JS (terser) and CSS (css-clean)
Makes your JS and CSS files smaller and more production ready.
`;

MinifyCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: "."
  })
};

module.exports = MinifyCommand;
