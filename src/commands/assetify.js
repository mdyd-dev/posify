const { Command, flags } = require("@oclif/command");

const glob = require("globby");

const getHtml = require("../lib/get-html");
const replaceUrls = require("../lib/replace-urls");
const saveFile = require("../lib/save-file");

class AssetifyCommand extends Command {
  async run() {
    const { flags } = this.parse(AssetifyCommand);

    let files = await glob(`${flags.input}/**/*.html`);

    files
      .map(getHtml)
      .map(replaceUrls)
      .map(({ filePath, html }) => saveFile({ filePath, html, input, output }));
  }
}

AssetifyCommand.description = `Convert relative assets paths to asset_url
Find and replace asset urls in html files
`;

AssetifyCommand.flags = {
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

module.exports = AssetifyCommand;
