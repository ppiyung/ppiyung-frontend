import axios from 'axios';
import apiUri from '@/apiUri';

export default {
  namespaced: true,
  state: {
    notifyList: [],
    notifyDetail: { }
  },
  getters: {
    notifyList(state) {
      return state.notifyList;
    },
    notifyDetail(state) {
      return state.notifyDetail;
    },
  },
  mutations: {
    setNotifyList(state, notifyList) {
      state.notifyList = notifyList;
    },
    setNotifyDetail(state, notifyDetail) {
      state.notifyDetail = notifyDetail;
    }
  },
  actions: {
    requestNotifyList({ commit, rootGetters }) { // 전체 알림 조회
      axios.get(
        `${apiUri.Notify}/apply/requestNotifyList`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          commit('setNotifyList', result.data.payload);
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    },
  
    requestDeleteNotify({ commit, rootGetters }, { notificationId }) { // 알림 삭제
      axios.delete(
        `${apiUri.Notify}/${notificationId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          },
          data: {
            notificationId: notificationId
          }
        }
      )
        .then(() => {
          commit('common/setSuccess', true, { root: true });
        })
        .catch(() => {
          commit('common/setSuccess', false, { root: true });
        });
    }
  }
};
