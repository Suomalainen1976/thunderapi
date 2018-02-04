const snekfetch = require("snekfetch");
const https = require("https");
const { browser, UserAgent } = require("../util/Constants");

// eslint-disable-next-line no-var
if (https.Agent) var agent = new https.Agent({ keepAlive: true });

class GETRequest {
  /**
   * Creates a new GET request
   * @private
   * @param {WTEndPointURL} url The URL to the endpoint
   * @param {string} [method="get"] The method to use
   * @param {*} options Options for the request
   */
  constructor(url, method = "get", options = {}) {
    this.url = url;
    this.method = method;
    this.options = options;
  }

  /**
   * Generate the request
   * @private
   * @return {Snekfetch}
   */
  gen() {
    const request = snekfetch[this.method](`${this.url}`, { agent });

    if (!browser) request.set("User-Agent", UserAgent);
    return request;
  }
}

module.exports = GETRequest;