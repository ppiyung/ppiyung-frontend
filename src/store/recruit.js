import axios from 'axios';
import apiUri from '@/apiUri';

export default {
  namespaced: true,
  state: {
    selectedWorkArea: 1,
    recruitList: [],
    recruitDetail: { }
  },
  getters: {
    recruitList(state) {
      return state.recruitList;
    },
    selectedWorkArea(state) {
      return state.selectedWorkArea;
    },
    recruitDetail(state) {
      return state.recruitDetail;
    },
  },
  mutations: {
    setRecruitList(state, recruitList) {
      state.recruitList = recruitList;
    },
    setWorkArea(state, selectedWorkArea) {
      state.selectedWorkArea = selectedWorkArea;
    },
    setRecruitDetail(state, recruitDetail) {
      state.recruitDetail = recruitDetail;
    }
  },
  actions: {
    requestRecruitById({ commit, rootGetters }, id) { // 개별 채용공고 조회
      axios.get(
        `${apiUri.recruit}/recruitDetail/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          commit('setRecruitDetail', result.data.payload[0]);
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    },
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
    },
    requestAddBookmark({ commit, rootGetters }, { recruitId, memberId }) {
      axios.post(
        `${apiUri.recruit}/bookmark`,
        {
          recruitId,
          memberId
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then(() => {
          commit('common/setSuccess', true, { root: true });
        })
        .catch(() => {
          commit('common/setSuccess', false, { root: true });
        });
    },
    // eslint-disable-next-line
    requestAddApply({ rootGetters }, { recruitId, resultRef }) {
      axios.post(
        `${apiUri.recruit}/apply/${recruitId}`,
        { },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then(() => {
          console.log('공고 지원 성공');
          resultRef.success = true;
        })
        .catch(() => {
          console.error('공고 지원 실패');
          resultRef.success = false;
        });
    },
  }
};