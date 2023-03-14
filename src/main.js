import Vue from 'vue';
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';
import apiUri from './apiUri';
import secret from './secret';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$apiUri = apiUri;
Vue.prototype.$secret = secret;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

library.add(faBell, faMagnifyingGlass);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
