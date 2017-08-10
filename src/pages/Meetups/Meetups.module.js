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
      let id = new Date().getTime();

      commit('ADD_MEETUP', {
        title,
        imageUrl,
        location,
        description,
        date,
        id
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
