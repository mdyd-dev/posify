const { Command, flags } = require("@oclif/command");
const { spawn } = require("child_process");

const download = ({ url }) =>
  spawn("wget", [
    url,
    "--convert-links",
    "--adjust-extension",
    "--page-requisites",
    "--no-parent",
    "--mirror"
  ]);

class DownloadCommand extends Command {
  async run() {
    const { flags } = this.parse(DownloadCommand);

    const wget = download(flags);

    wget.stderr.on("data", chunk => {
      if (/.*Saving to:.*/.test(chunk)) {
        process.stdout.write(chunk.toString());
      }
    });

    wget.on("close", code => {
      if (code !== 0) {
        return console.log("Something went wrong.");
      }

      console.log("Done");
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
  })
};

module.exports = DownloadCommand;
