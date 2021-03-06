import Router from 'vue-router'
import $store from './store'
import Vue from 'vue'

Vue.use(Router)

let files = require.context('@', true, /\.route\.js$/)
let routes = []

files.keys().forEach(file => {
  let arrName = file.split('/')
  let fileName = arrName[arrName.length - 1]
  let moduleData = files(file)['default']
  let moduleName = fileName.split('.')[0]

  moduleData['name'] = moduleData['name'] || moduleName

  routes.push(moduleData)
})

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!$store.getters.user) {
      next({
        name: 'Signin'
      })
    }
  }
  if (to.meta.guest) {
    if ($store.getters.user) {
      next({
        name: 'Home'
      })
    }
  }
  $store.dispatch('clearAuthError')
  next()
})

export default router
