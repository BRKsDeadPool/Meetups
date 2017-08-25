// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@lib/router'
import store from '@lib/store'
import vuetify from 'vuetify'
import {dateFilter, mobileDateFilter} from '@/filter/date'
import '@/assets/stylus/main.styl'
import * as firebase from 'firebase'
import alertComponent from './shared/Alert.vue'
import VueAnalitycs from 'vue-analytics'
import lf from '@/lib/lf'

Vue.use(vuetify)

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('mobileDate', mobileDateFilter)

Vue.component('app-alert', alertComponent)

Vue.use(VueAnalitycs, {
  id: 'UA-105253670-1',
  router,
  autoTracking: {
    exception: true
  }
})

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  template: '<App/>',
  components: {App},
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyC1acEaLCQnyEmVVX_w7JaNTNtoxr--Uak',
      authDomain: 'meetups-acf5e.firebaseapp.com',
      databaseURL: 'https://meetups-acf5e.firebaseio.com',
      projectId: 'meetups-acf5e',
      storageBucket: 'meetups-acf5e.appspot.com',
      messagingSenderId: '171201923639'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
      }
    })
  },
  mounted () {
    lf.getItem('loadedMeetups')
      .then(value => {
        if(value === null) {
          lf.setItem('loadedMeetups', [])
        }
      })

    let connRef = firebase.database().ref('.info/connected')

    connRef.on('value', snap => {
      if (snap.val() === true) {
        this.$store.dispatch('setOffline', false)
        this.$store.dispatch('loadMeetups')
      } else {
        this.$store.dispatch('setOffline', true)
        this.$store.dispatch('loadOfflineMeetups')
      }
    })
  }
})

VueAnalitycs.onScriptLoaded()
  .then(() => {
    app.$mount('#app')
  })
