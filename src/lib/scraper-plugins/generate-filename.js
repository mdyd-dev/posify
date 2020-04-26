// This file is an adaptation of default bySiteStructure strategy
// https://github.com/website-scraper/node-website-scraper/blob/master/lib/filename-generator/by-site-structure.js

const path = require("path");
const mt = require("mime-types");
const utils = require("../utils");
const resourceTypes = require("website-scraper/lib/config/resource-types");
const resourceTypeExtensions = require("website-scraper/lib/config/resource-ext-by-type");

class GenerateFilename {
  apply(registerAction) {
    registerAction("generateFilename", ({ resource, responseData }) => {
      const resourceUrl = resource.getUrl();
      const host = utils.getHostFromUrl(resourceUrl);
      let filePath = utils.getFilepathFromUrl(resourceUrl);
      let extension = utils.getFilenameExtension(filePath);
      const mimeExtension = mt.extension(responseData.mimeType);
      const viewsDirectory = "app/views/pages";

      if (process.env.DEBUG === "true") {
        console.log('Original data', {
          filePath,
          extension,
          mimeExtension
        });
      }

      if (extension === "") {
        //  Guess extension based on mime type
        if (mimeExtension === "html") {
          filePath = `${viewsDirectory}/${filePath}/index.html`;
          if (process.env.DEBUG === "true") {
            console.log("Final filePath (html, mime)", filePath);
          }
        } else {
          filePath = `app/assets/${filePath}.${mimeExtension}`;
          if (process.env.DEBUG === "true") {
            console.log("Final filePath (non-html, mime)", filePath);
          }
        }
      } else {
        // Use detected extension from path
        if (mimeExtension === "html") {
          const fpArr = filePath.split('.');
          fpArr.pop();
          const dirPath = fpArr.join();

          filePath = `${viewsDirectory}/${dirPath}/index.html`;
          if (process.env.DEBUG === "true") {
            console.log("Final filePath (html, ext orig)", filePath);
          }
        } else {
          filePath = `app/assets/${filePath}`;
          if (process.env.DEBUG === "true") {
            console.log("Final filePath (non-html, ext orig)", filePath);
          }
        }
      }

      return { filename: utils.sanitizeFilepath(filePath).toLowerCase() };
    });
  }
}

module.exports = GenerateFilename;
