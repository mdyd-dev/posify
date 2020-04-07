posify
======

Convert your webpage to platformOS one

This CLI consists of commands that are performing single operations on a webpage.

This is the order they should be run on:

1. download
2. urls
3. forms

Optionally, if not sure that assets are optimized: 

4. optimize:css
5. optimize:js
6. optimize:images

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
posify/0.0.2 darwin-x64 node-v13.12.0
$ posify --help [COMMAND]
USAGE
  $ posify COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`posify download`](#posify-download)
* [`posify forms`](#posify-forms)
* [`posify help [COMMAND]`](#posify-help-command)
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
  -c, --concurrency=concurrency  [default: 5] Max concurrent connections
  -u, --url=url                  (required) Address of webpage to download

DESCRIPTION
  Downloads resources needed to display a webpage.
```

_See code: [src/commands/download.js](https://github.com/mdyd-dev/posify/blob/v0.0.2/src/commands/download.js)_

## `posify forms`

Installs Simpleform module

```
USAGE
  $ posify forms

OPTIONS
  -i, --input=input  (required) [default: .] Input directory

DESCRIPTION
  Install Simpleform module that sends email to the app owner when form is submitted
```

_See code: [src/commands/forms.js](https://github.com/mdyd-dev/posify/blob/v0.0.2/src/commands/forms.js)_

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

## `posify optimize:css`

Minify CSS files

```
USAGE
  $ posify optimize:css

OPTIONS
  -i, --input=input  (required) [default: .] Input directory

DESCRIPTION
  Makes your CSS files smaller and production ready
  Ignores files that end with .min.css
```

_See code: [src/commands/optimize/css.js](https://github.com/mdyd-dev/posify/blob/v0.0.2/src/commands/optimize/css.js)_

## `posify optimize:images`

Optimize images to make them smaller

```
USAGE
  $ posify optimize:images

OPTIONS
  -i, --input=input  (required) [default: .] Input directory

DESCRIPTION
  Optimize jpeg, jpg, png files to make them web-ready
```

_See code: [src/commands/optimize/images.js](https://github.com/mdyd-dev/posify/blob/v0.0.2/src/commands/optimize/images.js)_

## `posify optimize:js`

Minify JS code

```
USAGE
  $ posify optimize:js

OPTIONS
  -i, --input=input  (required) [default: .] Input directory

DESCRIPTION
  Makes your JS files smaller and production ready
  Ignores files that end with .min.js
```

_See code: [src/commands/optimize/js.js](https://github.com/mdyd-dev/posify/blob/v0.0.2/src/commands/optimize/js.js)_

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

_See code: [src/commands/urls.js](https://github.com/mdyd-dev/posify/blob/v0.0.2/src/commands/urls.js)_
<!-- commandsstop -->
