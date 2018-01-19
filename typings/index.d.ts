declare module thunderapi {

  import {
    ThunderAPI,
    countryInfo,
    difficultyInfo,
    memberInfo,
    PlayerInfo,
    Profile,
    ProfileStats,
    SquadronInfo,
    RequestManager
  } from "../src";
  
  export class ThunderAPI {
    public constructor(userAgent: string);
    private USER_AGENT: string;
    private requestManager: RequestManager;

    public getPlayer(player: string): Promise<PlayerInfo>;
    public getSquadron(name: string): Promise<SquadronInfo>;
  }
}