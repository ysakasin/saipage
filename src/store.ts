import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    roomName: '滅びの立会人と創造の観測者と',
    userName: 'ななし',
    gameType: 'DiceBot',
    shortcuts: new Array(),
    logs: new Array(),
    diceAnimationQueue: new Array(),
    readyAnimation: true,
    settings: {
      playSound: true,
      playDiceAnimation: true,
      showSystemInfo: true,
    }
  },
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
    removeShortcut(state, shortcut) {
      const newList = state.shortcuts.filter((i) => { return i != shortcut; });
      if (state.shortcuts != newList) {
        state.shortcuts = newList;
      }
    },
    appendLog(state, log) {
      state.logs.unshift(log);
    },
    pushDice(state, diceResults) {
      if (state.readyAnimation) {
        state.diceAnimationQueue.shift();
        state.readyAnimation = false;
      }
      state.diceAnimationQueue.push(diceResults);
    },
    nextAnimation(state) {
      if (state.diceAnimationQueue.length > 1) {
        state.diceAnimationQueue.shift();
      } else {
        state.readyAnimation = true;
      }
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
});
export default store;
