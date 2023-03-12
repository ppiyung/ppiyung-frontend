import axios from 'axios';
import apiUri from '@/apiUri';
// eslint-disable-next-line
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
    requestRecruitList({ commit, rootGetters }) {
      axios.get(
        apiUri.recruit,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          commit('setRecruitList', result.data.payload);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};
