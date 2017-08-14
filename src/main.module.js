export default {
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    setLoading({commit}, payload) {
      commit('SET_LOADING', payload)
    }
  },
  getters: {
    loading: state => state.loading
  }
}
