import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import App from './App.vue';
import 'vuetify/dist/vuetify.min.css';

import store from './store';

Vue.use(Vuetify);
Vue.use(Vuex);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
