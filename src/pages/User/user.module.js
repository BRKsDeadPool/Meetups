import * as firebase from 'firebase'

export default {
  state: {
    user: null,
    authError: null
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_AUTH_ERROR (state, payload) {
      state.authError = payload
    },
    CLEAR_AUTH_ERROR (state) {
      state.authError = null
    }
  },
  actions: {
    signUserUp({commit}, payload) {
      commit('SET_LOADING', true)
      commit('CLEAR_AUTH_ERROR')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('SET_LOADING', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('SET_USER', newUser)
        })
        .catch(error => {
          commit('SET_LOADING', false)
          commit('SET_AUTH_ERROR', error)
          console.log(error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('SET_LOADING', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('SET_LOADING', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('SET_USER', newUser)
        })
        .catch(error => {
          commit('SET_LOADING', false)
          commit('SET_AUTH_ERROR', error)
          console.log(error)
        })
    },
    signUserOut ({commit}) {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut()
          .then(user => {
            commit('SET_USER', null)
            resolve(null)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    setAuthError({commit}, payload) {
      commit('SET_AUTH_ERROR', payload)
    },
    autoSignin({commit}, payload) {
      commit('SET_USER', payload)
    },
    clearAuthError({commit}) {
      commit('CLEAR_AUTH_ERROR')
    },
  },
  getters: {
    user (state) {
      return state.user
    },
    authError (state) {
      return state.authError
    }
  }
}
