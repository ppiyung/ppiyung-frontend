import Vue from 'vue';
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faMagnifyingGlass, faHeart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import dayjs from 'dayjs';
import utc from 'dayjs-plugin-utc';
import timezone from 'dayjs-timezone-iana-plugin';

import App from './App.vue';
import router from './router';
import store from './store';
import apiUri from './apiUri';
import secret from './secret';

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Seoul");

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$apiUri = apiUri;
Vue.prototype.$secret = secret;
Vue.prototype.$dayjs = dayjs;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CKEditor);

library.add(faBell, faMagnifyingGlass, faHeart);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
