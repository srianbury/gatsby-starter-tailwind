export const POST = "post";
export const SEARCH = "search";
export const ABOUT = "about";

export const HOME_TO = "/";
export const POST_TO = `/${POST}/`;
export const ABOUT_TO = `/${ABOUT}/`;

export const ABOUT_TITLE = "About";

export const links = [
  { title: "Home", to: HOME_TO },
  { title: "Create", to: POST_TO },
];

export function postToAddress(id) {
  return `${POST_TO}${id}/`;
}

export function toEditPage(id) {
  return `/${POST}?id=${id}`;
}
