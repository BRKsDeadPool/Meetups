import component from './Profile.vue'

export default {
  path: '/profile',
  name: 'Profile',
  component,
  meta: {
    auth: true
  }
}
