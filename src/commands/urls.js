const { Command, flags } = require("@oclif/command");
const glob = require("globby");

const getFile = require("../lib/utils/get-file");
const saveFile = require("../lib/utils/save-file");
const replaceUrls = require("../lib/replace-urls");

class UrlsCommand extends Command {
  async run() {
    const { flags } = this.parse(UrlsCommand);

    let files = await glob(`**/app/views/pages/**/*.html`);

    try {
      files.map(getFile).map(replaceUrls).map(saveFile);
      console.log(`Updated urls in ${files.length} files.`);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

UrlsCommand.description = `Update relative paths to use platformOS CDN
Find and replace urls in html files, mostly needed for assets and forms.
It will also remove any onsubmit attributes from forms.
`;

module.exports = UrlsCommand;
