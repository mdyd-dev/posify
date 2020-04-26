const { Command, flags } = require("@oclif/command");
const { spawn } = require("child_process");
const ora = require("ora");

class ImagesCommand extends Command {
  async run() {
    if (process.platform !== 'darwin') {
      console.error('Non-macOS platforms not supported.')
      process.exit(1);
    }

    const { flags } = this.parse(ImagesCommand);

    const spinner = ora('Optimizing images').start();

    const cmd = spawn("npx", [
      "imageoptim",
      '.',
      `--quality ${flags.quality}`,
      '-S'
    ]);

    cmd.on("exit", (code) => {
      if (code !== 0) {
        return spinner.fail("Something went wrong. Use ImageOptim app directly: https://imageoptim.com/mac");
      }

      spinner.succeed('Images optimized');
    });
  }
}

ImagesCommand.description = `Optimize images to make them smaller - mac OS only
Optimize jpeg/jpg, png, gif, svg and webp files to make them web-ready
Requires ImageOptim to be installed in the system.

Install via brew: "brew update && brew cask install imageoptim"
Install with GUI: https://imageoptim.com/mac
`;

ImagesCommand.flags = {
  quality: flags.string({
    char: "q",
    description: "Quality range",
    default: "70-85",
  })
};

module.exports = ImagesCommand;
