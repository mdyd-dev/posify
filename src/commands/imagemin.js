const { Command, flags } = require("@oclif/command");
const ora = require('ora');

const imagemin = require("imagemin");
const imageminJpegrecompress = require("imagemin-jpeg-recompress");
const imageminPngquant = require("imagemin-pngquant");

class ImageminCommand extends Command {
  async run() {
    const { flags } = this.parse(ImageminCommand);

    const spinner = ora(`Optimizing images...`);

    await imagemin([`${flags.input}/*.{jpg,png}`], {
      destination: flags.input,
      plugins: [
        imageminJpegrecompress({
          quality: 'veryhigh',
          min: 80,
          max: 95
        }),
        imageminPngquant({
          quality: [0.7, 0.9]
        })
      ]
    });

    spinner.succeed('Images optimized.');
  }
}

ImageminCommand.description = `Optimize images to make them smaller
Carefully optimize images using jpeg-recompress and pngquant
`;

ImageminCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: "."
  })
};

module.exports = ImageminCommand;
