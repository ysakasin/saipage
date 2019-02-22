declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare interface Dice {
  face: number;
  value: number;
}

declare interface Log {
  gameType: string;
  command: string;
  body: string;
  drawables: Dice[];
  timestamp: Date;
}

declare interface DiceBotInfo {
  name: string;
  gameType: string;
}

declare interface State {
  gameType: string;
  gameName: string;
  gameInfo: string;
  apiURL: string;
  diceBots: DiceBotInfo[];
  shortcuts: string[];
  logs: Log[];
  logBuffer: Log[];
  readyAnimation: boolean;
  activeAnimation: boolean;
  settings: {
    playSound: boolean;
    playDiceAnimation: boolean;
    showSystemInfo: boolean;
    showTips: boolean;
    soundVolume: number;
  };
}

declare module "*.mp3" {
  const content: string;
  export = content;
}

declare module "*.json" {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const value: any;
  export = value;
}
