import axios from 'axios';
import apiUri from '@/apiUri.js';

export default {
  namespaced: true,
  state: {
    registerInfo: {
      currentStep: 1,
      memberActive: true
    },
  },
  getters: {
    registerInfo(state) {
      return state.registerInfo;
    }
  },
  mutations: {
    nextRegisterStep(state) {
      state.registerInfo.currentStep += 1;
    },
    prevRegisterStep(state) {
      if (state.registerInfo.currentStep <= 1) { // 1단계 이전으로는 갈 수 없다
        return;
      }
      state.registerInfo.currentStep -= 1;
    },
    setRegisterMemberType(state, memberType) {
      state.registerInfo.memberType = memberType;
    },
    setRegisterInfo(state, registerInfoParam) {
      state.registerInfo = {
        ...state.registerInfo,
        ...registerInfoParam
      };
    }
  },
  actions: {
    register({ commit, getters }) {
      console.log('회원가입 요청 시작');
      axios.post(
        apiUri.signin,
        getters.registerInfo
      )
        .then(() => {
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    }
  }
};
