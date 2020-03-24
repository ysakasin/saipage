import Vue from "vue";
import Vuex from "vuex";
import {
  DEFAULT_URL,
  fetchDicebotInfo,
  setBcdiceURL,
  fetchDicebots
} from "./dice";

Vue.use(Vuex);

const defaultShotcuts = ["2D6", "2D6<=?", "1D100"];

const state: State = {
  gameType: "DiceBot",
  gameName: "",
  gameInfo: "ロード中…",
  apiURL: "",
  diceBots: [],
  shortcuts: [],
  logs: [],
  logBuffer: [],
  readyAnimation: true,
  activeAnimation: false,
  settings: {
    playSound: true,
    playDiceAnimation: true,
    showSystemInfo: true,
    showTips: true,
    soundVolume: 0.5
  }
};

const store = new Vuex.Store({
  state,
  mutations: {
    updateGameType(state, gameType: string) {
      state.gameType = gameType;
      localStorage.setItem("gameType", state.gameType);
    },
    updateGameName(state, gameName: string) {
      state.gameName = gameName;
    },
    updateGameInfo(state, gameInfo: string) {
      state.gameInfo = gameInfo;
    },
    updateDiceBots(state, diceBots: DiceBotInfo[]) {
      state.diceBots = diceBots;
    },
    addShortcut(state, shortcut: string) {
      if (state.shortcuts.indexOf(shortcut) == -1) {
        state.shortcuts.push(shortcut);
        localStorage.setItem("shortcuts", JSON.stringify(state.shortcuts));
      }
    },
    removeShortcut(state, shortcut: string) {
      const newList = state.shortcuts.filter(i => i != shortcut);
      if (state.shortcuts != newList) {
        state.shortcuts = newList;
        localStorage.setItem("shortcuts", JSON.stringify(state.shortcuts));
      }
    },
    appendLogBuffer(state, log: Log) {
      if (!state.settings.playDiceAnimation) {
        state.logs.unshift(log);
        return;
      }

      if (state.readyAnimation) {
        state.readyAnimation = false;
      }
      state.logBuffer.push(log);
    },
    appendLog(state, log: Log) {
      state.logs.unshift(log);
      localStorage.setItem("logs", JSON.stringify(state.logs));
    },
    removeAllLogs(state) {
      state.logs = [];
      localStorage.removeItem("logs");
    },
    nextAnimation(state) {
      state.logBuffer.shift();
      if (state.logBuffer.length < 1) {
        state.readyAnimation = true;
      }
    },
    activateAnimation(state) {
      state.activeAnimation = true;
    },
    deactivateAnimation(state) {
      state.activeAnimation = false;
    },
    updateSoundSetting(state, val: boolean) {
      state.settings.playSound = val;
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },
    updateAnimationSetting(state, val: boolean) {
      state.settings.playDiceAnimation = val;
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },
    updateSystemInfoSetting(state, val: boolean) {
      state.settings.showSystemInfo = val;
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },
    updateTipsSetting(state, val: boolean) {
      state.settings.showTips = val;
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },
    updateSoundVolumeSetting(state, val: number) {
      state.settings.soundVolume = val;
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },
    loadGameType(state) {
      const str = localStorage.getItem("gameType");
      if (str == null) {
        return;
      }
      state.gameType = str;
    },
    loadSettings(state) {
      const str = localStorage.getItem("settings");
      if (str == null) {
        return;
      }

      const settings = JSON.parse(str);
      if (settings.playSound != null) {
        state.settings.playSound = settings.playSound;
      }
      if (settings.playDiceAnimation != null) {
        state.settings.playDiceAnimation = settings.playDiceAnimation;
      }
      if (settings.showSystemInfo != null) {
        state.settings.showSystemInfo = settings.showSystemInfo;
      }
      if (settings.showTips != null) {
        state.settings.showTips = settings.showTips;
      }
      if (settings.soundVolume != null) {
        state.settings.soundVolume = settings.soundVolume;
      }
    },
    loadLogs(state) {
      const str = localStorage.getItem("logs");
      if (str == null) {
        return;
      }

      const logs = JSON.parse(str);
      if (logs != null) {
        state.logs = logs;
      }
    },
    loadShortcuts(state) {
      const str = localStorage.getItem("shortcuts");
      if (str == null) {
        state.shortcuts = defaultShotcuts;
        return;
      }

      const shortcuts = JSON.parse(str);
      if (shortcuts != null) {
        state.shortcuts = shortcuts;
      }
    },
    updateApiURL(state, url: string) {
      setBcdiceURL(url);
      localStorage.setItem("apiURL", url);
      state.apiURL = url;
    }
  },
  actions: {
    initialize(context) {
      context.dispatch("loadApiURL");
      context.dispatch("loadGameType");
      context.commit("loadSettings");
      context.commit("loadLogs");
      context.commit("loadShortcuts");
    },
    loadApiURL(context) {
      const str = localStorage.getItem("apiURL") || DEFAULT_URL;
      context.commit("updateApiURL", str);
      context.dispatch("loadDiceBots");
    },
    loadGameType(context) {
      context.commit("loadGameType");
      context.dispatch("updateGameInfos", context.state.gameType);
    },
    loadDiceBots(context) {
      fetchDicebots().then(dicebots => {
        context.commit("updateDiceBots", dicebots);
      });
    },
    updateApiURL(context, url: string) {
      context.commit("updateApiURL", url);
      context.dispatch("loadDiceBots");
    },
    updateGameType(context, gameType: string) {
      context.commit("updateGameType", gameType);
      context.dispatch("updateGameInfos", gameType);
    },
    updateGameInfos(context, gameType: string) {
      context.commit("updateGameType", gameType);
      fetchDicebotInfo(gameType).then(res => {
        context.commit("updateGameName", res.name);
        context.commit("updateGameInfo", res.info);
      });
    }
  },
  getters: {
    readyAnimation(state) {
      return state.readyAnimation;
    }
  }
});
export default store;
