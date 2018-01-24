/* eslint-disable no-console */
const { RequestManager } = require("../src");
const requestManager = new RequestManager("TheDutchy0412", require("../package").version);

requestManager.get("changelog").then(console.log).catch(console.error);