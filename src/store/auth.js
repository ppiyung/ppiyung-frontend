import axios from 'axios';
import apiUri from '@/apiUri';

export default {
  namespaced: true,
  state: {
    memberInfo: {},
    accessToken: '',
    refreshToken: '',
    authSuccess: null
  },
  getters: {
    memberInfo(state) {
      return state.memberInfo;
    },
    accessToken(state) {
      return state.accessToken;
    },
    refreshToken(state) {
      return state.refreshToken;
    },
    isLogin(state) {
      if (Object.keys(state.memberInfo).length === 0
              || state.accessToken === ''
              || state.refreshToken === '') {
        return false;
      }
      return true;
    },
    isAuthSuccess(state) {
      return state.authSuccess;
    }
  },
  mutations: {
    setMemberInfo(state, { memberInfo, accessToken, refreshToken }) {
      state.memberInfo = memberInfo;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    setAuthSuccess(state, isSuccess) {
      state.authSuccess = isSuccess;
    }
  },
  actions: {
    login({ commit }, { memberId, memberPw }) {
      axios.post(
        apiUri.login,
        {
          memberId,
          memberPw
        },
        { withCredentials: true }
      )
        .then((result) => {
          commit('setMemberInfo', result.data.payload);
          commit('setAuthSuccess', true);
        })
        .catch((result) => {
          console.error(result);
          commit('setAuthSuccess', false);
        });
    },
    logout({ commit }) {
      commit('setMemberInfo', {
        memberInfo: {},
        accessToken: '',
        refreshToken: ''
      });
      commit('setAuthSuccess', null);
    }
  }
};
