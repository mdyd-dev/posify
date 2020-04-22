const { Command, flags } = require("@oclif/command");
const glob = require("globby");
const path = require("path");
const fs = require("fs");
const os = require("os");
const sharp = require("sharp");
const mvdir = require("mvdir");

const makeTmpCopy = async (filePath, tmpDir) => {
  const tmpFilePath = `${tmpDir}${path.sep}${filePath}`;

  await mvdir(filePath, tmpFilePath, { copy: true });

  return { filePath, tmpFilePath };
};

const compress = (filePath, tmpFilePath, quality) => {
  sharp(tmpFilePath)
    .jpeg({
      quality,
      progressive: true,
      force: false
    })
    .png({
      quality,
      force: false
    })
    .webp({
      quality,
      force: false
    })
    .toFile(filePath, async (err) => {
      if (err) {
        await mvdir(tmpFilePath, filePath);
        if (process.env.DEBUG) {
          console.log(`Error. Leaving original file: ${filePath}`);
        }
      } else {
        fs.unlinkSync(tmpFilePath);
      }
    });
};

class ImagesCommand extends Command {
  async run() {
    const { flags } = this.parse(ImagesCommand);

    let files = await glob(`${flags.input}/**/*.{jpg,jpeg,png,webp}`);

    if (files.length === 0) return;

    const tmpDir = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`);

    if (process.env.DEBUG) {
      console.log('Tmp dir: ', tmpDir);
    }

    const tmpPaths = await Promise.all(
      files.map((filePath) => makeTmpCopy(filePath, tmpDir))
    );

    tmpPaths.map(({ filePath, tmpFilePath }) =>
      compress(filePath, tmpFilePath, flags.quality)
    );

    console.log(`Optimized ${files.length} images.`);
  }
}

ImagesCommand.description = `Optimize images to make them smaller
Optimize jpeg, jpg, png files to make them web-ready
`;

ImagesCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: "."
  }),
  quality: flags.integer({
    char: "q",
    description: "Quality (1-100). Higher = better quality and bigger file size, lower = worse quality and smaller file size",
    default: 80
  })
};

module.exports = ImagesCommand;
