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
            let {description, imageUrl, date, location, title, image} = obj[id];

            imageUrl = window.URL.createObjectURL(image)

            meetups.push({
              id: obj[id]['id'],
              description,
              title,
              location,
              imageUrl,
              date
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
            let {description, imageUrl, date, location, title} = obj[id];
            let meetup = {
              id,
              description,
              title,
              location,
              imageUrl,
              date
            }
            meetups.push(meetup)
          }
          meetups.slice(Math.max(meetups.length - 10, 0)).forEach(meetup => {
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
          creatorId: getters.user.uid
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

            dispatch('cacheMeetup', commitPayload)
              .then(resolve)
              .catch(console.error)
          })
          .catch(reject)
      })
    },
    cacheOldMeetup({dispatch}, payload) {
      // fetch(payload.imageUrl, {mode: 'no-cors'})
      //   .then(res => {
      //     return res.blob()
      //   })
      //   .then(blob => {
      //     dispatch('cacheMeetup', {...payload, image: blob})
      //   })
      firebase.storage()
        .ref('images/' + payload.id)
        .getDownloadURL()
        .then(url => {
          fetch(url, {method: 'GET'})
            .then(res => {
              console.log(res)
            })
        })
    },
    cacheMeetup(context, payload) {
      return new Promise((resolve, reject) => {
        try {
          lf.getItem('loadedMeetups')
            .then(data => {
              let {image} = payload
              let meetups = data
              if (payload['image'].constructor === File) {
                payload['image'] = new Blob([payload['image']])
              }
              if (meetups.find(meetup => meetup.id === payload['id'])){
                return resolve()
              }
              if (meetups.length > 9) {
                meetups.shift()
              }
              meetups.push(payload)

              lf.setItem('loadedMeetups', meetups)
                .then(resolve)
            })
        } catch (e) {
          reject(e)
        }
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
