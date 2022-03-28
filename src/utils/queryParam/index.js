/**
 * @param {string} url
 * @param {string} key
 * @returns {string}
 */
function queryParam(url, key) {
  if (url === null || url === undefined) {
    return null;
  }
  return new URLSearchParams(url.split("?")[1]).get(key);
}

export { queryParam };
