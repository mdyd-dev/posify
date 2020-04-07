const { Command, flags } = require("@oclif/command");
const glob = require("globby");
const CleanCSS = require("clean-css");

const getFile = require("../../lib/utils/get-file");
const saveFile = require("../../lib/utils/save-file");

const minify = ({ filePath, fileContent }) => {
  return {
    filePath,
    fileContent: new CleanCSS().minify(fileContent).styles,
  };
};

class CSSCommand extends Command {
  async run() {
    const { flags } = this.parse(CSSCommand);
    const files = await glob([`${flags.input}/**/*.css`, `!${flags.input}/**/*.min.css`]);

    if (files.length === 0) {
      return console.log("No CSS to minify.");
    }

    files.map(getFile).map(minify).map(saveFile);

    console.log(`Minified ${files.length} CSS files.`);
  }
}

CSSCommand.description = `Minify CSS files
Makes your CSS files smaller and production ready
Ignores files that end with .min.css
`;

CSSCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: ".",
  }),
};

module.exports = CSSCommand;
