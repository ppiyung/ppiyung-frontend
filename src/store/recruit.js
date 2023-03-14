import axios from 'axios';
import apiUri from '@/apiUri';

export default {
  namespaced: true,
  state: {
    selectedWorkArea: 1,
    recruitList: []
  },
  getters: {
    recruitList(state) {
      return state.recruitList;
    },
    selectedWorkArea(state) {
      return state.selectedWorkArea;
    }
  },
  mutations: {
    setRecruitList(state, recruitList) {
      state.recruitList = recruitList;
    },
    setWorkArea(state, selectedWorkArea) {
      state.selectedWorkArea = selectedWorkArea;
    }
  },
  actions: {
    requestRecruitList({ commit, rootGetters }) { // 전체 채용공고 조회
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
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    },
    requestRecruitListByWorkArea({ commit, getters, rootGetters }) { // 직무분야별 채용공고 조회
      axios.get(
        `${apiUri.recruit}/workarea/${getters.selectedWorkArea}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          commit('setRecruitList', result.data.payload);
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    }
  }
};
