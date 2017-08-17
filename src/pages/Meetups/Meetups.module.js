import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: []
  },
  mutations: {
    ADD_MEETUP(state, payload) {
      state.loadedMeetups.push(payload)
    },
    SET_MEETUPS(state, payload) {
      state.loadedMeetups = payload
    }
  },
  actions: {
    loadMeetups({commit}) {
      commit('SET_LOADING', true)
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()
          for (let id in obj) {
            let {description, imageUrl, date, location, title} = obj[id]
            meetups.push({
              id,
              title,
              location,
              imageUrl,
              date
            })
          }
          commit('SET_MEETUPS', meetups)
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.error(error)
          commit('SET_LOADING', false)
        })
    },
    addMeetup({commit}, payload) {
      let {title, imageUrl, location, description, date} = payload
      let meetup = {
        title,
        imageUrl,
        location,
        description,
        date: date.toISOString()
      }

      firebase.database().ref('meetups').push(meetup)
        .then(data => {
          console.log(data)
          const id = data.key
          commit('ADD_MEETUP', {
            ...meetup,
            id
          })
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date > b.date
      })
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    selectMeetup(state, getters) {
      return (id) => {
        return getters.loadedMeetups.find(meetup => meetup.id === id)
      }
    }
  }
}
