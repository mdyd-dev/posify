const { Command, flags } = require("@oclif/command");

const fs = require('fs');
const glob = require('globby');
const replaceUrls = require('../lib/replaceUrls');

const getHtml = filePath => {
  return {
    filePath,
    html: fs.readFileSync(filePath).toString()
  };
};

const save = ({ filePath, html }) => {
  fs.writeFileSync(`${filePath}`, html);
  return { filePath, html }
};

class AssetifyCommand extends Command {
  async run() {
    const { flags } = this.parse(AssetifyCommand);

    let files = await glob(`${flags.directory}/**/*.html`);

    files
      .map(getHtml)
      .map(replaceUrls)
      .map(save);
  }
}

AssetifyCommand.description = `Convert relative assets paths to asset_url
Find and replace asset urls in html files
`;

AssetifyCommand.flags = {
  directory: flags.string({
    char: "d",
    description: "Directory where the files are",
    required: true,
    default: '.'
  })
};

module.exports = AssetifyCommand;

