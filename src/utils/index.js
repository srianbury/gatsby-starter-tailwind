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

/**
 * @param {string} url
 * @returns {string|null}
 */
function getYoutubeVideoId(url) {
  if (url === null || url === undefined) {
    return null;
  }

  switch (domainName(url).toLowerCase()) {
    case "youtube":
      return queryParam(url, "v");
    case "youtu":
      return getYoutubeIdFromShortUrl(url);
    default:
      return null;
  }
}

function getYoutubeIdFromShortUrl(url) {
  const id = new URL(url).pathname.slice(1);
  return id.length === 11 ? id : null; // simple check for youtube video id, all ids are 11 char long
}

export { domainName, queryParam, formattedDate, getYoutubeVideoId };
