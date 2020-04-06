const { Command, flags } = require("@oclif/command");
const { spawn } = require("child_process");
const path = require("path");
const glob = require("globby");

const getFile = require("../../lib/get-file");
const replaceActions = require("../../lib/replace-actions");
const saveFile = require("../../lib/save-file");

const getSimpleForm = async flags => {
  const init = spawn(
    "npx",
    ["degit", "mdyd-dev/simpleform"],
    {
      cwd: path.resolve(flags.input)
    }
  );

  init.on("close", function(code) {
    if (code === 0) {
      console.log("Simple form module initialized.");
    } else {
      console.error(`[${code}] Something went wrong.`);
    }
  });
}

const updateActions = async flags => {
  let files = await glob(`${flags.input}/**/*.html`);

  files
    .map(getFile)
    .map(replaceActions)
    .map(saveFile);
}


class Forms extends Command {
  async run() {
    const { flags } = this.parse(Forms);

    getSimpleForm(flags);
    updateActions(flags);
  }
}

Forms.description = `Converts forms to simple form
Downloads simpleform module
Replaces action attribute to use simpleform module that sends email to the app owner
`;

Forms.flags = {
  input: flags.string({
    char: "i",
    description: "Input directory",
    required: true,
    default: "."
  })
};

module.exports = Forms;
