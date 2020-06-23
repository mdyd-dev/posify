const { Command, flags } = require("@oclif/command");
const glob = require("globby");
const CleanCSS = require("clean-css");

const getFile = require("../../lib/utils/getFile");
const saveFile = require("../../lib/utils/saveFile");

const minify = (filePath) => {
  const fileContent = getFile(filePath);
  const processed = new CleanCSS({ inline: false }).minify(fileContent);

  return {
    filePath,
    fileContent: processed.styles
  };
};

class CSSCommand extends Command {
  async run() {
    const { flags } = this.parse(CSSCommand);
    const files = await glob([`**/*.css`, `!**/*.min.css`]);

    if (files.length === 0) {
      return console.log("No CSS to minify.");
    }

    files.map(minify);

    console.log(`Minified ${files.length} CSS files.`);
  }
}

CSSCommand.description = `Minify CSS files
Makes your CSS files smaller and production ready
Ignores files that end with .min.css
`;

module.exports = CSSCommand;
