import axios from "axios";
import querystring from "query-string";

const BCDICEAPI_URL = "https://www.taruki.com/bcdice-api";
const API_NAMES: string = BCDICEAPI_URL + "/v1/names";
const API_DICEROLL: string = BCDICEAPI_URL + "/v1/diceroll?";
const API_SYSTEMINFO: string = BCDICEAPI_URL + "/v1/systeminfo?";

interface NameRes {
  name: string;
  system: string;
}

interface DiceName {
  gameType: string;
  name: string;
}

export async function fetchDicebots(): Promise<DiceName[]> {
  const res = await axios.get(API_NAMES);
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
  const res = await axios.get(API_DICEROLL + query);
  return res.data;
}

export async function fetchDicebotInfo(gameType: string) {
  const query = querystring.stringify({ system: gameType });
  const res = await axios.get(API_SYSTEMINFO + query);
  return res.data.systeminfo;
}
