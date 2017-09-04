export default {
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    }
  },
  actions: {
    setUser({commit}, payload) {
      commit('SET_USER', payload)
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}
