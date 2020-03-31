posify
======

Convert your webpage to platformOS one


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g posify
$ posify COMMAND
running command...
$ posify (-v|--version|version)
posify/0.0.1 darwin-x64 node-v12.11.0
$ posify --help [COMMAND]
USAGE
  $ posify COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`posify assetify`](#posify-assetify)
* [`posify download`](#posify-download)
* [`posify help [COMMAND]`](#posify-help-command)
* [`posify simpleform`](#posify-simpleform)
* [`posify split`](#posify-split)

## `posify assetify`

Convert relative assets paths to asset_url

```
USAGE
  $ posify assetify

OPTIONS
  -i, --input=input    (required) [default: .] Input directory
  -o, --output=output  (required) [default: .] Output directory

DESCRIPTION
  Find and replace asset urls in html files
```

_See code: [src/commands/assetify.js](https://github.com/mdyd-dev/posify/blob/v0.0.1/src/commands/assetify.js)_

## `posify download`

Download webpage using wget.

```
USAGE
  $ posify download

OPTIONS
  -u, --url=url  (required) Address of webpage to download

DESCRIPTION
  This is the first step in covert process.
  It will download files and not manipulate them.
```

_See code: [src/commands/download.js](https://github.com/mdyd-dev/posify/blob/v0.0.1/src/commands/download.js)_

## `posify help [COMMAND]`

display help for posify

```
USAGE
  $ posify help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `posify simpleform`

Converts forms to simple form

```
USAGE
  $ posify simpleform

OPTIONS
  -i, --input=input    (required) [default: .] Input directory
  -o, --output=output  (required) [default: .] Output directory

DESCRIPTION
  Downloads simpleform module
  Replaces action attribute to use simpleform module that sends email to the app owner
```

_See code: [src/commands/simpleform.js](https://github.com/mdyd-dev/posify/blob/v0.0.1/src/commands/simpleform.js)_

## `posify split`

Split downloaded page into pos directory structure

```
USAGE
  $ posify split

OPTIONS
  -i, --input=input    (required) [default: .] Input directory
  -o, --output=output  (required) [default: .] Output directory

DESCRIPTION
  Puts assets into assets, views into views.
```

_See code: [src/commands/split.js](https://github.com/mdyd-dev/posify/blob/v0.0.1/src/commands/split.js)_
<!-- commandsstop -->
