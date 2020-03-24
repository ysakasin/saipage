export interface Dice {
  face: number;
  value: number;
}

export interface Log {
  gameType: string;
  command: string;
  body: string;
  drawables: Dice[];
  timestamp: Date;
}
