/** Parses the raw player data */
class Profile {
  /**
   * Provides raw data about a player
   * @typedef {Object} PlayerData
   * @property {profileInfo} profile The player's profile
   * @property {difficultyInfo} stats Game statistics for the player
   */
  /**
   * Provides statistics about a user's profile
   * @typedef {Object} profileInfo
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
   * Provides game statistics about a player
   * @typedef {Object} profileStats
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
   * Provides info about a nation for a player's profile
   * @typedef {Object} countryInfo
   * @property {number} vehicles The amount of total vehicles
   * @property {number} elite The amount of elite (fully researched) vehicles
   * @property {number} medals The amount of medals for the country
   */
  /**
   * Provides info for all three gamemodes
   * @typedef {Object} difficultyInfo
   * @property {profileStats} arcade The info for the Arcade gamemode
   * @property {profileStats} realistic The info for the Realistic gamemode
   * @property {profileStats} simulator The info for the Simulator gamemode
   */
  /**
   * Creates a new Profile
   * @param {PlayerData} data The raw profile data
   */
  constructor(data) {
    /**
     * The raw data
     * @type {Object}
     * @private
     * @readonly
     */
    this.rawData = data;

    /**
     * The player's statistics
     * @type {Map<string, difficultyInfo>}
     * @readonly
     */
    this.stats = new Map(
      ["arcade", data.stats.arcade],
      ["realistic", data.stats.realistic],
      ["simulator", data.stats.simulator]
    );

    /**
     * The URL to the player's profile picture
     * @type {string}
     * @readonly
     */
    this.image = data.profile.image;

    /**
     * The in-game nickname of the player
     * @type {string}
     * @readonly
     */
    this.nick = data.profile.nick;

    /**
     * The in-game title of the player, if he has one
     * @type {string}
     * @readonly
     */
    this.title = data.profile.title !== ""
      ? data.profile.title
      : null;

    /**
     * The experience level of the player
     * @type {Number}
     * @readonly
     */
    this.level = data.proile.level;

    /**
     * The registration data of the player
     * @type {string}
     * @readonly
     */
    this.registered = data.profile.registered;

    /**
     * Per-country info for the player
     * @type {Map<string,countryInfo>}
     */
    this.countries = new Map(
      ["usa", data.profile.usa],
      ["ussr", data.profile.ussr],
      ["britain", data.profile.britain],
      ["germany", data.profile.germany],
      ["japan", data.profile.japan],
      ["italy", data.profile.italy]
    );
  }
  /**
   * Parses the raw data to JSON
   * @return {JSON}
   * @readonly
   */
  get toJSON() {
    return JSON.stringify(this.rawData);
  }

  /**
   * Gets name of the player's squadron, if he is in one.
   * Returns null if the player is not in a squadron.
   * @return {string}
   * @readonly
   */
  get squadron() {
    if (this.rawData.profile.squadron.toLowerCase() !== "none") {
      return this.rawData.profile.squadron.trim();
    } else {
      return null;
    }
  }
  /**
   * Gets the title of the player, if he has any.
   * Returns null if the player does not have a
   * title set.
   * @return {string}
   * @readonly
   */
  get title() {
    if (this.rawData.profile.title !== "") {
      return this.rawData.profile.title;
    } else {
      return null;
    }
  }
}

module.exports = Profile;