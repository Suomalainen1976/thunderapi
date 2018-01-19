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