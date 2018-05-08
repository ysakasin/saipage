import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Vuex from 'vuex';
import App from './App.vue';
import Lobby from './Lobby.vue';

import socket from './socket';
import store from './store';

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Lobby },
    { path: '/room/:roomId', component: App },
  ],
});

const app = new Vue({
  el: '#app',
  store,
  router,
});

socket.on('log', (log: Log) => {
  store.commit('appendLogBuffer', log);
});

socket.on('roomName', (roomName: string) => {
  store.commit('updateRoomName', roomName);
});

socket.on('gameType', (gameType: string) => {
  store.commit('updateGameType', gameType);
});

socket.on('addShortcut', (shortcut: string) => {
  store.commit('addShortcut', shortcut);
})

socket.on('removeShortcut', (shortcut: string) => {
  store.commit('removeShortcut', shortcut);
})
