// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@lib/router'
import store from '@lib/store'
import vuetify from 'vuetify'
import dateFilter from '@/filter/date'
import '@/assets/stylus/main.styl'
import * as firebase from 'firebase'
import alertComponent from './shared/Alert.vue'

Vue.use(vuetify)

Vue.config.productionTip = false

Vue.filter('date', dateFilter)

Vue.component('app-alert', alertComponent)

/* eslint-disable no-new */
new Vue({
  el: '#app',
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
    this.$store.dispatch('loadMeetups')
  }
})
