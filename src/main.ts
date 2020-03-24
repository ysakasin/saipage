/* eslint-disable @typescript-eslint/no-unused-vars */

import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import Vuex from "vuex";
import App from "./App.vue";
import store from "./store";

const VueAnalytics = require("vue-analytics").default;

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueAnalytics, {
  id: "UA-32151614-6",
  debug: {
    sendHitTask: process.env.NODE_ENV === "production"
  }
});

const app = new Vue({
  el: "#app",
  render: h => h(App),
  store
});
