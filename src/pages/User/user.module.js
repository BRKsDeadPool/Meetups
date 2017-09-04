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
    },
    REGISTER_TO_MEETUP (state, payload) {
      const {id, key} = payload

      if (state.user.registeredMeetups.find(meetup => {
          return meetup === id
        }) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.registeredMeetupKeys[id] = key
    },
    UNREGISTER_FROM_MEETUP (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => {
        return meetup === payload
      }, 1))
      Reflect.deleteProperty(state.user.registeredMeetups, payload)
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
            registeredMeetups: [],
            registeredMeetupKeys: {}
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
            registeredMeetups: [],
            registeredMeetupKeys: {}
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
      const newUser = {
        id: payload.uid,
        registeredMeetups: [],
        registeredMeetupKeys: {}
      }
      commit('SET_USER', newUser)
    },
    clearAuthError({commit}) {
      commit('CLEAR_AUTH_ERROR')
    },
    registerToMeetup({commit, getters}, payload) {
      commit('SET_LOADING', true);
      const user = getters.user
      firebase.database().ref('users/' + user.id).child('/registration')
        .push(payload)
        .then(data => {
          commit('SET_LOADING', false);
          commit('REGISTER_TO_MEETUP', {id: payload, key: data.key});
        })
        .catch(error => {
          commit('SET_LOADING', false);
          console.log(error)
        })

    },
    unregisterFromMeetup({commit, getters}, payload) {
      commit('SET_LOADING', true);
      const user = getters.user
      if (!user.registeredMeetupKeys) {
        return
      }
      const key = user.registeredMeetupKeys[payload]
      firebase.database().ref('users/' + user.id + '/registration').child(key)
        .remove()
        .then(() => {
          commit('SET_LOADING', false);
          commit('UNREGISTER_FROM_MEETUP', payload)
        })
        .catch(error => {
          console.log(error)
          commit('SET_LOADING', false);
        })
    }
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
