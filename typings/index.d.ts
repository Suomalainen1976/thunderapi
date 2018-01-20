declare namespace thunderapi {

  export const version: string;

  export class ThunderAPI {
    public constructor(userAgent: string);
    private readonly USER_AGENT: string;
    private readonly requestManager: RequestManager;
    private readonly cacheSweepInterval: number;
    private cache: Map<string, Profile | Squadron>;
    private _intervals: NodeJS.Timer[];

    public getPlayer(
      player: string,
      getFromCache?: boolean = true,
      shouldCache?: boolean = true
    ): Promise<Profile>;
    public getSquadron(
      name: string,
      getFromCache?: boolean = true,
      shouldCache?: boolean = true
    ): Promise<Squadron>;
    public raw(key: string, name: string): Promise<object>;
  }

  export class RequestManager {
    private constructor(
      userAgent: string,
      version: string
    );
    private readonly version: string;
    private readonly USER_AGENT: string;

    private get(key: string, name: string): Promise<{
      profile: {
        image: string;
        nick: string;
        title: string;
        squadron: string;
        level: number;
        registered: string;
        usa: {
          vehicles: number;
          elite: number;
          medals: number;
        };
        ussr: {
          vehicles: number;
          elite: number;
          medals: number;
        };
        britain: {
          vehicles: number;
          elite: number;
          medals: number;
        };
        germany: {
          vehicles: number;
          elite: number;
          medals: number;
        };
        japan: {
          vehicles: number;
          elite: number;
          medals: number;
        };
        italy: {
          vehicles: number;
          elite: number;
          medals: number;
        };
      };
      stats: {
        arcade: {
          victories: number;
          completed: number;
          ratio: string;
          sessions: number;
          deaths: number;
          fighter: string;
          bomber: string;
          attacker: string;
          tank: string;
          tankdestroyer: string;
          heavytank: string;
          spaa: string;
          airkills: number;
          groundkills: number;
          battletime: string;
        };
        realistic: {
          victories: number;
          completed: number;
          ratio: string;
          sessions: number;
          deaths: number;
          fighter: string;
          bomber: string;
          attacker: string;
          tank: string;
          tankdestroyer: string;
          heavytank: string;
          spaa: string;
          airkills: number;
          groundkills: number;
          battletime: string;
        };
        simulator: {
          victories: number;
          completed: number;
          ratio: string;
          sessions: number;
          deaths: number;
          fighter: string;
          bomber: string;
          attacker: string;
          tank: string;
          tankdestroyer: string;
          heavytank: string;
          spaa: string;
          airkills: number;
          groundkills: number;
          battletime: string;
        };
      }
    } | {
      name: string;
      image: string;
      players: number;
      description: string;
      createdAt: string;
      airKills: {
        arcade: string;
        realistic: string;
        simulator: string;
      };
      groundKills: {
        arcade: string;
        realistic: string;
        simulator: string;
      };
      deaths: {
        arcade: string;
        realistic: string;
        simulator: string;
      };
      flightTime: {
        arcade: string;
        realistic: string;
        simulator: string;
      };
      members: {
        name: string;
        rating: {
          arcade: string;
          realistic: string;
          simulator: string;
        };
        role: string;
        entry: string;
      }[];
    }>;
  }

  export class Profile {
    public constructor(data: {
      profile: {
        image: string;
        nick: string;
        title: string;
        squadron: string;
        level: number;
        registered: string;
        usa: {
          vehicles: number;
          elite: number;
          medals: number;
        };
        ussr: {
          vehicles: number;
          elite: number;
          medals: number;
        };
        britain: {
          vehicles: number;
          elite: number;
          medals: number;
        };
        germany: {
          vehicles: number;
          elite: number;
          medals: number;
        };
        japan: {
          vehicles: number;
          elite: number;
          medals: number;
        };
        italy: {
          vehicles: number;
          elite: number;
          medals: number;
        };
      };
      stats: {
        arcade: {
          victories: number;
          completed: number;
          ratio: string;
          sessions: number;
          deaths: number;
          fighter: string;
          bomber: string;
          attacker: string;
          tank: string;
          tankdestroyer: string;
          heavytank: string;
          spaa: string;
          airkills: number;
          groundkills: number;
          battletime: string;
        };
        realistic: {
          victories: number;
          completed: number;
          ratio: string;
          sessions: number;
          deaths: number;
          fighter: string;
          bomber: string;
          attacker: string;
          tank: string;
          tankdestroyer: string;
          heavytank: string;
          spaa: string;
          airkills: number;
          groundkills: number;
          battletime: string;
        };
        simulator: {
          victories: number;
          completed: number;
          ratio: string;
          sessions: number;
          deaths: number;
          fighter: string;
          bomber: string;
          attacker: string;
          tank: string;
          tankdestroyer: string;
          heavytank: string;
          spaa: string;
          airkills: number;
          groundkills: number;
          battletime: string;
        };
      }
    });

    public readonly stats: Map<string, {
      victories: number;
      completed: number;
      ratio: string;
      sessions: number;
      deaths: number;
      fighter: string;
      bomber: string;
      attacker: string;
      tank: string;
      tankdestroyer: string;
      heavytank: string;
      spaa: string;
      airkills: number;
      groundkills: number;
      battletime: string;
    }>;
    public readonly image: string;
    public readonly nick: string;
    public readonly level: number;
    public readonly registered: string;
    public readonly countries: Map<string, {
      vehicles: number;
      elite: number;
      medals: number;
    }>;
    public readonly squadron: string;
    public readonly title: string;
  }

  export class Squadron {
    public constructor(data: {
      name: string;
      image: string;
      players: number;
      description: string;
      createdAt: string;
      airKills: {
        arcade: string;
        realistic: string;
        simulator: string;
      };
      groundKills: {
        arcade: string;
        realistic: string;
        simulator: string;
      };
      deaths: {
        arcade: string;
        realistic: string;
        simulator: string;
      };
      flightTime: {
        arcade: string;
        realistic: string;
        simulator: string;
      };
      members: {
        name: string;
        rating: {
          arcade: string;
          realistic: string;
          simulator: string;
        };
        role: string;
        entry: string;
      }[];
    });

    public readonly name: string;
    public readonly image: string;
    public readonly players: number;
    public readonly description: string;
    public readonly createdAt: string;
    public readonly airKills: Map<string, string>;
    public readonly groundKills: Map<string, string>;
    public readonly deaths: Map<string, string>;
    public readonly flighttime: Map<string, string>;

    public members: Map<string, {
      name: string;
      rating: {
        arcade: string;
        realistic: string;
        simulator: string;
      };
      role: string;
      entry: string;
    }>;
  }
}
