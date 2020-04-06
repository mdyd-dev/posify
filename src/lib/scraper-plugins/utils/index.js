const path = require("path");
const url = require("url");

const MAX_FILENAME_LENGTH = 255;

function getFilenameExtension(filepath) {
  return typeof filepath === "string"
    ? path.extname(filepath).toLowerCase()
    : null;
}

function shortenFilename(filename) {
  if (filename.length >= MAX_FILENAME_LENGTH) {
    const shortFilename =
      filename.substring(0, 20) + getFilenameExtension(filename);
    return shortFilename;
  }
  return filename;
}

function getPathnameFromUrl(u) {
  const pathname = url.parse(u).pathname;
  try {
    return decodeURI(pathname);
  } catch (e) {
    return pathname;
  }
}

function normalizeUrl(u, opts) {
  try {
    return normalize(
      u,
      Object.assign({ removeTrailingSlash: false, stripHash: true }, opts)
    );
  } catch (e) {
    return u;
  }
}

function getFilepathFromUrl(u) {
  const nu = normalizeUrl(u, { removeTrailingSlash: true }).replace(/\.htm$/, '.html');
  return getPathnameFromUrl(nu).substring(1);
}

function getHashFromUrl(u) {
  return url.parse(u).hash || "";
}

function getHostFromUrl(u) {
  return url.parse(u).host;
}

function pull (arr, values) {
	return arr.filter(function (item) {
		return values.indexOf(item) < 0;
	});
};


module.exports = {
  getFilenameExtension,
  shortenFilename,
  getPathnameFromUrl,
  normalizeUrl,
  getFilepathFromUrl,
  getHashFromUrl,
  getHostFromUrl,
  pull
};
