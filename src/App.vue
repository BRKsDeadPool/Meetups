<script>
  export default {
    name: 'App',
    data() {
      return {
        navigationDrawer: false
      }
    },
    computed: {
      items() {
        let getters = this.$store.getters
        let items = [
          {title: 'Ver Rolês', icon: 'supervisor_account', to: '/meetups'}
        ]
        if (getters.connection) {
          if (getters.user) {
            items.push({title: 'Organizar Rolê', icon: 'room', to: '/meetup/new'})
            items.push({title: 'Perfil', icon: 'person', to: '/profile'})
          } else {
            items.push({title: 'Registrar', icon: 'face', to: '/register'})
            items.push({title: 'Entrar', icon: 'lock_open', to: '/login'})
          }
        } else {
          if (getters.user) {
            items.push({title: 'Perfil', icon: 'person', to: '/profile'})
          }
        }
        return items
      }
    }
  }
</script>

<template>
  <v-app id="app">
    <v-navigation-drawer temporary v-model="navigationDrawer">
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary" dark>
      <v-toolbar-side-icon class="hidden-md-and-up"
                           @click.stop="navigationDrawer = !navigationDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">Meetups</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(item, i) in items" :key="i" :to="item.to">
          <v-icon left>{{ item.icon }}</v-icon>
          <span>{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>
