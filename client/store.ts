import Vue from 'vue';
import Vuex from 'vuex';
import socket from './socket';
import axios from 'axios';

Vue.use(Vuex);

const state: State = {
  roomId: 'deadbeef',
  roomName: 'ロード中...',
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
  },
  disconnected: false,
};

const store = new Vuex.Store({
  state,
  mutations: {
    setRoomId(state, roomId) {
      state.roomId = roomId;
    },
    updateRoomName(state, newName) {
      state.roomName = newName;
    },
    changeUserName(state, newName) {
      state.userName = newName;
    },
    updateGameType(state, newType) {
      state.gameType = newType;
    },
    initShortcuts(state, shortcuts) {
      state.shortcuts = shortcuts || [];
    },
    addShortcut(state, shortcut) {
      if (state.shortcuts.indexOf(shortcut) == -1) {
        state.shortcuts.push(shortcut);
      }
    },
    removeShortcut(state, shortcut: string) {
      const newList = state.shortcuts.filter((i) => i != shortcut);
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
    initLog(state, logs: Log[]) {
      if (logs) {
        state.logs = logs.reverse();
      }
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
      localStorage.setItem('settings', JSON.stringify(state.settings));
    },
    updateAnimationSetting(state, val: boolean) {
      state.settings.playDiceAnimation = val;
      localStorage.setItem('settings', JSON.stringify(state.settings));
    },
    updateSystemInfoSetting(state, val: boolean) {
      state.settings.showSystemInfo = val;
      localStorage.setItem('settings', JSON.stringify(state.settings));
    },
    loadSettings(state) {
      const str = localStorage.getItem('settings');
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
    connected(state) {
      state.disconnected = false;
    },
    disconnected(state) {
      state.disconnected = true;
    }
  },
  actions: {
    joinRoom(context, roomId: string) {
      context.commit('setRoomId', roomId);
      axios.get('/api/v1/room/' + roomId)
        .then(res => {
          context.commit('updateRoomName', res.data.roomName);
          context.commit('updateGameType', res.data.gameType);
          context.commit('initLog', res.data.logs);
          context.commit('initShortcuts', res.data.shortcuts);
          socket.emit('join', roomId);
        });
    },
    sendLog(context, log: Log) {
      context.commit('appendLogBuffer', log);
      socket.emit('log', log);
    },
    updateRoomName(context, roomName: string) {
      socket.emit('roomName', roomName);
    },
    updateGameType(context, gameType: string) {
      socket.emit('gameType', gameType);
    },
    addShortcut(context, shortcut: string) {
      context.commit('addShortcut', shortcut);
      socket.emit('addShortcut', shortcut);
    },
    removeShortcut(context, shortcut: string) {
      context.commit('removeShortcut', shortcut);
      socket.emit('removeShortcut', shortcut);
    }
  },
  getters: {
    readyAnimation(state) {
      return state.readyAnimation;
    },
  },
});
export default store;
