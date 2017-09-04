import * as firebase from 'firebase'
import lf from '@/lib/lf'

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
    },
    UPDATE_MEETUP(state, payload) {
      let meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      let {title, description, date} = payload
      if (title) {
        meetup['title'] = title
      }
      if (description) {
        meetup['description'] = description
      }
      if (date) {
        meetup['date'] = date
      }
    }
  },
  actions: {
    loadOfflineMeetups({commit}) {
      commit('SET_LOADING', true);

      lf.getItem('loadedMeetups')
        .then(data => {
          const meetups = [];
          const obj = data
          for (let id in obj) {
            let {description, imageUrl, date, location, title, image, creatorId} = obj[id];

            imageUrl = window.URL.createObjectURL(image)

            meetups.push({
              id: obj[id]['id'],
              description,
              title,
              location,
              imageUrl,
              date,
              creatorId
            })
          }
          commit('SET_MEETUPS', meetups);
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.error(error);
          commit('SET_LOADING', false)
        })
    },
    loadMeetups({commit, dispatch}) {
      commit('SET_LOADING', true);
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let id in obj) {
            let {description, imageUrl, date, location, title, creatorId} = obj[id];
            let meetup = {
              id,
              description,
              title,
              location,
              imageUrl,
              date,
              creatorId
            }
            meetups.push(meetup)
          }
          meetups.slice(meetups.length - 25).forEach(meetup => {
            dispatch('cacheOldMeetup', meetup)
          })
          commit('SET_MEETUPS', meetups);
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.error(error);
          commit('SET_LOADING', false)
        })
    },
    addMeetup({commit, getters, dispatch}, payload) {
      return new Promise((resolve, reject) => {
        let {title, location, description, date} = payload;
        let meetup = {
          title,
          location,
          description,
          date: date.toISOString(),
          creatorId: getters.user.id
        };
        let imageUrl, key;

        firebase.database().ref('meetups').push(meetup)
          .then(data => {
            key = data.key;
            return key
          })
          .then(key => {
            const filename = payload.image.name;
            const ext = filename.slice(filename.lastIndexOf('.') + 1);
            return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
          })
          .then(fileData => {
            imageUrl = fileData.metadata.downloadURLs[0];
            let image = new Image();
            image.src = imageUrl;
            return firebase.database().ref('meetups').child(key).update({imageUrl})
          })
          .then(() => {
            let commitPayload = {
              ...meetup,
              id: key,
              imageUrl,
              image: payload.image
            };
            commit('ADD_MEETUP', commitPayload);

            dispatch('cacheMeetup', {payload: commitPayload, key: 'myMeetups'})
            dispatch('cacheMeetup', {payload: commitPayload})
              .then(resolve)
              .catch(console.error)
          })
          .catch(reject)
      })
    },
    cacheOldMeetup({dispatch}, payload) {
      fetch(payload.imageUrl)
        .then(res => {
          return res.blob()
        })
        .then(blob => {
          payload = {...payload, image: blob}
          dispatch('cacheMeetup', {payload})
        })
    },
    cacheMeetup(context, {payload, key}) {
      key = key || 'loadedMeetups'

      return new Promise((resolve, reject) => {
        try {
          lf.getItem(key)
            .then(data => {
              let {image} = payload
              let meetups = data
              let oldMeetup = meetups.find(meetup => meetup.id === payload['id'])
              if (payload['image'].constructor === File) {
                payload['image'] = new Blob([payload['image']])
              }
              if (oldMeetup) {
                meetups[meetups.indexOf(oldMeetup)] = payload
              } else {
                if (meetups.length > 25) {
                  meetups.shift()
                }
                meetups.push(payload)
              }

              lf.setItem(key, meetups)
                .then(resolve)
            })
        } catch (e) {
          reject(e)
        }
      })
    },
    updateMeetup({commit, getters, dispatch}, payload) {
      commit('SET_LOADING', true)
      const updateObj = {}
      const {title, description, date, id} = payload

      if (title) {
        updateObj['title'] = title
      }
      if (description) {
        updateObj['description'] = description
      }
      if (date) {
        updateObj['date'] = date
      }

      firebase.database()
        .ref('meetups')
        .child(id)
        .update(updateObj)
        .then(() => {
          commit('SET_LOADING', false)
          commit('UPDATE_MEETUP', payload)
          dispatch('cacheOldMeetup', payload)
        })
        .catch(err => {
          console.log(err)
          commit('SET_LOADING', false)
        })
    }
  },
  getters: {
    loadedMeetups(state, getters) {
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
