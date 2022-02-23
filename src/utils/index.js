/**
 * @param {string} url
 * @return {string}
 */
function domainName(url) {
  return url.replace(/.+\/\/|www.|\..+/g, "");
}

/**
 * @param {string} url
 * @param {string} key
 * @returns {string}
 */
function queryParam(url, key) {
  return new URLSearchParams(url.split("?")[1]).get(key);
}

/**
 * @param {date} date
 * @returns {string}
 */
function formattedDate(
  date,
  locales = "en-US",
  options = { year: "numeric", month: "short", day: "numeric" }
) {
  return new Date(date).toLocaleDateString(locales, options);
}

export { domainName, queryParam, formattedDate };
