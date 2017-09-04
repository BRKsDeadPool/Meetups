import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let files = require.context('@', true, /\.store\.js$/)
let globals = require.context('@', true, /\.module\.js$/)
let modules = {}

files.keys().forEach(file => {
  let arrName = file.split('/')
  let fileName = arrName[arrName.length - 1]
  let moduleData = files(file)['default']
  let moduleName = moduleData['name'] || fileName.split('.')[0]
  moduleData['name'] = moduleName
  moduleData['namespaced'] = true

  modules[moduleName] = moduleData
})

globals.keys().forEach(file => {
  let arrName = file.split('/')
  let fileName = arrName[arrName.length - 1]
  let moduleData = globals(file)['default']
  let moduleName = moduleData['name'] || fileName.split('.')[0]
  moduleData['name'] = moduleName

  modules[moduleName] = moduleData
})

export default new Vuex.Store({
  modules
})
