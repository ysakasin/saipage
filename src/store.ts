import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state: State = {
  roomName: '滅びの立会人と創造の観測者と',
  userName: 'ななし',
  gameType: 'DiceBot',
  shortcuts: [],
  logs: [],
  logBuffer: [],
  readyAnimation: true,
  activeAnimation: false,
  settings: {
    playSound: true,
    playDiceAnimation: true,
    showSystemInfo: true,
  }
};

const store = new Vuex.Store({
  state,
  mutations: {
    changeRoomName(state, newName) {
      state.roomName = newName;
    },
    changeUserName(state, newName) {
      state.userName = newName;
    },
    updateGameType(state, newType) {
      state.gameType = newType;
    },
    addShortcut(state, shortcut) {
      if (state.shortcuts.indexOf(shortcut) == -1) {
        state.shortcuts.push(shortcut);
      }
    },
    removeShortcut(state, shortcut: string) {
      const newList = state.shortcuts.filter((i) => { return i != shortcut; });
      if (state.shortcuts != newList) {
        state.shortcuts = newList;
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
    },
    updateAnimationSetting(state, val: boolean) {
      state.settings.playDiceAnimation = val;
    },
    updateSystemInfoSetting(state, val: boolean) {
      state.settings.showSystemInfo = val;
    }
  },
  getters: {
    readyAnimation(state) {
      return state.readyAnimation;
    }
  }
});
export default store;
