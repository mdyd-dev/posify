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
posify/0.0.1 darwin-x64 node-v13.12.0
$ posify --help [COMMAND]
USAGE
  $ posify COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`posify download`](#posify-download)
* [`posify help [COMMAND]`](#posify-help-command)
* [`posify install:simpleform`](#posify-installsimpleform)
* [`posify optimize:css`](#posify-optimizecss)
* [`posify optimize:images`](#posify-optimizeimages)
* [`posify optimize:js`](#posify-optimizejs)
* [`posify urls`](#posify-urls)

## `posify download`

Download a complete webpage with assets

```
USAGE
  $ posify download

OPTIONS
  -c, --concurrency=concurrency  [default: 3] Max concurrent connections
  -u, --url=url                  (required) Address of webpage to download

DESCRIPTION
  Downloads resources needed to display a webpage.
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

## `posify install:simpleform`

Installs Simpleform module

```
USAGE
  $ posify install:simpleform

OPTIONS
  -i, --input=input  (required) [default: .] Input directory

DESCRIPTION
  Install Simpleform module that sends email to the app owner when form is submitted
```

_See code: [src/commands/install/simpleform.js](https://github.com/mdyd-dev/posify/blob/v0.0.1/src/commands/install/simpleform.js)_

## `posify optimize:css`

Minify CSS using css-clean

```
USAGE
  $ posify optimize:css

OPTIONS
  -i, --input=input  (required) [default: .] Input directory

DESCRIPTION
  Makes your CSS files smaller and production ready.
```

_See code: [src/commands/optimize/css.js](https://github.com/mdyd-dev/posify/blob/v0.0.1/src/commands/optimize/css.js)_

## `posify optimize:images`

Optimize images to make them smaller

```
USAGE
  $ posify optimize:images

OPTIONS
  -i, --input=input  (required) [default: .] Input directory

DESCRIPTION
  Optimize jpeg, jpg, png files to make them web-ready.
```

_See code: [src/commands/optimize/images.js](https://github.com/mdyd-dev/posify/blob/v0.0.1/src/commands/optimize/images.js)_

## `posify optimize:js`

Minify JS using Terser

```
USAGE
  $ posify optimize:js

OPTIONS
  -i, --input=input  (required) [default: .] Input directory

DESCRIPTION
  Makes your JS files smaller and production ready.
```

_See code: [src/commands/optimize/js.js](https://github.com/mdyd-dev/posify/blob/v0.0.1/src/commands/optimize/js.js)_

## `posify urls`

Find relative paths and update them

```
USAGE
  $ posify urls

OPTIONS
  -i, --input=input  (required) [default: .] Input directory

DESCRIPTION
  Find and replace urls in html files, mostly needed for assets
```

_See code: [src/commands/urls.js](https://github.com/mdyd-dev/posify/blob/v0.0.1/src/commands/urls.js)_
<!-- commandsstop -->
