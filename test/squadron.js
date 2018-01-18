"use strict";
const { ThunderAPI } = require("../src");

const thunderAPI = new ThunderAPI("devdutchy");
const name = "35th Gopnik nation battle group";

async function getProfile() {
  try {
    const data = await thunderAPI.getSquadron(name);
    // eslint-disable-next-line no-console
    console.log(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Oh no, an error occurred while attempting to fetch data!", error);
  }
}

getProfile();