/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import apiUri from '@/apiUri';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    member_id: '',
    member_name: '',
    member_type: ''
  },
  getters: {
    getMemberInfo(state) {
      return {
        member_id: state.member_id,
        member_name: state.member_name,
        member_type: state.member_type
      };
    },
    isLogin(state) {
      if (state.member_id === '' ||
          state.member_name === '' ||
          state.member_type === '') {
        return false;
      } else {
        return true;
      }
    }
  },
  mutations: {
    setMemberInfo(state, {member_id, member_name, member_type}) {
      state.member_id = member_id;
      state.member_name = member_name;
      state.member_type = member_type;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
});
