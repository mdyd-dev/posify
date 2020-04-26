const { Command, flags } = require("@oclif/command");
const { spawn } = require("child_process");
const path = require("path");

class Forms extends Command {
  async run() {
    const { flags } = this.parse(Forms);

    const init = spawn(
      "npx",
      ["degit", "mdyd-dev/simpleform", "--force"],
      {
        cwd: path.resolve('.')
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

Forms.description = `Installs Simpleform module
Install Simpleform module. It sends email to the app owner when form is submitted.
This command will create modules/ directory in current directory.
You should run this command in root directory of the project (where you see app/)
`;


module.exports = Forms;
