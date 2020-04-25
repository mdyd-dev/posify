const { Command, flags } = require("@oclif/command");
const { normalizeUrl, getHostFromUrl } = require("../lib/utils");
const URL = require("url");
const root = require("root-domain");
const scrape = require("website-scraper");
const SaveToExistingDirectoryPlugin = require("website-scraper-existing-directory");
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

const download = (url, { concurrency }) => {
  const domain = getHostFromUrl(url);

  if (process.env.DEBUG) {
    console.log('URL', {
      url,
      domain
    })
  }

  console.log("Downloading ", url);

  return scrape({
    urls: [url],
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
    directory: domain,
    prettifyUrls: true,
    plugins: [
      new SaveToExistingDirectoryPlugin(),
      new GenerateFilename(),
    ],
  });
};

class DownloadCommand extends Command {
  async run() {
    const cli = this;
    const { flags } = this.parse(DownloadCommand);

    const normalizedUrl = normalizeUrl(flags.url, { stripWWW: false });

    const spinner = ora(`Downloading ${normalizedUrl}`);

    download(normalizedUrl, flags)
      .then(() => {
        console.log("");
        spinner.succeed(`Downloaded ${normalizedUrl}`);
      })
      .catch((error) => {
        spinner.fail(`Error: ${error}`);
      });
  }
}

DownloadCommand.description = `Download a complete webpage with assets
Downloads resources needed to display a webpage.
It will download files only within the same root domain.

For example, if you download https://my.example.site.example.com,
only files within example.com will be downloaded.
`;

DownloadCommand.usage = 'download --url http://example.com';
DownloadCommand.example = 'posify download -c 5 -u http://example.com';

DownloadCommand.flags = {
  url: flags.string({
    char: "u",
    description: "URL of webpage to download",
    required: true
  }),
  concurrency: flags.integer({
    char: "c",
    description: "Max concurrent connections",
    default: 3
  }),
};

module.exports = DownloadCommand;
