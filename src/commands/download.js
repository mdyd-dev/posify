const { Command, flags } = require("@oclif/command");
const { normalizeUrl, getHostFromUrl } = require("../lib/utils");
const shouldDownload = require("../lib/utils/shouldDownload");

const scrape = require("website-scraper");
const SaveToExistingDirectoryPlugin = require("website-scraper-existing-directory");
const GenerateFilename = require("../lib/scraper-plugins/generate-filename");
const FilterSuccess = require("../lib/scraper-plugins/filter-success");

const ora = require("ora");

const download = (url, { concurrency }) => {
  const domain = getHostFromUrl(url);

  if (process.env.DEBUG === "true") {
    console.log('URL', {
      url,
      domain
    })
  }

  console.log("Downloading ", url);

  return scrape({
    urls: [url],
    urlFilter: (currentUrl) => {
      if (!shouldDownload(currentUrl, domain)) return false;

      if (process.env.DEBUG === "true") {
        console.log(`Fetching ${currentUrl}`);
      } else {
        process.stdout.write(".");
      }

      return true;
    },
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:77.0) Gecko/20100101 Firefox/77.0'
      }
    },
    recursive: true,
    requestConcurrency: concurrency,
    maxRecursiveDepth: 5,
    directory: domain,
    prettifyUrls: true,
    plugins: [
      new SaveToExistingDirectoryPlugin(),
      new GenerateFilename(),
      new FilterSuccess(),
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

        const dir = normalizedUrl.replace(/^https?:\/\//, '');
        spinner.info(`Go to: ${dir} directory to proceed with "posify urls" and other commands described in README.`);
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
DownloadCommand.example = 'posify download -c 25 -u http://example.com';

DownloadCommand.flags = {
  url: flags.string({
    char: "u",
    description: "URL of webpage to download",
    required: true
  }),
  concurrency: flags.integer({
    char: "c",
    description: "Max concurrent connections",
    default: 5
  }),
};

module.exports = DownloadCommand;
