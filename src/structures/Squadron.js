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
   * @property {SquadronDifficultyStats} airKills The amount of air targets destroyed per difficulty
   * @property {SquadronDifficultyStats} groundKills The amount of ground targets destroyed per difficulty
   * @property {SquadronDifficultyStats} deaths The amount of deaths per difficulty
   * @property {SquadronDifficultyStats} flightTime The total flight time per difficulty
   * @property {SquadronMemberInfo[]} members Info for each squadron member
   */
  /**
   * Provides info about Squadron members
   * @typedef {Object} SquadronMemberInfo
   * @property {string} name The in-game name of the squadron member
   * @property {SquadronDifficultyStats} rating The rating for the squadron member, per difficulty
   * @property {string} role The squadron member's role
   * @property {string} entry The date of entry for the squadron member
   */
  /**
   * Provides info per difficulty for a squadron.
   * This is identical to Profile#difficultyInfo, with the difference being
   * that Profile#difficultyInfo is for profile statistics (which are objects),
   * and Squadron#SquadronDifficultyStats is for strings.
   * @typedef {Object} SquadronDifficultyStats
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
     * @type {Map<string,SquadronDifficultyStats>}
     * @readonly
     */
    this.airkills = new Map();
    this.airkills.set("arcade", data.airKills.arcade);
    this.airkills.set("realistic", data.airKills.realistic);
    this.airkills.set("simulator", data.airKills.simulator);

    /**
     * The amount of ground targets destroyed, mapped by gamemode
     * @type {Map<string,SquadronDifficultyStats>}
     * @readonly
     */
    this.groundkills = new Map();
    this.groundkills.set("arcade", data.groundKills.arcade);
    this.groundkills.set("realistic", data.groundKills.realistic);
    this.groundkills.set("simulator", data.groundKills.simulator);

    /**
     * The amount of deaths, mapped by gamemode
     * @type {Map<string,SquadronDifficultyStats>}
     * @readonly
     */
    this.deaths = new Map();
    this.deaths.set("arcade", data.deaths.arcade);
    this.deaths.set("realistic", data.deaths.realistic);
    this.deaths.set("simulator", data.deaths.simulator);

    /**
     * The total battle time, mapped by gamemode
     * @type {Map<string,SquadronDifficultyStats>}
     * @readonly
     */
    this.flighttime = new Map();
    this.flighttime.set("arcade", data.flightTime.arcade);
    this.flighttime.set("realistic", data.flightTime.realistic);
    this.flighttime.set("simulator", data.flightTime.simulator);

    /**
     * Get the amount of members, mapped by name
     * @return {Map<string,SquadronMemberInfo>}
     */
    this.members = new Map();
    for (const member of data.members) this.members.set(member.name, member);
  }
}

module.exports = Squadron;