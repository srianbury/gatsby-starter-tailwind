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

export { formattedDate };
