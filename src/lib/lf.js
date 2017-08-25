import localForage from 'localforage'

localForage.config({
  name: 'Meetups'
})

// TODO: remove for production

if (window) {
  window.lf = localForage
}

export default localForage
