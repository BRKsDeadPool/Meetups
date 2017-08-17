import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [
      {
        id: 'aasdfvse',
        title: 'Meetup in Thaiti',
        imageUrl: '/static/meetups/thaiti.jpg',
        date: new Date(),
        location: 'Some location',
        description: 'Some good description'
      },
      {
        id: 'aascbvsdfvse',
        title: 'Meetup in Veneza',
        imageUrl: '/static/meetups/veneza.jpg',
        date: new Date(),
        location: 'Some location',
        description: 'Some good description'
      },
    ]
  },
  mutations: {
    ADD_MEETUP(state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    addMeetup({commit}, payload) {
      let {title, imageUrl, location, description, date} = payload
      let meetup = {
        title,
        imageUrl,
        location,
        description,
        date
      }

      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          console.log(data)
          commit('ADD_MEETUP', data)
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
