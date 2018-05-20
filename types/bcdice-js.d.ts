declare module "bcdice-js" {
  class BCDice {
    constructor();
    gameName(): string;
    getHelpMessage(): string;
    setGameByTitle(title: string): void;
    setMessage(msg: string): void;
    setCollectRandResult(flag: boolean): void;
    dice_command(): [string, boolean];
    getRandResults(): [number, number][];
  }

  class DiceBotLoader {
    constructor();
    static loadUnknownGame(gameType: string): BCDice;
    static collectDiceBotDescriptions(): [string, string, string][];
  }

  export default BCDice;
  export { DiceBotLoader };
}

declare module "*.mp3" {
  const content: string;
  export = content;
}
