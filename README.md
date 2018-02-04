<div align="center">
  <p>
    <a href="https://discord.gg/uApUXn6">
      <img src="https://discordapp.com/api/guilds/297442085861064705/embed.png" alt="Discord" />
    </a>
    <a href="https://www.npmjs.com/package/thunderapi">
      <img src="https://img.shields.io/npm/dt/thunderapi.svg" alt="Downloads" />
    </a>
    <a href="https://www.npmjs.com/package/thunderapi">
      <img src="https://img.shields.io/npm/v/thunderapi.svg" alt="Version" />
    </a>
    <a href="https://david-dm.org/devdutchy/thunderapi" alt="Dependencies">
      <img src="https://david-dm.org/devdutchy/thunderapi.svg" />
    </a>
    <a href="https://paypal.me/TheDutchy" alt="Donate on PayPal">
      <img src="https://img.shields.io/badge/donate-PayPal-009cde.svg" />
    </a>
    <a href="https://travis-ci.org/devdutchy/thunderapi">
      <img src="https://api.travis-ci.org/devdutchy/thunderapi.svg?branch=master" />
    </a>
  </p>
  <p>
    <a href="https://nodei.co/npm/thunderapi/">
      <img src="https://nodei.co/npm/thunderapi.png?downloads=true&stars=true" alt="NPM info" />
    </a>
  </p>
</div>

# ThunderAPI

> A node.js scraper to get profile and squadron data from War Thunder

## About

ThunderAPI is a simple, promise-based data scraper for the War Thunder site to get all kinds of data, including player and squadron info. Additionally, it makes full use of ES2017's async/await functionality for clear, concise code that is simple to write and easy to comprehend.

## Features

- Fetching player info
- Fetching squadron info
- Getting news info
- Getting update info

## Install

**Node.js v8 or higher is required.**

```bash
npm install thunderapi
```

To install the **development** branch (please note that this may not be stable):

```bash
# You need to have git installed and in your PATH to install the development branch

npm install devdutchy/thunderapi
```

## Example

```js
const { ThunderAPI } = require("thunderapi");
// Create a new instance of ThunderAPI
const thunderAPI = new ThunderAPI();

// The player can be any in-game player. In this example,
// we'll get the profile of the player Abinavski, and log
// the title he set.
thunderAPI.getPlayer("Abinavski")
  // We handle the data returned here, in this case
  // by logging the title the player has set.
  .then(data => console.log("Title:", data.title))
  // If an error occurred, we catch it here!
  .catch(err => console.error("Oh no, an error occurred!\n", err));
```

## Documentation

[View the documentation here.](http://docs.dutchy.ga)

## Contributing

If you wish to contribute to ThunderAPI, you are free to do so! Before getting started, please read the [contribution guidelines](https://github.com/devdutchy/thunderapi/blob/master/.github/CONTRIBUTING.md) first.

## Support

[![Discord](https://discordapp.com/api/guilds/297442085861064705/embed.png?style=banner2)](https://discord.gg/qWbWNbB)

## Author

**ThunderAPI** © [devdutchy](https://github.com/devdutchy), Released under the [Apache 2.0](https://github.com/devdutchy/thunderapi/blob/master/LICENSE) License.

Authored and maintained by devdutchy.

> GitHub [@devdutchy](https://github.com/devdutchy)
