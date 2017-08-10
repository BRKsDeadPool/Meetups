<script>
export default {
  data: () => ({
    sideNav: false,
    items: [
      { title: 'Ver Encontros', icon: 'supervisor_account', to: '/meetups' },
      { title: 'Organizar Encontro', icon: 'room', to: '/meetup/new' },
      { title: 'Perfil', icon: 'person', to: '/profile' },
      { title: 'Registre-se', icon: 'face', to: '/signup' },
      { title: 'Logue-se', icon: 'lock_open', to: '/signin' },
    ],
    transitionName: 'fade'
  })
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>


<template>
  <v-app>
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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary" dark>
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
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </main>
  </v-app>
</template>
