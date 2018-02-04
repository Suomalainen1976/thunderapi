const RequestManager = require("./rest/RequestManager");
const Profile = require("./structures/Profile");
const Squadron = require("./structures/Squadron");
const Package = require("../package.json");
/** A class to provide data from War Thunder's site including profile and squadron info */
class ThunderApi {
  /**
   * Creates a new ThunderAPI class
   * @param {number} [cacheSweepInterval=180000] The timeout in milliseconds to sweep the cache, default being 180000 milliseconds
   */
  constructor(cacheSweepInterval = 180000) {
    /**
     * The Request Manager for ThunderApi
     * @type {RequestManager}
     * @private
     * @readonly
     */
    this.requestManager = new RequestManager();
    /**
     * A map of cached profiles/squadrons.
     * Cache will be sweeped after the time passed
     * @type {Map<string,Profile|Squadron>}
     * @private
     */
    this.cache = new Map();
    /**
     * The time cache should be sweeped, in milliseconds
     * @type {number}
     * @readonly
     */
    this.cacheSweepInterval = cacheSweepInterval;
    /**
     * All the intervals set
     * @type {Array}
     * @private
     */
    this._intervals = [];

    const interval = setInterval(this.sweepCache, this.cacheSweepInterval);
    this._intervals.push(interval);
  }

  /**
   * Get a player's profile
   * @param {string} player The profile of the player to fetch
   * @param {boolean} [getFromCache=true] If it should get the player from the cache. Defaults to true
   * @param {boolean} [shouldCache=true] If it should cache the profile. Defaults to true
   * @return {Promise<Profile>}
   * @example
   * // The following example gets the profile of the player
   * // TheDutchy0412 and logs the squadron name
   * // and the registration date
   * ThunderAPI.getPlayer("TheDutchy0412")
   *   .then(profile => {
   *     console.log(profile.squadron);
   *     console.log(profile.registered);
   *   })
   *   .catch(err => console.error("Oh no, an error occurred!", err));
   */
  getPlayer(player, getFromCache = true, shouldCache = true) {
    return new Promise(async (resolve, reject) => {
      if (typeof player !== "string") reject(new TypeError("Player name should be a string"));
      if (this.cache.has(player) && getFromCache) {
        const profile = this.cache.get(player);
        resolve(profile);
      }
      const data = await this.requestManager.get("profile", player);
      if (data.error) reject(new Error(data.error));
      const profile = new Profile(data);
      if (shouldCache) this.cache.set(player, profile);
      resolve(profile);
    });
  }

  /**
   * Get's info about a squadron.
   * <note>You must provide the <strong>full</strong> name of the squadron,
   * e.g. "35th Gopnik nation battle group" instead of
   * "GOPNK".</note>
   * @param {string} name The **full** name of the squadron
   * @param {boolean} [getFromCache=true] If it should get the squadron from the cache, if cached. Defaults to true
   * @param {boolean} [shouldCache=true] If it should cache the squadron. Defaults to true
   * @return {Promise<Squadron>}
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
  getSquadron(name, getFromCache = true, shouldCache = true) {
    return new Promise(async (resolve, reject) => {
      if (typeof name !== "string") reject(new TypeError("Squadron name should be a string"));
      if (this.cache.has(name) && getFromCache) {
        const squadron = this.cache.get(name);
        resolve(squadron);
      }
      const data = await this.requestManager.get("squadron", name);
      if (data.error) reject(new Error(data.error));
      const squadron = new Squadron(data);
      if (shouldCache) this.cache.set(name, squadron);
      resolve(squadron);
    });
  }

  /**
   * Returns an array of news objects
   * @param {number} [page=1] The page number of the news page
   * @return {Promise<NewsInfo[]>}
   */
  getNews(page = 1) {
    return new Promise(async (resolve, reject) => {
      if (isNaN(page)) reject(new TypeError("Provided page is not int"));
      const data = await this.requestManager.get("news", page);
      if (data.error) reject(new Error(data.error));
      resolve(data);
    });
  }

  /**
   * Returns an array of changelog objects
   * @param {number} [page=1] The page number of the changelogs
   * @return {Promise<NewsInfo[]>}
   */
  getUpdates(page = 1) {
    return new Promise(async (resolve, reject) => {
      if (isNaN(page)) reject(new TypeError("Provided page is not int"));
      const data = await this.requestManager.get("changelog", page);
      if (data.error) reject(new Error(data.error));
      resolve(data);
    });
  }

  /**
   * Get raw data
   * @param {string} key The raw data to get, either squadron, profile, news or changelog
   * @param {string} name The name of the squadron/player to get raw data from
   * @return {Promise<PlayerData|SquadronData|NewsInfo[]>}
   */
  raw(key, name) {
    return new Promise(async (resolve, reject) => {
      const data = await this.requestManager.get(key, name);
      if (data.error) reject(new Error(data.error));
      resolve(data);
    });
  }

  /**
   * Clears all the intervals
   * @return {void}
   * @private
   */
  _clearIntervals() {
    for (const interval of this._intervals) {
      clearInterval(interval);
      this._intervals.splice(this._intervals.indexOf(interval), 1);
    }
  }

  /**
   * Sweeps the cache
   * @return {void}
   */
  sweepCache() {
    this.cache.clear();
  }
}

module.exports = {
  // Core
  ThunderAPI: ThunderApi,
  RequestManager,
  version: Package.version,

  // Structures
  Profile: require("./structures/Profile"),
  Squadron: require("./structures/squadron")
};