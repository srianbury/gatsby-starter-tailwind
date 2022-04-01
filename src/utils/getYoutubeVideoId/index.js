import { domainName, queryParam, getYoutubeIdFromShortUrl } from "..";

/**
 * @param {string} url
 * @returns {string|null}
 */
function getYoutubeVideoId(url) {
  if (!url) {
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

export { getYoutubeVideoId };
