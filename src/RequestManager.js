const request = require("snekfetch");
const { JSDOM } = require("jsdom");
const { oneLine } = require("common-tags");

/** Request manager for ThunderApi */
class RequestManager {
  /**
   * Creates a new RequestManager
   * @param {string} userAgent The User agent to use
   * @param {string} version The version of ThunderApi
   */
  constructor(userAgent, version) {
    if (typeof userAgent === "undefined") throw new TypeError("An User Agent must be provided");
    if (typeof version === "undefined") version = "0.0.1";
    /**
     * Version for the useragent
     * @type {string}
     */
    this.version = version;
    /**
     * User agent for requests
     * @type {string}
     */
    this.USER_AGENT = oneLine`
      ThunderAPI v${this.version} by devdutchy (https://github.com/devdutchy/thunderapi) being used by ${userAgent}
    `;
  }
  /**
   * Get data from War Thunder
   * @param {string} key The key to search on, either `profile` or `squadron`
   * @param {string} name The name of the player/squadron
   * @return {Promise<SquadronInfo|PlayerInfo>}
   */
  async get(key, name) { // eslint-disable-line complexity
    let data = {};
    if (key.toLowerCase() === "profile") {
      const res = await request
        .get(`https://warthunder.com/en/community/userinfo/?nick=${name}`)
        .set({ "User-Agent": this.USER_AGENT });

      if (res.status !== 200) {
        if (res.status === 404) {
          data.error = "Player not found";
          return data;
        }
        data.error = `Server responded with code ${res.status}`;
        return data;
      }
      const { window: { document } } = new JSDOM(res.text);

      const userinfo = document.getElementsByClassName("userinfo")[0];
      const userstats = document.getElementsByClassName("user-stat")[0];

      if (!userinfo || !userstats) return null;

      const stats = {
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

      const profile = {
        image: userinfo.children[0].children[0].children[0].children[0].children[0].src,
        nick: name,
        title: userinfo.children[0].children[0].children[0].children[0].children[2].innerHTML.replace("<br>", ""),
        squadron: userinfo.children[0].children[0].children[0].children[0].children[3].children[0].innerHTML !== ""
          ? userinfo.children[0].children[0].children[0].children[0].children[3].children[0].innerHTML
          : "None",
        level: userinfo.children[0].children[0].children[0].children[0].children[4].innerHTML
          .replace(userinfo.children[0].children[0].children[0].children[0].children[4].children[0].outerHTML, "")
          .trim(),
        registered: userinfo.children[0].children[0].children[0].children[0].children[5].innerHTML
          .replace("Registration date :", "")
          .trim(),
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
      const res = await request
        .get(`https://warthunder.com/en/community/claninfo/${name}`)
        .set({ "User-Agent": this.USER_AGENT });

      if (res.status !== 200) {
        if (res.status === 404) {
          data.error = "Squadron not found, make sure to enter the full name instead of only the abbreviation";
          return data;
        }
        data.error = `Server responded with code ${res.status}`;
        return data;
      }
      const { window: { document } } = new JSDOM(res.text);

      const claninfo = document.getElementsByClassName("clan-info")[0];
      const clanmembers = document.getElementsByClassName("clan-members")[0];

      if (!claninfo) {
        data.error = "Squadron not found, make sure to enter the full name instead of only the abbreviation";
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
        players: claninfo.children[0].children[0].children[0].children[0].children[2].innerHTML
          .replace("Number of players:", "")
          .split("<br>").join("")
          .trim(),
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
    } else {
      data.error = "Invalid option specified";
      return data;
    }
  }
}

module.exports = RequestManager;

/**
 * @external SquadronInfo
 * @see {@link http://docs.dutchy.ga/global.html#SquadronInfo}
 */
/**
 * @external memberInfo
 * @see {@link http://docs.dutchy.ga/global.html#memberInfo}
 */
/**
 * @external difficultyInfo
 * @see {@link http://docs.dutchy.ga/global.html#difficultyInfo}
 */
/**
 * @external Profile
 * @see {@link http://docs.dutchy.ga/global.html#Profile}
 */
/**
 * @external countryInfo
 * @see {@link http://docs.dutchy.ga/global.html#countryInfo}
 */
/**
 * @external ProfileStats
 * @see {@link http://docs.dutchy.ga/global.html#ProfileStats}
 */
/**
 * @external PlayerInfo
 * @see {@link http://docs.dutchy.ga/global.html#PlayerInfo}
 */