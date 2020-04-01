const { Command, flags } = require("@oclif/command");
const { spawn } = require("child_process");
const path = require("path");
const glob = require("globby");

const getFile = require("../lib/get-file");
const replaceActions = require("../lib/replace-actions");
const saveFile = require("../lib/save-file");

class Simpleform extends Command {
  async run() {
    const { flags } = this.parse(Simpleform);

    const init = spawn(
      "npx", // I dont know if npx is the best idea. Lets see.
      ["pos-cli", "init", "--url=https://github.com/mdyd-dev/simpleform/"],
      {
        cwd: path.resolve(output)
      }
    );

    init.on("close", function(code) {
      if (code === 0) {
        console.log("Simple form module initialized.");
      } else {
        console.error(`[${code}] Something went wrong.`);
      }
    });

    let files = await glob(`${flags.input}/**/*.html`);

    files
      .map(getFile)
      .map(replaceActions)
      .map(saveFile);
  }
}

Simpleform.description = `Converts forms to simple form
Downloads simpleform module
Replaces action attribute to use simpleform module that sends email to the app owner
`;

Simpleform.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: "."
  })
};

module.exports = Simpleform;
