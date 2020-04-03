const { Command, flags } = require("@oclif/command");
const URL = require('url');
const scrape = require("website-scraper");
const SaveToExistingDirectoryPlugin = require("website-scraper-existing-directory");

const ora = require("ora");

const download = ({ url, concurrency }) => {
  const domain = URL.parse(url).host;
  const rootDomain = domain.split('.').reverse().splice(0,2).reverse().join('.');

  return scrape({
    urls: [url],
    urlFilter: currentUrl => {
      return currentUrl.includes(rootDomain);
    },
    recursive: true,
    requestConcurrency: concurrency,
    maxRecursiveDepth: 3,
    filenameGenerator: "bySiteStructure",
    directory: '.',
    plugins: [new SaveToExistingDirectoryPlugin()]
  });
};

class DownloadCommand extends Command {
  async run() {
    const cli = this;
    const { flags } = this.parse(DownloadCommand);

    const spinner = ora(`Downloading ${flags.url}`).start();

    download(flags)
      .then(() => {
        spinner.succeed('Done');
      })
      .catch(error => {
        spinner.fail(`Error: ${error}`);
      });
  }
}

DownloadCommand.description = `Download webpage using wget.
It will download resources and cleanup file names.
`;

DownloadCommand.flags = {
  url: flags.string({
    char: "u",
    description: "Address of webpage to download",
    required: true
  }),
  concurrency: flags.integer({
    char: "c",
    description: "Max concurrent connections",
    default: 3
  })
};

module.exports = DownloadCommand;
