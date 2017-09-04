export default {
  state: {
    connection: false
  },
  mutations: {
    SET_CONNECTION(state, payload) {
      state.connection = payload
    }
  },
  actions: {
    setConnection({commit}, payload) {
      commit('SET_CONNECTION', payload)
    }
  },
  getters: {
    connection(state) {
      return state.connection
    }
  }
}
