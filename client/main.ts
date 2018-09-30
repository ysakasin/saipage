import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Vuex from "vuex";

const App = () => import(/* webpackChunkName: "app" */ './App.vue').then(m => m.default);
const Lobby = () => import(/* webpackChunkName: "lobby" */ './Lobby.vue').then(m => m.default);

import store from "./store";

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Lobby },
    { path: "/rooms/:roomId", component: App }
  ]
});

const app = new Vue({
  el: "#app",
  store,
  router
});
