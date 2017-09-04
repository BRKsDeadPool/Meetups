// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/stylus/main.styl'
import Vuetify from 'vuetify'
import * as Firebase from 'firebase'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  created() {
    Firebase.initializeApp({
      apiKey: "AIzaSyB-yS0X_QbcovGZLLWdct-8dEL6iD9kTwc",
      authDomain: "xfind-142320.firebaseapp.com",
      databaseURL: "https://xfind-142320.firebaseio.com",
      projectId: "xfind-142320",
      storageBucket: "xfind-142320.appspot.com",
      messagingSenderId: "293032092683"
    })
    Firebase.database()
      .ref('.info/connected')
      .on('value', snap => {
        if (snap.val()) {
          this.$store.dispatch('setConnection', true)
        } else {
          this.$store.dispatch('setConnection', false)
        }
      })
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('setUser', user)
      } else {
        this.$store.dispatch('setUser', null)
        this.$router.push('/')
      }
    })
  }
})
