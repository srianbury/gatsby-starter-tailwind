/**
 * @param {string} url
 * @returns {string|null}
 */
function getYoutubeIdFromShortUrl(url) {
  const id = new URL(url).pathname.slice(1);
  return id.length === 11 ? id : null; // simple check for youtube video id, all ids are 11 char long
}

export { getYoutubeIdFromShortUrl };
