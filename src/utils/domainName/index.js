/**
 * @param {string} url
 * @return {string}
 */
function domainName(url) {
  if (!url) {
    return null;
  }
  return url.replace(/.+\/\/|www.|\..+/g, "");
}

export { domainName };
