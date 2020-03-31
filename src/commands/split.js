const { Command, flags } = require("@oclif/command");

const glob = require("globby");
const mv = require("mvdir");

const ASSETS_EXT =
  "css,csv,doc,docx,gif,ico,jpeg,jpg,js,mp3,mp4,ogg,otf,pdf,png,ppt,svg,ttf,eot,txt,webm,webp,woff,woff2,xls,xlsx,zip";

const copyPages = async ({ input, output }) => {
  const files = await glob(`${input}/**/*.html`);

  files.forEach(async inputFile => {
    const outputDir = `${output}/app/views/pages/`;
    const outputFile = inputFile.replace(input, outputDir);

    await mv(inputFile, outputFile, { copy: true });
  });
};

const copyAssets = async ({ input, output }) => {
  const files = await glob(`${input}/**/*.{${ASSETS_EXT}}`);

  files.forEach(async inputFile => {
    const outputDir = `${output}/app/assets`;
    const outputFile = inputFile.replace(input, outputDir);

    await mv(inputFile, outputFile, { copy: true });
  });
};

class SplitCommand extends Command {
  async run() {
    const { flags } = this.parse(SplitCommand);

    copyPages(flags);
    copyAssets(flags);
  }
}

SplitCommand.description = `Split downloaded page into pos directory structure
Puts assets into assets, views into views.
`;

SplitCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: "."
  }),
  output: flags.string({
    char: "o",
    description: "Output directory",
    required: true,
    default: "."
  })
};

module.exports = SplitCommand;
