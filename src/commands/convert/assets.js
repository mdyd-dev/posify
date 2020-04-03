const { Command, flags } = require("@oclif/command");
const glob = require("globby");

const getFile = require("../../lib/get-file");
const replaceUrls = require("../../lib/replace-urls");
const saveFile = require("../../lib/save-file");

const ext = "html";

class AssetsCommand extends Command {
  async run() {
    const { flags } = this.parse(AssetsCommand);
    let files = await glob(`${flags.input}/**/*.html`);

    files
      .map(getFile)
      .map(replaceUrls)
      .map(saveFile);
  }
}

AssetsCommand.description = `Convert relative assets paths to asset_url
Find and replace asset urls in html files
`;

AssetsCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: "."
  })
};

module.exports = AssetsCommand;
