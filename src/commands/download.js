const { Command, flags } = require("@oclif/command");
const { normalizeUrl } = require("../lib/utils");
const URL = require("url");
const root = require("root-domain");
const scrape = require("website-scraper");
const SaveToExistingDirectoryPlugin = require("website-scraper-existing-directory");
const HtmToHtml = require("../lib/scraper-plugins/htm-to-html");
const GenerateFilename = require("../lib/scraper-plugins/generate-filename");

const ora = require("ora");

const isDynamic = url => /(.aspx|.php|.cgi|.cfm|.jsp|.asp)/.test(url);

const download = ({ url, concurrency }) => {
  const normalizedUrl = normalizeUrl(url);
  const domain = URL.parse(normalizedUrl).host;

  return scrape({
    urls: [normalizedUrl],
    urlFilter: (currentUrl) => {
      const domain = URL.parse(currentUrl).host;
      const rootDomainRe = new RegExp(`${root(domain)}$`);

      return rootDomainRe.test(domain) && !isDynamic(currentUrl);
    },
    recursive: true,
    requestConcurrency: concurrency,
    maxRecursiveDepth: 3,
    directory: domain,
    plugins: [
      new SaveToExistingDirectoryPlugin(),
      new HtmToHtml(),
      new GenerateFilename()
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
        spinner.succeed(`Downloaded ${flags.url}`);
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
    default: 5,
  }),
};

module.exports = DownloadCommand;
