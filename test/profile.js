"use strict";
/* eslint-disable no-console */
const { ThunderAPI } = require("../src");

const thunderAPI = new ThunderAPI();

let test = 1;

async function getProfile() {
  console.log(`Running test ${test} of 3...`);
  const startTime = process.hrtime();
  try {
    const data = await thunderAPI.getPlayer("TheGopnikTsar", test !== 3, test !== 3);
    const diff = process.hrtime(startTime);
    const diffString = diff[0] > 0 ? `\`${diff[0]}\`s` : `\`${diff[1] / 1e6}\`ms`;
    console.log("Test success, profile returned:\n", data, `\nTime taken: ${diffString}`);
    test++;
    if (test > 3) process.exit();
  } catch (error) {
    const diff = process.hrtime(startTime);
    const diffString = diff[0] > 0 ? `\`${diff[0]}\`s` : `\`${diff[1] / 1e6}\`ms`;
    console.error("Test failed, error:\n", error, `\nTime taken: ${diffString}`);
    test++;
    if (test > 3) process.exit();
  }
}

setInterval(getProfile, 10e3);