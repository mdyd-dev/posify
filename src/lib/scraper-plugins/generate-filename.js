// This file is an adaptation of default bySiteStructure strategy
// https://github.com/website-scraper/node-website-scraper/blob/master/lib/filename-generator/by-site-structure.js

const path = require("path");
const utils = require("../utils");
const resourceTypes = require("website-scraper/lib/config/resource-types");
const resourceTypeExtensions = require("website-scraper/lib/config/resource-ext-by-type");

class GenerateFilename {
  apply(registerAction) {
    registerAction("generateFilename", ({ resource }) => {
      const resourceUrl = resource.getUrl();
      const host = utils.getHostFromUrl(resourceUrl);
      let filePath = utils.getFilepathFromUrl(resourceUrl);
      let extension = utils.getFilenameExtension(filePath);

      // If we have HTML from 'http://example.com/path' => set 'path/index.html' as filepath
      if (resource.isHtml()) {
        const htmlExtensions = resourceTypeExtensions[resourceTypes.html];
        const resourceHasHtmlExtension = htmlExtensions.includes(extension);
        filePath = `app/views/pages/${filePath}`;
        // add index.html only if filepath has ext != html '/path/test.com' => '/path/test.com/index.html'
        if (!resourceHasHtmlExtension) {
          filePath = path.join(filePath, "index.html");
        }
      } else {
        filePath = `app/assets/${filePath}`;
      }

      return { filename: utils.sanitizeFilepath(filePath) };
    });
  }
}

module.exports = GenerateFilename;
