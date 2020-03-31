const { Command, flags } = require("@oclif/command");
const glob = require('globby');

const getHtml = require('../lib/get-html');
const replaceActions = require('../lib/replace-actions');
const saveFile = require('../lib/save-file');

class Simpleform extends Command {
  async run() {
    const { flags } = this.parse(Simpleform);

    let files = await glob(`${flags.directory}/**/*.html`);

    files
      .map(getHtml)
      .map(replaceActions)
      .map(({ filePath, html }) => saveFile({ filePath, html, input, output }));
  }
}

Simpleform.description = `Converts forms to simple form
Downloads simpleform module
Replaces action attribute to use simpleform module that sends email to the app owner
`;

Simpleform.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: "."
  }),
  output: flags.string({
    char: "o",
    description: "Output directory",
    required: true,
    default: "."
  })
};

module.exports = Simpleform;
