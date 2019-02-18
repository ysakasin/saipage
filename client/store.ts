import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const defaultShotcuts = ["2D6", "2D6<=?", "1D100"];

const state: State = {
  gameType: "DiceBot",
  shortcuts: [],
  logs: [],
  logBuffer: [],
  readyAnimation: true,
  activeAnimation: false,
  settings: {
    playSound: true,
    playDiceAnimation: true,
    showSystemInfo: true
  }
};

const store = new Vuex.Store({
  state,
  mutations: {
    updateGameType(state, newType) {
      state.gameType = newType;
      localStorage.setItem("gameType", newType);
    },
    addShortcut(state, shortcut) {
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
    }
  },
  actions: {
    initialize(context) {
      context.commit("loadGameType");
      context.commit("loadSettings");
      context.commit("loadLogs");
      context.commit("loadShortcuts");
    }
  },
  getters: {
    readyAnimation(state) {
      return state.readyAnimation;
    }
  }
});
export default store;
