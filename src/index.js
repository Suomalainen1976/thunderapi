const RequestManager = require("./RequestManager");
const Package = require("../package.json");

/** A class to provide data from War Thunder's site including profile and squadron info */
class ThunderApi {
  /**
   * Creates a new ThunderAPI class
   * @param {string} userAgent The useragent to use
   */
  constructor(userAgent) {
    /**
     * The User Agent
     * @type {string}
     * @private
     */
    this.USER_AGENT = userAgent;
    /**
     * The Request Manager for ThunderApi
     * @type {RequestManager}
     * @private
     */
    this.requestManager = new RequestManager(this.USER_AGENT, Package.version);
  }

  /**
   * Get a player's profile
   * @param {string} player The profile of the player to fetch
   * @return {Promise<PlayerInfo>}
   * @example
   * // The following example gets the profile of the player
   * // TheDutchy0412 and logs the squadron name
   * // and the registration date
   * ThunderAPI.getPlayer("TheDutchy0412")
   *   .then(data => {
   *     console.log(data.squadron);
   *     console.log(data.registered);
   *   })
   *   .catch(err => console.error("Oh no, an error occurred!", err));
   */
  getPlayer(player) {
    return new Promise(async (resolve, reject) => {
      const data = await this.requestManager.get("profile", player);
      if (data.error) reject(new Error(data.error));
      resolve(data);
    });
  }

  /**
   * Get's info about a squadron.
   * <note>You must provide the <strong>full</strong> name of the squadron,
   * e.g. "35th Gopnik nation battle group" instead of
   * "GOPNK".</note>
   * @param {string} name The **full** name of the squadron
   * @return {Promise<SquadronInfo>}
   * @example
   * // The following example gets info about
   * // the squadron 35th Gopnik nation battle group,
   * // and logs the squadron description, and the
   * // date this squadron was created
   * ThunderAPI.getSquadron("35th Gopnik nation battle group")
   *   .then(data => {
   *     console.log(data.description);
   *     console.log(data.createdAt);
   *   })
   *   .catch(err => console.error("Oh no, an error occurred!", err));
   */
  getSquadron(name) {
    return new Promise(async (resolve, reject) => {
      const data = await this.requestManager.get("squadron", name);
      if (data.error) reject(new Error(data.error));
      resolve(data);
    });
  }
}

module.exports = {
  ThunderAPI: ThunderApi,
  version: Package.version
};

// Typedefs
/**
 * Provides squadron information
 * @typedef {Object} SquadronInfo
 * @property {string} name The name of the player
 * @property {string} image The link to the player's avatar
 * @property {string} description The squadron's description
 * @property {number} players The amount of players in the squadron
 * @property {string} createdAt The date when this squadron was created
 * @property {difficultyInfo} airKills The amount of air targets destroyed for all three difficulties
 * @property {difficultyInfo} groundKills The amount of ground targets destroyed for all three difficulties
 * @property {difficultyInfo} deaths The amount of deaths for all three difficulties
 * @property {difficultyInfo} flightTime The total flight time for all three difficulties
 * @property {memberInfo} members Data for each squadron member
 */

/**
 * Provides info for all three gamemodes
 * @typedef {Object} difficultyInfo
 * @property {Object|string} arcade The info for the Arcade gamemode
 * @property {Object|string} realistic The info for the Realistic gamemode
 * @property {Object|string} simulator The info for the Simulator gamemode
 */

/**
 * Provides info about Squadron members
 * @typedef {Object[]} memberInfo
 * @property {string} name The name of the squadron member
 * @property {difficultyInfo} rating The rating for the squadron member in all three gamemodes
 * @property {string} role The role of the squadron member, if available
 * @property {string} entry The date of entry for this member
 */

/**
 * Provides statistics about a user's profile
 * @typedef {Object} Profile
 * @property {string} image The URL to the player's in-game avatar
 * @property {string} nick The player's in-game name
 * @property {string} title The player's title, if he has one
 * @property {string} squadron The player's squadron, if he's in one
 * @property {number} level The player's in-game experience level
 * @property {string} registered The date when the player registered
 * @property {countryInfo} usa Statistics for the USA
 * @property {countryInfo} ussr Statistics for the USSR
 * @property {countryInfo} britain Statistics for Great Britain
 * @property {countryInfo} germany Statistics for Germany
 * @property {countryInfo} japan Statistics for Japan
 * @property {countryInfo} italy Statistics for Italy
 */

/**
 * Provides info about a nation for a player's profile
 * @typedef {Object} countryInfo
 * @property {number} vehicles The amount of total vehicles
 * @property {number} elite The amount of elite (fully researched) vehicles
 * @property {number} medals The amount of medals for the country
 */

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

/**
 * Provides info about a player
 * @typedef {Object} PlayerInfo
 * @property {Profile} profile The player's profile
 * @property {difficultyInfo} stats Game statistics for the player
 */