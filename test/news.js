/* eslint-disable no-console */
const { ThunderAPI } = require("../src");
const thunderAPI = new ThunderAPI("testing");

thunderAPI.getNews().then(console.log).catch(console.error);