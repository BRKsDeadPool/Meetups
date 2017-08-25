<script>
  export default {
    data: () => ({
      sideNav: false,
      transitionName: 'fade'
    }),
    computed: {
      online() {
        return this.$store.getters.online
      },
      items() {
        let items = [{title: 'Ver Rolês', icon: 'supervisor_account', to: '/meetups'}]

        if (this.online) {
          items.push({title: 'Registre-se', icon: 'face', to: '/signup'})
          items.push({title: 'Logue-se', icon: 'lock_open', to: '/signin'})
        }

        if (this.authUser) {
          items = [
            {title: 'Ver Rolês', icon: 'supervisor_account', to: '/meetups'},
            {title: 'Perfil', icon: 'person', to: '/profile'}
          ]

          if (this.online) {
            items.push({title: 'Organizar Rolê', icon: 'room', to: '/meetup/new'})
          }
        }
        return items
      },
      authUser() {
        return this.$store.getters.user !== null && this.$store.getters.user !== 'undefined'
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('signUserOut')
          .then(() => {
            this.$router.push('/')
          })
      }
    }
  }
</script>

<template>
  <v-app toolbar>
    <v-navigation-drawer v-model="sideNav" temporary>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ item.title }}



          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show="authUser" @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Sair



          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary" dark fixed>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link tag="span" to="/" style="cursor: pointer">Rolês</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="(item, i) in items" :key="i" flat :to="item.to">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}



        </v-btn>
        <v-btn flat v-show="authUser" @click="logout" v-if="online">
          <v-icon left dark>exit_to_app</v-icon>
          Sair
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </main>
  </v-app>
</template>
