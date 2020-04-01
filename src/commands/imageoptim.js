const {Command, flags} = require('@oclif/command')

class ImageoptimCommand extends Command {
  async run() {
    const {flags} = this.parse(ImageoptimCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/pavel/projects/posify/src/commands/imageoptim.js`)
  }
}

ImageoptimCommand.description = `Describe the command here
...
Extra documentation goes here
`

ImageoptimCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = ImageoptimCommand
