posify
======

Convert your webpage to platformOS one

This CLI consists of commands that are performing single operations on a webpage.

## Process

This is the order they should be run on:

1. `posify download -u url` (after download is complete, go into the directory, `cd <domain>`)
2. `posify urls`
3. `posify forms`

Optionally, if not sure that assets are correctly optimized (usually they are not): 

4. `posify optimize:css`
5. `posify optimize:js`
6. `posify optimize:images`

## Case sensitive paths

All paths are lowercased to guarantee compatibility. Some webpages were using methods incompatible with *nix systems.

So path `https://example.com/IMAGES/bg.jpg` will become a file `app/assets/images/bg.jpg`

Some pages have both: `Images/bg.jpg` and `images/avatar.jpg` on the same page, but because `Images` and `images` directories cannot coexist in the same place on *nix systems, it caused some assets to be in the wrong place.

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
posify/0.1.1 darwin-x64 node-v12.16.1
$ posify --help [COMMAND]
USAGE
  $ posify COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
- [posify](#posify)
  - [Process](#process)
  - [Case sensitive paths](#case-sensitive-paths)
- [Usage](#usage)
- [Commands](#commands)
  - [`posify download --url http://example.com`](#posify-download---url-httpexamplecom)
  - [`posify forms`](#posify-forms)
  - [`posify help [COMMAND]`](#posify-help-command)
  - [`posify optimize:css`](#posify-optimizecss)
  - [`posify optimize:images`](#posify-optimizeimages)
  - [`posify optimize:js`](#posify-optimizejs)
  - [`posify urls`](#posify-urls)

## `posify download --url http://example.com`

Download a complete webpage with assets

```
USAGE
  $ posify download --url http://example.com

OPTIONS
  -c, --concurrency=concurrency  [default: 15] Max concurrent connections
  -u, --url=url                  (required) URL of webpage to download

DESCRIPTION
  Downloads resources needed to display a webpage.
  It will download files only within the same root domain.

  For example, if you download https://my.example.site.example.com,
  only files within example.com will be downloaded.

EXAMPLES
  posify download -c 5 -u http://example.com
```

_See code: [src/commands/download.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/download.js)_

## `posify forms`

Installs Simpleform module

```
USAGE
  $ posify forms

OPTIONS
  -i, --input=input  (required) [default: .] Input directory

DESCRIPTION
  Install Simpleform module that sends email to the app owner when form is submitted.
  This command will create modules/ directory inside input directory (root)
```

_See code: [src/commands/forms.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/forms.js)_

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

_See code: [src/commands/optimize/css.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/optimize/css.js)_

## `posify optimize:images`

Optimize images to make them smaller - mac OS only

```
USAGE
  $ posify optimize:images

OPTIONS
  -i, --input=input      (required) [default: .] Input directory
  -q, --quality=quality  [default: 70-85] Quality range

DESCRIPTION
  Optimize jpeg/jpg, png, gif, svg and webp files to make them web-ready
  Requires ImageOptim to be installed in the system. Download at: https://imageoptim.com/mac
```

_See code: [src/commands/optimize/images.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/optimize/images.js)_

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

_See code: [src/commands/optimize/js.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/optimize/js.js)_

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

_See code: [src/commands/urls.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/urls.js)_
<!-- commandsstop -->
