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
  body: string;
  drawables: Dice[];
  timestamp: Date;
}

declare interface State {
  gameType: string;
  gameName: string;
  gameInfo: string;
  apiURL: string;
  shortcuts: string[];
  logs: Log[];
  logBuffer: Log[];
  readyAnimation: boolean;
  activeAnimation: boolean;
  settings: {
    playSound: boolean;
    playDiceAnimation: boolean;
    showSystemInfo: boolean;
    soundVolume: number;
  };
}

declare module "*.mp3" {
  const content: string;
  export = content;
}
