import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import auth from './auth';
// eslint-disable-next-line
import recruit from './recruit';
import member from './member';
import common from './common';

import notify from './notify';

import admin from './admin';


Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth'],
});

export default new Vuex.Store({
  // 전역 상태를 정의함
  state: {
  },
  // 스토어 내의 상태를 조회하는 함수
  getters: {
  },
  // 상태를 변경하는 함수
  mutations: {
  },
  // 비동기적인 작업을 수행하는 함수
  actions: {
  },
  // Vuex 모듈을 등록, 상위 함수들을 갖는 Vuex 스토어의 하위 하위 모듈로써 동작함. 
  modules: {

    auth, recruit, member, common, notify, admin

  },
  // auth 모듈 영구히 저장
  plugins: [vuexLocal.plugin]
});
