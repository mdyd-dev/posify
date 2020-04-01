const { Command, flags } = require("@oclif/command");

const glob = require("globby");
const mv = require("mvdir");

const renameHtmToHtml = require('../lib/renameHtmToHtml');

const ASSETS_EXT =
  "css,csv,doc,docx,gif,ico,jpeg,jpg,js,mp3,mp4,ogg,otf,pdf,png,ppt,svg,ttf,eot,txt,webm,webp,woff,woff2,xls,xlsx,zip";

const notDynamic = file => !/(\.(aspx|cgi|php|jsp|jspx|cfm))/.test(file);

const copyPages = async (input) => {
  const htmlFiles = await glob(`${input}/**/*.html`);
  const files = htmlFiles.filter(notDynamic);

  files.forEach(async filePath => {
    const outputDir = `${input}-pos/app/views/pages/`;
    const outputFile = filePath.replace(input, outputDir);

    await mv(filePath, outputFile, { copy: true });
  });
};

const copyAssets = async (input) => {
  const files = await glob(`${input}/**/*.{${ASSETS_EXT}}`);

  files.forEach(async filePath => {
    const outputDir = `${input}-pos/app/assets`;
    const outputFile = filePath.replace(input, outputDir);

    await mv(filePath, outputFile, { copy: true });
  });
};

class SplitCommand extends Command {
  async run() {
    const { flags } = this.parse(SplitCommand);

    renameHtmToHtml(flags.input); // Rename .htm -> .html
    copyPages(flags.input);
    copyAssets(flags.input);
  }
}

SplitCommand.description = `Split downloaded page into pos directory structure
Puts assets into assets, views into views.
`;

SplitCommand.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true
  })
};

module.exports = SplitCommand;
