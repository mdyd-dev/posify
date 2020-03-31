const { Command, flags } = require("@oclif/command");

class SplitAssetsCommand extends Command {
  async run() {
    const { flags } = this.parse(SplitAssetsCommand);
      console.log("Done");
  }
}

SplitAssetsCommand.description = `Download webpage using wget.
`;

SplitAssetsCommand.flags = {
};

module.exports = SplitAssetsCommand;
