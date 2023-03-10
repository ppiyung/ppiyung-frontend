/* eslint-disable */
import axios from "axios";
import apiUri from '@/apiUri';

export default {
  namespaced: true,
  state: {
    member_id: '',
    member_name: '',
    member_type: '',
    member_verified: false
  },
  getters: {
    getMemberInfo(state) {
      return {
        member_id: state.member_id,
        member_name: state.member_name,
        member_type: state.member_type
      };
    },
    isLogin(state) {
      if (state.member_id === ''
              || state.member_name === ''
              || state.member_type === '') {
        return false;
      }
      return true;
    },
    isVerifed(state) {
        return state.member_verified;
    }
  },
  mutations: {
    setMemberInfo(state, { member_id, member_name, member_type }) {
      state.member_id = member_id;
      state.member_name = member_name;
      state.member_type = member_type;
    },
    setMemberVerified(state, isVerify) {
        state.member_verified = isVerify;
    }
  },
  actions: {
    async verify({ commit, state }) {
        console.log('세션 검증 시작');
        try {
            const response = await axios.post(
                apiUri.verify,
                {},
                { withCredentials: true }
            )
            console.log(response);
            const memberInfo = response.data.payload
            commit('setMemberInfo', {
                member_id: memberInfo.member_id,
                member_name: memberInfo.member_name,
                member_type: memberInfo.member_type
            });
            commit('setMemberVerified', true);
            console.log('세션 검증 완료 - 성공');
        } catch(error) {
            console.error(error);
            commit('setMemberInfo', {
                member_id: '',
                member_name: '',
                member_type: ''
            });
            commit('setMemberVerified', false);
            console.log('세션 검증 완료 - 실패');
        }
    }
  }
};
