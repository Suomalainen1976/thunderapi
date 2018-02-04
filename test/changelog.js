/* eslint-disable no-console */
const { ThunderAPI } = require("../src");
const thunderAPI = new ThunderAPI();

thunderAPI.getUpdates().then(console.log).catch(console.error);