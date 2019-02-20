import axios from "axios";
import querystring from "query-string";

export const DEFAULT_URL = "https://www.taruki.com/bcdice-api";
const PATH_NAMES = "/v1/names";
const PATH_DICEROLL = "/v1/diceroll?";
const PATH_SYSTEMINFO = "/v1/systeminfo?";

let bcdiceURL = DEFAULT_URL;
let api_names = bcdiceURL + PATH_NAMES;
let api_diceroll = bcdiceURL + PATH_DICEROLL;
let api_systeminfo = bcdiceURL + PATH_SYSTEMINFO;

interface NameRes {
  name: string;
  system: string;
}

interface DiceName {
  gameType: string;
  name: string;
}

export function setBcdiceURL(url: string) {
  bcdiceURL = url;
  api_names = bcdiceURL + PATH_NAMES;
  api_diceroll = bcdiceURL + PATH_DICEROLL;
  api_systeminfo = bcdiceURL + PATH_SYSTEMINFO;
}

export function getBcdiceURL(): string {
  return bcdiceURL;
}

export async function fetchDicebots(): Promise<DiceName[]> {
  const res = await axios.get(api_names);
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

export async function diceRoll(gameType: string, cmd: string) {
  const query = querystring.stringify({ system: gameType, command: cmd });
  const res = await axios.get(api_diceroll + query);
  return res.data;
}

export async function fetchDicebotInfo(gameType: string) {
  const query = querystring.stringify({ system: gameType });
  const res = await axios.get(api_systeminfo + query);
  return res.data.systeminfo;
}
