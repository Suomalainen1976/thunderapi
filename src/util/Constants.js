const browser = exports.browser = typeof window !== "undefined";

exports.UserAgent = browser
  ? null
  : `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3338.0 Safari/537.36`;

/**
 * URLs to access specific endpoints. These are:
 * * https://warthunder.com/en
 * * https://warthunder.com/en/community/userinfo/
 * * https://warthunder.com/en/community/claninfo/
 * * https://warthunder.com/en/news/page/
 * * https://warthunder.com/en/game/changelog/page/
 * @typedef {string} WTEndPointURL
 */
exports.URLs = {
  main: "https://warthunder.com/en",
  user: "https://warthunder.com/en/community/userinfo/?nick=",
  clan: "https://warthunder.com/en/community/claninfo/",
  news: "https://warthunder.com/en/news/page/",
  changelog: "https://warthunder.com/en/game/changelog/page/"
};

/**
 * Endpoints to access the War Thunder site. These are:
 * * main
 * * user
 * * clan
 * * news
 * * changelog
 * @typedef {string} WTEndPoint
 */
exports.EndPoints = keyMirror([
  "main",
  "user",
  "clan",
  "news",
  "changelog"
]);

function keyMirror(arr) {
  const tmp = Object.create(null);
  for (const value of arr) tmp[value] = value;
  return tmp;
}