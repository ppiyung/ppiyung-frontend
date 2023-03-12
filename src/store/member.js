import axios from 'axios';
import apiUri from '@/apiUri.js';

export default {
  namespaced: true,
  state: {
    registerInfo: {}
  },
  getters: {
    getregisterInfo(state) {
      return state.getregisterInfo;
    }
  },
  mutations: {
    setMemberType(state, memberType) {
      state.registerInfo.memberType = memberType;
    }
  },
  actions: {
    async verify({ commit }) {
      console.log('세션 검증 시작');
      try {
        const response = await axios.post(
          apiUri.verify,
          {},
          { withCredentials: true }
        );
        console.log(response);
        const memberInfo = response.data.payload;
        commit('setMemberInfo', {
          memberId: memberInfo.memberId,
          memberName: memberInfo.memberName,
          memberType: memberInfo.memberType
        });
        commit('setMemberVerified', true);
        console.log('세션 검증 완료 - 성공');
      } catch (error) {
        console.error(error);
        commit('setMemberInfo', {
          memberId: '',
          memberName: '',
          memberType: ''
        });
        commit('setMemberVerified', false);
        console.log('세션 검증 완료 - 실패');
      }
    }
  }
};
