const { Command, flags } = require("@oclif/command");
const { spawn } = require("child_process");
const path = require("path");

class Simpleform extends Command {
  async run() {
    const { flags } = this.parse(Simpleform);

    const init = spawn(
      "npx",
      ["degit", "mdyd-dev/simpleform", "--force"],
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
}

Simpleform.description = `Installs Simpleform module
Install Simpleform module that sends email to the app owner when form is submitted
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
