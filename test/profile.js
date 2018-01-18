"use strict";
const ThunderAPI = require("../src");

const thunderAPI = new ThunderAPI("devdutchy");
const name = "Rulo6000";

async function getProfile() {
  try {
    const data = await thunderAPI.getProfile(name);
    // eslint-disable-next-line no-console
    for (const [key, value] of data) console.log(key, value);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Oh no, an error occurred while attempting to fetch data!", error);
  }
}

getProfile();