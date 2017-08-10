import Router from 'vue-router'
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

export default new Router({
  mode: 'history',
  routes
})
