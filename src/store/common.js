import axios from "axios";
import apiUri from "@/apiUri";

export default {
  namespaced: true,
  state: {
    success: null,
    workArea: [
      {
        workAreaId: 1,
        workAreaName: '직무명',
        workAreaComment: '직무설명'
      }
    ]
  },
  getters: {
    isSuccess(state) {
      return state.success;
    },
    workArea(state) {
      return state.workArea;
    }
  },
  mutations: {
    setSuccess(state, value) {
      state.success = value;
    },
    setWorkArea(state, value) {
      state.workArea = value;
    }
  },
  actions: {
    getWorkArea({ commit, rootGetters }) {
      axios.get(
          `${apiUri.recruit}/workarea`,
          {
              withCredentials: true,
              headers: {
                  Authorization: `Bearer ${rootGetters['auth/accessToken']}`
              }
          }
      ).then((response) => {
          console.log("직무분야 가져오기 완료");
          commit('setWorkArea', response.data.payload);
      }).catch((error) => {
          console.error(error);
          commit('setSuccess', false, { root: true });
      });
    },
  }
};
