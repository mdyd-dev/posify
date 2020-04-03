const { Command, flags } = require("@oclif/command");
const { spawn } = require("child_process");
const scrape = require('website-scraper');

const ora = require('ora');

const download = ({ url, wait }) => {
  const params = [
    url,
    `--wait=${wait}`,
    "--convert-links",
    "--adjust-extension",
    "--page-requisites",
    "--no-parent",
    "--mirror",
    "--tries=3",
    "--waitretry=3"
  ];

  console.log(`Running wget with params: ${params.join(' ')}`)

  return spawn("wget", params);
}

class DownloadCommand extends Command {
  async run() {
    const cli = this;
    const { flags } = this.parse(DownloadCommand);
    const domain = flags.url.split('://')[1];

    const wget = download(flags);

    const spinner = ora(`Downloading ${flags.url}`);

    wget.stderr.on("data", chunk => {
      spinner.start();
      if (flags.debug) {
        process.stdout.write(chunk.toString());
      }
    });

    wget.on("close", async code => {
      if (code !== 0 && code !== 8) {
        // I have no idea why 8 is spitting out even if everything is ok
        spinner.fail(`[Code: ${code}] Something went wrong.`);
        process.exit(1);
      }

      spinner.succeed("Website downloaded.");
    });
  }
}

DownloadCommand.description = `Download webpage using wget.
This is the first step in covert process.
It will download files and not manipulate them.
`;

DownloadCommand.flags = {
  url: flags.string({
    char: "u",
    description: "Address of webpage to download",
    required: true
  }),
  wait: flags.integer({
    char: "w",
    description: "How main seconds to wait between HTTP requests",
    default: 0
  }),
  debug: flags.boolean({
    description: "Show wget progress",
    default: false
  })
};

module.exports = DownloadCommand;
