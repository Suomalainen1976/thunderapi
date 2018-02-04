/** Parses the raw player data */
class Profile {
  /**
   * Provides raw data about a player
   * @typedef {Object} PlayerData
   * @property {ProfileInfo} profile The player's profile
   * @property {DifficultyInfo} stats Game statistics for the player
   */
  /**
   * Creates a new Profile
   * @param {PlayerData} data The raw profile data
   */
  constructor(data) {
    /**
     * The player's statistics
     * @type {Map<string, ProfileStats>}
     * @readonly
     */
    this.stats = new Map();
    this.stats.set("arcade", data.stats.arcade);
    this.stats.set("realistic", data.stats.realistic);
    this.stats.set("simulator", data.stats.simulator);

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
     * The experience level of the player
     * @type {Number}
     * @readonly
     */
    this.level = data.profile.level;

    /**
     * The registration data of the player
     * @type {string}
     * @readonly
     */
    this.registered = data.profile.registered;

    /**
     * Per-country info for the player
     * @type {Map<string,CountryInfo>}
     * @readonly
     */
    this.countries = new Map();
    this.countries.set("usa", data.profile.usa);
    this.countries.set("ussr", data.profile.ussr);
    this.countries.set("britain", data.profile.britain);
    this.countries.set("germany", data.profile.germany);
    this.countries.set("japan", data.profile.japan);
    this.countries.set("italy", data.profile.italy);

    /**
     * The squadron name of the player, if he is in any.
     * Returns null if the player is not in a squadron
     * @type {string}
     * @readonly
     */
    this.squadron = data.profile.squadron.trim() || null;

    /**
     * The title of the player, if he has set any.
     * Returns null if the player does not have
     * a title set.
     * @type {string}
     * @readonly
     */
    this.title = data.profile.title.trim() || null;
  }
}

module.exports = Profile;