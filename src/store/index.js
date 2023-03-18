import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import auth from './auth';
// eslint-disable-next-line
import recruit from './recruit';
import member from './member';
import common from './common';
import board from './board';
import admin from './admin';


Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth'],
});

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, recruit, member, common, board, admin
  },
  plugins: [vuexLocal.plugin]
});
