const { Command, flags } = require("@oclif/command");
const { normalizeUrl, getHostFromUrl } = require("../lib/utils");
const URL = require("url");
const root = require("root-domain");
const scrape = require("website-scraper");
const SaveToExistingDirectoryPlugin = require("website-scraper-existing-directory");
// const HtmToHtml = require("../lib/scraper-plugins/htm-to-html");
const GenerateFilename = require("../lib/scraper-plugins/generate-filename");

const ora = require("ora");

const isEligible = (currentUrl, domain) => {
  const currentDomain = getHostFromUrl(currentUrl).replace(/^www\./, '');
  const dynamic = /(.aspx|.php|.cgi|.cfm|.jsp|.asp)/.test(currentUrl);

  if (process.env.DEBUG) {
    console.log('Domain info', {
      currentDomain,
      dynamic
    });
  }

  if (currentDomain !== domain || dynamic) {
    return false;
  }

  return true;
};

const download = ({ url, concurrency }) => {
  const normalizedUrl = normalizeUrl(url);
  const domain = getHostFromUrl(url);

  if (process.env.DEBUG) {
    console.log({
      normalizedUrl,
      domain
    })
  }

  console.log("Downloading ", normalizedUrl);

  return scrape({
    urls: [normalizedUrl],
    urlFilter: (currentUrl) => {
      if (!isEligible(currentUrl, domain)) return false;

      if (process.env.DEBUG) {
        console.log(`Fetching ${currentUrl}`);
      } else {
        process.stdout.write(".");
      }

      return true;
    },
    recursive: true,
    requestConcurrency: concurrency,
    maxRecursiveDepth: 3,
    directory: normalizedUrl,
    plugins: [
      new SaveToExistingDirectoryPlugin(),
      // new HtmToHtml(),
      new GenerateFilename(),
    ],
  });
};

class DownloadCommand extends Command {
  async run() {
    const cli = this;
    const { flags } = this.parse(DownloadCommand);

    const spinner = ora(`Downloading ${flags.url}`);

    download(flags)
      .then(() => {
        console.log("");
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
    default: 3,
  }),
};

module.exports = DownloadCommand;
