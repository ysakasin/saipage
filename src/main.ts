import Vue from 'vue';
// import VueMdc from 'vue-mdc';
// import VueMaterial from 'vue-material';
import Vuetify from 'vuetify';
import App from './App.vue';
// import 'vue-mdc/dist/vue-mdc.css';
// import 'vue-material/dist/vue-material.min.css';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vue({
  el: '#app',
  render: h => h(App)
});
