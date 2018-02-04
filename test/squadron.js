"use strict";
/* eslint-disable no-console */
const { ThunderAPI } = require("../src");

const thunderAPI = new ThunderAPI();
const name = "35th Gopnik nation battle group";

let test = 1;

async function getProfile() {
  console.log(`Running test ${test} of 3...`);
  const startTime = process.hrtime();
  try {
    const data = await thunderAPI.getSquadron(name, test !== 3, test !== 3);
    // eslint-disable-next-line no-console
    const diff = process.hrtime(startTime);
    const diffString = diff[0] > 0 ? `\`${diff[0]}\`s` : `\`${diff[1] / 1e6}\`ms`;
    console.log("Test success, profile returned:\n", data, `\nTime taken: ${diffString}`);
    test++;
    if (test > 3) process.exit();
  } catch (error) {
    // eslint-disable-next-line no-console
    const diff = process.hrtime(startTime);
    const diffString = diff[0] > 0 ? `\`${diff[0]}\`s` : `\`${diff[1] / 1e6}\`ms`;
    console.error("Test failed, error:\n", error, `\nTime taken: ${diffString}`);
    test++;
    if (test > 3) process.exit();
  }
}

setInterval(getProfile, 15e3);