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
  shortcuts: string[];
  logs: Log[];
  logBuffer: Log[];
  readyAnimation: boolean;
  activeAnimation: boolean;
  settings: {
    playSound: boolean;
    playDiceAnimation: boolean;
    showSystemInfo: boolean;
  };
}

declare module "*.mp3" {
  const content: string;
  export = content;
}
