import axios from "axios";
import querystring from "query-string";

export const DEFAULT_URL = "https://bcdice.onlinesession.app";
const PATH_NAMES = "/v1/names";
const PATHDiceROLL = "/v1/diceroll?";
const PATH_SYSTEMINFO = "/v1/systeminfo?";

let bcdiceURL = DEFAULT_URL;
let apiNames = bcdiceURL + PATH_NAMES;
let apiDiceroll = bcdiceURL + PATHDiceROLL;
let apiSysteminfo = bcdiceURL + PATH_SYSTEMINFO;

interface NameRes {
  name: string;
  system: string;
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
  return res.data.names
    .map((x: NameRes) => {
      return { gameType: x.system, name: x.name };
    })
    .sort((a: DiceName, b: DiceName) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    });
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function diceRoll(gameType: string, cmd: string): Promise<any> {
  const query = querystring.stringify({ system: gameType, command: cmd });
  const res = await axios.get(apiDiceroll + query);
  return res.data;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function fetchDicebotInfo(gameType: string): Promise<any> {
  const query = querystring.stringify({ system: gameType });
  const res = await axios.get(apiSysteminfo + query);
  return res.data.systeminfo;
}
