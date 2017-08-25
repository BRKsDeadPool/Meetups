export default {
  state: {
    loading: false,
    offline: false
  },
  mutations: {
    SET_LOADING (state, payload) {
      state.loading = payload
    },
    SET_OFFLINE (state, payload) {
      state.offline = payload
    }
  },
  actions: {
    setLoading({commit}, payload) {
      commit('SET_LOADING', payload)
    },
    setOffline({commit}, payload) {
      commit('SET_OFFLINE', payload)
    }
  },
  getters: {
    loading: state => state.loading,
    offline: state => state.offline,
    online: state => !state.offline
  }
}
