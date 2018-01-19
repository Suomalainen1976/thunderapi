/** Parses raw squadron data */
class Squadron {
  /**
   * Provides raw Squadron Data
   * @typedef {Object} SquadronData
   * @property {string} name The squadron name
   * @property {string} image The URL to the squadron's in-game picture
   * @property {Number} players The amount of players in the squadron
   * @property {string} description The squadron's description
   * @property {string} createdAt The date of creation for the squadron
   * @property {squadronDifficultyStats} airKills The amount of air targets destroyed per difficulty
   * @property {squadronDifficultyStats} groundKills The amount of ground targets destroyed per difficulty
   * @property {squadronDifficultyStats} deaths The amount of deaths per difficulty
   * @property {squadronDifficultyStats} flightTime The total flight time per difficulty
   * @property {squadronMemberInfo[]} members Info for each squadron member
   */
  /**
   * Provides info about Squadron members
   * @typedef {Object} squadronMemberInfo
   * @property {string} name The in-game name of the squadron member
   * @property {squadronDifficultyStats} rating The rating for the squadron member, per difficulty
   * @property {string} role The squadron member's role
   * @property {string} entry The date of entry for the squadron member
   */
  /**
   * Provides info per difficulty for a squadron.
   * This is identical to Profile#difficultyInfo, with the difference being
   * that Profile#difficultyInfo is for profile statistics (which are objects),
   * and Squadron#squadronDifficultyStats is for strings.
   * @typedef {Object} squadronDifficultyStats
   * @property {string} arcade The info for the Arcade gamemode
   * @property {string} realistic The info for the Realistic gamemode
   * @property {string} simulator The info for the Simulator gamemode
   */
  /**
   * Creates a new Squadron class
   * @param {SquadronData} data The raw squadron data
   */
  constructor(data) {
    /**
     * The squadron name
     * @type {string}
     * @readonly
     */
    this.name = data.name;

    /**
     * The URL to the squadron's in-game picture
     * @type {string}
     * @readonly
     */
    this.image = data.image;

    /**
     * The amount of players in the squadron
     * @type {Number}
     * @readonly
     */
    this.players = data.players;

    /**
     * The squadron's description
     * @type {string}
     * @readonly
     */
    this.description = data.description;

    /**
     * The date of creation of the squadron
     * @type {string}
     * @readonly
     */
    this.createdAt = data.createdAt;

    /**
     * The amount of air targets destroyed, mapped by gamemode
     * @type {Map<string,squadronDifficultyStats>}
     * @readonly
     */
    this.airkills = new Map(
      ["arcade", data.airKills.arcade],
      ["realistic", data.airKills.realistic],
      ["simulator", data.airKills.simulator]
    );

    /**
     * The amount of ground targets destroyed, mapped by gamemode
     * @type {Map<string,squadronDifficultyStats>}
     * @readonly
     */
    this.groundkills = new Map(
      ["arcade", data.groundKills.arcade],
      ["realistic", data.groundKills.realistic],
      ["simulator", data.groundKills.simulator]
    );

    /**
     * The amount of deaths, mapped by gamemode
     * @type {Map<string,squadronDifficultyStats>}
     * @readonly
     */
    this.deaths = new Map(
      ["arcade", data.deaths.arcade],
      ["realistic", data.deaths.realistic],
      ["simulator", data.deaths.simulator]
    );

    /**
     * The total battle time, mapped by gamemode
     * @type {Map<string,squadronDifficultyStats>}
     * @readonly
     */
    this.flighttime = new Map(
      ["arcade", data.flightTime.arcade],
      ["realistic", data.flightTime.realistic],
      ["simulator", data.flightTime.simulator]
    );
  }
  /**
   * Get the amount of members, mapped by name
   * @return {Map<string,squadronMemberInfo>}
   */
  get members() {
    
  }
}