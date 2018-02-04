const { URLs } = require("../util/Constants");
const GETRequest = require("./GETRequest");
const { JSDOM } = require("jsdom");

/**
 * Request manager for ThunderApi
 * @private
 */
class RequestManager {
  /**
   * Get raw data from War Thunder
   * @param {string} key The key to search on, either `profile` or `squadron`
   * @param {any[]} args The arguments, e.g. the player/squadron name or the page number for news/updates
   * @return {Promise<SquadronInfo|PlayerInfo|NewsInfo[]>}
   * @private
   */
  async get(key, ...args) { // eslint-disable-line complexity
    let data = {};
    if (key.toLowerCase() === "profile") {
      const res = await new GETRequest(`${URLs.user}${args.join(" ")}`).gen();

      if (res.status !== 200) {
        if (res.status === 404) return null;
        return res.status;
      }
      const { window: { document } } = new JSDOM(res.text);

      const userinfo = document.getElementsByClassName("userinfo")[0];
      const userstats = document.getElementsByClassName("user-stat")[0];

      if (!userinfo || !userstats) {
        data.error = "Player not found";
        return data;
      }

      /**
       * Provides game statistics about a player
       * @typedef {Object} ProfileStats
       * @property {string} victories The amount of victories
       * @property {string} completed The amount of completed battles
       * @property {string} ratio The victory/battle ratio
       * @property {string} sessions The amount of total sessions
       * @property {string} deaths The amount of deaths
       * @property {string} fighter The amount of time flown in a fighter
       * @property {string} bomber The amount of time flown in a bomber
       * @property {string} attacker The amount of time flown in an attacker
       * @property {string} tank The amount of time driven in a tank
       * @property {string} tankdestroyer The amount of time driven in a tank destroyer
       * @property {string} heavytank The amount of time driven in a heavy tank
       * @property {string} spaa The amount of time driven in a SPAA
       * @property {string} airkills The total amount of air targets destroyed
       * @property {string} groundkills The total amount of ground targets destroyed
       * @property {string} battletime The total amount of time played
       */
      const stats = {
        /**
         * Provides info for all three gamemodes
         * @typedef {Object} DifficultyInfo
         * @property {ProfileStats} arcade The info for the Arcade gamemode
         * @property {ProfileStats} realistic The info for the Realistic gamemode
         * @property {ProfileStats} simulator The info for the Simulator gamemode
         */
        arcade: {
          victories: userstats.children[0].children[1].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[1].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[1].children[2].innerHTML,
          completed: userstats.children[0].children[2].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[2].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[2].children[2].innerHTML,
          ratio: userstats.children[0].children[3].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[3].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[3].children[2].innerHTML,
          sessions: userstats.children[0].children[4].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[4].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[4].children[2].innerHTML,
          deaths: userstats.children[0].children[5].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[5].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[5].children[2].innerHTML,
          fighter: userstats.children[0].children[6].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[6].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[6].children[2].innerHTML,
          bomber: userstats.children[0].children[7].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[7].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[7].children[2].innerHTML,
          attacker: userstats.children[0].children[8].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[8].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[8].children[2].innerHTML,
          tank: userstats.children[0].children[9].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[9].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[9].children[2].innerHTML,
          tankdestroyer: userstats.children[0].children[10].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[10].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[10].children[2].innerHTML,
          heavytank: userstats.children[0].children[11].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[11].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[11].children[2].innerHTML,
          spaa: userstats.children[0].children[12].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[12].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[12].children[2].innerHTML,
          airkills: userstats.children[0].children[13].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[13].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[13].children[2].innerHTML,
          groundkills: userstats.children[0].children[14].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[14].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[14].children[2].innerHTML,
          battletime: userstats.children[0].children[17].children[2].innerHTML.includes("N/A")
            ? userstats.children[0].children[17].children[2].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[17].children[2].innerHTML
        },
        realistic: {
          victories: userstats.children[0].children[1].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[1].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[1].children[3].innerHTML,
          completed: userstats.children[0].children[2].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[2].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[2].children[3].innerHTML,
          ratio: userstats.children[0].children[3].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[3].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[3].children[3].innerHTML,
          sessions: userstats.children[0].children[4].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[4].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[4].children[3].innerHTML,
          deaths: userstats.children[0].children[5].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[5].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[5].children[3].innerHTML,
          fighter: userstats.children[0].children[6].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[6].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[6].children[3].innerHTML,
          bomber: userstats.children[0].children[7].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[7].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[7].children[3].innerHTML,
          attacker: userstats.children[0].children[8].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[8].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[8].children[3].innerHTML,
          tank: userstats.children[0].children[9].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[9].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[9].children[3].innerHTML,
          tankdestroyer: userstats.children[0].children[10].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[10].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[10].children[3].innerHTML,
          heavytank: userstats.children[0].children[11].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[11].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[11].children[3].innerHTML,
          spaa: userstats.children[0].children[12].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[12].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[12].children[3].innerHTML,
          airkills: userstats.children[0].children[13].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[13].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[13].children[3].innerHTML,
          groundkills: userstats.children[0].children[14].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[14].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[14].children[3].innerHTML,
          battletime: userstats.children[0].children[17].children[3].innerHTML.includes("N/A")
            ? userstats.children[0].children[17].children[3].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
            : userstats.children[0].children[17].children[3].innerHTML
        },
        simulator: {
          victories: userstats.children[0].children[1].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[1].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[1].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          completed: userstats.children[0].children[2].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[2].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[2].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          ratio: userstats.children[0].children[3].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[3].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[3].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          sessions: userstats.children[0].children[4].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[4].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[4].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          deaths: userstats.children[0].children[5].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[5].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[5].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          fighter: userstats.children[0].children[6].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[6].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[6].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          bomber: userstats.children[0].children[7].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[7].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[7].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          attacker: userstats.children[0].children[8].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[8].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[8].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          tank: userstats.children[0].children[9].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[9].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[9].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          tankdestroyer: userstats.children[0].children[10].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[10].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[10].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          heavytank: userstats.children[0].children[11].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[11].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[11].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          spaa: userstats.children[0].children[12].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[12].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[12].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          airkills: userstats.children[0].children[13].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[13].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[13].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          groundkills: userstats.children[0].children[14].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[14].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[14].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", ""),
          battletime: userstats.children[0].children[17].children[4].innerHTML.includes("N/A")
            ? userstats.children[0].children[17].children[4].innerHTML
              .replace("<span id=\"n_a\">", "")
              .replace("</span>", "")
              .replace("<div class=\" ptrim1\"></div>", "")
            : userstats.children[0].children[17].children[4].innerHTML.replace("<div class=\" ptrim1\"></div>", "")
        }
      };

      /**
       * Provides statistics about a user's profile
       * @typedef {Object} ProfileInfo
       * @property {string} image The URL to the player's in-game avatar
       * @property {string} nick The player's in-game name
       * @property {string} title The player's title, if he has one
       * @property {string} squadron The player's squadron, if he's in one
       * @property {number} level The player's in-game experience level
       * @property {string} registered The date when the player registered
       * @property {CountryInfo} usa Statistics for the USA
       * @property {CountryInfo} ussr Statistics for the USSR
       * @property {CountryInfo} britain Statistics for Great Britain
       * @property {CountryInfo} germany Statistics for Germany
       * @property {CountryInfo} japan Statistics for Japan
       * @property {CountryInfo} italy Statistics for Italy
       */
      const profile = {
        image: userinfo.children[0].children[0].children[0].children[0].children[0].src,
        nick: args.join(" "),
        title: userinfo.children[0].children[0].children[0].children[0].children[2].innerHTML.replace("<br>", ""),
        squadron: userinfo.children[0].children[0].children[0].children[0].children[3].children[0].innerHTML !== ""
          ? userinfo.children[0].children[0].children[0].children[0].children[3].children[0].innerHTML
          : null,
        level: parseInt(userinfo.children[0].children[0].children[0].children[0].children[4].innerHTML
          .replace(userinfo.children[0].children[0].children[0].children[0].children[4].children[0].outerHTML, "")
          .trim()),
        registered: userinfo.children[0].children[0].children[0].children[0].children[5].innerHTML
          .replace("Registration date :", "")
          .trim(),
        /**
         * Provides info about a nation for a player's profile
         * @typedef {Object} CountryInfo
         * @property {number} vehicles The amount of total vehicles
         * @property {number} elite The amount of elite (fully researched) vehicles
         * @property {number} medals The amount of medals for the country
         */
        usa: {
          vehicles: userinfo.children[0].children[3].children[2].innerHTML,
          elite: userinfo.children[0].children[3].children[3].innerHTML,
          medals: userinfo.children[0].children[3].children[4].innerHTML
            .replace("<div class=\" ptrim1\"></div>", "")
            .trim()
        },
        ussr: {
          vehicles: userinfo.children[0].children[5].children[2].innerHTML,
          elite: userinfo.children[0].children[5].children[3].innerHTML,
          medals: userinfo.children[0].children[5].children[4].innerHTML
            .replace("<div class=\" ptrim1\"></div>", "")
            .trim()
        },
        britain: {
          vehicles: userinfo.children[0].children[7].children[2].innerHTML,
          elite: userinfo.children[0].children[7].children[3].innerHTML,
          medals: userinfo.children[0].children[7].children[4].innerHTML
            .replace(userinfo.children[0].children[7].children[4].children[0].outerHTML, "")
            .trim()
        },
        germany: {
          vehicles: userinfo.children[0].children[9].children[2].innerHTML,
          elite: userinfo.children[0].children[9].children[3].innerHTML,
          medals: userinfo.children[0].children[9].children[4].innerHTML
            .replace("<div class=\" ptrim1\"></div>", "")
            .trim()
        },
        japan: {
          vehicles: userinfo.children[0].children[11].children[2].innerHTML,
          elite: userinfo.children[0].children[11].children[3].innerHTML,
          medals: userinfo.children[0].children[11].children[4].innerHTML
            .replace("<div class=\" ptrim1\"></div>", "")
            .trim()
        },
        italy: {
          vehicles: userinfo.children[0].children[13].children[2].innerHTML,
          elite: userinfo.children[0].children[13].children[3].innerHTML,
          medals: userinfo.children[0].children[13].children[4].innerHTML
            .replace("<div class=\" ptrim1\"></div>", "")
            .trim()
        }
      };

      data.profile = profile;
      data.stats = stats;

      return data;
    } else if (key.toLowerCase() === "squadron") {
      const res = await new GETRequest(`${URLs.clan}${args.join(" ")}`, "get").gen();

      const { window: { document } } = new JSDOM(res.text);

      const claninfo = document.getElementsByClassName("clan-info")[0];
      const clanmembers = document.getElementsByClassName("clan-members")[0];

      if (!claninfo) {
        data.error = "Not found";
        return data;
      }

      const members = [];
      for (const member of clanmembers.children[0].children) {
        if (member.children.length !== 7) {
          continue;
        }
        const obj = {
          name: member.children[1].children[0].innerHTML,
          rating: {
            arcade: member.children[2].innerHTML,
            realistic: member.children[3].innerHTML,
            simulator: member.children[4].innerHTML
          },
          role: member.children[5].innerHTML !== "" ? member.children[5].innerHTML : "Unknown",
          entry: member.children[6].innerHTML
        };
        members.push(obj);
      }

      data = {
        name: claninfo.children[0].children[0].children[0].children[0].children[1].innerHTML,
        image: claninfo.children[0].children[0].children[0].children[0].children[0].src,
        players: parseInt(claninfo.children[0].children[0].children[0].children[0].children[2].innerHTML
          .replace("Number of players:", "")
          .split("<br>").join("")
          .trim()),
        description: claninfo.children[0].children[0].children[0].children[0].children[3].innerHTML,
        createdAt: claninfo.children[0].children[0].children[0].children[0].children[4].innerHTML
          .replace("date of creation:", "")
          .trim(),
        airKills: {
          arcade: claninfo.children[0].children[3].children[1].innerHTML,
          realistic: claninfo.children[0].children[5].children[1].innerHTML,
          simulator: claninfo.children[0].children[7].children[1].innerHTML
        },
        groundKills: {
          arcade: claninfo.children[0].children[3].children[2].innerHTML,
          realistic: claninfo.children[0].children[5].children[2].innerHTML,
          simulator: claninfo.children[0].children[7].children[2].innerHTML
        },
        deaths: {
          arcade: claninfo.children[0].children[3].children[3].innerHTML,
          realistic: claninfo.children[0].children[5].children[3].innerHTML,
          simulator: claninfo.children[0].children[7].children[3].innerHTML
        },
        flightTime: {
          arcade: claninfo.children[0].children[3].children[4].innerHTML,
          realistic: claninfo.children[0].children[5].children[4].innerHTML,
          simulator: claninfo.children[0].children[7].children[4].innerHTML
        },
        members
      };
      return data;
    } else if (key === "news") {
      const res = await new GETRequest(`${URLs.news}${args.join(" ")}`).gen();

      const { window: { document } } = new JSDOM(res.text);

      const elements = document.getElementsByClassName("news-item__anons");

      if (!elements.length) {
        data.error = "Not found";
        return data;
      }
      const _data = [];
      for (const element of elements) {
        const data_ = {
          /**
           * Provides info for news and changelogs
           * @typedef {Object} NewsInfo
           * @property {string} url The URL to the news/changelog page
           * @property {string} title The title of the news/update
           * @property {string} date The date the news was announced/the update was released
           * @property {number} comments The amount of comments. If comments are not available, comments will be 0
           */
          url: element.children[0].href,
          title: element.children[0].innerHTML,
          text: element.children[2].children[0].innerHTML.trim(),
          date: element.children[3].children[0].children[0].className === "date"
            ? element.children[3].children[0].children[0].innerHTML
            : element.children[3].children[0].children[1].innerHTML,
          comments: element.children[3].children[0].children[0].className.trim().includes("comment-count")
            ? parseInt(element.children[3].children[0].children[0].innerHTML)
            : 0
        };
        _data.push(data_);
      }
      return _data;
    } else if (key === "changelog") {
      const res = await new GETRequest(`${URLs.changelog}${args.join(" ")}`).gen();
      const { window: { document } } = new JSDOM(res.text);

      const elements = document.getElementsByClassName("news-item__anons ");

      if (!elements.length) {
        data.error = "Not found";
        return data;
      }
      const _data = [];
      for (const element of elements) {
        const data_ = {
          url: element.children[1].href,
          title: element.children[1].innerHTML,
          text: element.children[3].children[0].innerHTML.trim(),
          date: element.children[0].innerHTML,
          comments: 0
        };
        _data.push(data_);
      }
      return _data;
    } else {
      data.error = "Invalid option specified";
      return data;
    }
  }
}

module.exports = RequestManager;