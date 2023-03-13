export default {
  namespaced: true,
  state: {
    success: null
  },
  getters: {
    isSuccess(state) {
      return state.success;
    }
  },
  mutations: {
    setSuccess(state, value) {
      state.success = value;
    }
  },
  actions: {
  }
};
