const { Command, flags } = require("@oclif/command");
const glob = require("globby");

const getFile = require("../lib/utils/get-file");
const saveFile = require("../lib/utils/save-file");
const replaceUrls = require("../lib/replace-urls");

class UrlsCommand extends Command {
  async run() {
    const { flags } = this.parse(UrlsCommand);

    let files = await glob(`${flags.input}/**/*.html`);

    console.log(`Updating urls in ${files.length} files`);

    try {
      files.map(getFile).map(replaceUrls).map(saveFile);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

UrlsCommand.description = `Find relative paths and update them
Find and replace urls in html files, mostly needed for assets
`;

UrlsCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: ".",
  }),
};

module.exports = UrlsCommand;
