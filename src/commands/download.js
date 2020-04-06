const { Command, flags } = require("@oclif/command");
const URL = require("url");
const scrape = require("website-scraper");
const SaveToExistingDirectoryPlugin = require("website-scraper-existing-directory");
const HtmToHtml = require("../lib/scraper-plugins/htmToHtml");
const GenerateFilename = require("../lib/scraper-plugins/generate-filename");

const ora = require("ora");

const download = ({ url, concurrency }) => {
  const domain = URL.parse(url).host;
  var rootDomain = domain.split(".").reverse().splice(0, 2).reverse().join(".");

  return scrape({
    urls: [url],
    urlFilter: (currentUrl) => {
      const domain = URL.parse(currentUrl).host;
      const re = new RegExp(`${rootDomain}$`);
      return re.test(domain);
    },
    recursive: true,
    requestConcurrency: concurrency,
    maxRecursiveDepth: 3,
    directory: "pos",
    plugins: [
      new SaveToExistingDirectoryPlugin(),
      new HtmToHtml(),
      new GenerateFilename(),
    ],
  });
};

class DownloadCommand extends Command {
  async run() {
    const cli = this;
    const { flags } = this.parse(DownloadCommand);

    const spinner = ora(`Downloading ${flags.url}`).start();

    download(flags)
      .then(() => {
        spinner.succeed("Done");
      })
      .catch((error) => {
        spinner.fail(`Error: ${error}`);
      });
  }
}

DownloadCommand.description = `Download a complete webpage with assets
Downloads resources needed to display a webpage.
`;

DownloadCommand.flags = {
  url: flags.string({
    char: "u",
    description: "Address of webpage to download",
    required: true,
  }),
  concurrency: flags.integer({
    char: "c",
    description: "Max concurrent connections",
    default: 3,
  }),
};

module.exports = DownloadCommand;
