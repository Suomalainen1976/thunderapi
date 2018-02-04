/* eslint-disable no-console */
const { RequestManager } = require("../src");
const requestManager = new RequestManager();

requestManager.get("changelog").then(console.log).catch(console.error);