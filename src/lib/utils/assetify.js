const _getAssetPath = (url) => {
  return url
    .replace(/^\//, "")
    .split(/\d*\/assets\//) // ../../../assets/instances/106/assets/images/favicon.ico -> images/favicon.ico
    .pop();
};

module.exports = (url) => {
  const assetPath = _getAssetPath(url);
  return `{{ '${assetPath}' | asset_url }}`;
};
