import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    roomName: "滅びの立会人と創造の観測者と",
    userName: "ななし",
    gameType: "DiceBot",
    logs: new Array(),
    diceAnimationQueue: new Array(),
    readyAnimation: true,
  },
  mutations: {
    changeRoomName(state, newName) {
      state.roomName = newName;
    },
    changeUserName(state, newName) {
      state.userName = newName;
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
  },
});
export default store;
