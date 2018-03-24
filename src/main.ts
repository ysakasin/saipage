import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Vuex from "vuex";
import App from "./App.vue";

import store from "./store";

Vue.use(Vuetify);
Vue.use(Vuex);

const app = new Vue({
  el: "#app",
  render: (h) => h(App),
  store,
});
