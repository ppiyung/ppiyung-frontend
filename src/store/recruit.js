/* eslint-disable */
import axios from "axios";
import apiUri from '@/apiUri';
import router from '../router';

export default {
  namespaced: true,
  state: {
    recruitList: []
  },
  getters: {
    recruitList(state) {
      return state.recruitList;
    }
  },
  mutations: {
    setRecruitList(state, recruitList) {
      state.recruitList = recruitList;
    }
  },
  actions: {
    requestRecruitList({ commit }) {
      axios.get(apiUri.recruit,
      { withCredentials: true })
      .then((result) => {
        commit('setRecruitList', result.data.payload);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          router.push({ name: 'login' });
        }
        console.error(error);
      })
    }
  }
};
