const { getHostFromUrl } = require(".");
const root = url => getHostFromUrl(url).replace(/^www\./, '');

module.exports = (currentUrl, domain) => {
  const rootDomain = root(currentUrl);
  const dynamic = /(.aspx?|.php|.cgi|.cfm|.jsp)/.test(currentUrl);

  if (process.env.DEBUG === "true") {
    console.log('Domain info', {
      rootDomain,
      domain,
      dynamic
    });
  }

  if (dynamic) return false;
  if (domain.indexOf(rootDomain) < 0) return false;

  return true;
};
