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
* [Commands](#commands)
<!-- tocstop -->

## Installation
```sh-session
$ npm install -g posify
```

## Help usage
```sh-session
$ posify help [COMMAND]

$ posify (-v|--version|version)
```

Example:

```sh-session
$ posify help

$ posify help download
```

```sh-session
$ posify -v
posify/0.1.1 darwin-x64 node-v12.16.1
```


# Commands
<!-- commands -->
* [`posify download --url http://example.com`](#posify-download---url-httpexamplecom)
* [`posify forms`](#posify-forms)
* [`posify optimize:css`](#posify-optimizecss)
* [`posify optimize:images`](#posify-optimizeimages)
* [`posify optimize:js`](#posify-optimizejs)
* [`posify urls`](#posify-urls)

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
  posify download -c 25 -u http://example.com
```

_See code: [src/commands/download.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/download.js)_

## `posify forms`

Installs Simpleform module

```
USAGE
  $ posify forms

DESCRIPTION
  Install Simpleform module. It sends email to the app owner when form is submitted.
  This command will create modules/ directory in current directory.
  You should run this command in root directory of the project (where you see app/)
```

_See code: [src/commands/forms.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/forms.js)_

## `posify optimize:css`

Minify CSS files

```
USAGE
  $ posify optimize:css

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
  -q, --quality=quality  [default: 70-85] Quality range

DESCRIPTION
  Optimize jpeg/jpg, png, gif, svg and webp files to make them web-ready
  Requires ImageOptim to be installed in the system.

  Install via brew: "brew update && brew cask install imageoptim"
  Install with GUI: https://imageoptim.com/mac
```

_See code: [src/commands/optimize/images.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/optimize/images.js)_

## `posify optimize:js`

Minify JS code

```
USAGE
  $ posify optimize:js

DESCRIPTION
  Makes your JS files smaller and production ready
  Ignores files that end with .min.js
```

_See code: [src/commands/optimize/js.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/optimize/js.js)_

## `posify urls`

Update relative paths to use platformOS CDN

```
USAGE
  $ posify urls

DESCRIPTION
  Find and replace urls in html files, mostly needed for assets
```

_See code: [src/commands/urls.js](https://github.com/mdyd-dev/posify/blob/v0.1.1/src/commands/urls.js)_
<!-- commandsstop -->
