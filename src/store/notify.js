import axios from 'axios';
import apiUri from '@/apiUri';

export default {
  namespaced: true,
  // 전역 상태 변수
  state: {
    notifyList: [], //알림 목록
    notifyDetail: { } // 알림 세부내용
  },
  // 변수를 반환함
  getters: {
    notifyList(state) {
      return state.notifyList;
    },
    notifyDetail(state) {
      return state.notifyDetail;
    },
  },
  // setter 변수를 설정함
  mutations: {
    setNotifyList(state, notifyList) {
      state.notifyList = notifyList;
    },
    setNotifyDetail(state, notifyDetail) {
      state.notifyDetail = notifyDetail;
    }
  },
  //비동기 함수 메서드
  actions: {
    requestNotifyList({ commit, rootGetters }, memberId) { // 개별 알림 조회
      axios.get(
        `${apiUri.notify}/${memberId}`,
        {
          withCredentials: true,
          params: {
            page: 3,
            size: 10
          },
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
        `${apiUri.Notify}/.//${notificationId}`,
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
