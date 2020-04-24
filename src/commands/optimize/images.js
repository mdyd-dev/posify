const { Command, flags } = require("@oclif/command");
const { spawn } = require("child_process");
const ora = require("ora");

class ImagesCommand extends Command {
  async run() {
    const { flags } = this.parse(ImagesCommand);

    const spinner = ora('Optimizing images').start();

    const cmd = spawn("npx", [
      "imageoptim",
      `${flags.input}`,
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
Requires ImageOptim to be installed in the system. Download at: https://imageoptim.com/mac
`;

ImagesCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: ".",
  }),
  quality: flags.string({
    char: "q",
    description: "Quality range",
    default: "70-85",
  }),
};

module.exports = ImagesCommand;
