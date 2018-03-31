declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare interface Dice {
  face: number;
  value: number;
}

declare interface Log {
  userName: string;
  body: string;
  drawables: Dice[];
}

declare interface State {
  roomName: string;
  userName: string;
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
