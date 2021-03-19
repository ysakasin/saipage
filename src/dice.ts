import axios from "axios";
import querystring from "query-string";

import { Dice } from "./interface";

export const DEFAULT_URL = "https://bcdice.onlinesession.app";
const PATH_NAMES = "/v2/game_system";
const PATHDiceROLL = "/v2/game_system/";
const PATH_SYSTEMINFO = "/v2/game_system/";

let bcdiceURL = DEFAULT_URL;
let apiNames = bcdiceURL + PATH_NAMES;
let apiDiceroll = bcdiceURL + PATHDiceROLL;
let apiSysteminfo = bcdiceURL + PATH_SYSTEMINFO;

interface NameRes {
  id: string;
  name: string;
  sort_key: string;
}

interface DiceName {
  gameType: string;
  name: string;
}

export function setBcdiceURL(url: string): void {
  bcdiceURL = url;
  apiNames = bcdiceURL + PATH_NAMES;
  apiDiceroll = bcdiceURL + PATHDiceROLL;
  apiSysteminfo = bcdiceURL + PATH_SYSTEMINFO;
}

export function getBcdiceURL(): string {
  return bcdiceURL;
}

export async function fetchDicebots(): Promise<DiceName[]> {
  const res = await axios.get(apiNames);
  return res.data.game_system.map((x: NameRes) => {
    return { gameType: x.id, name: x.name };
  });
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function diceRoll(gameType: string, cmd: string): Promise<any> {
  const query = querystring.stringify({ command: cmd });
  const res = await axios.get(
    apiDiceroll + encodeURIComponent(gameType) + "/roll?" + query
  );
  console.log(res.data);
  return res.data;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function fetchDicebotInfo(gameType: string): Promise<any> {
  const res = await axios.get(apiSysteminfo + encodeURIComponent(gameType));
  return res.data;
}

interface Rands {
  kind: "normal" | "tens_d10" | "d9";
  sides: number;
  value: number;
}

function isDrawable(result: Rands): boolean {
  return (
    result.sides == 100 ||
    result.sides == 10 ||
    result.sides == 12 ||
    result.sides == 20 ||
    result.sides == 4 ||
    result.sides == 6 ||
    result.sides == 8
  );
}

export function selectDiceResults(randResults: Rands[]): Dice[] {
  const drawableResults = randResults.reduce((acc: Dice[], result: Rands) => {
    if (isDrawable(result)) {
      if (result.kind == "tens_d10") {
        acc.push({ face: 100, value: result.value / 10 });
      } else if (result.kind == "d9") {
        acc.push({ face: 10, value: result.value == 0 ? 10 : result.value });
      } else if (result.sides == 100) {
        acc.push({ face: 100, value: Math.floor(result.value / 10) });
        acc.push({ face: 10, value: result.value % 10 });
      } else {
        acc.push({ face: result.sides, value: result.value });
      }
    }
    return acc;
  }, []);
  return drawableResults;
}
