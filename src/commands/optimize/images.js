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

const compress = (filePath, tmpFilePath) => {
  sharp(tmpFilePath)
    .jpeg({
      quality: 85,
      progressive: true,
      force: false,
    })
    .png({
      quality: 85,
      force: false,
    })
    .toFile(filePath, async (err) => {
      if (err) {
        await mvdir(tmpFilePath, filePath);
        return console.log(`Error. Leaving original file: ${filePath}`);
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
      compress(filePath, tmpFilePath)
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
    default: ".",
  }),
};

module.exports = ImagesCommand;
