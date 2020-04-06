const { Command, flags } = require("@oclif/command");
const glob = require("globby");
const ora = require("ora");

const getFile = require("../lib/get-file");
const replaceUrls = require("../lib/replace-urls");
const saveFile = require("../lib/save-file");

class UrlsCommand extends Command {
  async run() {
    const { flags } = this.parse(UrlsCommand);

    let files = await glob(`${flags.input}/**/*.html`);

    const spinner = ora(`Updating urls in ${files.length} files`).start();

    try {
      files.map(getFile).map(replaceUrls).map(saveFile);

      spinner.succeed("Done");
    } catch (error) {
      spinner.fail(`Error: ${error}`);
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
