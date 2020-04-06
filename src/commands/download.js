const { Command, flags } = require("@oclif/command");
const URL = require("url");
const scrape = require("website-scraper");
const SaveToExistingDirectoryPlugin = require("website-scraper-existing-directory");
const htmToHtml = require("../lib/htmToHtml");

const ora = require("ora");

const download = ({ url, concurrency }) => {
  const domain = URL.parse(url).host;
  const rootDomain = domain
    .split(".")
    .reverse()
    .splice(0, 2)
    .reverse()
    .join(".");

  return scrape({
    urls: [url],
    urlFilter: (currentUrl) => {
      return currentUrl.includes(rootDomain);
    },
    recursive: true,
    requestConcurrency: concurrency,
    maxRecursiveDepth: 3,
    // filenameGenerator: "bySiteStructure",
    directory: "pos4",
    subdirectories: [
      { directory: "app/assets/img", extensions: [".jpg", ".jpeg", ".gif", ".png", ".svg", ".ico", ".webp"] },
      { directory: "app/assets/js", extensions: [".js"] },
      { directory: "app/assets/css", extensions: [".css"] },
      { directory: "app/assets/fonts", extensions: [".otf", ".ttf", ".woff", ".woff2"] },
      { directory: "app/assets/docs", extensions: [".pdf", ".zip", ".doc", ".docx", ".txt", ".csv", ".ppt", ".pptx", ".xls", ".xlsx"] },
      { directory: "app/assets/audio", extensions: [".mp3", ".ogg"] },
      { directory: "app/assets/video", extensions: [".mp4", ".webm"] },
      { directory: "app/views/pages", extensions: [".html"] }
    ],
    plugins: [new SaveToExistingDirectoryPlugin(), new htmToHtml()],
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
