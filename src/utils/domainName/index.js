/**
 * @param {string} url
 * @return {string}
 */
function domainName(url) {
  if (url === null || url === undefined) {
    return null;
  }
  return url.replace(/.+\/\/|www.|\..+/g, "");
}

export { domainName };
