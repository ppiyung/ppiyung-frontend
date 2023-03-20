import axios from 'axios';
import apiUri from '@/apiUri';
import router from '@/router';

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

    // memberId에 따른 알림 목록 조회
    requestNotifyList({ commit, rootGetters }, memberId) { 
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

    // 일반회원 알림 목록에서 해당 알림 삭제
    requestDeleteNomalNotify({ commit, rootGetters }, notificationId) { 
      console.log('알림 삭제 시작');
      axios.delete(
        `${apiUri.notify}/${notificationId}`,
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
        alert('알림이 삭제되었습니다.');
          //  페이지 새로고침을 위해 router.push 대신 window.location.reload() 사용
          if (router.currentRoute.name !== '/notify/nomal') {
            window.location.reload();
        }
        })
        .catch(() => {
          commit('common/setSuccess', false, { root: true });
          alert('알림 삭제가 실패했습니다.');
        });
    },

     // 일반회원 알림 목록에서 해당 알림 삭제
     requestDeleteCompanyNotify({ commit, rootGetters }, notificationId) { 
      console.log('알림 삭제 시작');
      axios.delete(
        `${apiUri.notify}/${notificationId}`,
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
        alert('알림이 삭제되었습니다.');
          //  페이지 새로고침을 위해 router.push 대신 window.location.reload() 사용
          if (router.currentRoute.name !== '/notify/company') {
            window.location.reload();
        }
        })
        .catch(() => {
          commit('common/setSuccess', false, { root: true });
          alert('알림 삭제가 실패했습니다.');
        });
    },
  }
};
