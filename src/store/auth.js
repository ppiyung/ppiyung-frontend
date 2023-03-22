import axios from 'axios';
import apiUri from '@/apiUri';

export default {
  namespaced: true,
  state: {
    memberInfo: {},
    accessToken: '',
    accessTokenExpiresIn: null,
    refreshToken: '',
    refreshTokenExpiresIn: null
  },
  getters: {
    memberInfo(state) {
      return state.memberInfo;
    },
    accessToken(state) {
      return state.accessToken;
    },
    accessTokenExpiresIn(state) {
      return state.accessTokenExpiresIn;
    },
    refreshToken(state) {
      return state.refreshToken;
    },
    refreshTokenExpiresIn(state) {
      return state.refreshTokenExpiresIn;
    },
    isLogin(state) {
      if (Object.keys(state.memberInfo).length === 0
              || state.accessToken === ''
              || state.refreshToken === '') {
        return false;
      }
      return true;
    }
  },
  mutations: {
    setMemberInfo(state, {
      memberInfo, accessToken, accessTokenExpiresIn,
      refreshToken, refreshTokenExpiresIn
    }) {
      state.memberInfo = memberInfo;
      state.accessToken = accessToken;
      state.accessTokenExpiresIn = new Date(accessTokenExpiresIn);
      state.refreshToken = refreshToken;
      state.refreshTokenExpiresIn = new Date(refreshTokenExpiresIn);
    },
    updateAccessToken(state, { accessToken, accessTokenExpiresIn }) {
      state.accessToken = accessToken;
      state.accessTokenExpiresIn = new Date(accessTokenExpiresIn);
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
          commit('common/setSuccess', true, { root: true });
        })
        .catch((result) => {
          console.error(result);
          commit('common/setSuccess', false, { root: true });
        });
    },
    logout({ commit }) {
      commit('setMemberInfo', {
        memberInfo: {},
        accessToken: '',
        refreshToken: ''
      });
      commit('common/setSuccess', null, { root: true });
      commit('notify/setNotifyList', [], { root: true });
    },
    authRequest({ commit, getters }, { requestCallback, failedCallback }) {
      // requestCallback: 토큰 유효 기간에 문제가 없을 때 실행되는 콜백
      // failedCallback: 토큰이 만료되었으며 리프레시가 불가능할 때 실행되는 콜백
      const now = new Date();
      if (now.getTime() >= new Date(getters.accessTokenExpiresIn).getTime()
          && now.getTime() <= new Date(getters.refreshTokenExpiresIn).getTime()) {
        console.log('토큰 재발급 시도');
        axios.post(
          apiUri.refresh,
          {
            refreshToken: getters.refreshToken
          },
          { withCredentials: true }
        )
          .then((result) => {
            console.log('토큰 재발급 성공');
            commit('updateAccessToken', result.data.payload);
            requestCallback();
          })
          .catch((result) => {
            console.error('토큰 재발급 실패');
            failedCallback(result);
          });
      } else if (now.getTime() < new Date(getters.accessTokenExpiresIn).getTime()) {
        console.log('보안 요청 시도');
        requestCallback();
      } else {
        console.log(getters.accessTokenExpiresIn);
        console.log(getters.refreshTokenExpiresIn);
        failedCallback('엑세스 토큰 및 리프레시 토큰 모두 만료');
      }
    }
  }
};
