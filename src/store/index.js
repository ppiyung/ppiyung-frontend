/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentMember: {}
  },
  getters: {
    getMemberInfo(state) {
      return state.currentMember;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
});
